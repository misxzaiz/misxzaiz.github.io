package org.example.service;

import com.baomidou.mybatisplus.extension.service.IService;
import org.example.dto.FileDto;
import org.example.dto.Result;
import org.example.entity.File;

public interface FileService extends IService<File> {
    void saveFile(FileDto fileDto);

    FileDto findByKey(String md5Key);

    Result uploadFile(FileDto fileDto) throws Exception;
}
