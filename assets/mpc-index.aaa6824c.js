import{f as e,_ as l,k as a,u as o,p as t,q as s,v as i,o as n,c as d,a as g,F as r,r as m,b as c,w as u,h as f,e as p,t as h,g as y}from"./index-c30b8b20.js";import"./main.094c3503.js";const v="https://dominant-ant-formerly.ngrok-free.app";const w=l({name:"index.vue",components:{},data:()=>({showTool:!1,imageUrl:"",login:{dialog:!0,form:{uid:"",psw:""}},msg:{list:null,form:{msg:"",image:""}}}),created(){},mounted(){this.login.form.uid=a("uid")},methods:{getBase64:e=>new Promise((function(l,a){let o=new FileReader;o.readAsDataURL(e),o.onload=function(){let e=new Image;e.src=o.result,e.onload=function(){let a=document.createElement("canvas"),o=a.getContext("2d"),t=e.width,s=e.height;t>s?t>300&&(s*=300/t,t=300):s>300&&(t*=300/s,s=300),a.width=t,a.height=s,o.drawImage(e,0,0,t,s);let i=a.toDataURL("image/jpeg",.8);l(i)}},o.onerror=function(e){a(e)}})),getFile(l){console.log(l);const a="image/jpeg"===l.raw.type,t="image/png"===l.raw.type,s=l.raw.size/1024/1024<5;a||t||this.$message.error("上传图片只能是JPG或者PNG格式!"),s||this.$message.error("上传图片大小不能超过 5MB!");let i=this;(a||t)&&s&&this.getBase64(l.raw).then((a=>{var t;console.log(a),i.msg.form.image=a,(t={uid:i.login.form.uid,fileName:l.name,base64:i.msg.form.image},e({url:`${v}/mpc/file/upload`,method:"POST",data:t})).then((e=>{let l=i;o({data:"2"+e.data.data,success:function(){console.log("消息发送成功"),l.msg.form.image=""},fail:function(){console.log("消息发送失败")}})}))}))},sendMsg(){o({data:"1"+this.msg.form.msg,success:function(){console.log("消息发送成功")},fail:function(){console.log("消息发送失败")}}),this.msg.form.msg=""},dealImage(l){var a;l.msg.startsWith("mpc:")&&(a=l.msg,e({url:`${v}/mpc/file/download/${a}`,method:"GET"})).then((e=>{l.msg=e.data.data}))},loginUser(){let l=this;var o;(o=this.login.form,e({url:`${v}/mpc/user/login/${o.uid}/${o.psw}`,method:"GET"})).then((e=>{if(200==e.data.code){t("token",e.data.data),t("uid",this.login.form.uid),this.$message.success("登录成功");const o=a("token");s({url:`wss://dominant-ant-formerly.ngrok-free.app/mpc?token=${o}`,success:function(){console.log("WebSocket连接成功"),i((e=>{console.log(e.data),l.msg.list=JSON.parse(e.data).list})),l.login.dialog=!1},fail:function(){console.log("WebSocket连接失败"),l.$message.fail("登录失败")}})}else this.$message.fail("登录失败")}))}}},[["render",function(e,l,a,o,t,s){const i=p("el-avatar"),v=p("el-input"),w=p("el-button"),k=p("el-upload"),b=p("el-form-item"),x=p("el-form"),V=p("el-dialog");return n(),d("div",null,[g("div",{ref:"",style:{display:"flex","flex-direction":"column",height:"100vh"}},[g("div",{class:"box",style:{flex:"1","overflow-y":"auto"}},[(n(!0),d(r,null,m(t.msg.list,(e=>(n(),d("div",{class:"box"},[e.uid==t.login.form.uid?(n(),d("div",{key:0,class:"chatBoxMessageRight"},[g("div",{style:{"margin-right":"3%"}},[1==e.type?(n(),d("div",{key:0,style:{"background-color":"#5ac95a","border-radius":"20%",padding:"10px"}},h(e.msg),1)):f("v-if",!0),2==e.type?(n(),d("div",{key:1,style:{"margin-left":"50%"}},[g("img",{src:e.msg,alt:"",style:{width:"100%"}},null,8,["src"]),g("img",{src:s.dealImage(e),alt:""},null,8,["src"])])):f("v-if",!0)]),g("div",null,[c(i,{size:30},{default:u((()=>["10001"==e.uid?(n(),d("img",{key:0,src:"https://picss.sunbangyan.cn/2024/02/26/9013b468c3b207fc74825264ca088276.jpeg",alt:""})):(n(),d("img",{key:1,src:"https://picst.sunbangyan.cn/2024/02/26/8767d25d3f0d1f7190fff677d39bf723.jpeg",alt:""}))])),_:2},1024)])])):(n(),d("div",{key:1,class:"chatBoxMessageLeft"},[g("div",null,[c(i,{size:30},{default:u((()=>["10001"==e.uid?(n(),d("img",{key:0,src:"https://picss.sunbangyan.cn/2024/02/26/9013b468c3b207fc74825264ca088276.jpeg",alt:""})):(n(),d("img",{key:1,src:"https://picst.sunbangyan.cn/2024/02/26/8767d25d3f0d1f7190fff677d39bf723.jpeg",alt:""}))])),_:2},1024)]),g("div",{style:{"margin-left":"3%"}},[1==e.type?(n(),d("div",{key:0,style:{"background-color":"#eee","border-radius":"20%",padding:"10px"}},h(e.msg),1)):f("v-if",!0),2==e.type?(n(),d("div",{key:1,style:{"margin-right":"50%"}},[g("img",{src:e.msg,alt:"",style:{width:"100%"}},null,8,["src"]),g("img",{src:s.dealImage(e),alt:""},null,8,["src"])])):f("v-if",!0)])]))])))),256))]),g("div",{class:"sendMessage",style:{height:"80px"}},[g("div",{style:{display:"flex"}},[c(v,{modelValue:t.msg.form.msg,"onUpdate:modelValue":l[0]||(l[0]=e=>t.msg.form.msg=e),autocomplete:"off",style:{"margin-right":"2%"}},null,8,["modelValue"]),t.showTool?(n(),d("span",{key:0,onClick:l[1]||(l[1]=e=>t.showTool=!1)},[(n(),d("svg",{xmlns:"http://www.w3.org/2000/svg",width:"36",height:"36",viewBox:"0 0 1024 1024","data-v-ea893728":""},[g("path",{fill:"currentColor",d:"M352 480h320a32 32 0 1 1 0 64H352a32 32 0 0 1 0-64"}),g("path",{fill:"currentColor",d:"M480 672V352a32 32 0 1 1 64 0v320a32 32 0 0 1-64 0"}),g("path",{fill:"currentColor",d:"M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"})]))])):(n(),d("span",{key:1,onClick:l[2]||(l[2]=e=>t.showTool=!0)},[(n(),d("svg",{xmlns:"http://www.w3.org/2000/svg",width:"36",height:"36",viewBox:"0 0 1024 1024","data-v-ea893728":""},[g("path",{fill:"currentColor",d:"M352 480h320a32 32 0 1 1 0 64H352a32 32 0 0 1 0-64"}),g("path",{fill:"currentColor",d:"M480 672V352a32 32 0 1 1 64 0v320a32 32 0 0 1-64 0"}),g("path",{fill:"currentColor",d:"M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"})]))])),c(w,{onClick:s.sendMsg,style:{"margin-left":"2%"}},{default:u((()=>[y("发送")])),_:1},8,["onClick"])]),t.showTool?(n(),d("div",{key:0},[g("div",null,[f("   发送图片：图片使用 base64 编码，作为 msg.form.msg 的值发送    "),c(k,{class:"upload-demo",action:"","on-change":s.getFile,limit:1,"auto-upload":!1},{default:u((()=>[c(w,{type:"primary"},{default:u((()=>[y("图片")])),_:1})])),_:1},8,["on-change"])])])):f("v-if",!0)])],512),f("  login  "),g("div",null,[c(V,{modelValue:t.login.dialog,"onUpdate:modelValue":l[5]||(l[5]=e=>t.login.dialog=e),title:"登录",width:"80%","show-close":!1,"close-on-click-modal":!1},{footer:u((()=>[g("div",{class:"dialog-footer"},[c(w,{type:"primary",onClick:s.loginUser},{default:u((()=>[y("登录")])),_:1},8,["onClick"])])])),default:u((()=>[c(x,{model:t.login},{default:u((()=>[c(b,{label:"账号"},{default:u((()=>[c(v,{modelValue:t.login.form.uid,"onUpdate:modelValue":l[3]||(l[3]=e=>t.login.form.uid=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),c(b,{label:"密码"},{default:u((()=>[c(v,{modelValue:t.login.form.psw,"onUpdate:modelValue":l[4]||(l[4]=e=>t.login.form.psw=e),autocomplete:"off"},null,8,["modelValue"])])),_:1})])),_:1},8,["model"])])),_:1},8,["modelValue"])])])}],["__scopeId","data-v-2615b751"]]);export{w as default};
