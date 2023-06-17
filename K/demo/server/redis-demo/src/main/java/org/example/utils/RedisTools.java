package org.example.utils;

import cn.hutool.core.util.BooleanUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.RedisData;
import org.example.dto.Result;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;


@Slf4j
@Component
public class RedisTools {

    private final StringRedisTemplate stringRedisTemplate;

    public RedisTools(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

    /**
     * 向 redis 中写入数据，并添加过期时间
     */
    public void set(String key, Object value, Long time, TimeUnit unit){
        stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(value),time,unit);
    }

    /**
     * 向 redis 中写入数据，并添加【逻辑】过期时间
     */
    public void setLocalExpire(String key,Object value, Long time, TimeUnit unit){
        // 设置逻辑过期
        RedisData redisData = new RedisData();
        redisData.setData(value);
        redisData.setExpireTime(LocalDateTime.now().plusSeconds(unit.toSeconds(time)));
        // 写入 redis
        stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(redisData));
    }

    private static final ExecutorService CACHE_REBUILD_EXECUTOR = Executors.newFixedThreadPool(10);

    private boolean tryLock(String key){
        Boolean flag = stringRedisTemplate.opsForValue().setIfAbsent(key, "", 10, TimeUnit.SECONDS);
        // 涉及拆箱问题，当 flag 为 false 和 null 是都返回 false
        return BooleanUtil.isTrue(flag);
    }

    private void unlock(String key){
        stringRedisTemplate.delete(key);
    }

    /**
     * 获取 redis 的值，解决缓存击穿问题，实现缓存重建
     */
    public <R, ID> R getWithLocalExpire(ID id, String keyPrefix,
                                        Class<R> type,
                                        Function<ID, R> dbFallBack,
                                        Long time, TimeUnit unit) {
        String key = keyPrefix + id;
        String lockKey = keyPrefix + "lock:" + id;
        // 从缓存查询商铺缓存
        String userJson = stringRedisTemplate.opsForValue().get(key);
        // 判断是否存在
        // 不存在则重建缓存
        if (userJson == null) {
            log.info("【缓存】缓存为空，等待缓存重建");
            // 查询数据库，如果不存在，就设置为空值
            rebuildCache(id, dbFallBack, time, unit, key, lockKey);
            return null;
        }
        // 判断是否存在缓存空对象
        if("".equals(userJson)){
            log.info("【缓存·空值】缓存和数据库都不存在该数据！");
            return null;
        }
        // 存在，获取数据
        RedisData userRedisData = JSONUtil.toBean(userJson,RedisData.class);
        JSONObject data = (JSONObject) userRedisData.getData();
        R r = JSONUtil.toBean(data, type);
        // 判断是否过期
        LocalDateTime expireTime = userRedisData.getExpireTime();
        if (expireTime.isAfter(LocalDateTime.now())) {
            // 未过期，直接返回店铺信息
            log.info("【缓存】成功获取缓存数据！");
            return r;
        }
        // 已过期
        // 缓存重建
        rebuildCache(id, dbFallBack, time, unit, key, lockKey);
        log.info("【缓存·过期】等待缓存重建！");
        // 返回旧数据
        return r;
    }

    /**
     * 缓存重建
     */
    private <R, ID> void rebuildCache(ID id, Function<ID, R> dbFallBack, Long time, TimeUnit unit, String key, String lockKey) {
        // 获取互斥锁
        boolean isLock = tryLock(lockKey);
        if (isLock) {
            // 成功，开启独立线程，实现缓存重建
            CACHE_REBUILD_EXECUTOR.submit(()->{
                try {
                    // 重建
                    // 查询数据库，如果查询失败，就设置空值
                    R apply = dbFallBack.apply(id);
                    if (apply == null) {
                        this.set(key,"",time,unit);
                    } else {
                        // 写入 redis
                        this.setLocalExpire(key,apply,time,unit);
                    }
                } catch (Exception e) {
                    throw new RuntimeException(e);
                } finally {
                    // 释放锁
                    unlock(lockKey);
                }
            });
        }
    }

    public <R, ID> Result testGetWithLocalExpire(ID id, String keyPrefix,
                                                 Class<R> type,
                                                 Function<ID, R> dbFallBack,
                                                 Long time, TimeUnit unit) {
        String key = keyPrefix + id;
        String lockKey = keyPrefix + "lock:" + id;
        // 从缓存查询商铺缓存
        String userJson = stringRedisTemplate.opsForValue().get(key);
        // 判断是否存在
        // 不存在则重建缓存
        if (userJson == null) {
            log.info("【缓存】缓存为空，等待缓存重建");
            // 查询数据库，如果不存在，就设置为空值
            rebuildCache(id, dbFallBack, time, unit, key, lockKey);
            return Result.fail("【缓存】缓存为空，等待缓存重建！","【缓存】缓存为空，等待缓存重建！");
        }
        // 判断是否存在缓存空对象
        if("".equals(userJson)){
            log.info("【缓存·空值】缓存和数据库都不存在该数据！");
            return Result.fail("【缓存·空值】缓存和数据库都不存在该数据！","【缓存·空值】缓存和数据库都不存在该数据！");
        }
        // 存在，获取数据
        RedisData userRedisData = JSONUtil.toBean(userJson,RedisData.class);
        JSONObject data = (JSONObject) userRedisData.getData();
        R r = JSONUtil.toBean(data, type);
        // 判断是否过期
        LocalDateTime expireTime = userRedisData.getExpireTime();
        if (expireTime.isAfter(LocalDateTime.now())) {
            // 未过期，直接返回店铺信息
            log.info("【缓存】成功获取缓存数据！");
            return Result.ok(r,"【缓存】成功获取缓存数据！");
        }
        // 已过期
        // 缓存重建
        rebuildCache(id, dbFallBack, time, unit, key, lockKey);
        log.info("【缓存·过期】等待缓存重建！");
        // 返回旧数据
        return Result.fail(r,"【缓存·过期】等待缓存重建！","【缓存·过期】等待缓存重建！");
    }
}
