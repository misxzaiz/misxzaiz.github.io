-- 1. 参数
-- 1.1 优惠卷 id
local voucherId = ARGV[1]
-- 1.2 用户 id
local userId = ARGV[2]

-- 2. 数据
-- 2.1 库存 key
local stockKey = 'misxzaiz:voucher:stock:' .. voucherId
-- 2.2 订单 key
local orderKey = 'misxzaiz:voucher:order:' .. voucherId

-- 3. 脚本业务
-- 3.1 判断库存是否充足 get stockKey
if(tonumber(redis.call('get',stockKey)) <= 0) then
    -- 3.2 库存不足，返回 1
    return 1
end
-- 3.3 判断用户是否下单
if(redis.call('sismember',orderKey,userId) == 1) then
    -- 3.4 存在，说明是重复下单，返回 2
    return 2
end
-- 3.5 扣减库存 incrby stockKey - 1
redis.call('incrby', stockKey, -1)
-- 3.6 下单（保存用户）sadd orderKey userId
redis.call('sadd', orderKey, userId)
-- 返回 0 表示成功
return 0