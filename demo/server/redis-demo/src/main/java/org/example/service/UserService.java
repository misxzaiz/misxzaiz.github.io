package org.example.service;

import com.baomidou.mybatisplus.extension.service.IService;
import org.example.dto.LoginForm;
import org.example.dto.Result;
import org.example.entity.User;

import java.util.concurrent.TimeUnit;

public interface UserService extends IService<User> {

    Result getCodeByPhone(String phone);

    Result loginWithPhoneByCode(LoginForm form);

    Result getUserByIdWithRedisLocalExpire(Long id, String keyPrefix, Long time, TimeUnit unit);
}
