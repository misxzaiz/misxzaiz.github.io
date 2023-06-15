package org.example.controller;

import cn.hutool.crypto.SecureUtil;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.FileDto;
import org.example.dto.Result;

import org.example.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/file")
public class FileController {


    @Autowired
    private FileService fileService;

    @PostMapping("/md5")
    public Result getFileMd5(@RequestBody Map<String, Object> params) {
        String fileForm = (String)params.get("fileForm");
        log.info("【获取MD5】{}",fileForm);
        String md5 = SecureUtil.md5(fileForm);
        return Result.ok(md5,"获取md5成功！");
    }

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
        log.info("【分片上传】fileDto:{}",fileDto.getName());
        try {
            // 处理上传文件的逻辑...
            return fileService.uploadFile(fileDto);
        } catch (Exception e) {
            log.error("文件上传失败！", e);
            return Result.fail("文件上传失败：" + e.getMessage());
        }
    }

}
