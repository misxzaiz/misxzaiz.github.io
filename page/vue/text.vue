<template>
  <div>
    <nav>
      <ul>
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/about">关于我们</router-link></li>
        <li><router-link to="/contact">联系我们</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
}
</script> 

<!-- 以上代码是一个基本的 Vue 导航栏实例，包含三个路由链接，分别指向首页、关于我们和联系我们。 -->
