package org.example.entity;

import lombok.Data;

@Data
public class User {
    private Long id;
    private String username;
    private String password;
    private String phone;
    private String email;
    private String image;
    private String role;
    private String status;
    private Long balance;
}
