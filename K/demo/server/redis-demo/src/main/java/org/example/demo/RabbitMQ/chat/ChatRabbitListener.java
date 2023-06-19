package org.example.demo.RabbitMQ.chat;

import cn.hutool.json.JSONUtil;
import org.example.demo.RabbitMQ.chat.dto.MessageDto;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class ChatRabbitListener {
//    @RabbitListener(bindings = @QueueBinding(
//            value = @Queue(name = "topic.queue1"),
//            exchange = @Exchange(name = "xiaozaiz.topic", type = ExchangeTypes.TOPIC),
//            key = "chat.user.2"
//    ))
//    public void listenTopicQueue2(String msg){
//        MessageDto message = JSONUtil.toBean(msg, MessageDto.class);
//        System.out.println("消费者接收到topic.queue的消息：【" + message + "】");
//    }



}
