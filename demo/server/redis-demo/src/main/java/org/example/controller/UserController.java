package org.example.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.dto.Result;
import org.example.entity.User;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserService userService;

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
