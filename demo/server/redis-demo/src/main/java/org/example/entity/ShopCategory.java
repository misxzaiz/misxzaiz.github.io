package org.example.entity;

import lombok.Data;

import java.util.Date;

@Data
public class ShopCategory {
    private Integer id;
    private String name;
    private Integer parentId;
    private Date createdAt;
    private Date updatedAt;
}
