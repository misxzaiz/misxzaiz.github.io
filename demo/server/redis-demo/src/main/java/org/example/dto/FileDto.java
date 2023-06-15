package org.example.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class FileDto {

    private Long id;
    private String path;
    private String name;
    private String primitiveName;
    private String suffix;
    private Integer size;
    private String fileUse;
    private Integer shardIndex;
    //   base64 字符串
    private String  shard;
    private Integer shardSize;
    private Integer shardTotal;
    private String md5Key;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date createTime;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date updateTime;

}
