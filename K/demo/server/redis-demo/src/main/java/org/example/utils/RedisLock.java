package org.example.utils;

import cn.hutool.core.lang.UUID;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;


import java.util.Collections;
import java.util.concurrent.TimeUnit;

public class RedisLock {

    private final String keyName;
    private static final String KEY_PREFIX = "misxzaiz:lock:";
    private static final String ID_PREFIX = UUID.randomUUID().toString(true) + "-";
    private final StringRedisTemplate stringRedisTemplate;

    // lua 脚本
    private static final DefaultRedisScript<Long> UNLOCK_SCRIPT;
    static {
        UNLOCK_SCRIPT = new DefaultRedisScript<>();
        UNLOCK_SCRIPT.setLocation(new ClassPathResource("unlock.lua"));
        UNLOCK_SCRIPT.setResultType(Long.class);
    }

    public RedisLock(String keyName, StringRedisTemplate stringRedisTemplate) {
        this.keyName = keyName;
        this.stringRedisTemplate = stringRedisTemplate;
    }

    public boolean tryLock(long timeOutSec){
        String key = KEY_PREFIX + keyName;
        String threadId = ID_PREFIX + Thread.currentThread().getId();
        Boolean success = stringRedisTemplate.opsForValue().setIfAbsent(key, threadId, timeOutSec, TimeUnit.SECONDS);
        return Boolean.TRUE.equals(success);
    }

    public void unlock(){
        // 调用 Lua 脚本
        stringRedisTemplate.execute(
                UNLOCK_SCRIPT,
                Collections.singletonList(KEY_PREFIX + keyName),
                ID_PREFIX + Thread.currentThread().getId());
    }
}
