package org.example.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.Result;
import org.example.entity.VoucherOrder;
import org.example.service.VoucherOrderService;
import org.example.utils.UserHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.BoundSetOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/voucher-order")
public class VoucherOrderController {

    @Autowired
    private VoucherOrderService voucherOrderService;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    // 根据优惠卷 id 获取优惠卷
    @GetMapping("/seckill/{id}")
    public Result getVoucherById(@PathVariable Long id){
        return voucherOrderService.getVoucherOrderByIdWithLua(id);
        // return voucherOrderService.getVoucherOrderById(id);
    }

    /**
     * 测试使用
     * @return
     */
    @GetMapping("/delete")
    public Result deleteVoucherOrderByUserId(){
        Long voucherId = 1L;
        Long userId = UserHolder.getUser().getId();
        // 删除 mysql
        QueryWrapper<VoucherOrder> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id",userId);
        voucherOrderService.remove(queryWrapper);
        // 删除 redis
        String key = "misxzaiz:voucher:order:"+voucherId;
        String valueToRemove = userId.toString();
        // 使用 StringRedisTemplate 的 boundSetOps 方法获取 Set 相关操作的绑定对象
        BoundSetOperations<String, String> setOps = stringRedisTemplate.boundSetOps(key);
        // 调用 srem 命令来删除集合中的元素
        setOps.remove(valueToRemove);
        return Result.ok("删除成功！");
    }
}
