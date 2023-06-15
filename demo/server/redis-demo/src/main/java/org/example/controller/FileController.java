package org.example.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.dto.FileDto;
import org.example.dto.Result;

import org.example.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/file")
public class FileController {


    @Autowired
    private FileService fileService;

    /**
     * 根据前端生成的MD5标识查询文件
     */
    @GetMapping("/check/{md5Key}")
    public Result check(@PathVariable String md5Key) throws Exception {
        log.info("【文件上传】检查上传分片开始：{}", md5Key);
        FileDto fileDto = fileService.findByKey(md5Key);
        if (fileDto == null) {
            return Result.fail("不存在该文件！");
        }
        return Result.ok(fileDto,"该文件已存在！");
    }

    /**
     * 分片上传
     */
    @PostMapping("/upload")
    public Result upload(@RequestBody FileDto fileDto) throws Exception {
        return fileService.uploadFile(fileDto);
    }

}
