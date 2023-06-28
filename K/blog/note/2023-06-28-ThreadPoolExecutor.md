

# 确定线程池的线程数

参考资料：[《Java高并发核心编程（卷2）》](https://weread.qq.com/web/bookDetail/9b93254072456ac19b9a176)

[TOC]

## 一、线程池的标准创建方式（ThreadPoolExecutor）

在很多公司（如阿里、华为等）的编程规范中，非常明确地禁止使用**Executors**快捷创建线程池，为什么呢？使用Executors工厂方法快捷创建线程池将会面临的潜在问题。

虽然Executors工厂类提供了构造线程池的便捷方法，但是对于服务器程序而言，大家应该杜绝使用这些便捷方法，而是直接使用线程池ThreadPoolExecutor的构造器，从而有效避免由于使用无界队列可能导致的内存资源耗尽，或者由于对线程个数不做限制而导致的CPU资源耗尽等问题。

**所以，大厂的编程规范都不允许使用Executors创建线程池，而是要求使用标准构造器ThreadPoolExecutor创建线程池。**

> ThreadPoolExecutor构造方法有多个重载版本，其中一个比较重要的构造器如下：

```java
public ThreadPoolExecutor(
    int corePoolSize,					// 核心线程数，即使线程空闲（Idle），也不会回收
    int maximumPoolSize,				// 线程数的上限
    long keepAliveTime, TimeUnit unit,	// 线程最大空闲（Idle）时长
    BlockingQueue<Runnable> workQueue,	// 任务的排队队列
    ThreadFactory threadFactory,		// 新线程的生成方式
    RejectedExecutionHandler handler	// 拒绝策略
)
```

### 1、核心和最大线程数

> 参数corePoolSize用于设置核心（Core）线程池数量，参数maximumPoolSize用于设置最大线程数量。线程池执行器将会根据corePoolSize和maximumPoolSize自动维护线程池中的工作线程，大致规则为：
>
> （1）当在线程池接收到新任务，并且当前工作线程数少于corePoolSize时，即使其他工作线程处于空闲状态，也会创建一个新线程来处理该请求，直到线程数达到corePoolSize。
>
> （2）如果当前工作线程数多于corePoolSize数量，但小于maximumPoolSize数量，那么仅当任务排队队列已满时才会创建新线程。通过设置corePoolSize和maximumPoolSize相同，可以创建一个固定大小的线程池。
>
> （3）当maximumPoolSize被设置为无界值（如Integer.MAX_VALUE）时，线程池可以接收任意数量的并发任务。
>
> （4）corePoolSize和maximumPoolSize不仅能在线程池构造时设置，也可以调用setCorePoolSize()和setMaximumPoolSize()两个方法进行动态更改。

### 2、BlockingQueue

> BlockingQueue（阻塞队列）的实例用于暂时接收到的异步任务，如果线程池的核心线程都在忙，那么所接收到的目标任务缓存在阻塞队列中。

### 3、keepAliveTime

> 线程构造器的keepAliveTime（空闲线程存活时间）参数用于设置池内线程最大Idle（空闲）时长（或者说保活时长），如果超过这个时间，默认情况下Idle、非Core线程会被回收。
>
> 如果池在使用过程中提交任务的频率变高，也可以调用方法setKeepAliveTime(long，TimeUnit)进行线程存活时间的动态调整，可以将时长延长。如果需要防止Idle线程被终止，可以将Idle时间设置为无限大，具体如下：	

```java
setKeepAliveTime(Long.MAX_VALUE, TimeUnit.NANOSECONDS);
```

> 默认情况下，Idle超时策略仅适用于存在超过corePoolSize线程的情况。但若调用了allowCoreThreadTimeOut(boolean)方法，并且传入了参数true，则keepAliveTime参数所设置的Idle超时策略也将被应用于核心线程。

### 4、使用实例

```java
package org.example.demo.executor;

import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class ThreadPoolDemo {
    public static void main(String[] args) throws InterruptedException {
        ThreadPoolExecutor executor = new ThreadPoolExecutor(
                1,
                100,
                100,
                TimeUnit.SECONDS,
                new LinkedBlockingQueue<>(100));
        for (int i = 0; i < 5; i++) {
            final int taskIndex = i;
            executor.execute(() -> {
                System.out.println(taskIndex);
                try {
                    // 极端测试：无限制休眠
                    Thread.sleep(Long.MAX_VALUE);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            });
        }
        while (true) {
            System.out.println("工作任务数量：" + executor.getActiveCount() + "\n" +
                    "总的任务数量：" + executor.getTaskCount());
            Thread.sleep(1000);
        }
    }
}
```

## 二、确定线程池的线程数

使用线程池的好处：

（1）减低资源消耗：线程是稀缺资源，如果无限制地创建，不仅会消耗系统的资源，还会降低系统的稳定性，通过重复利用已创建的线程可以降低线程创建和销毁造成的消耗。

（2）提高响应速度：当任务到达时，可以不需要等待线程创建就能立即执行。

（3）提高线程的可管理性：线程池提供了一种限制、管理资源的策略，维护一些基本的线程统计信息，如已完成任务的数量等。通过线程池可以对线程资源进行统一的**分配、监控和调优**。

虽然使用线程池的好处很多，但是如果其线程数配置得不合理，不仅可能达不到预期效果，反而可能降低应用的性能。

### 1、按照任务类型对线程池进行分类

使用标准构造器ThreadPoolExecutor创建线程池时，会涉及**线程数的配置**，而线程数的配置与异步任务类型是分不开的。这里将线程池的异步任务大致分为以下三类：

**IO密集型任务**（线程数为CPU核数的两倍）

此类任务主要是执行IO操作。由于执行IO操作的时间较长，导致CPU的利用率不高，这类任务CPU常处于空闲状态。

Netty的IO读写操作为此类任务的典型例子。

**CPU密集型任务**（线程数等于CPU核数）

此类任务主要是执行计算任务。由于响应时间很快，CPU一直在运行，这种任务CPU的利用率很高。

**混合型任务**

此类任务既要执行逻辑计算，又要进行IO操作（如RPC调用、数据库访问）。

相对来说，由于执行IO操作的耗时较长（一次网络往返往往在数百毫秒级别），这类任务的CPU利用率也不是太高。

Web服务器的HTTP请求处理操作为此类任务的典型例子。

### 2、为IO密集型任务确定线程数

由于IO密集型任务的CPU使用率较低，导致线程空余时间很多，因此通常需要**开CPU核心数两倍的线程**。当IO线程空闲时，可以启用其他线程继续使用CPU，以提高CPU的使用率。

```java
// CPU 核数
Runtime.getRuntime().availableProcessors()
```

Netty是基于Java实现的高性能传输框架，基于Reactor模式实现，是目前非常火热的高性能传输中间件。

Netty的IO处理任务就是典型的IO密集型任务。所以，Netty的Reactor（反应器）实现类（定制版的线程池）的IO处理线程数默认正好为CPU核数的两倍，以下是其相关的代码：

```java
     //多线程版本Reactor实现类
     public abstract class MultithreadEventLoopGroup extends
             MultithreadEventExecutorGroup implements EventLoopGroup {
     
         // IO事件处理线程数
         private static final int DEFAULT_EVENT_LOOP_THREADS;
     
         // IO事件处理线程数默认值为CPU核数的两倍
         static {
             DEFAULT_EVENT_LOOP_THREADS = Math.max(1,
                      SystemPropertyUtil.getInt("io.netty.eventLoopThreads",
                      Runtime.getRuntime().availableProcessors() * 2));
         }
     
         /**
          *构造器
          */
         protected MultithreadEventLoopGroup(int nThreads, 
                     ThreadFactory threadFactory, Object... args) {
             super(nThreads == 0?
                      DEFAULT_EVENT_LOOP_THREADS : nThreads, threadFactory, args);
         }
       // 省略其他
     }
```

一个简单的参考线程池，具体代码如下：

```java
     package com.crazymakercircle.util;
     // 省略import
     public class ThreadUtil
     {
         //CPU核数
         private static final int CPU_COUNT =
                                         Runtime.getRuntime().availableProcessors();
         //IO处理线程数
         private static final int IO_MAX = Math.max(2, CPU_COUNT * 2);
         /**
          * 空闲保活时限，单位秒
          */
         private static final int KEEP_ALIVE_SECONDS = 30;
         /**
          * 有界队列size
          */
         private static final int QUEUE_SIZE = 128;
         //懒汉式单例创建线程池：用于IO密集型任务
         private static class IoIntenseTargetThreadPoolLazyHolder
         {
             //线程池： 用于IO密集型任务
             private static final ThreadPoolExecutor EXECUTOR =
                                                                new ThreadPoolExecutor(
                     IO_MAX,  //CPU核数*2
                     IO_MAX,  //CPU核数*2
                     KEEP_ALIVE_SECONDS,
                     TimeUnit.SECONDS,
                     new LinkedBlockingQueue(QUEUE_SIZE),
                     new CustomThreadFactory("io"));
     
             static
             {
                 EXECUTOR.allowCoreThreadTimeOut(true);
                 //JVM关闭时的钩子函数
                 Runtime.getRuntime().addShutdownHook(
                         new ShutdownHookThread("IO密集型任务线程池",
                                                                     new Callable<Void>()
                         {
                             @Override
                             public Void call() throws Exception
                             {
                                 //优雅地关闭线程池
                                 shutdownThreadPoolGracefully(EXECUTOR);
                                 return null;
                             }
                         }));
             }
         }
         // 省略不相干代码
     }
```

在以上参考代码中，有以下几个要点需要特别说明：

（1）为参考的IO线程池调用了allowCoreThreadTimeOut(…)方法，并且传入了参数true，则keepAliveTime参数所设置的Idle超时策略也将被应用于核心线程，当池中的线程长时间空闲时，可以自行销毁。

（2）使用有界队列缓冲任务而不是无界队列，如果128太小，可以根据具体需要进行增大，但是不能使用无界队列。

（3）corePoolSize和maximumPoolSize保持一致，使得在接收到新任务时，如果没有空闲工作线程，就优先创建新的线程去执行新任务，而不是优先加入阻塞队列，等待现有工作线程空闲后再执行。

（4）使用懒汉式单例模式创建线程池，如果代码没有用到此线程池，就不会立即创建。

（5）使用JVM关闭时的钩子函数优雅地自动关闭线程池。

### 3、为CPU密集型任务确定线程数

CPU密集型任务也叫计算密集型任务，其特点是要进行大量计算而需要消耗CPU资源，**比如计算圆周率、对视频进行高清解码等**。CPU密集型任务虽然也可以并行完成，但是并行的任务越多，花在任务切换的时间就越多，CPU执行任务的效率就越低，所以要最高效地利用CPU，CPU密集型任务并行执行的数量应当等于CPU的核心数。

比如4个核心的CPU，通过4个线程并行地执行4个CPU密集型任务，此时的效率是最高的。但是如果线程数远远超出CPU核心数量，就需要频繁地切换线程，线程上下文切换时需要消耗时间，反而会使得任务效率下降。因此，**对于CPU密集型的任务来说，线程数等于CPU数就行。**

### 4、为混合型任务确定线程数

混合型任务既要执行逻辑计算，又要进行大量非CPU耗时操作（如RPC调用、数据库访问、网络通信等），所以混合型任务CPU的利用率不是太高，非CPU耗时往往是CPU耗时的数倍。

比如在Web应用中处理HTTP请求时，一次请求处理会包括DB操作、RPC操作、缓存操作等多种耗时操作。

一般来说，一次Web请求的CPU计算耗时往往较少，大致在100～500毫秒，而其他耗时操作会占用500～1000毫秒，甚至更多的时间。

在为混合型任务创建线程池时，如何确定线程数呢？业界有一个比较成熟的估算公式，具体如下：

```
最佳线程数 = （（线程等待时间 + 线程CPU时间） / 线程CPU时间） * CPU核数
```

经过简单的换算，以上公式可进一步转换为：

```
最佳线程数 = （线程等待时间与线程CPU时间之比 + 1） * CPU核数
```

通过公式可以看出：

等待时间所占的比例越高，需要的线程就越多；

CPU耗时所占的比例越高，需要的线程就越少。

下面举一个例子：

比如在Web服务器处理HTTP请求时，假设平均线程CPU运行时间为100毫秒，而线程等待时间（比如包括DB操作、RPC操作、缓存操作等）为900毫秒，如果CPU核数为8，那么根据上面这个公式，估算如下：

```java
((900 / 100) + 1) * 8 = 10 * 8 = 80
```

经过计算，以上案例中需要的线程数为80。很多小伙伴认为，线程数越高越好。那么，使用很多线程是否就一定比单线程高效呢？

答案是否定的，比如大名鼎鼎的Redis就是单线程的，但它却非常高效，基本操作都能达到十万量级/秒。

为什么Redis使用单线程如此之快，原因在于：Redis基本都是内存操作，在这种情况下单线程可以高效地利用CPU，多线程会带来线程上下文切换的开销，单线程就没有这种开销。

由于Redis基本都是内存操作，在这种情况下单线程可以高效地利用CPU，多线程反而不是太适用。多线程适用的场景一般是：存在相当比例非CPU耗时操作，如IO、网络操作，需要尽量提高并行化比率以提升CPU的利用率。

以上公式的估算结果仅仅是理论最佳值，在生产环境中的使用也仅供参考。生产环境需要结合系统网络环境和硬件情况（CPU、内存、硬盘读写速度）不断尝试，获取一个符合实际的线程数值。