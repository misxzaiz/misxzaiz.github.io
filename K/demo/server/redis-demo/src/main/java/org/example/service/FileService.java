package org.example.service;

import com.baomidou.mybatisplus.extension.service.IService;
import org.example.entity.File;
import org.example.dto.FileDto;
import org.example.dto.Result;

public interface FileService extends IService<File> {
    void saveFile(FileDto fileDto);

    FileDto findByKey(String md5Key);

    Result uploadFile(FileDto fileDto) throws Exception;
}
