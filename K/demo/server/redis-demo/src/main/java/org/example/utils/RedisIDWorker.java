package org.example.utils;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

/**
 * Redis 全局唯一 id 生成器
 */
@Component
public class RedisIDWorker {

    /**
     * 开始时间戳 2022年1月1日 0时0分0秒
     */
    private static final long BEGIN_TIMESTAMP = 1640995200;
    /**
     * 序列号的位数
     */
    private static final int COUNT_BITS = 32;
    private StringRedisTemplate stringRedisTemplate;

    public RedisIDWorker(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

    public long nextId(String keyPrefix) {
        // 生成时间戳
        LocalDateTime now = LocalDateTime.now();
        long nowSecond = now.toEpochSecond(ZoneOffset.UTC);
        long timeStamp = nowSecond - BEGIN_TIMESTAMP;
        // 生成序列号
        // 获取当前日期
        String date = now.format(DateTimeFormatter.ofPattern("yyyy:MM:dd"));
        long count = stringRedisTemplate.opsForValue().increment("icr:" + keyPrefix + date);
        // 拼接时间戳和序列号
        return timeStamp << COUNT_BITS | count;
    }

    /**
     * 2022年1月1日 0:0:0 的时间戳
     * @param args
     */
//    public static void main(String[] args) {
//        LocalDateTime time = LocalDateTime.of(2022, 1, 1, 0, 0, 0);
//        long epochSecond = time.toEpochSecond(ZoneOffset.UTC);
//        System.out.println(epochSecond); // 1640995200
//    }
}
