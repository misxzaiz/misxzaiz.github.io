package org.example.config;

import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RedisConfig {

    @Bean
    public RedissonClient redissonClient(){
        // 配置类
        Config config = new Config();
        // 添加 Redis 地址，这里添加了单点的地址，也可以使用 config.useClusterServers() 添加集群地址
        config.useSingleServer().setAddress("redis://127.0.0.1:6379").setPassword("1234");
        // 创建客户端
        return Redisson.create(config);
    }

//    @Bean
//    public RedissonClient redissonClient1(){
//        // 配置类
//        Config config = new Config();
//        // 添加 Redis 地址，这里添加了单点的地址，也可以使用 config.useClusterServers() 添加集群地址
//        config.useSingleServer().setAddress("redis://127.0.0.1:6380");
//        // 创建客户端
//        return Redisson.create(config);
//    }
//
//    @Bean
//    public RedissonClient redissonClient2(){
//        // 配置类
//        Config config = new Config();
//        // 添加 Redis 地址，这里添加了单点的地址，也可以使用 config.useClusterServers() 添加集群地址
//        config.useSingleServer().setAddress("redis://127.0.0.1:6381").setPassword("1234");
//        // 创建客户端
//        return Redisson.create(config);
//    }
}
