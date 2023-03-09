package com.example.demo.service;

import com.example.demo.dao.UserDao;
import com.example.demo.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    public List<User> selectAll(){
        return userDao.selectAll();
    }

    public int insertUser(User user){
        return userDao.insertUser(user);
    }

    public int deleteUser(String name){
        return userDao.deleteUser(name);
    }
}
