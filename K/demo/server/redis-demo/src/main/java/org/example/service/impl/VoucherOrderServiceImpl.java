package org.example.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.Result;
import org.example.dto.UserDto;
import org.example.entity.Voucher;
import org.example.entity.VoucherOrder;
import org.example.mapper.VoucherOrderMapper;
import org.example.service.VoucherOrderService;
import org.example.service.VoucherService;
import org.example.utils.RedisIDWorker;
import org.example.utils.RedisLock;
import org.example.utils.UserHolder;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Slf4j
@Service
public class VoucherOrderServiceImpl extends ServiceImpl<VoucherOrderMapper, VoucherOrder> implements VoucherOrderService {

    @Autowired
    private VoucherService voucherService;

    @Autowired
    private RedisIDWorker redisIDWorker;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    // 根据优惠卷 id 获取优惠卷
    @Override
    public Result getVoucherOrderById(Long id) {
        log.info("【优惠卷订单·getVoucherOrderById】id:{}",id);

        // 查询数据库，获取优惠卷
        Voucher voucher = voucherService.getById(id);
        // 检查是否在抢卷时间
        if ( !checkTime(voucher) ) return Result.fail("不在抢购时间内！");
        // 【版本号法】检查优惠卷数量是否充足
        Integer stock = voucher.getStock();
        if (voucher.getStock() < 1) return Result.fail("优惠卷数量不足！");
        // 从当前线程获取用户 id
        Long userId = UserHolder.getUser().getId();
        // 【分布式】
        RedisLock redisLock = new RedisLock("order:" + userId, stringRedisTemplate);
        boolean tryLock = redisLock.tryLock(5);
        if (!tryLock) return Result.fail("不允许重复请求！");
        try {
            // 【spring事务】失效问题
            VoucherOrderService proxy = (VoucherOrderService) AopContext.currentProxy();
            return proxy.createVoucherOrder(id, userId);
        } finally {
            redisLock.unlock();
        }
    }

    @Transactional
    public Result createVoucherOrder(Long id, Long userId) {
        // 【一人一单】
        Long count = query().eq("user_id", userId)
                .eq("voucher_id", id)
                .count();
        if (count > 0) return Result.fail("该用户已经下单！！");
        // 【版本号法】扣减优惠卷数量
        boolean update = voucherService.update()
                .setSql("stock = stock  - 1")
                .eq("id", id)
                // .eq("stock", stock) // 版本号法，失败了高
                .gt("stock",0) // stock > 0，实际业务，stock大于0就行
                .update();
        if (!update) return Result.fail("扣减失败！");
        // 生成全局唯一id作为优惠卷订单号
        long voucherOrderId = redisIDWorker.nextId("order:voucher:");
        // 保存订单
        VoucherOrder voucherOrder = new VoucherOrder();
        voucherOrder.setId(voucherOrderId);
        voucherOrder.setUserId(userId);
        voucherOrder.setVoucherId(id);
        save(voucherOrder);
        return Result.ok("抢购成功！");
    }

    private static boolean checkTime(Voucher voucher) {
        // 检查是否在抢购时间
        Date now = new Date();
        return !now.before(voucher.getStartTime()) && !now.after(voucher.getEndTime());
    }
}
