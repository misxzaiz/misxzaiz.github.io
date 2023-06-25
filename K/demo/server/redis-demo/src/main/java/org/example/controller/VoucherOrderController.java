package org.example.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.dto.Result;
import org.example.service.VoucherOrderService;
import org.springframework.beans.factory.annotation.Autowired;
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

    // 根据优惠卷 id 获取优惠卷
    @GetMapping("/seckill/{id}")
    public Result getVoucherById(@PathVariable Long id){
        return voucherOrderService.getVoucherOrderById(id);
    }
}
