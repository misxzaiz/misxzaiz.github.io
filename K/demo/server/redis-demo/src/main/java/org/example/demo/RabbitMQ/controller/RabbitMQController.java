package org.example.demo.RabbitMQ.controller;

import cn.hutool.json.JSONUtil;
import org.example.demo.RabbitMQ.chat.dto.MessageDto;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("rabbit")
public class RabbitMQController {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @GetMapping("send/{message}")
    public void sendMessage(@PathVariable String message){
        Long sendUserId = 1L;
        Long receiveUserId = 2L;
        // 交换机名称
        String exchangeName = "xiaozaiz.topic";
        String key = "chat.user."+"2";
        MessageDto messageDto = new MessageDto();
        messageDto.setSendUserId(sendUserId);
        messageDto.setReceiveUserId(receiveUserId);
        messageDto.setMessage(message);
        String jsonStr = JSONUtil.toJsonStr(messageDto);
        System.out.println(jsonStr);
        System.out.println(key);
        rabbitTemplate.convertAndSend(exchangeName, key, jsonStr);
    }

    @GetMapping("receive")
    public String receiveMessage() {
        Message receive = rabbitTemplate.receive("topic.queue1");
        if (receive == null) {
            return "No message available";
        }
        String message = new String(receive.getBody());
        System.out.println("消费者接收到 topic.queue1 的消息：" + message);
        return message;
    }

}
