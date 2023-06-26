package org.example.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.Result;
import org.example.entity.Voucher;
import org.example.entity.VoucherOrder;
import org.example.mapper.VoucherOrderMapper;
import org.example.service.VoucherOrderService;
import org.example.service.VoucherService;
import org.example.utils.RedisIDWorker;
import org.example.utils.UserHolder;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.Date;
import java.util.concurrent.*;

@Slf4j
@Service
public class VoucherOrderServiceImpl extends ServiceImpl<VoucherOrderMapper, VoucherOrder> implements VoucherOrderService {

    @Autowired
    private VoucherService voucherService;

    @Autowired
    private RedisIDWorker redisIDWorker;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Autowired
    private RedissonClient redissonClient;

    // lua 脚本
    private static final DefaultRedisScript<Long> VOUCHER_SCRIPT;
    static {
        VOUCHER_SCRIPT = new DefaultRedisScript<>();
        VOUCHER_SCRIPT.setLocation(new ClassPathResource("voucher.lua"));
        VOUCHER_SCRIPT.setResultType(Long.class);
    }

    // 阻塞队列
    private BlockingQueue<VoucherOrder> orderTasks = new ArrayBlockingQueue<>(1024 * 1024);
    // 宣线程池
    private static final ExecutorService VOUCHER_ORDER_EXECUTOR = Executors.newSingleThreadExecutor();

    // 容器初始化后就执行
    @PostConstruct
    private void init(){
        VOUCHER_ORDER_EXECUTOR.submit(new VoucherOrderHandler());
    }
    private class VoucherOrderHandler implements Runnable {
        @Override
        public void run() {
            // 不会不断循环导致CPU负载增加，会在orderTasks.take()等待
            while (true){
                try {
                    // 获取队列中的订单信息
                    VoucherOrder voucherOrder = orderTasks.take();
                    // 创建订单
                    handlerVoucherOrder(voucherOrder);
                } catch (Exception e) {
                    log.info("处理优惠卷订单异常！");
                }

            }
        }
    }

    private void handlerVoucherOrder(VoucherOrder voucherOrder) {
        Long userId = voucherOrder.getUserId();
        Long voucherId = voucherOrder.getVoucherId();
        // 【Redisson】
        RLock tryLock = redissonClient.getLock("lock:order:" + userId);
        boolean isLock = false;
        try {
            isLock = tryLock.tryLock(1, 10, TimeUnit.SECONDS);
            if (!isLock) {
                log.error("不允许重复下单！");
                return;
            }
            // 【spring事务】失效问题
            proxy.createVoucherOrder(voucherOrder);
            return;
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            tryLock.unlock();
        }
    }

    // 代理对象
    private VoucherOrderService proxy;
    /**
     * 通过 lua 脚本获取优惠卷，异步下单，提高性能
     * @param id 优惠卷 id
     * @return
     */
    @Override
    public Result getVoucherOrderByIdWithLua(Long id) {
        Long userId = UserHolder.getUser().getId();
        // 执行 lua 脚本
        Long execute = stringRedisTemplate.execute(
                VOUCHER_SCRIPT,
                Collections.emptyList(),
                id.toString(), userId.toString());
        // 判断结果是否为 0(execute != null 是解决 Long 拆箱可能为 null 的空指针异常）
        if (execute != null && execute != 0) {
            return Result.fail(execute == 1 ?"库存不足！":"重复下单！");
        }
        // 生成全局唯一id作为优惠卷订单号
        long voucherOrderId = redisIDWorker.nextId("order:voucher:");
        // 将下单信息保存到阻塞队列中
        VoucherOrder voucherOrder = new VoucherOrder();
        voucherOrder.setId(voucherOrderId);
        voucherOrder.setUserId(userId);
        voucherOrder.setVoucherId(id);
        // 创建阻塞队列
        orderTasks.add(voucherOrder);
        // 获取代理对象
        proxy = (VoucherOrderService) AopContext.currentProxy();
        return Result.ok(voucherOrderId);
    }


    @Transactional
    public void createVoucherOrder(VoucherOrder voucherOrder) {
        Long userId = voucherOrder.getUserId();
        Long voucherId = voucherOrder.getVoucherId();
        // 【一人一单】
        Long count = query().eq("user_id", userId)
                .eq("voucher_id", voucherId)
                .count();
        // 用户已经下单
        if (count > 0) return;
        // 【版本号法】扣减优惠卷数量
        boolean update = voucherService.update()
                .setSql("stock = stock  - 1")
                .eq("id", voucherId)
                // .eq("stock", stock) // 版本号法，失败了高
                .gt("stock",0) // stock > 0，实际业务，stock大于0就行
                .update();
        // 扣减失败
        if (!update);
        // 生成全局唯一id作为优惠卷订单号
        long voucherOrderId = redisIDWorker.nextId("order:voucher:");
        // 保存订单
        save(voucherOrder);
        return;
    }

    private static boolean checkTime(Voucher voucher) {
        // 检查是否在抢购时间
        Date now = new Date();
        return !now.before(voucher.getStartTime()) && !now.after(voucher.getEndTime());
    }
}
