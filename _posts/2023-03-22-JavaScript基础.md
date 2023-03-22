---
layout:			post
title:			"JavaScript 基础"
subtitle: 		"JavaScript 基础"
author:			"XiaoZaiz"
header-style: 	text
catalog:      	true
tags:
    - JavaScript
    - 前端
---

# JavaScript 基础

## 一、简介

​	JavaScript 的设计来源：Self 和 Scheme

​	动态页面：和服务器进行数据交互

### 1.1 引入方式

| 引入方式 | 示例                        |
| -------- | --------------------------- |
| 外部     | `<script src="#"></script>` |
| 内部     | `<script></script>`         |
| 元素属性 |                             |

#### 元素属性 JavaScript

元素属性 JavaScript 指的是在元素的“**事件属性**”中**直接编写 JavaScript** 或**调用函数**。

示例：

```html
<input type="button" value="按钮"
       onclick="alert('你好！')"/>
```

- document.write()：在页面输出一个内容
- alert()：弹出一个对话框

## 二、函数

适用：

- 重复使用
- 特定功能

使用

- 定义函数
- 调用函数

### 2.1 函数的定义

```js
// 函数的定义
function 函数名(参数1,参数2,...,参数n)
{
    ...
    return 返回值;// 没有返回值时可省略
}
```

### 2.2 函数的调用

#### 直接调用

适用：没有返回值的函数

```js
函数名(参数1,参数2,...,参数n);
```

#### 在表达式中调用

适用：有返回值的函数

```js
var/let/const 变量名 =  函数名(参数1,参数2,...,参数n);
```

#### 在超链接中调用

```html
<a href="javascript:函数名"></a>
```

#### 在事件中调用

````html
<!-- 示例 -->
<input type="button" onclick="函数名()" value="提交" />
````

### 2.3 嵌套函数

概念：在一个函数内部定义另一个函数，在内部定义的函数只能在内部调用；

示例：阶乘

```js
function func(a)
{
    function multi(x)
    {
        return x * x ;
    }
    let m = 1 ;
    for(let i = 1; i < multi(a); i++)
        {
            m = m * i;
        }
    return m;
}

let sum = func(5);
```

### 2.4 内置函数

| 函数           | 说明                                 |
| -------------- | ------------------------------------ |
| `parseInt()`   | 提取字符串中的数字，只限提取整数     |
| `parseFloat()` | 提取字符串中的数字，可以提取小数     |
| `isFinite()`   | 判断某一个数是否是一个有限数值       |
| `isNaN()`      | 判断一个数是否是NaN值                |
| `escape()`     | 对字符串进行编码                     |
| `unescape()`   | 对字符串进行解码                     |
| `eval()`       | 把一个字符串当作一个表达式一样去执行 |



## 三、对象

### 3.1 内置对象

- 字符串对象：`String`
- 数组对象：`Array`
- 日期对象：`Date`
- 数值对象：`Math`

### 3.2 字符串对象

| 作用                                 | 语法                                                   |
| ------------------------------------ | ------------------------------------------------------ |
| 获取字符串长度                       | `字符串名.length`                                      |
| 大小写转换                           | `字符串名.toLowerCase()`<br />`字符串名.toUpperCase()` |
| 获取某一字符                         | `字符串名.charAt(下标)`                                |
| 截取字符串<br />截取范围：[star,end) | `字符串名.substring(start,end)`                        |
|                                      |                                                        |





