---
内置锁（对象锁、隐式锁）
同步方法
同步块
静态的同步方法
粒度
Object对象
Class对象
监视锁
---



# Synchronized关键字

参考资料：[《Java高并发核心编程（卷2）》](https://weread.qq.com/web/bookDetail/9b93254072456ac19b9a176)

[TOC]

在Java中，线程同步使用最多的方法是使用synchronized关键字。

每个**Java对象**都隐含有一把锁，这把锁称为**Java内置锁（或者对象锁、隐式锁）**。

使用synchronized（syncObject）调用相当于获取syncObject的内置锁，所以可以使用内置锁对临界区代码段进行排他性保护。

## 一、Synchronized关键字

| 同步类型       | 粒度       |
| -------------- | ---------- |
| 同步方法       | 粗粒度     |
| 同步块         | 细粒度     |
| 静态的同步方法 | 非常粗粒度 |



### 1、同步方法

synchronized关键字是Java的保留字，当使用synchronized关键字修饰一个方法的时候，该方法被声明为**同步方法**。

关键字synchronized的位置处于同步方法的返回类型之前。

在方法声明中设置synchronized同步关键字，保证其方法的代码执行流程是排他性的。任何时间只允许一个线程进入同步方法（临界区代码段），如果其他线程需要执行同一个方法，那么只能等待和排队。

### 2、同步块

对于小的临界区，我们直接在方法声明中设置synchronized同步关键字，可以避免竞态条件的问题。但是对于较大的临界区代码段，为了执行效率，最好将同步方法分为小的临界区代码段。通过下面这个例子来具体讲述：

```java
     public class TwoPlus {
         
         private int sum1 = 0;
         private int sum2 = 0;
         //同步方法
         public synchronized void plus(int val1, int val2){
              //临界区代码段
              this.sum1 += val1;
              this.sum2 += val2;
        }
     }
```

使用synchronized同步块对上面的TwoPlus类进行吞吐量的提升改造，具体的代码如下：

```java
     public class TwoPlus{
     
         private int sum1 = 0;
         private int sum2 = 0;
         private Integer sum1Lock = new Integer(1); // 同步锁一
         private Integer sum2Lock = new Integer(2); // 同步锁二
     
         public void plus(int val1, int val2){
            //同步块1
             synchronized(this.sum1Lock){
                 this.sum1 += val1;
             }
            //同步块2
            synchronized(this.sum2Lock){
                 this.sum2 += val2;
             }
         }
     }
```

改造之后，对两个独立的临界区资源sum1和sum2的加法操作可以并发执行了，在某一个时刻，不同的线程可以对sum1和sum2同时进行加法操作，**提升了plus()方法的吞吐量**。

synchronized方法和synchronized同步块有什么区别呢？总体来说，synchronized方法是一种**粗粒度**的并发控制，某一时刻只能有一个线程执行该synchronized方法；而synchronized代码块是一种**细粒度**的并发控制，处于synchronized块之外的其他代码是可以被多个线程并发访问的。在一个方法中，并不一定所有代码都是临界区代码段，可能只有几行代码会涉及线程同步问题。所以synchronized代码块比synchronized方法更加细粒度地控制了多个线程的同步访问。

synchronized方法和synchronized代码块有什么联系呢？在Java的内部实现上，synchronized方法实际上等同于用一个synchronized代码块，这个代码块包含同步方法中的所有语句，然后在synchronized代码块的括号中传入this关键字，使用this对象锁作为进入临界区的同步锁。

例如，下面两种实现多线程同步的plus方法版本编译成JVM内部字节码后结果是一样的。

版本一，使用synchronized代码块对方法内部**全部代码**进行保护，具体代码如下：

```java
     public void plus() {
           synchronized(this){  //对方法内部全部代码进行保护
               amount++; 
           }
     }
```

版本二，使用synchronized方法对方法内部全部代码进行保护，具体代码如下：

```java
     public  synchronized  void plus() {
           amount++; 
     }
```

综上所述，synchronized方法的同步锁实质上使用了this对象锁，这样就免去了手工设置同步锁的工作。而使用synchronized代码块需要手工设置同步锁。

### 3、静态的同步方法

在Java世界里一切皆对象。**Java有两种对象：Object实例对象和Class对象**。每个类**运行时的**类型信息用**Class对象**表示，它包含与类名称、继承关系、字段、方法有关的信息。JVM将一个类加载入自己的方法区内存时，会为其创建一个Class对象，**对于一个类来说其Class对象是唯一的**。

Class类没有公共的构造方法，Class对象是在类加载的时候由Java虚拟机调用类加载器中的defineClass方法自动构造的，因此不能显式地声明一个Class对象。

所有的类都是在第一次使用时被动态加载到JVM中的（懒加载），其各个类都是在必需时才加载的。这一点与许多传统语言（如C++）都不同，JVM为动态加载机制配套了一个判定一个类是否已经被加载的检查动作，使得类加载器首先检查这个类的Class对象是否已经被加载。如果尚未加载，类加载器就会根据类的全限定名查找.class文件，验证后加载到JVM的方法区内存，并构造其对应的Class对象。

**普通的synchronized实例方法，其同步锁是当前对象this的监视锁。**如果某个synchronized方法是static（静态）方法，而不是普通的对象实例方法，其同步锁又是什么呢？

下面展示一个使用synchronized关键字修饰static方法的例子，具体如下：

```java
     package com.crazymakercircle.plus;
     // 省略import
     public class SafeStaticMethodPlus
     {   //静态的临界区资源
         private static Integer amount = 0;
         //使用synchronized关键字修饰 static方法
         public static synchronized void selfPlus()
         {
             amount++;
          }
     }
```

大家都知道，**静态方法属于Class实例而不是单个Object实例**，在静态方法内部是不可以访问Object实例的this引用（也叫指针、句柄）的。所以，修饰static方法的synchronized关键字就没有办法获得Object实例的this对象的监视锁。

实际上，使用synchronized关键字修饰static方法时，synchronized的同步锁并不是普通Object对象的监视锁，而是**类所对应的Class对象的监视锁**。

为了以示区分，这里**将Object对象的监视锁叫作对象锁**，**将Class对象的监视锁叫作类锁**。当synchronized关键字修饰static方法时，同步锁为类锁；当synchronized关键字修饰普通的成员方法（非静态方法）时，同步锁为类锁。由于类的对象实例可以有很多，但是每个类只有一个Class实例，因此**使用类锁作为synchronized的同步锁时会造成同一个JVM内的所有线程只能互斥地进入临界区段**。

```java
     //对JVM内的所有线程同步
     public static synchronized void selfPlus()
     {
         //临界区代码
     }
```

所以，**使用synchronized关键字修饰static方法是非常粗粒度的同步机制**。

通过synchronized关键字所抢占的同步锁什么时候释放呢？

一种场景是synchronized块（代码块或者方法）正确执行完毕，监视锁自动释放；

另一种场景是程序出现异常，非正常退出synchronized块，监视锁也会自动释放。所以，使用synchronized块时不必担心监视锁的释放问题。
