package org.example.service;

import com.baomidou.mybatisplus.extension.service.IService;
import org.example.dto.Result;
import org.example.entity.VoucherOrder;

public interface VoucherOrderService extends IService<VoucherOrder> {
    Result getVoucherOrderByIdWithLua(Long id);

    void createVoucherOrder(VoucherOrder voucherOrder);
}
