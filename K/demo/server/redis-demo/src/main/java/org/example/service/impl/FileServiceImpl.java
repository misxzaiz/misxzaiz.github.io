package org.example.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.lang.UUID;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.example.entity.File;
import org.example.dto.FileDto;
import org.example.mapper.FileMapper;
import org.example.service.FileService;
import org.example.dto.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileOutputStream;
import java.util.Base64;

@Slf4j
@Service
public class FileServiceImpl extends ServiceImpl<FileMapper, File> implements FileService {

    @Value("${file.path}")
    private String FILE_PATH;

    @Value("${file.domain}")
    private String FILE_DOMAIN;

    @Override
    public void saveFile(FileDto fileDto) {
        File file = BeanUtil.copyProperties(fileDto,File.class);
        // 根据key值去数据库查询File
        File fileDb = selectByKey(fileDto.getMd5Key());
        // 判断是新增 还是修改
        if (fileDb == null) {
            save(file);
        } else {
            // 如果是更新的话 先更改文件的ShardIndex属性 在update
            fileDb.setShardIndex(fileDto.getShardIndex());
            updateById(file);
        }
    }

    private File selectByKey(String md5Key){
        return query().eq("md5_key", md5Key).one();
    }

    @Override
    public FileDto findByKey(String md5Key) {
        File file = selectByKey(md5Key);
        if (file == null) {
            return null;
        }
        return BeanUtil.copyProperties(file,FileDto.class);
    }

    @Override
    @Transactional
    public Result uploadFile(FileDto fileDto) throws Exception {
        // 检查数据库中是否存在该文件的信息
        FileDto fileDtoDatabase = findByKey(fileDto.getMd5Key());
        String fileName = null;
        // 数据库中不存在文件信息
        if (fileDtoDatabase == null) {
            // 生成随机存储文件名
            fileName = UUID.randomUUID().toString() + "." + fileDto.getSuffix();
            fileDto.setPrimitiveName(fileDto.getName());
            fileDto.setName(fileName);
            fileDto.setPath(FILE_DOMAIN + fileName);
            File file = BeanUtil.copyProperties(fileDto, File.class);
            save(file);
            Long fileId = file.getId(); // 获取回传id
            fileDto.setId(fileId);
        }
        // 测试使用，返回时间
        fileDto.setUpdateTime(null);
        // 检查分片
        Integer index = fileDto.getShardIndex();
        if (fileDto.getShardTotal() >= index) {

            saveFile(fileDto);
            fileDto.setShardIndex(++index);
            merge(fileDto);
        }
        // 测试使用，待完善
        fileDtoDatabase = findByKey(fileDto.getMd5Key());
        fileDto.setCreateTime(fileDtoDatabase.getCreateTime());
        fileDto.setUpdateTime(fileDtoDatabase.getUpdateTime());

        return Result.ok(fileDto, "文件上传！");
    }

    // 合并分片
    private void merge(FileDto fileDto) throws Exception {
        log.info("合并分片开始");
        // 文件存储的位置
        String fileUploadPath = FILE_PATH;
        // 文件名
        String fileName = fileDto.getName();
        // 文件二进制，包含前缀 data:application/octet-stream;base64,
        String shard = fileDto.getShard();

        // 将二进制数据解码为字节数组
        byte[] content = Base64.getDecoder().decode(shard.split(",")[1]);

        // 将分片写入本地磁盘
        // 创建文件夹
        java.io.File file = new java.io.File(fileUploadPath, fileName);
        if (!file.getParentFile().exists()) {
            boolean success = file.getParentFile().mkdirs(); // 创建目录和文件
            if (!success) {
                throw new RuntimeException("Failed to create directory: " + file.getAbsolutePath());
            }
        }

        // 使用 try-with-resources 语句，确保 FileOutputStream 对象自动关闭
        try (FileOutputStream fos = new FileOutputStream(file, true)) {
            fos.write(content);
            fos.flush();
        }
    }

}
