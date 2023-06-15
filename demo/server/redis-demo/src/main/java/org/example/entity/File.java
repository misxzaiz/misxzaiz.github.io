package org.example.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
@TableName("tb_file")
public class File {
    private Long id;
    private String path;
    private String name;
    private String primitiveName;
    private String suffix;
    private Integer size;
    private Character fileUse;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date createTime;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date updateTime;
    private Integer shardIndex;
    private Integer shardSize;
    private Integer shardTotal;
    private String md5Key;
}
