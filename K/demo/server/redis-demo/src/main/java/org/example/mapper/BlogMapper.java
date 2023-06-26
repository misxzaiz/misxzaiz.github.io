package org.example.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.example.entity.Blog;
import org.mapstruct.Mapper;

@Mapper
public interface BlogMapper extends BaseMapper<Blog> {
}
