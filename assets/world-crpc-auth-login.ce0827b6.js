import{_ as e,k as l,p as r,m as a,E as o,n as s,o as d,c as t,a as u,b as n,w as m,e as c,g as p}from"./index-e7ff3e93.js";import{d as i}from"./crpc.391cfe69.js";const f=e({data:()=>({userInfo:{account:"",password:""},server:{ip:"",port:""},rememberPassword:!0,rememberServer:!0}),created(){const e=l("userInfo");e&&(this.userInfo=e);const r=l("server");r&&(this.server=r)},methods:{login(){var e;this.rememberServer?r("server",this.server):a("server"),this.rememberPassword?r("userInfo",this.userInfo):a("userInfo"),(e=this.userInfo,i("CrpcServer/AuthService/login/V1",e)).then((e=>{200===e.data.data.code?(r("token",e.data.data.data),o.success(e.data.data.message),s({url:"/world/crpc/index/index"}).then((e=>{}))):o.error(e.data.data.message)})).catch((e=>{console.log(e.errMsg),"request:fail"===e.errMsg?o.error("登录失败！请检查协议、ip、端口是否正确！"):o.error("登录失败！请检查协议、ip、端口、账号和密码是否正确！")}))}}},[["render",function(e,l,r,a,o,s){const i=c("el-input"),f=c("el-form-item"),v=c("el-checkbox"),h=c("el-button"),V=c("el-form");return d(),t("div",{class:"sci-fi-login"},[u("h1",null,"欢迎您的到来！"),u("h1",null,"Welcome to your arrival!"),u("div",{style:{"margin-top":"5%"}},[n(V,{model:o.userInfo,"label-width":"auto",style:{"max-width":"600px"}},{default:m((()=>[n(f,{label:"协议"},{default:m((()=>[n(i,{modelValue:o.server.protocol,"onUpdate:modelValue":l[0]||(l[0]=e=>o.server.protocol=e),placeholder:"请输入您的协议！"},null,8,["modelValue"])])),_:1}),n(f,{label:"IP"},{default:m((()=>[n(i,{modelValue:o.server.ip,"onUpdate:modelValue":l[1]||(l[1]=e=>o.server.ip=e),placeholder:"请输入您的IP！"},null,8,["modelValue"])])),_:1}),n(f,{label:"端口"},{default:m((()=>[n(i,{modelValue:o.server.port,"onUpdate:modelValue":l[2]||(l[2]=e=>o.server.port=e),placeholder:"请输入您的端口！"},null,8,["modelValue"])])),_:1}),n(f,{label:"账号"},{default:m((()=>[n(i,{modelValue:o.userInfo.account,"onUpdate:modelValue":l[3]||(l[3]=e=>o.userInfo.account=e),placeholder:"请输入您的账号！"},null,8,["modelValue"])])),_:1}),n(f,{label:"密码"},{default:m((()=>[n(i,{modelValue:o.userInfo.password,"onUpdate:modelValue":l[4]||(l[4]=e=>o.userInfo.password=e),type:"password",placeholder:"请输入您的密码！"},null,8,["modelValue"])])),_:1}),n(f,null,{default:m((()=>[n(v,{modelValue:o.rememberPassword,"onUpdate:modelValue":l[5]||(l[5]=e=>o.rememberPassword=e)},{default:m((()=>[p("记住密码")])),_:1},8,["modelValue"]),n(v,{modelValue:o.rememberServer,"onUpdate:modelValue":l[6]||(l[6]=e=>o.rememberServer=e)},{default:m((()=>[p("记住服务")])),_:1},8,["modelValue"])])),_:1}),n(f,null,{default:m((()=>[n(h,{type:"primary",class:"login-btn",onClick:s.login},{default:m((()=>[p("登录")])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"])])])}],["__scopeId","data-v-08fd619c"]]);export{f as default};
