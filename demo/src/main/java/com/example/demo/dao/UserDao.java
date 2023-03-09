package com.example.demo.dao;

import com.example.demo.pojo.User;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserDao {
    @Select("select * from user")
    List<User> selectAll();

    @Insert("insert into user (name,username,password,phone) values (#{name},#{username},#{password},#{phone})")
    int insertUser(User user);

    @Delete("delete from user where name = #{name}")
    int deleteUser(String name);
}
