package org.example;

import org.example.service.UserService;
import org.example.utils.RedisIDWorker;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

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

    @Autowired
    private RedisIDWorker redisIDWorker;

    private ExecutorService es = Executors.newFixedThreadPool(500);
    @Test
    public void testRedisIDWorker() throws InterruptedException {
        int taskCount = 300;
        CountDownLatch latch = new CountDownLatch(taskCount);
        Runnable task = () -> {
            for (int i = 0; i < 100; i++) {
                System.out.println(redisIDWorker.nextId("redis:user:"));

            }
            latch.countDown();
        };
        for (int i = 0; i < 300; i++) {
            es.submit(task);
        }
        latch.await();
    }
}
