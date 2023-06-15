package org.example.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String nickName;
    private String phone;
    private String email;
    private String icon;
}
