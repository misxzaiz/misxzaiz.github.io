package org.example.service;

import com.baomidou.mybatisplus.extension.service.IService;
import org.example.dto.Result;
import org.example.entity.ShopCategory;

public interface ShopCategoryService extends IService<ShopCategory> {
    Result updateShopCategory(ShopCategory shopCategory);
}
