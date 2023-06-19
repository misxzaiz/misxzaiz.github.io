package org.example.rabbitMq;

import cn.hutool.json.JSONUtil;
import org.example.demo.RabbitMQ.chat.dto.MessageDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ChatTest {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    public void sendMessage(){
        // 交换机名称
        String exchangeName = "xiaozaiz.direct";
        MessageDto messageDto = new MessageDto();
        messageDto.setSendUserId(1L);
        messageDto.setReceiveUserId(2L);
        messageDto.setMessage("你好，2号！");
        String jsonStr = JSONUtil.toJsonStr(messageDto);
        System.out.println(jsonStr);
        rabbitTemplate.convertAndSend("xiaozaiz.topic", "chat.user.1234",jsonStr);
    }

}
