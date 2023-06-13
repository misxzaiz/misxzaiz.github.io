package org.example.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.dto.Result;
import org.example.service.ShopCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("shopCategory")
public class ShopCategoryController {

    @Autowired
    private ShopCategoryService shopCategoryService;

    @GetMapping
    public Result getShopCategoryList(){
        return Result.ok(shopCategoryService.list());
    }
}
