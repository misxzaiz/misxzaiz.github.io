package org.example.controller;

import cn.hutool.core.util.StrUtil;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.LoginForm;
import org.example.dto.Result;
import org.example.dto.UserDto;
import org.example.entity.User;
import org.example.service.UserService;
import org.example.utils.UserHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import static org.example.utils.RedisUtils.GET_USER_BY_ID;
import static org.example.utils.RedisUtils.LOGIN_USER_KEY;

@Slf4j
@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @GetMapping("/{id}")
    public Result getUserByIdWithRedisLocalExpire(@PathVariable Long id){
        return userService.getUserByIdWithRedisLocalExpire(id,GET_USER_BY_ID,
                10L, TimeUnit.SECONDS);
    }

    @GetMapping
    public Result getUserList(){
        return Result.ok(userService.list(),"用户列表！");
    }

    @GetMapping("/test/login/intercept")
    public Result testLoginIntercept(){
        // 在线程中获取用户信息
        UserDto user = UserHolder.getUser();
        log.info("【测试登录拦截】user：{}",user);
        return Result.ok(user,"登录成功！");
    }


    /**
     * 通过手机号和验证码登录
     * @param form
     * @return
     */
    @PostMapping("/login/phone/code")
    public Result loginWithPhoneByCode(@RequestBody LoginForm form){
        log.info("【登录】phone：{}\tcode：{}",form.getPhone(),form.getCode());
        return userService.loginWithPhoneByCode(form);
    }

    /**
     * 通过手机获取验证码
     * @param phone
     * @return
     */
    @GetMapping("/code/phone/{phone}")
    public Result getCodeByPhone(@PathVariable String phone){
        log.info("【验证码】phone：{}",phone);
        return userService.getCodeByPhone(phone);
    }

    @GetMapping("/logout")
    public Result logout(HttpServletRequest request){
        return userService.logout(request);
    }


}
