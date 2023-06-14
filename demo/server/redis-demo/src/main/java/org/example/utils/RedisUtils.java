package org.example.utils;

public class RedisUtils {
    public static final String GET_USER_BY_ID = "redis:user:id:";
    public static final String LOCK_GET_USER_BY_ID = "redis:lockUser:id:";

    /**
     * 登录使用：手机验证码
     */
    public static final String LOGIN_PHONE_CODE = "misxzaiz:login:phone:code:";

    /**
     * 保存用户登录信息
     */
    public static final String LOGIN_USER_KEY = "misxzaiz:user:";
}
