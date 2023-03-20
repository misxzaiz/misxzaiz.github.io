---
layout:       post
title:        "Spring Security"
author:       "XiaoZaiz"
header-style: text
catalog:      true
tags:
    - Java
    - Spring
    - Security
---

# 一、介绍

功能： [认证（authentication）](https://springdoc.cn/spring-security/features/authentication/index.html)、[授权（authorization）](https://springdoc.cn/spring-security/features/authorization/index.html) 和 [保护](https://springdoc.cn/spring-security/features/exploits/index.html)。

保护：命令式和响应式应用程序。

源码：[Spring Security的源代码]([spring-projects/spring-security: Spring Security (github.com)](https://github.com/spring-projects/spring-security/))。

Spring Security是在 [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0.html) 下发布的开源软件。



# 二、特性

支持： [认证（authentication）](https://springdoc.cn/spring-security/features/authentication/index.html)、 [授权（authorization）](https://springdoc.cn/spring-security/features/authorization/index.html) 和对 [常见漏洞](https://springdoc.cn/spring-security/features/exploits/index.html#exploits) 的保护。



## 1、[认证（Authentication）](https://springdoc.cn/spring-security/features/authentication/index.html)

**认证**：去验证试图访问特定资源的人（请求）的身份。

常见**认证方法**：（长期凭证）账号密码、（短期凭证）Cookie、Session、OAuth、Token…。

**授权**：一旦通过认证，我们就可以进行授权。

**适用**：**Servlet**和**WebFlux**（响应式web框架）环境。



### 1.1 密码存储

**PasswordEncoder** 接口：对密码进行**单向转换**、存储在认证是需要与用户提供的密码进行比较的密码。

**双向密码转换**：如存储用于验证数据库的凭证。

#### （1）密码存储历史

| 方式 | 说明 | 破解      |
| ---- | ---- | --------- |
| 明文 |      | SQL注入等 |
| 单向哈希运行（如SHA-256）| 系统只需要存储密码的单向散列值。<br />当用户试图验证时，哈希密码将与他们输入的密码的哈希值进行比较。 | [彩虹表](https://en.wikipedia.org/wiki/Rainbow_table) |
| 加盐（明文） | 为每个用户的密码生成随机字节（称为盐）。<br />盐和用户的密码将通过散列函数运行，产生一个唯一的散列。<br />盐将与用户的密码一起以明文形式存储。<br />当用户试图验证时，哈希的密码将与存储的盐和他们输入的密码的哈希值进行比较。 |  |
| 自适应单向函数 | 自适应单向函数允许配置一个 “work factor” ，这个系数可以随着硬件的改进而增长。<br />我们建议将 “work factor” 调整为在你的系统上验证一个密码需要大约一秒钟。<br />应该使用的自适应单向函数的例子包括[bcrypt](https://springdoc.cn/spring-security/features/authentication/password-storage.html#authentication-password-storage-bcrypt), [PBKDF2](https://springdoc.cn/spring-security/features/authentication/password-storage.html#authentication-password-storage-pbkdf2), [scrypt](https://springdoc.cn/spring-security/features/authentication/password-storage.html#authentication-password-storage-scrypt), 和 [argon2](https://springdoc.cn/spring-security/features/authentication/password-storage.html#authentication-password-storage-argon2) |  |

#### （2）资源密集型

资源密集型：他们有意使用大量的CPU、内存或其他资源。

因为**自适应单向函数**是有意进行资源密集型的，为每个请求验证一个用户名和密码会大大降低应用程序的性能。

Spring Security（或任何其他库）都无法加快密码验证的速度，因为安全是通过使验证资源密集来获得的。

我们鼓励用户用**长期凭证（即用户名和密码）**交换**短期凭证（如会话和 OAuth Token 等）**。短期凭证可以被快速验证，而不会有任何安全上的损失。

#### （3）DelegatingPasswordEncoder（Delegating：授权）

| 编码器（PasswordEncoder)  | 说明       | 版本                      |
| ------------------------- | ---------- | ------------------------- |
| NoOpPasswordEncoder       | 纯文本密码 | spring security 5（之前） |
| BCryptPasswordEncoder     |            |                           |
| DelegatingPasswordEncoder |            |                           |

##### 问题：

- 许多应用程序使用旧的密码编码（password encode），不能轻易迁移。

- 密码存储的最佳实践将再次改变。
- 作为一个框架，Spring Security 不能频繁地进行破坏性的改变。

##### DelegatingPasswordEncoder的作用

- 确保通过使用当前的密码存储建议对密码进行编码。

- 允许验证现代和传统格式的密码。

- 允许在未来升级编码。

##### PasswordEncoderFactories 

  作用：构建 `DelegatingPasswordEncoder` 的实例。

实例一：（默认）Default DelegatingPasswordEncoder

```java
PasswordEncoder passwordEncoder =
    PasswordEncoderFactories.createDelegatingPasswordEncoder();
```

实例二：（自定义）Custon DelegatingPasswordEncoder

```java
String idForEncode = "bcrypt";
Map encoders = new HashMap<>();
encoders.put(idForEncode, new BCryptPasswordEncoder());
encoders.put("noop", NoOpPasswordEncoder.getInstance());
encoders.put("pbkdf2", Pbkdf2PasswordEncoder.defaultsForSpringSecurity_v5_5());
encoders.put("pbkdf2@SpringSecurity_v5_8", Pbkdf2PasswordEncoder.defaultsForSpringSecurity_v5_8());
encoders.put("scrypt", SCryptPasswordEncoder.defaultsForSpringSecurity_v4_1());
encoders.put("scrypt@SpringSecurity_v5_8", SCryptPasswordEncoder.defaultsForSpringSecurity_v5_8());
encoders.put("argon2", Argon2PasswordEncoder.defaultsForSpringSecurity_v5_2());
encoders.put("argon2@SpringSecurity_v5_8", Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8());
encoders.put("sha256", new StandardPasswordEncoder());

PasswordEncoder passwordEncoder =
    new DelegatingPasswordEncoder(idForEncode, encoders);
```

##### （3-1）密码存储格式

```tex
{id}encodedPassword
```

| 名称            | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| id（标识符）    | 查询应使用那个 PasswordEncoder，<br />如果找不到 `id`，`id` 将被设置为null。 |
| encodedPassword | 是所选 PasswordEncoder 的原始编码密码                        |

编码示例（原始密码：password）

```tex
{bcrypt}$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG
{noop}password
{pbkdf2}5d923b44a6d129f3ddf3e3c8d29412723dcbde72445e8ef6bf3b508fbf17fa4ed4d6b99ca763d8dc
{scrypt}$e0801$8bWJaSu2IKSn9Z9kM+TPXfOc/9bdYSrN1oD9qfVThWEwdRTnO7re7Ei+fUZRJ68k9lTyuTeUp4of4g24hHnazw==$OAOec05+bXxvuu/1qZ6NUR+xQYvYv7BeL1QxwRpY5Pc=
{sha256}97cde38028ad898ebc02e690819fa220e88c62e0699403e94fff291cfffaf8410849f27605abcbc0
```

##### （3-2）密码编码 encode(CharSequence)

传递给构造函数的 `idForEncode` 决定了哪一个 `PasswordEncoder` 被用于编码密码。在我们之前构建的 `DelegatingPasswordEncoder` 中，这意味着编码密码的结果被委托给 `BCryptPasswordEncoder`，并以 `{bcrypt}` 为前缀。

##### （3-3）密码匹配 matches(CharSequence, String)

匹配是基于 `{id}` 和构造函数中提供的 `id` 到 `PasswordEncoder` 的映射。我们在[密码存储格式](https://springdoc.cn/spring-security/features/authentication/password-storage.html#authentication-password-storage-dpe-format)中的例子提供了一个如何实现的工作实例。默认情况下，用一个密码和一个没有映射的id（包括空id）调用 `matches(CharSequence, String)` 的结果是 `IllegalArgumentException`。这个行为可以通过使用 `DelegatingPasswordEncoder.setDefaultPasswordEncoderForMatches(PasswordEncoder)` 来定制。

通过使用 `id`，我们可以在任何密码编码上进行匹配，但通过使用最现代的密码编码对密码进行编码。这一点很重要，因为与加密不同，密码散列（Hash）的设计使我们没有简单的方法来恢复明文。既然没有办法恢复明文，那么就很难迁移密码了。虽然用户迁移 `NoOpPasswordEncoder` 很简单，但我们选择默认包含它，以使它的入门体验更简单。

##### （3-4）入门体验：withDefaultPasswordEncoder

```java
UserBuilder users = User.withDefaultPasswordEncoder();
User user = users
  .username("user")
  .password("password")
  .roles("USER")
  .build();
System.out.println(user.getPassword());
// {bcrypt}$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG
User admin = users
  .username("admin")
  .password("password")
  .roles("USER","ADMIN")
  .build();
```

这确实对存储的密码进行了哈希处理，但密码仍然暴露在内存和编译后的源代码中。因此，对于生产环境来说，它仍然不被认为是安全的。对于生产来说，你应该在外部[对你的密码进行散列（Hash）](https://springdoc.cn/spring-security/features/authentication/password-storage.html#authentication-password-storage-boot-cli)。

##### （3-5）用Spring Boot CLI进行编码

对密码进行正确编码的最简单方法是使用 [Spring Boot CLI](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-cli.html)。

##### （3-6）故障排除

如[密码存储格式](https://springdoc.cn/spring-security/features/authentication/password-storage.html#authentication-password-storage-dpe-format)中所述，当被存储的密码之一没有 `id` 时，会出现以下错误。

```tex
java.lang.IllegalArgumentException: There is no PasswordEncoder mapped for the id "null"
	at org.springframework.security.crypto.password.DelegatingPasswordEncoder$UnmappedIdPasswordEncoder.matches(DelegatingPasswordEncoder.java:233)
	at org.springframework.security.crypto.password.DelegatingPasswordEncoder.matches(DelegatingPasswordEncoder.java:196)
```

解决这个问题的最简单方法是弄清楚你的密码目前是如何存储的，并明确地提供正确的 `PasswordEncoder`。

如果你是从Spring Security 4.2.x迁移过来的，你可以通过[暴露一个 `NoOpPasswordEncoder` bean](https://springdoc.cn/spring-security/features/authentication/password-storage.html#authentication-password-storage-configuration)来恢复到以前的行为。

另外，你可以在所有的密码前加上正确的 `id`，并继续使用 `DelegatingPasswordEncoder`。例如，如果你使用的是BCrypt，你可以将你的密码从类似的地方迁移过来。

```
$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG
```

迁移为如下：

```none
{bcrypt}$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG
Copied!
```

关于映射的完整列表，请参见 [`PasswordEncoderFactories`](https://docs.spring.io/spring-security/site/docs/5.0.x/api/org/springframework/security/crypto/factory/PasswordEncoderFactories.html) 的Javadoc。

#### （4）BCryptPasswordEncoder

`BCryptPasswordEncoder` 的实现使用广泛支持的 [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) 算法对密码进行散列。为了使它对密码破解有更强的抵抗力，bcrypt故意做得很慢。像其他自适应单向函数一样，它应该被调整为在你的系统上验证一个密码需要1秒左右。`BCryptPasswordEncoder` 的默认实现使用 [`BCryptPasswordEncoder`](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/crypto/bcrypt/BCryptPasswordEncoder.html) 的 Javadoc 中提到的强度10。我们鼓励你在自己的系统上调整和测试强度参数，使其大约需要1秒钟来验证一个密码。

```java
// Create an encoder with strength 16
BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
String result = encoder.encode("myPassword");
assertTrue(encoder.matches("myPassword", result));
```

#### （5）Argon2PasswordEncoder

`Argon2PasswordEncoder` 的实现使用 [Argon2](https://en.wikipedia.org/wiki/Argon2) 算法对密码进行散列。Argon2是 [密码哈希大赛](https://en.wikipedia.org/wiki/Password_Hashing_Competition) 的冠军。为了打败定制硬件上的密码破解，Argon2是一种故意的慢速算法，需要大量的内存。像其他自适应单向函数一样，它应该被调整为在你的系统上验证一个密码需要1秒左右。 `Argon2PasswordEncoder` 的当前实现需要 BouncyCastle。

```java
// Create an encoder with all the defaults
Argon2PasswordEncoder encoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
String result = encoder.encode("myPassword");
assertTrue(encoder.matches("myPassword", result));
```

#### （7）Pbkdf2PasswordEncoder

`Pbkdf2PasswordEncoder` 的实现使用 [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) 算法对密码进行散列。为了抵御密码破解，PBKDF2是一种故意的慢速算法。像其他自适应单向函数一样，它应该被调整为在你的系统上验证一个密码需要1秒左右。当需要FIPS认证时，这种算法是一个不错的选择。

```java
// Create an encoder with all the defaults
Pbkdf2PasswordEncoder encoder = Pbkdf2PasswordEncoder.defaultsForSpringSecurity_v5_8();
String result = encoder.encode("myPassword");
assertTrue(encoder.matches("myPassword", result));
```

#### （8）SCryptPasswordEncoder

`SCryptPasswordEncoder` 的实现使用 [scrypt](https://en.wikipedia.org/wiki/Scrypt) 算法对密码进行散列。为了打败定制硬件上的密码破解，scrypt是一个故意的慢速算法，需要大量的内存。像其他自适应单向函数一样，它应该被调整为在你的系统上验证一个密码需要1秒左右。

```java
// Create an encoder with all the defaults
SCryptPasswordEncoder encoder = SCryptPasswordEncoder.defaultsForSpringSecurity_v5_8();
String result = encoder.encode("myPassword");
assertTrue(encoder.matches("myPassword", result));
```

#### （9）其他 PasswordEncoder

有相当数量的其他 `PasswordEncoder` 实现，它们的存在完全是为了向后兼容。它们都被废弃了，表明它们不再被认为是安全的。然而，没有计划删除它们，因为迁移现有的遗留系统很困难。

#### （10）密码存储配置

Spring Security 默认使用 [DelegatingPasswordEncoder](https://springdoc.cn/spring-security/features/authentication/password-storage.html#authentication-password-storage-dpe)。然而，你可以通过将 `PasswordEncoder` 暴露为 Spring Bean 来进行定制。

如果你是从 Spring Security 4.2.x 迁移过来的，你可以通过暴露一个 `NoOpPasswordEncoder` Bean 来恢复到以前的行为。

恢复到 `NoOpPasswordEncoder` 被认为是不安全的。你应该转而使用 `DelegatingPasswordEncoder` 来支持安全的密码编码。

```java
@Bean
public static NoOpPasswordEncoder passwordEncoder() {
    return NoOpPasswordEncoder.getInstance();
}
```



#### （11）更改密码配置

大多数允许用户指定密码的应用程序也需要一个更新密码的功能。

[用于更改密码的 Well-Known URL](https://w3c.github.io/webappsec-change-password-url/) 表示一种机制，密码管理器可以通过该机制发现特定应用程序的密码更新端点。

你可以配置 Spring Security 来提供这个发现端点。例如，如果你的应用程序中更改密码的端点是 `/change-password`，那么你可以这样配置 Spring Security。

```java
http
    .passwordManagement(Customizer.withDefaults())
```



然后，当密码管理器导航到 `/.well-known/change-password` 时，Spring Security 将重定向你的端点，`/change-password`。

或者，如果你的端点是 `/change-password` 以外的东西，你也可以像这样指定。

```java
http
    .passwordManagement((management) -> management
        .changePasswordPage("/update-password")
    )
```

通过上述配置，当密码管理器导航到 `/.well-known/change-password` 时，那么Spring Security 将重定向到 `/update-password`。

## 2、[防范漏洞攻击](https://springdoc.cn/spring-security/features/exploits/index.html)

### 2.1 CSRF

#### （1）[什么是CSRF攻击？](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-explained)

假设你的银行网站提供了一个表单（form），允许将当前登录的用户的钱转到另一个银行账户。例如，这个转账表格可能看起来像下面这样。

```html
<form method="post"
	action="/transfer">
<input type="text"
	name="amount"/>
<input type="text"
	name="routingNumber"/>
<input type="text"
	name="account"/>
<input type="submit"
	value="Transfer"/>
</form>
```

相应的HTTP请求可能看起来下面这样。

```http
POST /transfer HTTP/1.1
Host: bank.example.com
Cookie: JSESSIONID=randomid
Content-Type: application/x-www-form-urlencoded

amount=100.00&routingNumber=1234&account=9876
```

现在假装你登录了你的银行网站，然后在没有注销的情况下，访问一个邪恶的网站。这个“邪恶的网站”包含一个HTML页面，上面有以下表单（form）。

```html
<form method="post"
	action="https://bank.example.com/transfer">
<input type="hidden"
	name="amount"
	value="100.00"/>
<input type="hidden"
	name="routingNumber"
	value="evilsRoutingNumber"/>
<input type="hidden"
	name="account"
	value="evilsAccountNumber"/>
<input type="submit"
	value="Win Money!"/>
</form>
```

你喜欢赢钱（Win Money），所以你点击了提交按钮。在这个过程中，你无意中把100美元转给了一个恶意的用户。发生这种情况的原因是，虽然“邪恶网站”看不到你的cookie，但与你的银行相关的cookie仍然与请求一起被发送。

更糟糕的是，这整个过程本来可以通过使用JavaScript自动完成。这意味着你甚至不需要点击这个按钮。此外，在访问一个遭受 [XSS攻击](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)) 的“诚实网站”时，它也可能很容易发生。那么，我们如何保护我们的用户免受此类攻击？

#### （2）[防范CSRF攻击](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-protection)

CSRF攻击之所以可能，是因为来自受害者网站的HTTP请求和来自攻击者网站的请求是完全相同的。这意味着没有办法拒绝来自“邪恶网站”的请求而只允许来自银行网站的请求。为了防止CSRF攻击，我们需要确保请求中存在“邪恶网站”无法提供的东西，这样我们就可以区分这两个请求。

Spring提供了两种机制来防止CSRF攻击。

- [同步令牌（Synchronizer Token）模式](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-protection-stp)

- 在你的 session cookie 上指定 [SameSite 属性](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-protection-ssa)

  这两种保护措施都要求 [Safe Method 必须是幂等的](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-protection-idempotent)。

##### （2-1）[Safe Method 必须是幂等的](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-protection-idempotent)

为了使对CSRF的[保护](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-protection)发挥作用，应用程序必须确保 [安全的HTTP请求方法必须是幂等的](https://tools.ietf.org/html/rfc7231#section-4.2.1) 的。这意味着使用 HTTP `GET`、`HEAD`、`OPTIONS` 和 `TRACE` 方法的请求不应该改变应用程序的状态。

##### （2-2）[同步令牌（Synchronizer Token）模式](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-protection-stp)

防止CSRF攻击的最主要和最全面的方法是使用 [Synchronizer Token 模式](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#synchronizer-token-pattern)。这个解决方案是确保每个HTTP请求除了需要我们的会话cookie外，还需要在HTTP请求中出现一个被称为CSRF令牌的安全随机生成值。

当一个HTTP请求被提交时，服务器必须查找预期的CSRF令牌，并将其与HTTP请求中的实际CSRF令牌进行比较。如果数值不匹配，HTTP请求应被拒绝。

这个工作的关键是，实际的CSRF令牌应该在HTTP请求的某个部分，而不是由浏览器自动包含。例如，在HTTP参数或HTTP header 中要求实际的CSRF令牌可以防止CSRF攻击。在cookie中要求实际的CSRF令牌不起作用，因为cookie会被浏览器自动包含在HTTP请求中。

我们可以放宽预期，只要求每个更新应用程序状态的HTTP请求提供实际的CSRF令牌。要做到这一点，我们的应用程序必须确保 [Safe Method 必须是幂等的](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-protection-idempotent)。这提高了可用性，因为我们希望允许从外部网站链接到我们的网站。此外，我们不希望在HTTP GET中包含随机令牌（Token），因为这可能导致令牌被泄露。

考虑一下当我们使用 Synchronizer Token 模式时，[我们的例子](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-explained)会有什么变化。假设实际的CSRF令牌被要求放在一个名为 `_csrf` 的HTTP参数中。我们的应用程序的传输形式将看起来像下面一样。

```html
<form method="post"
	action="/transfer">
<input type="hidden"
	name="_csrf"
	value="4bfd1575-3ad1-4d21-96c7-4ef2d9f86721"/>
<input type="text"
	name="amount"/>
<input type="text"
	name="routingNumber"/>
<input type="hidden"
	name="account"/>
<input type="submit"
	value="Transfer"/>
</form>
```

表单现在包含一个隐藏的 input，其中有CSRF令牌的值。外部网站无法读取CSRF令牌，因为相同的起源策略确保“邪恶网站”无法读取响应。

相应的转移资金的HTTP请求看起来是这样的。

```http
POST /transfer HTTP/1.1
Host: bank.example.com
Cookie: JSESSIONID=randomid
Content-Type: application/x-www-form-urlencoded

amount=100.00&routingNumber=1234&account=9876&_csrf=4bfd1575-3ad1-4d21-96c7-4ef2d9f86721
```

你会注意到，现在的HTTP请求包含了 `_csrf` 参数的安全随机值。“邪恶网站”将无法为 `_csrf` 参数提供正确的值（必须在“邪恶网站”上明确提供），当服务器将实际的CSRF令牌与预期的CSRF令牌进行比较时，传输将会失败。

##### （2-3）[SameSite 属性](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-protection-ssa)

防止 [CSRF攻击](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-explained) 的一个新方法是在cookie上指定 the [SameSite 属性](https://tools.ietf.org/html/draft-west-first-party-cookies)。服务器可以在设置cookie时指定 `SameSite` 属性，以表明来自外部网站的cookie不应该被发送。

Spring Security 不直接控制session cookie的创建，所以它不提供对 `SameSite` 属性的支持。 [Spring Session](https://spring.io/projects/spring-session) 在基于Servlet的应用程序中提供了对 `SameSite` 属性的支持。Spring Framework 的 [`CookieWebSessionIdResolver`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/server/session/CookieWebSessionIdResolver.html) 在基于WebFlux的应用程序中提供了对 `SameSite` 属性的开箱支持。

一个例子，带有 `SameSite` 属性的HTTP响应头可能看起来像下面这样。

```http
Set-Cookie: JSESSIONID=randomid; Domain=bank.example.com; Secure; HttpOnly; SameSite=Lax
```

`SameSite` 属性的有效值如下。

- `Strict`: 当指定时，任何来自 [同一站点](https://tools.ietf.org/html/draft-west-first-party-cookies-07#section-2.1) 的请求都包括该cookie。否则，cookie不包括在HTTP请求中。
- `Lax`: 当指定时，当来自 [同一站点](https://tools.ietf.org/html/draft-west-first-party-cookies-07#section-2.1) 或请求来自顶级导航且 [Safe Method 必须是幂等的](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-protection-idempotent) 时，将发送cookie。否则，cookie不包括在HTTP请求中。

关于 `SameSite` 属性的详细内容可以参考： [Cookie 的 SameSite 属性](https://springboot.io/t/topic/1253)

考虑一下[我们的例子](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-explained)如何使用 `SameSite` 属性进行保护。银行应用程序可以通过在会话cookie上指定 `SameSite` 属性来防止CSRF。

在我们的 Session cookie 上设置了 `SameSite` 属性后，浏览器会在来自银行网站的请求中继续发送 `JESSIONID` cookie。然而，在来自“邪恶网站”的传输请求中，浏览器不再发送 `JESSIONID` cookie。由于session 不再出现在来自“邪恶网站”的传输请求中，应用程序被保护免受CSRF攻击。

在使用 `SameSite` 属性保护CSRF攻击时，有一些重要的 [注意事项](https://tools.ietf.org/html/draft-west-first-party-cookies-07#section-5) 需要注意。

将 `SameSite` 属性设置为 `Strict` 提供了更强的防御，但会使用户感到困惑。考虑到一个用户一直在登录一个托管在 [social.example.com](https://social.example.com/) 的社交媒体网站。该用户在 [email.example.org](https://email.example.org/) ，收到一封电子邮件，其中包括一个指向该社交媒体网站的链接。如果用户点击了这个链接，他们理所当然地期望被认证到该社交媒体网站。然而，如果 `SameSite` 属性是 `Strict` 的，cookie将不会被发送，因此用户将不会被认证。

我们可以通过实现 [gh-7537](https://github.com/spring-projects/spring-security/issues/7537) 来改善 `SameSite` 对CSRF攻击的保护和实用性。

另一个明显的考虑是，为了使 `SameSite` 属性能够保护用户，浏览器必须支持 `SameSite` 属性。大多数现代浏览器确实 [支持 `SameSite` 属性](https://developer.mozilla.org/en-US/docs/Web/HTTP/headers/Set-Cookie#Browser_compatibility)。然而，仍在使用的旧版浏览器可能不支持。

由于这个原因，我们通常建议将 `SameSite` 属性作为深度防御，而不是唯一的保护措施来防止CSRF攻击。

#### （3）[何时使用CSRF保护](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-when)

什么时候应该使用CSRF保护？我们的建议是，对任何可能被正常用户的浏览器处理的请求使用CSRF保护。如果你正在创建一个只被非浏览器客户端使用的服务，你可能想禁用CSRF保护。

##### （3-1）[CSRF保护和JSON](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-when-json)

一个常见的问题是 "我需要保护由JavaScript发出的JSON请求吗？" 简短的回答是：看情况。然而，你必须非常小心，因为有一些CSRF漏洞可以影响JSON请求。例如，一个恶意的用户可以 [通过使用以下形式用JSON创建一个CSRF](http://blog.opensecurityresearch.com/2012/02/json-csrf-with-parameter-padding.html)。

```html
<form action="https://bank.example.com/transfer" method="post" enctype="text/plain">
	<input name='{"amount":100,"routingNumber":"evilsRoutingNumber","account":"evilsAccountNumber", "ignore_me":"' value='test"}' type='hidden'>
	<input type="submit"
		value="Win Money!"/>
</form> 
```

这将产生以下JSON结构。

```js
{
"amount": 100,
"routingNumber": "evilsRoutingNumber",
"account": "evilsAccountNumber",
"ignore_me": "=test"
}
```

如果一个应用程序没有验证 `Content-Type` 头，它就会暴露在这个漏洞中。根据设置，一个验证了 Content-Type 的 Spring MVC 应用程序仍然可以通过修改URL后缀为 `.json` 而被利用，如下所示。

```html
<form action="https://bank.example.com/transfer.json" method="post" enctype="text/plain">
	<input name='{"amount":100,"routingNumber":"evilsRoutingNumber","account":"evilsAccountNumber", "ignore_me":"' value='test"}' type='hidden'>
	<input type="submit"
		value="Win Money!"/>
</form>
```



##### （3-2）[CSRF和无状态浏览器应用](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-when-stateless)

如果我的应用程序是无状态的呢？这并不一定意味着你得到了保护。事实上，如果用户不需要在网络浏览器中对某一请求进行任何操作，他们很可能仍然容易受到CSRF攻击。

例如，考虑一个使用自定义cookie的应用程序，该cookie中包含了所有用于验证的状态（而不是JSESSIONID）。当CSRF攻击发生时，自定义cookie与请求一起被发送，其方式与我们前面的例子中的JSESSIONID cookie被发送的方式相同。这个应用程序很容易受到CSRF攻击。

使用基本认证的（basic authentication）应用程序也容易受到CSRF攻击。由于浏览器在任何请求中都会自动包含用户名和密码，与我们之前的例子中发送JSESSIONID cookie的方式相同，所以该应用程序容易受到攻击。

#### （4）[CSRF的考虑因素](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-considerations)

##### （4-1）[登录](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-considerations-login)

为了防止 [伪造登录请求](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Forging_login_requests)，应该保护登录的HTTP请求免受CSRF攻击。防止伪造登录请求是必要的，这样恶意的用户就不能读取受害者的敏感信息。攻击的方式如下。

1. 恶意用户用“恶意用户的凭证”进行CSRF登录。受害者现在被认证为恶意用户。
2. 恶意用户然后欺骗受害者访问被攻击的网站并输入敏感信息。
3. 这些信息与恶意用户的账户相关联，因此恶意用户可以用他们自己的凭证登录并查看受害者的敏感信息。

确保登录的HTTP请求免受CSRF攻击的一个可能的复杂情况是，用户可能会遇到会话超时的情况，导致请求被拒绝。会话超时对于那些不期望需要会话来登录的用户来说是令人惊讶的。欲了解更多信息，请参考[CSRF 和会话（Session）超时](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-considerations-timeouts)。

##### （4-2）[退出登录](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-considerations-logout)

为了防止伪造的注销请求，注销的HTTP请求应该被保护起来，以防止CSRF攻击。防止伪造注销请求是必要的，这样恶意的用户就不能读取受害者的敏感信息。关于攻击的细节，请看 [这篇博文](https://labs.detectify.com/2017/03/15/loginlogout-csrf-time-to-reconsider/)。

要确保注销HTTP请求受到CSRF攻击的保护，一个可能的复杂情况是，用户可能会遇到会话超时的情况，导致请求被拒绝。会话超时对于那些不期望有会话来注销的用户来说是令人惊讶的。欲了解更多信息，请参阅 [CSRF 和会话（Session）超时](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-considerations-timeouts)。

##### （4-3）[CSRF 和会话（Session）超时](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-considerations-timeouts)

更多时候，预期的CSRF令牌被存储在会话中。这意味着，一旦会话过期，服务器就找不到预期的CSRF令牌而拒绝HTTP请求。有许多选项（每个选项都有交换条件）来解决超时问题。

- 缓解超时的最好方法是使用JavaScript在表单提交时请求一个CSRF令牌。然后用CSRF令牌更新表单并提交。

- 另一个选择是有一些JavaScript，让用户知道他们的会话即将到期。用户可以点击一个按钮来继续并刷新会话。

- 最后，预期的CSRF令牌可以存储在一个cookie中。这可以让预期的CSRF令牌在会话中失效。

  有人可能会问，为什么预期的CSRF令牌默认不存储在cookie中。这是因为有一些已知的漏洞，在这些漏洞中，header 信息（例如，用于指定cookie）可以由另一个域来设置。这与Ruby on Rails [在 `X-Requested-With` header出现时不再跳过CSRF检查](https://weblog.rubyonrails.org/2011/2/8/csrf-protection-bypass-in-ruby-on-rails/)的原因相同。关于如何执行该漏洞的细节，请参见 [webappsec.org 的这个文章](https://web.archive.org/web/20210221120355/https://lists.webappsec.org/pipermail/websecurity_lists.webappsec.org/2011-February/007533.html)。另一个缺点是，通过移除状态（即超时），你就失去了在令牌被泄露时强行使其失效的能力。

##### （4-4）[Multipart （文件上传）](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-considerations-multipart)

保护 Multipart 请求（文件上传）免受CSRF攻击会导致一个 [鸡或蛋](https://en.wikipedia.org/wiki/Chicken_or_the_egg) 的问题。为了防止CSRF攻击的发生，必须读取HTTP请求的主体以获得实际的CSRF令牌。然而，读取正文意味着文件被上传，这意味着一个外部网站可以上传文件。

有两种方法可以使用CSRF保护 `multipart/form-data`。

- [在请求体中放置CSRF令牌](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-considerations-multipart-body)
- [在URL中放置CSRF令牌](https://springdoc.cn/spring-security/features/exploits/csrf.html#csrf-considerations-multipart-url)

每种选择都有其利弊得失。

### 2.2 HTTP Header

### 2.3 HTTP

## 3、[整合](https://springdoc.cn/spring-security/features/integrations/index.html)



# API

[Overview (spring-security-docs 6.0.2 API)](https://docs.spring.io/spring-security/site/docs/6.0.x/api/index.html)

## 一、密码

- PasswordEncoder
- DelegatingPasswordEncoder
- PasswordEncoderFactories 
- withDefaultPasswordEncoder



