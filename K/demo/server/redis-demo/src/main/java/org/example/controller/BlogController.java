package org.example.controller;

import cn.hutool.core.bean.BeanUtil;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.BlogForm;
import org.example.dto.Result;
import org.example.entity.Blog;
import org.example.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/blog")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping("/list")
    public Result getBlogList(){
        return Result.ok(blogService.list(),"获取成功！");
    }

    @GetMapping("/like/{id}")
    public Result setBlogList(@PathVariable Long id){
        boolean update = blogService.update().setSql("liked = liked + 1").eq("id", id).update();
        return Result.ok("点赞成功！");
    }

    @PostMapping()
    public Result getBlogList(@RequestBody BlogForm blogForm){
        log.info("【blog】{}",blogForm);
        Blog blog = BeanUtil.copyProperties(blogForm, Blog.class);
        blog.setShopId(1L);
        blog.setUserId(1668974388598951937L);
        blogService.save(blog);
        return Result.ok("发送成功！");
    }
}
