import{_ as m,r as u,c as s,a as t,F as d,d as p,t as c,x as g,u as b,f as n,n as y}from"./index-CcJY19Bl.js";import{M as k}from"./MqDiagramNew-DNDWfo8G.js";const C={class:"chapter-container"},f={class:"content-section"},x={class:"section-navigation"},T=["onClick"],q={class:"section-content"},P={class:"content-wrapper"},w={class:"text-content"},B={class:"diagram-content"},N={__name:"chapter2",setup(R){const o=b(),i=u([{id:1,title:"消息队列的基本工作流程",content:`消息队列的基本工作流程包括消息的发送、存储和消费三个主要环节：

1. 消息发送流程
   - 生产者创建消息
   - 设置消息属性（优先级、过期时间等）
   - 选择目标队列
   - 发送消息到消息队列服务器
   - 等待发送确认

2. 消息存储流程
   - 消息队列服务器接收消息
   - 消息持久化存储
   - 消息索引建立
   - 消息状态更新
   - 消息路由分发

3. 消息消费流程
   - 消费者订阅队列
   - 从队列拉取消息
   - 处理消息内容
   - 发送消费确认
   - 消息状态更新`,diagramType:"workflow"},{id:2,title:"消息队列的通信模式",content:`消息队列支持多种通信模式，以适应不同的业务场景：

1. 点对点模式（P2P）
   - 一个生产者对应一个消费者
   - 消息只能被一个消费者消费
   - 适用于任务分发场景
   - 实际案例：订单处理系统

2. 发布订阅模式（Pub/Sub）
   - 一个生产者对应多个消费者
   - 消息可以被多个消费者消费
   - 适用于消息广播场景
   - 实际案例：新闻推送系统

3. 请求响应模式（Request/Reply）
   - 生产者发送请求消息
   - 消费者处理并返回响应
   - 支持异步通信
   - 实际案例：RPC调用

4. 广播模式（Broadcast）
   - 消息发送给所有消费者
   - 不保证消息顺序
   - 适用于系统通知
   - 实际案例：系统配置更新`,diagramType:"patterns"},{id:3,title:"消息队列的可靠性保证",content:`消息队列通过多种机制确保消息的可靠传递：

1. 消息持久化
   - 消息写入磁盘
   - 支持事务日志
   - 防止消息丢失
   - 支持消息恢复

2. 消息确认机制
   - 生产者发送确认
   - 消费者消费确认
   - 消息重试机制
   - 死信队列处理

3. 消息顺序保证
   - 分区顺序保证
   - 消息序列号
   - 顺序消费控制
   - 并发消费限制

4. 消息幂等性
   - 消息去重处理
   - 业务幂等设计
   - 重复消息处理
   - 状态一致性保证`,diagramType:"reliability"}]),a=u(i.value[0]),v=()=>{o.push("/message-queue/chapter3")},_=()=>{o.push("/message-queue/chapter1")},h=()=>{o.push("/message-queue")};return(S,r)=>(n(),s("div",C,[r[0]||(r[0]=t("header",{class:"chapter-header"},[t("h1",null,"第二章：消息队列工作流程"),t("p",{class:"subtitle"},"深入理解消息队列的工作原理与通信模式")],-1)),t("div",f,[t("div",x,[(n(!0),s(d,null,p(i.value,e=>(n(),s("div",{key:e.id,class:y(["nav-item",{active:a.value.id===e.id}]),onClick:l=>a.value=e},c(e.title),11,T))),128))]),t("div",q,[t("h2",null,c(a.value.title),1),t("div",P,[t("div",w,[(n(!0),s(d,null,p(a.value.content.split(`

`),(e,l)=>(n(),s("p",{key:l,class:"paragraph"},c(e),1))),128))]),t("div",B,[g(k,{type:a.value.diagramType},null,8,["type"])])])])]),t("div",{class:"navigation-buttons"},[t("button",{class:"nav-btn home",onClick:h}," 返回首页 "),t("div",{class:"chapter-nav"},[t("button",{class:"nav-btn prev",onClick:_}," ← 上一章：消息队列基础概念 "),t("button",{class:"nav-btn next",onClick:v}," 下一章：消息队列应用实践 → ")])])]))}},M=m(N,[["__scopeId","data-v-8c528b78"]]);export{M as default};
