import{_ as e,E as a,r as s,s as r,q as t,n as o,o as d,d as l,b as i,a as n,w as u,F as m,g as p,i as f,f as c,h as g}from"./index-191a9f24.js";import{_ as h}from"./wx.22dfd836.js";const w=e({name:"login.vue",data:()=>({drawerWx:!1,form:{phone:"",password:""}}),methods:{formSubmit(){""!==this.form.phone&&""!==this.form.password?s({url:"/api/auth/login/phone/password/getUserDto",method:"POST",data:this.form,success:e=>{200===e.data.code?(r("token",e.data.data.token),r("userDto",JSON.stringify(e.data.data.userDto)),this.getFriendList(e.data.data.userDto.uid),a({message:e.data.message,type:"success"}),t({url:"/pages/campus/index/index"}).then((e=>{}))):a.error(e.data.message)},fail:()=>{}}):a.error("请输入手机号密码")},getFriendList(e){s({url:"/api/web/user-friend/getUserFriendList",success:a=>{200===a.data.code&&r(`${e}myFriendList`,JSON.stringify(a.data.data))}})},goTo(e){o({url:e})}}},[["render",function(e,a,s,r,t,o){const w=p("el-drawer"),b=p("van-field"),y=p("van-button"),_=p("van-form"),x=f;return d(),l(m,null,[i("div",null,[i("div",{onClick:a[0]||(a[0]=e=>t.drawerWx=!0),style:{color:"red","padding-top":"5%","padding-left":"5%"}},"有问题联系我")]),n(w,{modelValue:t.drawerWx,"onUpdate:modelValue":a[1]||(a[1]=e=>t.drawerWx=e),size:"100%"},{default:u((()=>[i("img",{src:h,alt:"",style:{width:"100%"}})])),_:1},8,["modelValue"]),n(x,{class:"container"},{default:u((()=>[n(x,null,{default:u((()=>[n(_,{ref:"form","lazy-validation":""},{default:u((()=>[n(b,{modelValue:t.form.phone,"onUpdate:modelValue":a[2]||(a[2]=e=>t.form.phone=e),label:"手机号",placeholder:"请输入手机号",required:"",clearable:""},null,8,["modelValue"]),n(b,{type:"password",modelValue:t.form.password,"onUpdate:modelValue":a[3]||(a[3]=e=>t.form.password=e),label:"密码",placeholder:"请输入密码",required:"",clearable:"","show-password":""},null,8,["modelValue"]),n(y,{type:"primary",onClick:o.formSubmit,class:"submit-button"},{default:u((()=>[c("登录")])),_:1},8,["onClick"]),n(y,{type:"default",class:"register-button",onClick:a[4]||(a[4]=e=>o.goTo("./register"))},{default:u((()=>[c("注册")])),_:1}),g(" 添加注册按钮 ")])),_:1},512)])),_:1})])),_:1})],64)}],["__scopeId","data-v-5eb01ca3"]]);export{w as default};
