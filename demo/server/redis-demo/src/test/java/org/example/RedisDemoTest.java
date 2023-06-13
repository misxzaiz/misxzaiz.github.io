package org.example;

import org.example.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.StringRedisTemplate;

@SpringBootTest
public class RedisDemoTest {
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Autowired
    private UserService userService;

    @Test
    public void test(){
        System.out.println("test");
        stringRedisTemplate.opsForValue().set("redis:demo:1","1");
        System.out.println(stringRedisTemplate.opsForValue().get("redis:demo:1"));
        stringRedisTemplate.opsForHash().put("redis:hashtest:1","1","1");
    }

    @Test
    public void testMysql(){
        System.out.println(userService.getById(1));
    }
}
