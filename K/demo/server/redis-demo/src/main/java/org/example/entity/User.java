package org.example.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName("tb_user")
public class User {
    private Long id;
    private String phone;
    private String email;
    private String password;
    private String nickName;
    private String icon;
    private Date createTime;
    private Date updateTime;
}
