import{_ as a,E as e,p as r,s as o,n as s,o as t,c as d,a as l,b as i,w as n,F as u,e as m,i as f,g as p,h as c}from"./index-2f00a868.js";import"./main.a42a16a3.js";import{l as h}from"./user.3c0c43df.js";import{g}from"./userFriend.c3700f7c.js";import{_ as w}from"./wx.9b4e9afb.js";const b=a({name:"login.vue",data:()=>({drawerWx:!1,form:{phone:"",password:""}}),methods:{formSubmit(){""!==this.form.phone&&""!==this.form.password?h(this.form).then((a=>{200===a.data.code?(r("token",a.data.data.token),r("userDto",JSON.stringify(a.data.data.userDto)),this.getFriendList(a.data.data.userDto.uid),e({message:a.data.message,type:"success"}),o({url:"/h5"}).then((a=>{}))):e.error(a.data.message)})):e.error("请输入手机号密码")},getFriendList(a){g().then((e=>{200===e.data.code&&r(a+"myFriendList",JSON.stringify(e.data.data))}))},goTo(a){s({url:a})}}},[["render",function(a,e,r,o,s,h){const g=m("el-drawer"),b=m("van-field"),y=m("van-button"),_=m("van-form"),v=f;return t(),d(u,null,[l("div",null,[l("div",{onClick:e[0]||(e[0]=a=>s.drawerWx=!0),style:{color:"red","padding-top":"5%","padding-left":"5%"}},"有问题联系我")]),i(g,{modelValue:s.drawerWx,"onUpdate:modelValue":e[1]||(e[1]=a=>s.drawerWx=a),size:"100%"},{default:n((()=>[l("img",{src:w,alt:"",style:{width:"100%"}})])),_:1},8,["modelValue"]),i(v,{class:"container"},{default:n((()=>[i(v,null,{default:n((()=>[i(_,{ref:"form","lazy-validation":""},{default:n((()=>[i(b,{modelValue:s.form.phone,"onUpdate:modelValue":e[2]||(e[2]=a=>s.form.phone=a),label:"手机号",placeholder:"请输入手机号",required:"",clearable:""},null,8,["modelValue"]),i(b,{type:"password",modelValue:s.form.password,"onUpdate:modelValue":e[3]||(e[3]=a=>s.form.password=a),label:"密码",placeholder:"请输入密码",required:"",clearable:"","show-password":""},null,8,["modelValue"]),i(y,{type:"primary",onClick:h.formSubmit,class:"submit-button"},{default:n((()=>[p("登录")])),_:1},8,["onClick"]),i(y,{type:"default",class:"register-button",onClick:e[4]||(e[4]=a=>h.goTo("./register"))},{default:n((()=>[p("注册")])),_:1}),c(" 添加注册按钮 ")])),_:1},512)])),_:1})])),_:1})],64)}],["__scopeId","data-v-4bf10611"]]);export{b as default};