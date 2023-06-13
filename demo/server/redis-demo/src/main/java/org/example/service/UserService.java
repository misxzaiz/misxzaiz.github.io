package org.example.service;

import com.baomidou.mybatisplus.extension.service.IService;
import org.example.dto.Result;
import org.example.entity.User;

public interface UserService extends IService<User> {
    Result listAllUser();

    Result getUserById(Long id);

    Result updateUser(User user);
}
