package org.example.config;

import org.example.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 拦截器
//        registry.addInterceptor(new LoginInterceptor(stringRedisTemplate))
//                .excludePathPatterns(
//                        "/user/code/**",
//                        "/user/login/**"
//                )
//                .addPathPatterns("/**").order(0);
    }
}
