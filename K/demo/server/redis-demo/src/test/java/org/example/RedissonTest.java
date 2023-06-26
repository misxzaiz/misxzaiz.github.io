package org.example;

import org.junit.jupiter.api.Test;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.concurrent.TimeUnit;

@SpringBootTest
public class RedissonTest {

    @Autowired
    private RedissonClient redissonClient;

    @Autowired
    private RedissonClient redissonClient1;

    @Autowired
    private RedissonClient redissonClient2;


    @Test
    public void test() throws InterruptedException {

        RLock myLock = redissonClient.getLock("myLock");
//        RLock myLock1 = redissonClient1.getLock("myLock");
//        RLock myLock2 = redissonClient2.getLock("myLock");
        // 创建联锁 multiLock
        RLock multiLock = redissonClient.getMultiLock(myLock);


    }

    @Test
    public void test1() throws InterruptedException {
        // 获取锁（可重入），并指定锁的名称
        RLock myLock = redissonClient.getLock("myLock");
        // 尝试获取锁，参数分别是：获取锁的最大等待实践（期间会重试），锁自动释放时间，时间单位
        boolean isLock = myLock.tryLock(1, 10, TimeUnit.SECONDS);
        // 判断是否获取成功
        if (isLock) {
            try {
                System.out.println("执行业务！");
            } finally {
                myLock.unlock();
            }
        }
    }
}
