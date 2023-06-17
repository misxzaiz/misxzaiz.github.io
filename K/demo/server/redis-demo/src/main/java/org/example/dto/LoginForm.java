package org.example.dto;

import lombok.Data;

@Data
public class LoginForm {
    private String phone;
    private String email;
    private String code;
    private String password;
}
