

# **ThreadPoolExecutor**

参考资料：[《Java高并发核心编程（卷2）》](https://weread.qq.com/web/bookDetail/9b93254072456ac19b9a176)

## 一、线程池的标准创建方式（ThreadPoolExecutor）

在很多公司（如阿里、华为等）的编程规范中，非常明确地禁止使用Executors快捷创建线程池，为什么呢？使用Executors工厂方法快捷创建线程池将会面临的潜在问题。

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