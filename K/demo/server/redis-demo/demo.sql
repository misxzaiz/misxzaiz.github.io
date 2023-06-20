DROP TABLE IF EXISTS tb_user;
CREATE TABLE tb_user  (
    id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
    phone varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '手机号码',
    email varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '邮箱',
    password varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '密码，加密存储',
    nick_name varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '昵称，默认是用户id',
    icon varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '人物头像',
    create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id) USING BTREE,
    UNIQUE (phone),
    UNIQUE (email)
) ENGINE = InnoDB AUTO_INCREMENT = 1010 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

DROP TABLE IF EXISTS tb_file;
CREATE TABLE `tb_file` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `path` varchar(100) NOT NULL COMMENT '相对路径',
  `name` varchar(100) DEFAULT NULL COMMENT '文件名',
  `primitive_name` varchar(100) DEFAULT NULL COMMENT '文件原名',
  `suffix` varchar(10) DEFAULT NULL COMMENT '后缀',
  `size` bigint(20) DEFAULT NULL COMMENT '大小|字节B',
  `file_use` char(1) DEFAULT NULL COMMENT '用途',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `shard_index` int(11) DEFAULT NULL COMMENT '已上传分片',
  `shard_size` int(11) DEFAULT NULL COMMENT '分片大小|B',
  `shard_total` int(11) DEFAULT NULL COMMENT '分片总数',
  `md5_key` varchar(32) DEFAULT NULL COMMENT '文件标识',
  PRIMARY KEY (`id`),
  UNIQUE KEY `path_unique` (`path`),
  UNIQUE KEY `key_unique` (`md5_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文件';