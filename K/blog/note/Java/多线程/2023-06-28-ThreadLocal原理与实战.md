# ThreadLocal原理与实战

参考资料：[《Java高并发核心编程（卷2）》](https://weread.qq.com/web/bookDetail/9b93254072456ac19b9a176)

[TOC]

在Java的多线程并发执行过程中，为了保证多个线程对变量的安全访问，可以将变量放到ThreadLocal类型的对象中，使变量在每个线程中都有独立值，不会出现一个线程读取变量时被另一个线程修改的现象。

由于ThreadLocal使用不当会导致严重的**内存泄漏问题**，所以为了更好地避免内存泄漏问题的发生，我们使用ThreadLocal时遵守以下两个原则：

（1）尽量**使用private static final修饰ThreadLocal实例**。使用private与final修饰符主要是为了尽可能不让他人修改、变更ThreadLocal变量的引用，使用static修饰符主要是为了确保ThreadLocal实例的全局唯一。

（2）**ThreadLocal使用完成之后务必调用remove()方法**。这是简单、有效地避免ThreadLocal引发内存泄漏问题的方法。

## 一、ThreadLocal的基本使用

  ThreadLocal位于JDK的java.lang核心包中。如果程序创建了一个ThreadLocal实例，那么在访问这个变量的值时，每个线程都会拥有一个独立的、自己的本地值。“线程本地变量”可以看成专属于线程的变量，不受其他线程干扰，保存着线程的专属数据。当线程结束后，每个线程所拥有的那个本地值会被释放。在多线程并发操作“线程本地变量”的时候，线程各自操作的是自己的本地值，从而规避了线程安全问题。

Java程序可以调用ThreadLocal的成员方法进行本地值的操作：

| 方法         | 说明 |
| ------------ | ---- |
| set(T value) | 设置 |
| T get()      | 获取 |
| remove()     | 删除 |

```java
    private static final ThreadLocal<String> threadLocal = new ThreadLocal<>();

    private static void extracted() {
        threadLocal.set("Hello ThreadLocal!");
        System.out.println(threadLocal.get());
        threadLocal.remove();
        System.out.println(threadLocal.get());
    }
```

## 二、ThreadLocal的使用场景

ThreadLocal是解决线程安全问题的一个较好的方案，它通过为每个线程提供一个独立的本地值去解决并发访问的冲突问题。在很多情况下，使用ThreadLocal比直接使用同步机制（如synchronized）解决线程安全问题更简单、更方便，且结果程序拥有更高的并发性。

使用场景：

（1）线程隔离

（2）跨函数传递数据

### 1、线程隔离

ThreadLocal的主要价值在于线程隔离，ThreadLocal中的数据只属于当前线程，其本地值对别的线程是不可见的，在多线程环境下，可以防止自己的变量被其他线程篡改。另外，由于各个线程之间的数据相互隔离，避免了同步加锁带来的性能损失，大大提升了并发性的性能。

ThreadLocal在线程隔离的常用案例为：可以为每个线程绑定一个用户会话信息、数据库连接、HTTP请求等，这样一个线程所有调用到的处理函数都可以非常方便地访问这些资源。

常见的ThreadLocal使用场景为数据库连接独享、Session数据管理等。

在“线程隔离”场景中，使用ThreadLocal的典型案例为：可以为每个线程绑定一个数据库连接，使得这个数据库连接为线程所独享，从而避免数据库连接被混用而导致操作异常问题。

### 2、跨函数传递数据

通常用于同一个线程内，跨类、跨方法传递数据时，如果不用ThreadLocal，那么相互之间的数据传递势必要靠返回值和参数，这样无形之中增加了这些类或者方法之间的耦合度。

由于ThreadLocal的特性，同一线程在某些地方进行设置，在随后的任意地方都可以获取到。线程执行过程中所执行到的函数都能读写ThreadLocal变量的线程本地值，从而可以方便地实现跨函数的数据传递。使用ThreadLocal保存函数之间需要传递的数据，在需要的地方直接获取，也能避免通过参数传递数据带来的高耦合。

在“跨函数传递数据”场景中使用ThreadLocal的典型案例为：可以为每个线程绑定一个Session（用户会话）信息，这样一个线程所有调用到的代码都可以非常方便地访问这个本地会话，而不需要通过参数传递。

## 三、使用ThreadLocal进行线程隔离

ThreadLocal在“线程隔离”应用场景的典型应用为“数据库连接独享”。下面的代码来自Hibernate，代码中通过ThreadLocal进行数据库连接（Session）的“线程本地化”存储，主要的代码如下：

```java
     private static final ThreadLocal threadSession = new ThreadLocal();  
     
     public static Session getSession() throws InfrastructureException {  
         Session s = (Session) threadSession.get();
         try {
             if (s == null) {
                 s = getSessionFactory().openSession();
                 threadSession.set(s);
             }  
         } catch (HibernateException ex) {
             throw new InfrastructureException(ex);
         }  
         return s;  
     }
```

Hibernate对数据库连接进行了封装，**一个Session代表一个数据库连接**。通过以上代码可以看到，在Hibernate的getSession()方法中，首先判断当前线程中有没有放进去Session，如果还没有，那么通过sessionFactory().openSession()来创建一个Session，再将Session设置到ThreadLocal变量中，这个Session相当于线程的私有变量，而不是所有线程共用的，显然其他线程中是取不到这个Session的。

**一般来说，完成数据库操作之后程序会将Session关闭，从而节省数据库连接资源。**如果Session的使用方式为共享而不是独占，在这种情况下，Session是多线程共享使用的，如果某个线程使用完成之后直接将Session关闭，其他线程在操作Session时就会报错。所以Hibernate通过ThreadLocal非常简单地实现了数据库连接的安全使用。

## 四、使用ThreadLocal进行跨函数数据传递

ThreadLocal在“跨函数数据传递”场景的典型应用有很多：

（1）用来传递请求过程中的用户ID。

（2）用来传递请求过程中的用户会话（Session）。

（3）用来传递HTTP的用户请求实例HttpRequest。

（4）其他需要在函数之间频繁传递的数据。

以下代码来自于疯狂创客圈社群的微服务脚手架Crazy-SpringCloud工程，通过ThreadLocal在函数之间传递用户信息、会话信息等，并且封装成了一个独立的SessionHolder类，具体的代码如下：

```java
     package com.crazymaker.springcloud.common.context;
     // 省略import
     public class SessionHolder
     {
         // session id，线程本地变量
         private static final ThreadLocal<String> sidLocal =
                                               new ThreadLocal<>("sidLocal");
     
         // 用户信息，线程本地变量
         private static final ThreadLocal<UserDTO> sessionUserLocal =
                                                new ThreadLocal<>("sessionUserLocal");
     
         // session，线程本地变量
         private static final ThreadLocal<HttpSession> sessionLocal = 
                                                   new ThreadLocal<>("sessionLocal");
     // 省略其他  
     
         /**
          *保存session在线程本地变量中
           */
         public static void setSession(HttpSession session)
         {
             sessionLocal.set(session);
         }
     
         /**
          * 取得绑定在线程本地变量中的session 
           */
         public static HttpSession getSession()
         {
             HttpSession session = sessionLocal.get();
             Assert.notNull(session, "session未设置");
             return session;
         }
         // 省略其他  
     }
```

## 五、ThreadLocal内部结构演进

在早期的JDK版本中，ThreadLocal的内部结构是一个Map，其中每一个线程实例作为Key，线程在“线程本地变量”中绑定的值为Value（本地值）。早期版本中的Map结构，其拥有者为ThreadLocal，每一个ThreadLocal实例拥有一个Map实例。

在JDK 8版本中，ThreadLocal的内部结构发生了演进，虽然还是使用了Map结构，但是Map结构的拥有者已经发生了变化，其拥有者为Thread（线程）实例，每一个Thread实例拥有一个Map实例。另外，Map结构的Key值也发生了变化：新的Key为ThreadLocal实例。

在JDK 8版本中，每一个Thread线程内部都有一个Map（ThreadLocalMap），如果给一个Thread创建多个ThreadLocal实例，然后放置本地数据，那么当前线程的ThreadLocalMap中就会有多个“Key-Value对”，其中ThreadLocal实例为Key，本地数据为Value。

从代码的层面来说，新版本的ThreadLocalMap还是由ThreadLocal类维护的，由ThreadLocal负责ThreadLocalMap实例的获取和创建，并从中设置本地值、获取本地值。所以ThreadLocalMap还寄存于ThreadLocal内部，并没有被迁移到Thread内部。

一个ThreadLocalMap（新版本）实例内部结构的形象展示如图所示。

![img](assets/epub_38103745_23)

每一个线程在获取本地值时，都会将ThreadLocal实例作为Key从自己拥有的ThreadLocalMap中获取值，别的线程无法访问自己的ThreadLocalMap实例，自己也无法访问别人的ThreadLocalMap实例，达到相互隔离，互不干扰。

与早期版本的ThreadLocalMap实现相比，新版本的主要变化为：

（1）拥有者发生了变化：新版本的ThreadLocalMap拥有者为Thread，早期版本的ThreadLocalMap拥有者为ThreadLocal。

（2）Key发生了变化：新版本的Key为ThreadLocal实例，早期版本的Key为Thread实例。

与早期版本的ThreadLocalMap实现相比，新版本的主要优势为：

（1）每个ThreadLocalMap存储的“Key-Value对”数量变少。早期版本的“Key-Value对”数量与线程个数强关联，若线程数量多，则ThreadLocalMap存储的“Key-Value对”数量也多。新版本的ThreadLocalMap的Key为ThreadLocal实例，多线程情况下ThreadLocal实例比线程数少。

（2）早期版本ThreadLocalMap的拥有者为ThreadLocal，在Thread（线程）实例销毁后，ThreadLocalMap还是存在的；新版本的ThreadLocalMap的拥有者为Thread，现在当Thread实例销毁后，ThreadLocalMap也会随之销毁，在一定程度上能减少内存的消耗。

## 六、ThreadLocal源码分析

## 七、ThreadLocalMap源码分析

## 八、ThreadLocal综合使用案例

由于ThreadLocal使用不当会导致严重的**内存泄漏问题**，所以为了更好地避免内存泄漏问题的发生，我们使用ThreadLocal时遵守以下两个原则：

（1）尽量**使用private static final修饰ThreadLocal实例**。使用private与final修饰符主要是为了尽可能不让他人修改、变更ThreadLocal变量的引用，使用static修饰符主要是为了确保ThreadLocal实例的全局唯一。

（2）**ThreadLocal使用完成之后务必调用remove()方法**。这是简单、有效地避免ThreadLocal引发内存泄漏问题的方法。