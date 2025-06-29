import{_ as k,r as n,c as r,a as e,F as u,d as l,h as M,t as a,u as b,f as o,n as w,b as I}from"./index-0g_e_Ani.js";const _={class:"message-queue-container"},Q={class:"courses-section"},R={class:"course-cards"},S=["onClick"],f={class:"course-description"},D={class:"course-duration"},C={class:"course-topics"},q={class:"demo-section"},L={class:"demo-cards"},O=["onClick"],N={key:0,class:"demo-detail"},U={class:"code-block"},T={__name:"index",setup(x){const m=b(),g=n([{id:1,title:"消息队列基础入门",description:"从零开始，系统学习消息队列的核心概念和实践应用",duration:"3小时",level:"入门",topics:["什么是消息队列？为什么需要它？","消息队列的基本工作流程","消息队列的三大核心概念：生产者、消费者、消息","消息队列的四种常见模式：点对点、发布订阅、请求响应、广播","消息队列的五大应用场景：异步处理、流量削峰、解耦系统、消息通知、日志处理","主流消息队列产品对比：RocketMQ vs Kafka vs RabbitMQ","消息队列的可靠性保证：消息持久化、消息确认、消息重试","消息队列的常见问题与解决方案"]},{id:2,title:"RocketMQ 实战",description:"深入学习 RocketMQ 的使用方法和最佳实践",duration:"4小时",level:"中级",topics:["RocketMQ 安装与配置","主题与标签详解","消息存储机制","消息重试与死信处理","集群部署方案"]},{id:3,title:"Kafka 高级应用",description:"掌握 Kafka 的高级特性和性能优化技巧",duration:"6小时",level:"高级",topics:["Kafka 架构设计","分区与副本机制","消息压缩与性能优化","监控与运维","安全机制实现"]}]),i=n(null),p=n([{id:1,title:"消息队列基础概念演示",description:"通过简单的示例理解消息队列的核心概念",code:`// 1. 生产者（Producer）示例
const producer = {
  sendMessage: (message) => {
    console.log('生产者发送消息:', message);
    // 实际应用中，这里会调用消息队列的API发送消息
    return {
      messageId: 'msg_' + Date.now(),
      content: message,
      timestamp: new Date().toISOString()
    };
  }
};

// 2. 消费者（Consumer）示例
const consumer = {
  receiveMessage: (message) => {
    console.log('消费者接收消息:', message);
    // 处理消息的业务逻辑
    return {
      status: 'success',
      processedAt: new Date().toISOString()
    };
  }
};

// 3. 消息队列（Message Queue）示例
class SimpleMessageQueue {
  constructor() {
    this.queue = [];
  }

  // 发送消息
  enqueue(message) {
    this.queue.push(message);
    console.log('消息已入队:', message);
  }

  // 接收消息
  dequeue() {
    const message = this.queue.shift();
    if (message) {
      console.log('消息已出队:', message);
    }
    return message;
  }
}

// 使用示例
const messageQueue = new SimpleMessageQueue();

// 生产者发送消息
const message = producer.sendMessage('Hello, Message Queue!');
messageQueue.enqueue(message);

// 消费者接收消息
const receivedMessage = messageQueue.dequeue();
if (receivedMessage) {
  consumer.receiveMessage(receivedMessage);
}`},{id:2,title:"RocketMQ 应用场景示例",description:"展示 RocketMQ 在实际应用中的典型场景",code:`// 1. 异步处理示例 - 用户注册后发送欢迎邮件
class UserService {
  async register(user) {
    // 1. 保存用户信息
    const savedUser = await this.saveUser(user);
    
    // 2. 发送欢迎邮件（异步处理）
    await this.rocketMQ.sendMessage('user-topic', {
      tag: 'register',
      key: savedUser.id,
      body: {
        userId: savedUser.id,
        email: savedUser.email,
        template: 'welcome'
      }
    });
    
    return savedUser;
  }
}

// 2. 流量削峰示例 - 秒杀系统
class SeckillService {
  async createOrder(userId, productId) {
    // 1. 将订单请求放入队列
    await this.rocketMQ.sendMessage('seckill-topic', {
      tag: 'order',
      key: userId,
      body: {
        userId,
        productId,
        timestamp: Date.now()
      }
    });
    
    return {
      status: 'pending',
      message: '订单请求已接收，正在处理中'
    };
  }
  
  // 消费者处理订单
  async processOrder(message) {
    const order = message.body;
    
    // 1. 检查库存
    const hasStock = await this.checkStock(order.productId);
    if (!hasStock) {
      return {
        status: 'failed',
        message: '商品已售罄'
      };
    }
    
    // 2. 创建订单
    const orderResult = await this.createOrderRecord(order);
    
    // 3. 发送订单确认通知
    await this.rocketMQ.sendMessage('order-topic', {
      tag: 'created',
      key: orderResult.id,
      body: {
        orderId: orderResult.id,
        userId: order.userId
      }
    });
    
    return orderResult;
  }
}

// 3. 系统解耦示例 - 订单系统与库存系统
class OrderService {
  async createOrder(orderData) {
    // 1. 创建订单
    const order = await this.saveOrder(orderData);
    
    // 2. 发送库存更新消息
    await this.rocketMQ.sendMessage('inventory-topic', {
      tag: 'update',
      key: order.id,
      body: {
        orderId: order.id,
        productId: orderData.productId,
        quantity: orderData.quantity
      }
    });
    
    return order;
  }
}

class InventoryService {
  async updateStock(message) {
    const { orderId, productId, quantity } = message.body;
    
    // 1. 更新库存
    await this.decreaseStock(productId, quantity);
    
    // 2. 发送库存更新确认
    await this.rocketMQ.sendMessage('inventory-topic', {
      tag: 'updated',
      key: orderId,
      body: {
        productId,
        orderId,
        status: 'success'
      }
    });
  }
}`},{id:3,title:"RocketMQ 可靠性保证示例",description:"展示如何确保 RocketMQ 消息的可靠传递",code:`// 1. 消息持久化示例
class ReliableRocketMQ {
  constructor() {
    this.producer = null;
    this.consumer = null;
  }

  // 初始化生产者
  async initProducer() {
    this.producer = await this.createProducer({
      groupName: 'reliable-producer-group',
      nameServer: 'localhost:9876',
      // 开启消息持久化
      persistMode: 'SYNC_FLUSH'
    });
  }

  // 初始化消费者
  async initConsumer() {
    this.consumer = await this.createConsumer({
      groupName: 'reliable-consumer-group',
      nameServer: 'localhost:9876',
      // 设置消费模式为集群模式
      consumeMode: 'CLUSTERING',
      // 设置最大重试次数
      maxReconsumeTimes: 3
    });
  }

  // 发送可靠消息
  async sendReliableMessage(topic, message) {
    // 1. 创建消息对象
    const msg = {
      topic,
      tag: message.tag,
      key: message.key,
      body: message.body,
      // 设置消息属性
      properties: {
        // 设置消息优先级
        priority: message.priority || 'NORMAL',
        // 设置消息延迟级别
        delayTimeLevel: message.delayTimeLevel || 0
      }
    };

    // 2. 发送消息
    const result = await this.producer.send(msg);
    
    return {
      messageId: result.messageId,
      status: 'SEND_OK'
    };
  }

  // 消费消息
  async consumeMessage(topic, callback) {
    // 1. 订阅主题
    await this.consumer.subscribe(topic, '*');

    // 2. 注册消息监听器
    this.consumer.on('message', async (message) => {
      try {
        // 处理消息
        await callback(message);
        
        // 确认消息已消费
        await this.consumer.ack(message);
      } catch (error) {
        // 消息处理失败，将进入重试队列
        console.error('消息处理失败:', error);
      }
    });
  }

  // 处理死信消息
  async handleDeadLetter(message) {
    // 1. 记录死信消息
    await this.saveDeadLetter(message);
    
    // 2. 发送告警通知
    await this.sendAlert({
      type: 'DEAD_LETTER',
      messageId: message.messageId,
      topic: message.topic,
      body: message.body
    });
  }
}

// 使用示例
const reliableMQ = new ReliableRocketMQ();

// 初始化
await reliableMQ.initProducer();
await reliableMQ.initConsumer();

// 发送可靠消息
const messageId = await reliableMQ.sendReliableMessage('important-topic', {
  tag: 'business',
  key: 'order_123',
  body: {
    content: '重要业务消息',
    priority: 'HIGH'
  }
});

// 消费消息
await reliableMQ.consumeMessage('important-topic', async (message) => {
  // 处理消息
  await processBusinessMessage(message);
});`}]),v=c=>{i.value=c},y=c=>{m.push(`/message-queue/chapter${c}`)};return(c,t)=>(o(),r("div",_,[t[4]||(t[4]=e("header",{class:"course-header"},[e("h1",null,"消息队列课程专栏"),e("p",{class:"subtitle"},"从入门到精通，系统学习消息队列技术")],-1)),e("div",Q,[t[2]||(t[2]=e("h2",null,"课程内容",-1)),e("div",R,[(o(!0),r(u,null,l(g.value,s=>(o(),r("div",{key:s.id,class:"course-card",onClick:d=>y(s.id)},[e("div",{class:w(["course-level",s.level.toLowerCase()])},a(s.level),3),e("h3",null,a(s.title),1),e("p",f,a(s.description),1),e("div",D,[t[0]||(t[0]=e("span",{class:"icon"},"⏱️",-1)),I(" "+a(s.duration),1)]),e("ul",C,[(o(!0),r(u,null,l(s.topics,(d,h)=>(o(),r("li",{key:h},a(d),1))),128))]),t[1]||(t[1]=e("div",{class:"course-action"},[e("button",{class:"start-btn"},"开始学习")],-1))],8,S))),128))])]),e("div",q,[t[3]||(t[3]=e("h2",null,"实战演示",-1)),e("div",L,[(o(!0),r(u,null,l(p.value,s=>(o(),r("div",{key:s.id,class:"demo-card",onClick:d=>v(s)},[e("h3",null,a(s.title),1),e("p",null,a(s.description),1)],8,O))),128))]),i.value?(o(),r("div",N,[e("h3",null,a(i.value.title),1),e("p",null,a(i.value.description),1),e("pre",U,[e("code",null,a(i.value.code),1)])])):M("",!0)])]))}},A=k(T,[["__scopeId","data-v-3a199c6f"]]);export{A as default};
