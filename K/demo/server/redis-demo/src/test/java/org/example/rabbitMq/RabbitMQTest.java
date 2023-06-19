package org.example.rabbitMq;

import cn.hutool.core.lang.UUID;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RabbitMQTest {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    public void testSendMap() throws InterruptedException {
        // 准备消息
        Map<String,Object> msg = new HashMap<>();
        msg.put("name", "Jack");
        msg.put("age", 21);
        System.out.println("【simple.queue】消息发送");
        // 发送消息
        rabbitTemplate.convertAndSend("simple.queue", msg);
    }

    @Test
    public void testSendTopicExchange() {
        // 交换机名称
        String exchangeName = "xiaozaiz.topic";
        // 消息
        String message = "喜报！孙悟空大战哥斯拉，胜!";
        // 发送消息
        rabbitTemplate.convertAndSend(exchangeName, "china.news", message+"【china.news】");
        rabbitTemplate.convertAndSend(exchangeName, "1.news", message+"【1.news】");
        rabbitTemplate.convertAndSend(exchangeName, "china.1", message+"【china.1】");
    }

    @Test
    public void testSendDirectExchange() {
        // 交换机名称
        String exchangeName = "xiaozaiz.direct";
        // 消息
        String message = "红色警报！日本乱排核废水，导致海洋生物变异，惊现哥斯拉！";
        // 发送消息
        // red blue white
        rabbitTemplate.convertAndSend(exchangeName, "red", message+"【red】");
        rabbitTemplate.convertAndSend(exchangeName, "blue", message+"【blue】");
        rabbitTemplate.convertAndSend(exchangeName, "white", message+"【white】");
    }

    @Test
    public void testFanoutExchange() {
        // 队列名称
        String exchangeName = "xiaozaiz.fanout";
        // 消息
        String message = "hello, everyone!";
        rabbitTemplate.convertAndSend(exchangeName, "", message);
    }

    @Test
    public void testSimpleQueue() throws InterruptedException {
        String queueName = "simple.queue";
        String message = "hello,spring amqp";
        for (int i = 0; i < 10; i++) {
            rabbitTemplate.convertAndSend(queueName, message+i);
            System.out.println("【发送端】simple.queue："+message+i);
        }
    }

    @Test
    public void testSimpleQueueReceive() {
        String queueName = "simple.queue";
        List<String> messages = new ArrayList<>();
        while (true) {
            Object messageObj = rabbitTemplate.receiveAndConvert(queueName);
            if (messageObj == null) {
                break;
            }
            String message = (String) messageObj;
            messages.add(message);
            System.out.println("【接收端】simple.queue："+message);
        }
        System.out.println("【接收端】接收到 " + messages.size() + " 条消息");
    }




}
