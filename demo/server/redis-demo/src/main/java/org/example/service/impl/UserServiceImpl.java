package org.example.service.impl;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.Result;
import org.example.entity.User;
import org.example.mapper.UserMapper;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

import static org.example.utils.RedisUtils.*;

@Slf4j
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public Result listAllUser() {
        log.info("【数据库查询】查询所有用户信息");
        return Result.ok(list(),"查询成功！");
    }

    @Override
    public Result getUserById(Long id) {
        String key = GET_USER_BY_ID + ":" + id;
        // 从 redis 查询用户缓存
        String userJson = stringRedisTemplate.opsForValue().get(key);
        // 判断是否存在
        if (!(userJson == null || userJson.equals(""))) {
            // 存在，直接返回
            User user = JSONUtil.toBean(userJson, User.class);
            log.info("【Redis 缓存查询】通过id查询用户信息");
            return Result.ok(user,"查询成功！");
        }
        // 不存在，查询数据库
        User user = getById(id);
        // 判断是否存在
        if (user == null) {
            return Result.fail("该用户不存在！");
        }
        // 写入缓存
        stringRedisTemplate.opsForValue().set(key,JSONUtil.toJsonStr(user),3, TimeUnit.DAYS);
        // 返回用户信息
        log.info("【MySQL 数据库查询】通过id查询用户信息");
        return Result.ok(getById(id),"查询成功！");
    }

    @Override
    @Transactional
    public Result updateUser(User user) {
        log.info("【更新用户信息】");
        Long id = user.getId();
        if (id == null) {
            return Result.fail("用户 id 不存在！");
        }
        String key = GET_USER_BY_ID + ":" + id;
        // 更新数据库
        updateById(user);
        // 删除缓存
        stringRedisTemplate.delete(key);
        return Result.ok("更新用户数据成功！");
    }
}
