package org.example.service.impl;

import cn.hutool.core.util.BooleanUtil;
import cn.hutool.core.util.StrUtil;
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
        // 缓存穿透
         // return getUserByIdWithPassThrough(id);

        return queryWithMutex(id);
    }

    private Result queryWithMutex(Long id) {
        String key = GET_USER_BY_ID + ":" + id;
        String lockKey = LOCK_GET_USER_BY_ID + ":" + id;
        User user = null;
        try {
            // 从 redis 查询用户缓存
            String userJson = stringRedisTemplate.opsForValue().get(key);
            // 判断是否存在
            if (StrUtil.isNotBlank(userJson)) {
                // 存在，直接返回
                user = JSONUtil.toBean(userJson, User.class);
                return Result.ok(user, "【缓存】用户查询成功！");
            }
            // 判断是否为空值
            if (userJson != null) {
                // 返回错误信息
                return Result.fail("【缓存·空值】用户不存在！");
            }
            // 不存在，查询数据库，实现缓存冲击
            // 【互斥锁】获取互斥锁

            boolean isLock = tryLock(lockKey);

            // 【互斥锁】判断是否获取成功
            if (!isLock) {
                // 【互斥锁】失败，休眠并重试
                Thread.sleep(100);
                log.info("【重新获取锁】");
                // 【存在问题，待完善】重试
                queryWithMutex(id);
            }
            // 延时，测试锁
            Thread.sleep(5000);
            // 【互斥锁】成功，根据 id 查询数据库
            user = getById(id);
            // 不存在，设置空值
            if (user == null) {
                // 【缓存空对象】将空值写入 redis
                stringRedisTemplate.opsForValue().set(key,"",2,TimeUnit.MINUTES);
                return Result.fail("【数据库查询】该用户不存在！");
            }
            // 存在，写入缓存【超时剔除】
            stringRedisTemplate.opsForValue().set(key,JSONUtil.toJsonStr(user),30, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            // 【互斥锁】释放互斥锁
            unlock(lockKey);
        }
        // 返回用户信息
        return Result.ok(user, "【数据库查询】用户查询成功！");
    }

    private Result getUserByIdWithPassThrough(Long id) {
        String key = GET_USER_BY_ID + ":" + id;
        // 从 redis 查询用户缓存
        String userJson = stringRedisTemplate.opsForValue().get(key);
        // 判断是否存在
        if (StrUtil.isNotBlank(userJson)) {
            // 存在，直接返回
            User user = JSONUtil.toBean(userJson, User.class);
            return Result.ok(user, "【缓存】查询成功！");
        }
        // 判断是否为空值
        if (userJson != null) {
            // 返回错误信息
            return Result.fail("【空值】用户不存在！");
        }
        // 不存在，查询数据库
        User user = getById(id);
        if (user == null) {
            // 【缓存空对象】将空值写入 redis
            stringRedisTemplate.opsForValue().set(key,"",2,TimeUnit.MINUTES);
            return Result.fail("【数据库查询】该用户不存在！");
        }
        // 写入缓存【超时剔除】
        stringRedisTemplate.opsForValue().set(key,JSONUtil.toJsonStr(user),30, TimeUnit.MINUTES);
        // 返回用户信息
        return Result.ok(user, "查询成功！");
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

    private boolean tryLock(String key){
        Boolean flag = stringRedisTemplate.opsForValue().setIfAbsent(key, "1", 10, TimeUnit.SECONDS);
        // 涉及拆箱问题，当 flag 为 false 和 null 是都返回 false
        return BooleanUtil.isTrue(flag);
    }

    private void unlock(String key){
        stringRedisTemplate.delete(key);
    }
}
