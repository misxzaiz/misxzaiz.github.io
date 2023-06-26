package org.example.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.dto.Result;
import org.example.entity.Voucher;
import org.example.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/voucher")
public class VoucherController {

    @Autowired
    private VoucherService voucherService;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @GetMapping("/list")
    public Result getVoucherList(){
        return Result.ok(voucherService.list(),"查询成功！");
    }

    @GetMapping("/setVoucherCount/{count}")
    public Result setVoucherCount(@PathVariable Integer count){
        Long voucherId = 1L;
        // 修改优惠卷数量
        Voucher voucher = new Voucher();
        voucher.setId(voucherId);
        voucher.setStock(count);
        // 保存优惠卷数量到 mysql 中
        voucherService.updateById(voucher);
        // 保存优惠卷数量到 redis 中
        stringRedisTemplate.opsForValue().set("misxzaiz:voucher:stock:"+voucherId,count.toString());
        return Result.ok("修改成功！");
    }
}
