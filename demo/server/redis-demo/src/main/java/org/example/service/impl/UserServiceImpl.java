package org.example.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.bean.copier.CopyOptions;
import cn.hutool.core.util.BooleanUtil;
import cn.hutool.core.util.RandomUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.LoginForm;
import org.example.dto.RedisData;
import org.example.dto.Result;
import org.example.dto.UserDto;
import org.example.entity.User;
import org.example.mapper.UserMapper;
import org.example.service.UserService;
import org.example.utils.RedisTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import static org.example.utils.RedisUtils.*;

@Slf4j
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Resource
    private RedisTools redisTools;

    @Override
    public Result listAllUser() {
        log.info("【数据库查询】查询所有用户信息");
        return Result.ok(list(),"查询成功！");
    }

    @Override
    public Result getUserById(Long id) {
        // 缓存穿透
        // return getUserByIdWithPassThrough(id);
        // 互斥锁
        // return queryWithMutex(id);
        // 逻辑过期
        // saveUserToRedis(id,10L);
        // return queryWithLocalExpire(id);
        // 工具类
        // return redisUtilWithPassThrough(id);
        // 逻辑过期
        return redisLocalExpire(id);

    }

    private Result redisLocalExpire(Long id) {
        User user = redisTools.getWithLocalExpire(id, GET_USER_BY_ID,
                User.class,
                this::getById,
                2L, TimeUnit.MINUTES);
        return Result.ok(user,"查询完成");
    }

    private Result redisUtilWithPassThrough(Long id) {
        User user = redisTools.getWithPassThrough(id, GET_USER_BY_ID,
                User.class,
                this::getById,
                2L, TimeUnit.MINUTES);
        return Result.ok(user,"查询完成");
    }

    private boolean tryLock(String key){
        Boolean flag = stringRedisTemplate.opsForValue().setIfAbsent(key, "", 10, TimeUnit.SECONDS);
        // 涉及拆箱问题，当 flag 为 false 和 null 是都返回 false
        log.info("【tryLock】{}",BooleanUtil.isTrue(flag));
        return BooleanUtil.isTrue(flag);
    }

    private void unlock(String key){
        stringRedisTemplate.delete(key);
    }

    private static final ExecutorService CACHE_REBUILD_EXECUTOR = Executors.newFixedThreadPool(10);


    private Result queryWithLocalExpire(Long id) {
        String key = GET_USER_BY_ID + ":" + id;
        String lockKey = LOCK_GET_USER_BY_ID + ":" + id;
        // 从缓存查询商铺缓存
        String userJson = stringRedisTemplate.opsForValue().get(key);
        // 判断是否存在
        if (StrUtil.isBlank(userJson)) {
            return Result.fail("【缓存】缓存不存在！");
        }
        // 存在，判断是否过期
        RedisData userRedisData = JSONUtil.toBean(userJson,RedisData.class);
        JSONObject data = (JSONObject) userRedisData.getData();
        User user = JSONUtil.toBean(data, User.class);
        // 判断是否过期
        LocalDateTime expireTime = userRedisData.getExpireTime();
        if (expireTime.isAfter(LocalDateTime.now())) {
            // 未过期，直接返回店铺信息
            return Result.ok(user,"【缓存】缓存未过期！");
        }
        // 已过期
        // 缓存重建
        // 获取互斥锁
        boolean isLock = tryLock(lockKey);
        if (isLock) {
            // 成功，开启独立线程，实现缓存重建
            CACHE_REBUILD_EXECUTOR.submit(()->{
                try {
                    // 重建
                    this.saveUserToRedis(id,30L);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                } finally {
                    // 释放锁
                    unlock(lockKey);
                }
            });
        }
        // 返回旧数据
        return Result.ok(user,"【缓存】缓存以过期，返回旧数据");
    }


    private void saveUserToRedis(Long id,Long expireSeconds){
        log.info("【saveUserToRedis】");
        String key = GET_USER_BY_ID + ":" + id;
        // 查询店铺数据
        User user = getById(id);
        // 封装逻辑过期时间
        RedisData redisData = new RedisData();
        redisData.setData(user);
        redisData.setExpireTime(LocalDateTime.now().plusSeconds(expireSeconds));
        // 写入 redis
        stringRedisTemplate.opsForValue().set(key,JSONUtil.toJsonStr(redisData));
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
                return queryWithMutex(id);
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

    /**
     * 通过手机号获取验证码
     * @param phone
     * @return
     */
    @Override
    public Result getCodeByPhone(String phone) {
        // TODO 校验手机号
        if(phone.length()!=11){
            return Result.fail("手机号格式错误！");
        }
        // 生成随机验证码
        String code = RandomUtil.randomNumbers(6);
        // 保存验证码到 redis 中，超时剔除
        stringRedisTemplate.opsForValue().set(LOGIN_PHONE_CODE+phone,code,1,TimeUnit.MINUTES);
        // TODO 发送验证码
        log.info("【验证码登录】{} 的验证码为：{}",phone,code);
        return Result.ok("验证码获取成功！");
    }

    /**
     * 通过手机号和验证码登录
     * @param form
     * @return
     */
    @Override
    public Result loginWithPhoneByCode(LoginForm form) {
        String phone = form.getPhone();
        String code = form.getCode();
        // TODO 校验手机号
        if(phone.length()!=11){
            return Result.fail("手机号格式错误！");
        }
        // 从 redis 中获取验证码并校验
        String cacheCode = stringRedisTemplate.opsForValue().get(LOGIN_PHONE_CODE + phone);
        if (cacheCode == null || !cacheCode.equals(code)) {
            // 验证码错误
            return Result.fail("验证码错误！");
        }
        // 根据手机号查询用户
        User user = query().eq("phone", phone).one();
        // 判断用户是否存在
        if (user == null) {
            // 不存在，注册，创建一个用户
            user = createUserWithPhone(phone);
        }
        // 保存用户信息到 redis
        // 随机生成 token 作为登录令牌
        String token = UUID.randomUUID().toString();
        // 将 user 对象转换为 HashMap 存在
        UserDto userDto = BeanUtil.copyProperties(user, UserDto.class);
        Map<String, Object> userMap = BeanUtil.beanToMap(userDto, new HashMap<>(),
                CopyOptions.create()
                        .setIgnoreNullValue(true)
                        .setFieldValueEditor((fieldName, fieldValue) ->
                                fieldValue == null ? "" : fieldValue.toString()));
        // 存储
        String tokenKey = LOGIN_USER_KEY+token;
        stringRedisTemplate.opsForHash().putAll(tokenKey,userMap);
        // 设置 token 有效期
        stringRedisTemplate.expire(tokenKey,7,TimeUnit.DAYS);
        // 返回 token
        return Result.ok(token,"登录成功！");
    }

    /**
     * 根据手机号创建用户
     * @param phone
     * @return
     */
    private User createUserWithPhone(String phone) {
        User user = new User();
        user.setPhone(phone);
        user.setNickName("用户"+RandomUtil.randomNumbers(6));
        save(user);
        return user;
    }


}
