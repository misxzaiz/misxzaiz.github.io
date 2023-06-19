package org.example.demo.RabbitMQ;

import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class SpringRabbitListener {

//    @RabbitListener(queues = "simple.queue")
//    public void listenWorkQueueMessage3(Map<String,Object> msg) throws InterruptedException {
//        System.out.println("【接收端OBJECT】simple.queue："+msg);
//    }
//
//
//    @RabbitListener(bindings = @QueueBinding(
//            value = @Queue(name = "topic.queue1"),
//            exchange = @Exchange(name = "xiaozaiz.topic", type = ExchangeTypes.TOPIC),
//            key = "china.#"
//    ))
//    public void listenTopicQueue1(String msg){
//        System.out.println("消费者接收到topic.queue1的消息：【" + msg + "】");
//    }
//
//    @RabbitListener(bindings = @QueueBinding(
//            value = @Queue(name = "topic.queue2"),
//            exchange = @Exchange(name = "xiaozaiz.topic", type = ExchangeTypes.TOPIC),
//            key = "#.news"
//    ))
//    public void listenTopicQueue2(String msg){
//        System.out.println("消费者接收到topic.queue2的消息：【" + msg + "】");
//    }
//
//    @RabbitListener(bindings = @QueueBinding(
//            value = @Queue(name = "direct.queue1"),
//            exchange = @Exchange(name = "xiaozaiz.direct", type = ExchangeTypes.DIRECT),
//            key = {"red","blue"}
//    ))
//    public void listenDirectQueue1(String msg){
//        System.out.println("【DIRECT·1】"+msg);
//    }
//
//    @RabbitListener(bindings = @QueueBinding(
//            value = @Queue(name = "direct.queue2"),
//            exchange = @Exchange(name = "xiaozaiz.direct", type = ExchangeTypes.DIRECT),
//            key = {"red","white"}
//    ))
//    public void listenDirectQueue2(String msg){
//        System.out.println("【DIRECT·2】"+msg);
//    }
//
//    @RabbitListener(queues = "fanout.queue1")
//    public void listenFanoutQueue1(String msg) {
//        System.out.println("消费者1接收到Fanout消息：【" + msg + "】");
//    }
//
//    @RabbitListener(queues = "fanout.queue2")
//    public void listenFanoutQueue2(String msg) {
//        System.out.println("消费者2接收到Fanout消息：【" + msg + "】");
//    }

//    @RabbitListener(queues = "simple.queue")
//    public void listenWorkQueueMessage1(String msg) throws InterruptedException {
//        System.out.println("【接收端】simple.queue(1)："+msg);
//    }

//    @RabbitListener(queues = "simple.queue")
//    public void listenWorkQueueMessage2(String msg) throws InterruptedException {
//        System.err.println("【接收端】simple.queue(2)："+msg);
//        Thread.sleep(1);
//    }
}
