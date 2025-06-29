import{_ as C,r as u,c as a,a as e,e as d,F as o,d as c,u as O,f as n,t as i}from"./index-0g_e_Ani.js";const x={class:"reflection-container"},P={class:"content-section"},j={class:"content-card"},_={class:"api-title"},S={class:"api-methods"},k={class:"content-section"},N={class:"content-card"},T={class:"code-block"},I=["innerHTML"],R={class:"code-block"},F=["innerHTML"],z={class:"content-section"},B={class:"content-card"},E={class:"applications-list"},D={class:"app-title"},H={class:"app-description"},J={class:"app-source-code"},L={class:"code-block"},q=["innerHTML"],V={class:"code-analysis"},W={class:"content-section"},$={class:"content-card"},Q={class:"pros-cons"},U={class:"pros"},G={class:"cons"},K={class:"content-section"},X={class:"content-card"},Y={class:"tips-card"},Z=`
public class ReflectionExample {
    private String privateField = "私有字段值";
    
    public void publicMethod() {
        System.out.println("这是公有方法");
    }
    
    private void privateMethod(String arg) {
        System.out.println("这是私有方法，参数: " + arg);
    }
}
`,ee=`
// 获取Class对象的三种方式
Class<?> clazz1 = ReflectionExample.class;
Class<?> clazz2 = new ReflectionExample().getClass();
Class<?> clazz3 = Class.forName("com.example.ReflectionExample");

// 获取类中的字段
Field privateField = clazz1.getDeclaredField("privateField");
privateField.setAccessible(true); // 设置可访问性

// 创建实例并操作字段
ReflectionExample instance = (ReflectionExample) clazz1.newInstance();
privateField.set(instance, "通过反射修改的字段值");
String fieldValue = (String) privateField.get(instance);

// 调用私有方法
Method privateMethod = clazz1.getDeclaredMethod("privateMethod", String.class);
privateMethod.setAccessible(true);
privateMethod.invoke(instance, "反射调用的参数");
`,v=`
// Spring中的反射应用 - 依赖注入核心源码(简化版)
public class AutowiredAnnotationBeanPostProcessor {
    
    // 处理@Autowired注解的方法
    private void inject(Object bean, String beanName, PropertyValues pvs) {
        Class<?> clazz = bean.getClass();
        
        // 查找所有字段
        ReflectionUtils.doWithFields(clazz, field -> {
            Autowired autowired = field.getAnnotation(Autowired.class);
            if (autowired != null) {
                // 获取字段上的@Autowired注解
                boolean required = autowired.required();
                
                // 设置私有字段可访问
                ReflectionUtils.makeAccessible(field);
                
                // 查找依赖bean
                Object dependencyBean = findDependencyBean(field.getType());
                
                // 通过反射注入依赖
                field.set(bean, dependencyBean);
            }
        });
        
        // 查找所有方法
        ReflectionUtils.doWithMethods(clazz, method -> {
            Autowired autowired = method.getAnnotation(Autowired.class);
            if (autowired != null && method.getName().startsWith("set")) {
                // 获取setter方法上的@Autowired注解
                Class<?>[] paramTypes = method.getParameterTypes();
                
                // 设置私有方法可访问
                ReflectionUtils.makeAccessible(method);
                
                // 查找依赖bean
                Object[] arguments = new Object[paramTypes.length];
                for (int i = 0; i < paramTypes.length; i++) {
                    arguments[i] = findDependencyBean(paramTypes[i]);
                }
                
                // 通过反射调用setter方法注入依赖
                method.invoke(bean, arguments);
            }
        });
    }
}
`,te=`
// MyBatis中的反射应用 - ORM映射核心源码(简化版)
public class DefaultResultSetHandler {
    
    // 将查询结果映射到对象
    private Object createResultObject(ResultSetWrapper rsw, ResultMap resultMap) {
        // 获取要映射到的目标类
        Class<?> resultType = resultMap.getType();
        
        // 创建目标对象实例
        Object resultObject = createResultObject(resultType);
        
        // 遍历ResultSet的列
        List<String> columnNames = rsw.getColumnNames();
        for (String columnName : columnNames) {
            // 查找映射的属性名
            String propertyName = resultMap.getMappedPropertyName(columnName);
            
            if (propertyName != null) {
                try {
                    // 查找目标类中的setter方法
                    PropertyDescriptor pd = new PropertyDescriptor(propertyName, resultType);
                    Method setterMethod = pd.getWriteMethod();
                    
                    if (setterMethod != null) {
                        // 获取列数据
                        Object value = rsw.getObject(columnName);
                        
                        // 转换数据类型
                        Class<?> parameterType = setterMethod.getParameterTypes()[0];
                        value = convertValue(value, parameterType);
                        
                        // 通过反射调用setter方法设置属性
                        setterMethod.invoke(resultObject, value);
                    }
                } catch (Exception e) {
                    // 处理异常
                }
            }
        }
        
        return resultObject;
    }
}
`,se=`
// Java动态代理实现AOP的示例
public class ProxyFactory {
    
    public static Object createProxy(Object target, InvocationHandler handler) {
        Class<?> targetClass = target.getClass();
        
        // 获取目标类的所有接口
        Class<?>[] interfaces = targetClass.getInterfaces();
        
        // 使用Java反射API创建动态代理
        return Proxy.newProxyInstance(
            targetClass.getClassLoader(),
            interfaces,
            handler
        );
    }
}

// 实现InvocationHandler接口
public class LoggingInvocationHandler implements InvocationHandler {
    
    private final Object target;
    
    public LoggingInvocationHandler(Object target) {
        this.target = target;
    }
    
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("Before method: " + method.getName());
        
        // 通过反射调用目标方法
        Object result = method.invoke(target, args);
        
        System.out.println("After method: " + method.getName());
        return result;
    }
}
`,ae={__name:"reflection",setup(ne){const g=O(),m=()=>{g.push("/java-interview")},r=p=>p.replace(/\b(public|private|protected|class|interface|static|final|void|int|boolean|String|new|return|throws|throw|try|catch|finally|null|true|false|this|super|extends|implements|abstract|instanceof|import|package)\b/g,'<span class="keyword">$1</span>').replace(/\/\/.+/g,'<span class="comment">$&</span>').replace(/\/\*[\s\S]*?\*\//g,'<span class="comment">$&</span>').replace(/(".*?")/g,'<span class="string">$1</span>').replace(/\b(\d+)\b/g,'<span class="number">$1</span>'),h=u([{title:"框架开发",description:"大多数框架（如Spring、MyBatis等）都使用反射来扫描、加载、实例化和管理Bean",code:v,analysis:"在Spring框架中，依赖注入核心机制就是通过反射实现的。如上面的简化代码所示，Spring首先通过反射获取类的字段和方法，检查是否存在@Autowired等注解，然后通过Field.set()或Method.invoke()方法注入依赖。这种方式可以将对象的创建和依赖管理从业务代码中分离出来，降低了耦合度。"},{title:"注解处理",description:"通过反射获取类、方法或字段上的注解，实现注解驱动的开发",code:v,analysis:"在Spring框架中，通过field.getAnnotation(Autowired.class)获取字段上的注解，然后根据注解的属性执行相应逻辑。注解本身不会影响程序行为，必须通过反射API获取并处理注解信息才能实现功能。这种机制使得框架可以通过简单的标记来实现复杂的功能。"},{title:"动态代理",description:"创建接口的动态实现，常用于AOP、RPC等技术",code:se,analysis:"Java动态代理是反射的一个重要应用，它允许在运行时创建一个实现了一组给定接口的新类。如代码所示，Proxy.newProxyInstance方法接收类加载器、接口数组和调用处理器，返回一个代理对象。当调用代理对象的方法时，会被转发到InvocationHandler的invoke方法，在这里可以在原方法执行前后添加额外逻辑，这正是AOP的核心机制。"},{title:"序列化与反序列化",description:"在转换对象与其表示形式时，需要动态创建对象并设置字段值",code:te,analysis:"MyBatis在ORM映射过程中，需要将数据库结果集映射到Java对象。如示例代码所示，它通过反射获取目标类的PropertyDescriptor，找到setter方法，然后通过Method.invoke()调用setter方法设置属性值。这种方式可以实现从关系型数据到对象的自动映射，极大地简化了数据访问层的代码。"},{title:"插件机制",description:"动态加载和实例化外部类，实现插件式架构",code:`// 插件加载器示例
public class PluginLoader {
    
    public static Plugin loadPlugin(String className) throws Exception {
        // 使用反射动态加载类
        Class<?> pluginClass = Class.forName(className);
        
        // 检查是否实现了Plugin接口
        if (!Plugin.class.isAssignableFrom(pluginClass)) {
            throw new IllegalArgumentException(className + " does not implement Plugin interface");
        }
        
        // 创建插件实例
        return (Plugin) pluginClass.newInstance();
    }
}`,analysis:"插件系统通常利用反射机制实现动态加载和实例化插件类。如示例代码所示，通过Class.forName()动态加载指定的类，然后通过newInstance()方法创建实例。这种机制使得应用程序可以在运行时发现并加载插件，实现高度的扩展性和灵活性，用户可以不修改核心代码就能添加新功能。"}]),b=u([{name:"Class类",methods:["Class.forName(String className)","getFields()/getDeclaredFields()","getMethods()/getDeclaredMethods()","getConstructors()/getDeclaredConstructors()","newInstance()","isInterface()/isEnum()/isArray()"]},{name:"Field类",methods:["getName()","getType()","get(Object obj)","set(Object obj, Object value)","setAccessible(boolean flag)"]},{name:"Method类",methods:["getName()","getParameterTypes()","getReturnType()","invoke(Object obj, Object... args)","setAccessible(boolean flag)"]},{name:"Constructor类",methods:["getParameterTypes()","newInstance(Object... args)","setAccessible(boolean flag)"]}]),y=["动态创建对象和调用方法","实现泛型编程","支持动态加载类","提高系统灵活性和扩展性"],f=["性能开销大","破坏了封装性","安全性问题","代码可读性降低","编译时类型检查失效"],M=["避免在性能敏感的代码中使用反射","缓存反射对象（Class、Method、Field等）","使用setAccessible(true)提高私有成员访问速度","合理使用反射，尽量减少反射调用次数","考虑替代方案，如代码生成、委托等"];return(p,t)=>(n(),a("div",x,[e("div",{class:"page-header"},[e("button",{class:"back-button",onClick:m}," ← 返回 "),t[0]||(t[0]=e("h1",{class:"page-title"},"Java反射详解",-1))]),t[17]||(t[17]=d('<section class="content-section" data-v-4076e81c><h2 class="section-title" data-v-4076e81c>1. 反射基础概述</h2><div class="content-card" data-v-4076e81c><p class="section-intro" data-v-4076e81c> Java反射是指在<strong data-v-4076e81c>运行时</strong>检查、分析和修改类、接口、字段和方法的能力。 通过反射，可以在运行时获取类的信息，并且操作类的属性和方法，即使它们是私有的。 </p><div class="info-box" data-v-4076e81c><h3 class="info-title" data-v-4076e81c>反射的核心用途</h3><ul data-v-4076e81c><li data-v-4076e81c>在运行时检查类、接口、字段和方法</li><li data-v-4076e81c>创建新的实例或调用方法</li><li data-v-4076e81c>访问和修改私有字段和方法</li><li data-v-4076e81c>动态加载类并创建对象</li><li data-v-4076e81c>实现通用组件，例如ORM框架、依赖注入容器等</li></ul></div></div></section>',1)),e("section",P,[t[2]||(t[2]=e("h2",{class:"section-title"},"2. 反射核心API",-1)),e("div",j,[t[1]||(t[1]=e("p",{class:"section-intro"}," Java反射API主要位于java.lang.reflect包中，核心类包括Class、Field、Method和Constructor。 ",-1)),(n(!0),a(o,null,c(b.value,(s,l)=>(n(),a("div",{key:l,class:"api-card"},[e("h3",_,i(s.name),1),e("ul",S,[(n(!0),a(o,null,c(s.methods,(w,A)=>(n(),a("li",{key:A},i(w),1))),128))])]))),128))])]),e("section",k,[t[6]||(t[6]=e("h2",{class:"section-title"},"3. 代码实例",-1)),e("div",N,[t[3]||(t[3]=e("h3",{class:"code-title"},"示例类",-1)),e("div",T,[e("pre",null,[e("code",{innerHTML:r(Z)},null,8,I)])]),t[4]||(t[4]=e("h3",{class:"code-title"},"反射操作",-1)),e("div",R,[e("pre",null,[e("code",{innerHTML:r(ee)},null,8,F)])]),t[5]||(t[5]=e("div",{class:"info-box"},[e("h3",{class:"info-title"},"关键步骤解析"),e("ol",null,[e("li",null,"获取Class对象：三种方式分别是类字面常量、getClass()方法和Class.forName()静态方法"),e("li",null,"获取类的字段：使用getDeclaredField获取私有字段，并通过setAccessible设置可访问"),e("li",null,"创建实例：通过Class对象的newInstance()方法创建实例"),e("li",null,"操作字段：通过Field的set、get方法读写字段值"),e("li",null,"调用方法：通过Method的invoke方法调用对象的方法，包括私有方法")])],-1))])]),e("section",z,[t[9]||(t[9]=e("h2",{class:"section-title"},"4. 常见应用场景",-1)),e("div",B,[e("div",E,[(n(!0),a(o,null,c(h.value,(s,l)=>(n(),a("div",{key:l,class:"application-item"},[e("h3",D,i(s.title),1),e("p",H,i(s.description),1),e("div",J,[t[8]||(t[8]=e("h4",null,"源码分析:",-1)),e("div",L,[e("pre",null,[e("code",{innerHTML:r(s.code)},null,8,q)])]),e("div",V,[t[7]||(t[7]=e("h4",null,"代码分析:",-1)),e("p",null,i(s.analysis),1)])])]))),128))])])]),e("section",W,[t[12]||(t[12]=e("h2",{class:"section-title"},"5. 优缺点分析",-1)),e("div",$,[e("div",Q,[e("div",U,[t[10]||(t[10]=e("h3",null,"优点",-1)),e("ul",null,[(n(),a(o,null,c(y,(s,l)=>e("li",{key:l},i(s),1)),64))])]),e("div",G,[t[11]||(t[11]=e("h3",null,"缺点",-1)),e("ul",null,[(n(),a(o,null,c(f,(s,l)=>e("li",{key:l},i(s),1)),64))])])])])]),e("section",K,[t[16]||(t[16]=e("h2",{class:"section-title"},"6. 性能问题与优化",-1)),e("div",X,[t[14]||(t[14]=e("p",{class:"section-intro"}," 反射操作比直接代码调用慢很多，主要因为需要进行类型检查和转换。以下是使用反射时的一些性能优化技巧： ",-1)),e("div",Y,[t[13]||(t[13]=e("h3",null,"性能优化建议",-1)),e("ul",null,[(n(),a(o,null,c(M,(s,l)=>e("li",{key:l},i(s),1)),64))])]),t[15]||(t[15]=d('<div class="info-box" data-v-4076e81c><h3 class="info-title" data-v-4076e81c>反射性能基准测试结果</h3><p data-v-4076e81c>直接方法调用: <strong data-v-4076e81c>1x</strong> (基准)</p><p data-v-4076e81c>反射方法调用(无优化): <strong data-v-4076e81c>~5-7x 慢</strong></p><p data-v-4076e81c>反射方法调用(setAccessible): <strong data-v-4076e81c>~3-4x 慢</strong></p><p data-v-4076e81c>反射方法调用(缓存+setAccessible): <strong data-v-4076e81c>~2-3x 慢</strong></p></div>',1))])]),t[18]||(t[18]=d('<section class="content-section" data-v-4076e81c><h2 class="section-title" data-v-4076e81c>7. 面试常见问题</h2><div class="content-card" data-v-4076e81c><div class="qa-section" data-v-4076e81c><div class="qa-item" data-v-4076e81c><h3 class="question" data-v-4076e81c>Q: 反射的原理是什么？</h3><p class="answer" data-v-4076e81c> A: Java反射的原理是在运行时，对于任何一个类，JVM都为其保存了一个对应的Class对象，包含了该类的所有信息。 通过这个Class对象，可以获取到类的所有信息（如方法、字段等），并对其进行操作。反射的实现依赖于JVM的内部机制， 特别是类加载系统和方法区（元空间）中存储的类型信息。 </p></div><div class="qa-item" data-v-4076e81c><h3 class="question" data-v-4076e81c>Q: 反射为什么会影响性能？</h3><p class="answer" data-v-4076e81c> A: 反射性能开销主要来自以下几个方面：1) 类型检查和转换；2) 安全性检查；3) 无法进行JIT编译器优化； 4) 可能导致JVM关闭某些优化。对于频繁调用的代码路径，反射可能成为性能瓶颈。 </p></div><div class="qa-item" data-v-4076e81c><h3 class="question" data-v-4076e81c>Q: 在Spring框架中反射是如何应用的？</h3><p class="answer" data-v-4076e81c> A: Spring框架大量使用反射：1) 依赖注入：通过反射设置Bean的属性；2) AOP：使用反射和动态代理创建切面； 3) 自动装配：通过反射检查类的结构和注解；4) 注解解析：扫描和处理@Component、@Autowired等注解。 </p></div><div class="qa-item" data-v-4076e81c><h3 class="question" data-v-4076e81c>Q: 反射与注解是什么关系？</h3><p class="answer" data-v-4076e81c> A: 注解本身不会对代码逻辑产生影响，需要通过反射机制来读取和处理注解。在运行时，可以通过反射API获取类、方法、字段上的注解， 并根据注解信息执行相应的逻辑。框架如Spring、MyBatis等正是利用这种机制来实现声明式编程。 </p></div></div></div></section>',1))]))}},ie=C(ae,[["__scopeId","data-v-4076e81c"]]);export{ie as default};
