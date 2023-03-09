package com.example.demo.controller;

import com.example.demo.pojo.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class UserController {
    @Autowired
    private UserService userService;
    @RequestMapping("/selectUser")
    @ResponseBody
    public List<User> selectAll(){
        return userService.selectAll();
    }

    @RequestMapping("/insertUser")
    @ResponseBody
    public String selectAll(String name,String username,String password,String phone){
        User user = new User(name,username,password,phone);
        System.out.println(user);
        return userService.insertUser(user)>=1?"添加成功！":"添加失败";
    }

    @RequestMapping("/deleteUser")
    @ResponseBody
    public String deleteAll( String name){
        System.out.println(name);
        return userService.deleteUser(name)>=1?"删除成功！":"删除失败";
    }
}
