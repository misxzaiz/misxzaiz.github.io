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
        // 不存在，查询数据库
        log.info("【查询数据库】");
        try {
            // 从 redis 查询用户缓存
            String userJson = stringRedisTemplate.opsForValue().get(key);
            // 判断是否存在
            if (userJson != null) {
                // 【缓存空对象】
                if ("".equals(userJson)){
                    log.info("【缓存空对象】读取到的是空值");
                    return Result.fail("用户不存在！");
                }else {
                    // 存在，直接返回
                    User user = JSONUtil.toBean(userJson, User.class);
                    log.info("【Redis 缓存查询】通过id查询用户信息");
                    return Result.ok(user,"查询成功！");
                }
            }
            User user = getById(id);
            if (user == null) {
                // 【缓存空对象】将空值写入 redis
                log.info("【缓存空对象】将空值写入 redis");
                stringRedisTemplate.opsForValue().set(key,"",2,TimeUnit.MINUTES);
                return Result.fail("该用户不存在！");
            }
            // 写入缓存【超时剔除】
            stringRedisTemplate.opsForValue().set(key,JSONUtil.toJsonStr(user),30, TimeUnit.MINUTES);
            // 返回用户信息
            log.info("【MySQL 数据库查询】通过id查询用户信息");
            return Result.ok(getById(id),"查询成功！");
        } catch (Exception e) {
            log.error("查询用户信息异常", e);
            return Result.fail("查询用户信息异常");
        }

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
