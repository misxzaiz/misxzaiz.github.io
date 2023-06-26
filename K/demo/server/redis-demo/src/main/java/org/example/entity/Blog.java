package org.example.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

@Data
@TableName("tb_blog")
public class Blog {
    private Long id;
    private Long shopId;
    private Long userId;
    private String title;
    private String images;
    private String content;
    private Integer liked;
    private Integer comments;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8") // GMT+8 指定为东八区
    private Data createTime;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8") // GMT+8 指定为东八区
    private Data updateTime;
}
