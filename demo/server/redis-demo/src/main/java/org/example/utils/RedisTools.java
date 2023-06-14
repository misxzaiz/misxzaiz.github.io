package org.example.utils;

import cn.hutool.core.util.BooleanUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.RedisData;
import org.example.dto.Result;
import org.example.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

import static org.example.utils.RedisUtils.GET_USER_BY_ID;
import static org.example.utils.RedisUtils.LOCK_GET_USER_BY_ID;

@Slf4j
@Component
public class RedisTools {

    private final StringRedisTemplate stringRedisTemplate;

    public RedisTools(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

    public void set(String key, Object value, Long time, TimeUnit unit){
        stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(value),time,unit);
    }

    public void setLocalExpire(String key,Object value, Long time, TimeUnit unit){
        // 设置逻辑过期
        RedisData redisData = new RedisData();
        redisData.setData(value);
        redisData.setExpireTime(LocalDateTime.now().plusSeconds(unit.toSeconds(time)));
        // 写入 redis
        stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(redisData));
    }

    public <R, ID> R getWithPassThrough(ID id, String keyPrefix,
                                        Class<R> type,
                                        Function<ID, R> dbFallBack,
                                        Long time, TimeUnit unit){
        String key = keyPrefix + id;
        // 查询缓存
        String json = stringRedisTemplate.opsForValue().get(key);
        // 判断是否存在
        if (StrUtil.isNotBlank(json)) {
            // 存在，直接返回
            return JSONUtil.toBean(json,type);
        }
        // 不存在
        if (json != null){
            return null;
        }
        // 查询数据库【怎么查，不知道，返回给调用者】
        R r = dbFallBack.apply(id);
        // 检查
        if (r == null) {
            // 空值，将空值存入
            stringRedisTemplate.opsForValue().set(key,"",2,TimeUnit.MINUTES);
            return null;
        }
        // 存在，写入 redis
        this.set(key,r,time,unit);
        return r;
    }

    private static final ExecutorService CACHE_REBUILD_EXECUTOR = Executors.newFixedThreadPool(10);

    private boolean tryLock(String key){
        Boolean flag = stringRedisTemplate.opsForValue().setIfAbsent(key, "", 10, TimeUnit.SECONDS);
        // 涉及拆箱问题，当 flag 为 false 和 null 是都返回 false
        log.info("【tryLock】{}", BooleanUtil.isTrue(flag));
        return BooleanUtil.isTrue(flag);
    }

    private void unlock(String key){
        stringRedisTemplate.delete(key);
    }

    public <R, ID> R getWithLocalExpire(ID id, String keyPrefix,
                                         Class<R> type,
                                         Function<ID, R> dbFallBack,
                                         Long time, TimeUnit unit) {
        String key = keyPrefix + id;
        String lockKey = keyPrefix + "lock:" + id;
        // 从缓存查询商铺缓存
        String userJson = stringRedisTemplate.opsForValue().get(key);
        // 判断是否存在
        if (StrUtil.isBlank(userJson)) {
            return null;
        }
        // 存在，判断是否过期
        RedisData userRedisData = JSONUtil.toBean(userJson,RedisData.class);
        JSONObject data = (JSONObject) userRedisData.getData();
        R r = JSONUtil.toBean(data, type);
        // 判断是否过期
        LocalDateTime expireTime = userRedisData.getExpireTime();
        if (expireTime.isAfter(LocalDateTime.now())) {
            // 未过期，直接返回店铺信息
            return r;
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
                    // 查询数据库
                    R apply = dbFallBack.apply(id);
                    // 写入 redis
                    this.setLocalExpire(key,apply,time,unit);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                } finally {
                    // 释放锁
                    unlock(lockKey);
                }
            });
        }
        // 返回旧数据
        return r;
    }
}
