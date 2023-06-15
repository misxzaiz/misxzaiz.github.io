package org.example.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.dto.LoginForm;
import org.example.dto.Result;
import org.example.dto.UserDto;
import org.example.entity.User;
import org.example.service.UserService;
import org.example.utils.UserHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserService userService;



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

    @GetMapping
    public Result getUsers(){
        return userService.listAllUser();
    }

    @GetMapping("{id}")
    public Result getUserById(@PathVariable Long id){
        return userService.getUserById(id);
    }

    @PostMapping()
    public Result updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }
}
