import{f as e,_ as l,k as o,u as s,p as a,q as i,v as t,o as d,c as n,a as m,b as c,w as g,F as u,r as f,h as r,e as p,g as b,t as h}from"./index-c56eda7d.js";import"./main.72dafab4.js";const k=l({name:"index.vue",components:{},data:()=>({login:{dialog:!0,form:{uid:"",psw:""}},msg:{list:null,form:{msg:""}}}),created(){},mounted(){this.login.form.uid=o("uid")},methods:{sendMsg(){s({data:"1"+this.msg.form.msg,success:function(){console.log("消息发送成功")},fail:function(){console.log("消息发送失败")}})},loginUser(){let l=this;var s;(s=this.login.form,e({url:`https://dominant-ant-formerly.ngrok-free.app/mpc/user/login/${s.uid}/${s.psw}`,method:"GET"})).then((e=>{if(200==e.data.code){a("token",e.data.data),a("uid",this.login.form.uid),this.$message.success("登录成功");const s=o("token");i({url:`wss://dominant-ant-formerly.ngrok-free.app/mpc?token=${s}`,success:function(){console.log("WebSocket连接成功"),t((e=>{console.log(e.data),l.msg.list=JSON.parse(e.data).list})),l.login.dialog=!1},fail:function(){console.log("WebSocket连接失败"),l.$message.fail("登录失败")}})}else this.$message.fail("登录失败")}))}}},[["render",function(e,l,o,s,a,i){const t=p("el-input"),k=p("el-button"),y=p("el-avatar"),v=p("el-form-item"),V=p("el-form"),_=p("el-dialog");return d(),n("div",null,[m("div",{style:{},ref:""},[m("div",{style:{display:"flex"}},[c(t,{modelValue:a.msg.form.msg,"onUpdate:modelValue":l[0]||(l[0]=e=>a.msg.form.msg=e),autocomplete:"off"},null,8,["modelValue"]),c(k,{onClick:i.sendMsg},{default:g((()=>[b("发送")])),_:1},8,["onClick"])]),m("div",{class:"box"},[(d(!0),n(u,null,f(a.msg.list,(e=>(d(),n("div",{class:"box"},[e.uid==a.login.form.uid?(d(),n("div",{key:0,class:"chatBoxMessageRight"},[m("div",{style:{"background-color":"#5ac95a","border-radius":"20%",padding:"10px","margin-right":"10%"}},h(e.msg),1),m("div",null,[c(y,{size:30},{default:g((()=>["10001"==e.uid?(d(),n("img",{key:0,src:"https://picss.sunbangyan.cn/2024/02/26/9013b468c3b207fc74825264ca088276.jpeg",alt:""})):(d(),n("img",{key:1,src:"https://picst.sunbangyan.cn/2024/02/26/8767d25d3f0d1f7190fff677d39bf723.jpeg",alt:""}))])),_:2},1024)])])):(d(),n("div",{key:1,class:"chatBoxMessageLeft"},[m("div",null,[c(y,{size:30},{default:g((()=>["10001"==e.uid?(d(),n("img",{key:0,src:"https://picss.sunbangyan.cn/2024/02/26/9013b468c3b207fc74825264ca088276.jpeg",alt:""})):(d(),n("img",{key:1,src:"https://picst.sunbangyan.cn/2024/02/26/8767d25d3f0d1f7190fff677d39bf723.jpeg",alt:""}))])),_:2},1024)]),m("div",{style:{"background-color":"#eee","border-radius":"20%",padding:"10px","margin-left":"3%"}},h(e.msg),1)]))])))),256))])],512),r("  login  "),m("div",null,[c(_,{modelValue:a.login.dialog,"onUpdate:modelValue":l[3]||(l[3]=e=>a.login.dialog=e),title:"登录",width:"80%","show-close":!1,"close-on-click-modal":!1},{footer:g((()=>[m("div",{class:"dialog-footer"},[c(k,{type:"primary",onClick:i.loginUser},{default:g((()=>[b("登录")])),_:1},8,["onClick"])])])),default:g((()=>[c(V,{model:a.login},{default:g((()=>[c(v,{label:"账号"},{default:g((()=>[c(t,{modelValue:a.login.form.uid,"onUpdate:modelValue":l[1]||(l[1]=e=>a.login.form.uid=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),c(v,{label:"密码"},{default:g((()=>[c(t,{modelValue:a.login.form.psw,"onUpdate:modelValue":l[2]||(l[2]=e=>a.login.form.psw=e),autocomplete:"off"},null,8,["modelValue"])])),_:1})])),_:1},8,["model"])])),_:1},8,["modelValue"])])])}],["__scopeId","data-v-74d80bcf"]]);export{k as default};
