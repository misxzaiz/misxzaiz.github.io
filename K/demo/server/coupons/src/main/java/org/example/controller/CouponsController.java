package org.example.controller;

import org.example.dto.Result;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/coupons")
public class CouponsController {

    @GetMapping("/{id}")
    public Result getCouponsById(@PathVariable Long id){
        return Result.ok("用户【"+id+"】抢卷成功！");
    }
}
