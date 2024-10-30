import{f as e,_ as l,k as a,u as o,p as s,q as t,v as i,o as d,c as n,a as g,F as m,r as c,b as r,w as u,h as f,e as p,t as h,g as y}from"./index-4ab51a6b.js";import"./main.c8ecacb9.js";const v="http://localhost:8000";const b=l({name:"index.vue",components:{},data:()=>({imageUrl:"",login:{dialog:!0,form:{uid:"",psw:""}},msg:{list:null,form:{msg:"",image:""}}}),created(){},mounted(){this.login.form.uid=a("uid")},methods:{getBase64:e=>new Promise((function(l,a){let o=new FileReader,s="";o.readAsDataURL(e),o.onload=function(){s=o.result},o.onerror=function(e){a(e)},o.onloadend=function(){l(s)}})),getFile(l){console.log(l);const a="image/jpeg"===l.raw.type,s="image/png"===l.raw.type,t=l.raw.size/1024/1024<5;a||s||this.$message.error("上传图片只能是JPG或者PNG格式!"),t||this.$message.error("上传图片大小不能超过 5MB!");let i=this;(a||s)&&t&&this.getBase64(l.raw).then((a=>{var s;console.log(a),i.msg.form.image=a,(s={uid:i.login.form.uid,fileName:l.name,base64:i.msg.form.image},e({url:`${v}/mpc/file/upload`,method:"POST",data:s})).then((e=>{o({data:"2"+e.data.data,success:function(){console.log("消息发送成功"),i.msg.form.image=""},fail:function(){console.log("消息发送失败")}})}))}))},sendMsg(){o({data:"1"+this.msg.form.msg,success:function(){console.log("消息发送成功")},fail:function(){console.log("消息发送失败")}}),this.msg.form.msg=""},dealImage(l){var a;(a=l.msg,e({url:`${v}/mpc/file/download/${a}`,method:"GET"})).then((e=>{l.msg=e.data.data}))},loginUser(){let l=this;var o;(o=this.login.form,e({url:`${v}/mpc/user/login/${o.uid}/${o.psw}`,method:"GET"})).then((e=>{if(200==e.data.code){s("token",e.data.data),s("uid",this.login.form.uid),this.$message.success("登录成功");const o=a("token");t({url:`ws://localhost:8000/mpc?token=${o}`,success:function(){console.log("WebSocket连接成功"),i((e=>{console.log(e.data),l.msg.list=JSON.parse(e.data).list})),l.login.dialog=!1},fail:function(){console.log("WebSocket连接失败"),l.$message.fail("登录失败")}})}else this.$message.fail("登录失败")}))}}},[["render",function(e,l,a,o,s,t){const i=p("el-avatar"),v=p("el-input"),b=p("el-button"),k=p("el-upload"),w=p("el-form-item"),x=p("el-form"),_=p("el-dialog");return d(),n("div",null,[g("div",{ref:"",style:{display:"flex","flex-direction":"column",height:"100vh"}},[g("div",{class:"box",style:{flex:"1","overflow-y":"auto"}},[(d(!0),n(m,null,c(s.msg.list,(e=>(d(),n("div",{class:"box"},[e.uid==s.login.form.uid?(d(),n("div",{key:0,class:"chatBoxMessageRight"},[g("div",{style:{"margin-right":"3%"}},[1==e.type?(d(),n("div",{key:0,style:{"background-color":"#5ac95a","border-radius":"20%",padding:"10px"}},h(e.msg),1)):f("v-if",!0),2==e.type?(d(),n("div",{key:1,style:{"margin-left":"50%"}},[g("img",{src:e.msg,alt:"",style:{width:"100%"}},null,8,["src"]),g("img",{src:t.dealImage(e),alt:""},null,8,["src"])])):f("v-if",!0)]),g("div",null,[r(i,{size:30},{default:u((()=>["10001"==e.uid?(d(),n("img",{key:0,src:"https://picss.sunbangyan.cn/2024/02/26/9013b468c3b207fc74825264ca088276.jpeg",alt:""})):(d(),n("img",{key:1,src:"https://picst.sunbangyan.cn/2024/02/26/8767d25d3f0d1f7190fff677d39bf723.jpeg",alt:""}))])),_:2},1024)])])):(d(),n("div",{key:1,class:"chatBoxMessageLeft"},[g("div",null,[r(i,{size:30},{default:u((()=>["10001"==e.uid?(d(),n("img",{key:0,src:"https://picss.sunbangyan.cn/2024/02/26/9013b468c3b207fc74825264ca088276.jpeg",alt:""})):(d(),n("img",{key:1,src:"https://picst.sunbangyan.cn/2024/02/26/8767d25d3f0d1f7190fff677d39bf723.jpeg",alt:""}))])),_:2},1024)]),g("div",{style:{"margin-left":"3%"}},[1==e.type?(d(),n("div",{key:0,style:{"background-color":"#eee","border-radius":"20%",padding:"10px"}},h(e.msg),1)):f("v-if",!0),2==e.type?(d(),n("div",{key:1,style:{"margin-right":"50%"}},[g("img",{src:e.msg,alt:"",style:{width:"100%"}},null,8,["src"]),g("img",{src:t.dealImage(e),alt:""},null,8,["src"])])):f("v-if",!0)])]))])))),256))]),g("div",{class:"sendMessage",style:{height:"80px"}},[g("div",{style:{display:"flex"}},[r(v,{modelValue:s.msg.form.msg,"onUpdate:modelValue":l[0]||(l[0]=e=>s.msg.form.msg=e),autocomplete:"off"},null,8,["modelValue"]),r(b,{onClick:t.sendMsg},{default:u((()=>[y("发送")])),_:1},8,["onClick"])]),g("div",null,[f("   发送图片：图片使用 base64 编码，作为 msg.form.msg 的值发送    "),r(k,{class:"upload-demo",action:"","on-change":t.getFile,limit:1,"auto-upload":!1},{default:u((()=>[r(b,{type:"primary"},{default:u((()=>[y("Click to upload")])),_:1})])),_:1},8,["on-change"])])])],512),f("  login  "),g("div",null,[r(_,{modelValue:s.login.dialog,"onUpdate:modelValue":l[3]||(l[3]=e=>s.login.dialog=e),title:"登录",width:"80%","show-close":!1,"close-on-click-modal":!1},{footer:u((()=>[g("div",{class:"dialog-footer"},[r(b,{type:"primary",onClick:t.loginUser},{default:u((()=>[y("登录")])),_:1},8,["onClick"])])])),default:u((()=>[r(x,{model:s.login},{default:u((()=>[r(w,{label:"账号"},{default:u((()=>[r(v,{modelValue:s.login.form.uid,"onUpdate:modelValue":l[1]||(l[1]=e=>s.login.form.uid=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),r(w,{label:"密码"},{default:u((()=>[r(v,{modelValue:s.login.form.psw,"onUpdate:modelValue":l[2]||(l[2]=e=>s.login.form.psw=e),autocomplete:"off"},null,8,["modelValue"])])),_:1})])),_:1},8,["model"])])),_:1},8,["modelValue"])])])}],["__scopeId","data-v-16409bdd"]]);export{b as default};