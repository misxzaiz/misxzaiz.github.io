import{_ as e,E as o,n as a,o as t,d as s,w as d,i as r,b as l,g as n,t as i,e as u}from"./index-ca14f322.js";import{g as m,r as c}from"./user.ffa7e30d.js";import"./main.b5d24f53.js";const f=e({name:"register",data:()=>({form:{phone:"",code:"",uid:"",password:"",email:""},countdown:0,isCountdown:!1}),methods:{getCode(){this.isCountdown||(""!==this.form.phone?m(this.form.phone).then((e=>{if(200===e.data.code){o.success("验证码获取成功"),this.form.code=e.data.data,this.isCountdown=!0,this.countdown=20;let a=setInterval((()=>{this.countdown>0?this.countdown--:(this.isCountdown=!1,clearInterval(a))}),1e3)}else o.error(e.data.message)})):o.error("请输入手机号"))},formSubmit(){""!==this.form.phone&&""!==this.form.password&&""!==this.form.code?(""===this.form.uid&&(this.form.uid=this.form.phone),c(this.form).then((e=>{200===e.data.code?(o({message:e.data.message,type:"success"}),a({url:"/h5/user/login"}).then((e=>{}))):o.error(e.data.message)}))):o.error("请输入完整信息")},goTo(e){a({url:e})}}},[["render",function(e,o,a,m,c,f){const h=u("van-field"),p=r,b=u("van-button"),w=u("van-form");return t(),s(p,{class:"container"},{default:d((()=>[l(w,{onSubmit:f.formSubmit,ref:"form","lazy-validation":""},{default:d((()=>[l(h,{modelValue:c.form.phone,"onUpdate:modelValue":o[0]||(o[0]=e=>c.form.phone=e),label:"手机号",placeholder:"请输入手机号",required:"",clearable:""},null,8,["modelValue"]),l(p,{class:"code-container"},{default:d((()=>[l(h,{type:"number",modelValue:c.form.code,"onUpdate:modelValue":o[1]||(o[1]=e=>c.form.code=e),label:"验证码",placeholder:"请输入验证码",required:"",clearable:"",class:"code-input"},null,8,["modelValue"]),l(p,{onClick:f.getCode,class:"get-code",disabled:c.isCountdown},{default:d((()=>[n(i(c.isCountdown?`${c.countdown}秒`:"验证码"),1)])),_:1},8,["onClick","disabled"])])),_:1}),l(h,{type:"password",modelValue:c.form.password,"onUpdate:modelValue":o[2]||(o[2]=e=>c.form.password=e),label:"密码",placeholder:"请输入密码",required:"",clearable:"","show-password":""},null,8,["modelValue"]),l(b,{type:"primary","native-type":"submit",class:"submit-button"},{default:d((()=>[n("注册")])),_:1}),l(b,{type:"default",class:"login-button",onClick:o[3]||(o[3]=e=>f.goTo("./login"))},{default:d((()=>[n("登录")])),_:1})])),_:1},8,["onSubmit"])])),_:1})}],["__scopeId","data-v-6ad7fe80"]]);export{f as default};