# Synchronized关键字

参考资料：[《Java高并发核心编程（卷2）》](https://weread.qq.com/web/bookDetail/9b93254072456ac19b9a176)

[TOC]

在Java中，线程同步使用最多的方法是使用synchronized关键字。

每个**Java对象**都隐含有一把锁，这把锁称为**Java内置锁（或者对象锁、隐式锁）**。

使用synchronized（syncObject）调用相当于获取syncObject的内置锁，所以可以使用内置锁对临界区代码段进行排他性保护。

## 一、Synchronized关键字

### 1、同步方法

synchronized关键字是Java的保留字，当使用synchronized关键字修饰一个方法的时候，该方法被声明为**同步方法**。

关键字synchronized的位置处于同步方法的返回类型之前。

在方法声明中设置synchronized同步关键字，保证其方法的代码执行流程是排他性的。任何时间只允许一个线程进入同步方法（临界区代码段），如果其他线程需要执行同一个方法，那么只能等待和排队。

### 2、同步块



### 3、静态的同步方法

