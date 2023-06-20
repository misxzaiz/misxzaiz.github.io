package org.example.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.bean.copier.CopyOptions;
import cn.hutool.core.util.RandomUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.LoginForm;
import org.example.dto.Result;
import org.example.dto.UserDto;
import org.example.entity.User;
import org.example.mapper.UserMapper;
import org.example.service.UserService;
import org.example.utils.RedisIDWorker;
import org.example.utils.RedisTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import static org.example.utils.RedisUtils.*;

@Slf4j
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Resource
    private RedisTools redisTools;

    private void unlock(String key){
        stringRedisTemplate.delete(key);
    }


    /**
     * 通过手机号获取验证码
     * @param phone
     * @return
     */
    @Override
    public Result getCodeByPhone(String phone) {
        // TODO 校验手机号
        if(phone.length()!=11){
            return Result.fail("手机号格式错误！");
        }
        // 生成随机验证码
        String code = RandomUtil.randomNumbers(6);
        // 保存验证码到 redis 中，超时剔除
        stringRedisTemplate.opsForValue().set(LOGIN_PHONE_CODE+phone,code,1,TimeUnit.MINUTES);
        // TODO 发送验证码
        log.info("【验证码登录】{} 的验证码为：{}",phone,code);

        // 测试使用
        return Result.ok(code,"验证码获取成功！");
        // return Result.ok("验证码获取成功！");
    }

    /**
     * 通过手机号和验证码登录
     * @param form
     * @return
     */
    @Override
    public Result loginWithPhoneByCode(LoginForm form) {
        String phone = form.getPhone();
        String code = form.getCode();
        // TODO 校验手机号
        if(phone.length()!=11){
            return Result.fail("手机号格式错误！");
        }
        // 从 redis 中获取验证码并校验
        String cacheCode = stringRedisTemplate.opsForValue().get(LOGIN_PHONE_CODE + phone);
        if (cacheCode == null || !cacheCode.equals(code)) {
            // 验证码错误
            return Result.fail("验证码错误！");
        }
        // 根据手机号查询用户
        User user = query().eq("phone", phone).one();
        // 判断用户是否存在
        if (user == null) {
            // 不存在，注册，创建一个用户
            user = createUserWithPhone(phone);
        }
        // 保存用户信息到 redis
        // 随机生成 token 作为登录令牌
        // 使用 redis 全局唯一 id 作为 token
        String token = UUID.randomUUID().toString();
        // 将 user 对象转换为 HashMap 存在
        UserDto userDto = BeanUtil.copyProperties(user, UserDto.class);
        Map<String, Object> userMap = BeanUtil.beanToMap(userDto, new HashMap<>(),
                CopyOptions.create()
                        .setIgnoreNullValue(true)
                        .setFieldValueEditor((fieldName, fieldValue) ->
                                fieldValue == null ? "" : fieldValue.toString()));
        // 存储
        String tokenKey = LOGIN_USER_KEY+token;
        stringRedisTemplate.opsForHash().putAll(tokenKey,userMap);
        // 设置 token 有效期
        stringRedisTemplate.expire(tokenKey,7,TimeUnit.DAYS);
        // 返回 token
        return Result.ok(token,"登录成功！");
    }


    /**
     * 根据手机号创建用户
     * @param phone
     * @return
     */
    private User createUserWithPhone(String phone) {
        User user = new User();
        user.setPhone(phone);
        user.setNickName("用户"+RandomUtil.randomNumbers(6));
        save(user);
        return user;
    }

    @Override
    public Result getUserByIdWithRedisLocalExpire(Long id, String keyPrefix, Long time, TimeUnit unit) {
        Result result = redisTools.testGetWithLocalExpire(id, keyPrefix,
                User.class,
                this::getById,
                time, unit);
        if (result.getData() != null) {
            User user = (User) result.getData();
            UserDto userDto = BeanUtil.copyProperties(user, UserDto.class);
            result.setData(userDto);
        }

        return result;
    }

    /**
     * 注销登录，删除token缓存
     * @param request
     * @return
     */
    @Override
    public Result logout(HttpServletRequest request) {
        // 获取请求头中的token
        String token = request.getHeader("Authorization");

        if (token == null || token.trim().length() == 0) {
            return Result.fail("token不能为空！");
        }

        // 基于TOKEN删除redis中的用户
        String key = LOGIN_USER_KEY + token;
        try {
            Boolean result = stringRedisTemplate.delete(key);
            if (result == null || !result) {
                return Result.fail("redis删除失败！");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Result.fail("redis操作异常！");
        }

        return Result.ok("注销成功！");
    }


}
