package org.example.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.example.entity.BlogComment;
import org.mapstruct.Mapper;

@Mapper
public interface BlogCommentMapper extends BaseMapper<BlogComment> {
}
