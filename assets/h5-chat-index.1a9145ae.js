import{k as e,q as s,u as t,E as i,_ as a,p as l,n,v as d,x as o,o as r,d as u,w as h,i as c,a as g,b as f,g as m,c as y,r as L,t as p,h as b,F as v,e as M,I as C}from"./index-c30b8b20.js";import{a as x,w as k}from"./main.094c3503.js";import{g as _,b as U,d as N}from"./userFriend.97b45e5a.js";let S=JSON.parse(e("userDto")||"[]");function F(){const t=e("token");t&&s({url:x+"://"+k+"/chat?token="+t,success:function(){console.log("WebSocket连接成功")},fail:function(){console.log("WebSocket连接失败")}})}JSON.parse(e(S.uid+"myFriendList")||"[]");const w=a({name:"index.vue",data:()=>({drawerChatBox:!1,currentChatMessage:{messages:[],tIcon:"",tNickname:"",tUid:""},drawer:!1,addList:null,activeTab:null,socket:null,message:null,MyPhone:null,MyUid:null,MyIcon:null,phone:null,sendMsg:{uid:null,message:null},friendList:[]}),methods:{getFriendList(){const s=JSON.parse(e(this.MyUid+"myFriendList"))||[];_().then((e=>{if(200===e.data.code){const t=e.data.data;let i=0;for(let e=0;e<t.length;e++){for(let a=0;a<s.length;a++)t[e].id===s[a].id&&(i=1);1!==i&&s.push(t[e]),i=0}this.friendList=s,l(this.MyUid+"myFriendList",JSON.stringify(s))}}))},navToPage(e){n({url:"/h5/user/user?uid="+e})},tranCurrentChat(e){this.drawerChatBox=!0,this.currentChatMessage=this.friendList.find((s=>s.tUid===e)),this.$nextTick((()=>{null!=this.$refs.box&&(this.$refs.box.scrollTop=this.$refs.box.scrollHeight)}));for(let s=0;s<this.friendList.length;s++)this.friendList[s].tUid===e&&(this.friendList[s].mesCount=0,l(this.MyUid+"myFriendList",JSON.stringify(this.friendList)))},sendMessage(e){if(""!==this.message){var s;this.uid=e,this.sendMsg={tid:this.uid,message:this.message},console.log("this.sendMsg"),console.log(this.sendMsg),s=JSON.stringify(this.sendMsg),t({data:""+s,success:function(){console.log("消息发送成功")},fail:function(){console.log("消息发送失败"),i.error("消息发送失败"),F()}}),console.log("length："+this.friendList.length);for(let s=0;s<this.friendList.length;s++)if(console.log("uid："+this.friendList[s].uid),this.friendList[s].tUid===e){null==this.friendList[s].messages?this.friendList[s].messages=[["ME",this.message]]:this.friendList[s].messages.push(["ME",this.message]);break}l(this.MyUid+"myFriendList",JSON.stringify(this.friendList)),this.$nextTick((()=>{null!=this.$refs.box&&(this.$refs.box.scrollTop=this.$refs.box.scrollHeight)})),this.message=""}else i.error("请输入消息")},getAddList(){this.drawer=!0,U().then((e=>{200===e.data.code&&(this.addList=e.data.data)}))},agree(e){N(e).then((e=>{200===e.data.code&&(this.$message.success(e.data.message),this.getFriendList())}))}},mounted(){this.friendList=JSON.parse(e(this.MyUid+"myFriendList"))||[],0===this.friendList.length&&this.getFriendList(),d((s=>{console.log("收到服务器内容："+s.data);const t=s.data,[i,a]=t.split(","),n=JSON.parse(e("userDto")),d=JSON.parse(e(n.uid+"myFriendList"));console.log(d),console.log(this.friendList),console.log(this.friendList);for(let e=0;e<this.friendList.length;e++)if(console.log("uid："+this.friendList[e].uid),this.friendList[e].tUid===i){null==this.friendList[e].messages?this.friendList[e].messages=[["HE",a]]:this.friendList[e].messages.push(["HE",a]),null==this.friendList[e].mesCount?this.friendList[e].mesCount=1:this.friendList[e].mesCount++;break}console.log(d),console.log(this.friendList),l(this.MyUid+"myFriendList",JSON.stringify(this.friendList)),this.$nextTick((()=>{null!=this.$refs.box&&(this.$refs.box.scrollTop=this.$refs.box.scrollHeight)}))}))},onLoad(){this.activeTab=e("chatWithTuid");const s=JSON.parse(e("userDto"));this.MyPhone=s.phone,this.MyUid=s.uid,this.MyIcon=s.icon,F()},beforeDestroy(){console.log("beforeDestroy: 实例销毁之前"),o({code:1e3,reason:"用户退出",success(e){console.log("WebSocket已关闭！")}})},destroyed(){console.log("destroyed: 实例销毁完成")}},[["render",function(e,s,t,i,a,l){const n=M("el-button"),d=M("el-card"),o=M("el-drawer"),x=M("el-avatar"),k=M("van-col"),_=M("van-cell"),U=M("van-row"),N=M("van-cell-group"),S=C,F=c;return r(),u(F,null,{default:h((()=>[g("div",{style:{"margin-bottom":"3%"}},[f(n,{type:"primary",onClick:s[0]||(s[0]=e=>l.getAddList()),id:"getAddList"},{default:h((()=>[m("新朋友")])),_:1}),f(n,{type:"primary",onClick:s[1]||(s[1]=e=>l.getFriendList()),id:"getAddList"},{default:h((()=>[m("刷新")])),_:1}),f(o,{modelValue:a.drawer,"onUpdate:modelValue":s[2]||(s[2]=e=>a.drawer=e),title:"新朋友",size:"70%"},{default:h((()=>[(r(!0),y(v,null,L(a.addList,(e=>(r(),y("div",{key:e.id},[f(d,null,{default:h((()=>[g("div",{style:{padding:"14px"}},[g("div",{class:"bottom"},[g("time",{class:"time"},"uid："+p(e.tUid),1),f(n,{type:"primary",class:"button",onClick:s=>l.agree(e.tUid)},{default:h((()=>[m("同意")])),_:2},1032,["onClick"]),b(' <el-button class="button">拒绝</el-button> ')])])])),_:2},1024)])))),128))])),_:1},8,["modelValue"])]),(r(!0),y(v,null,L(a.friendList,(e=>(r(),u(N,null,{default:h((()=>[f(U,{style:{"margin-top":"3%"},onClick:s=>l.tranCurrentChat(e.tUid)},{default:h((()=>[f(k,{span:"4"},{default:h((()=>[f(x,{size:60,style:{"margin-top":"5%"}},{default:h((()=>[g("img",{src:e.tIcon,alt:""},null,8,["src"])])),_:2},1024)])),_:2},1024),f(k,{span:"17"},{default:h((()=>[g("div",null,[f(_,{title:e.tNickname,label:"描述信息"},null,8,["title"])])])),_:2},1024),f(k,{span:"2"},{default:h((()=>[null!=e.mesCount&&e.mesCount>0?(r(),y("div",{key:0,style:{color:"red"}},p(e.mesCount),1)):b("v-if",!0)])),_:2},1024)])),_:2},1032,["onClick"])])),_:2},1024)))),256)),f(o,{modelValue:a.drawerChatBox,"onUpdate:modelValue":s[6]||(s[6]=e=>a.drawerChatBox=e),size:"100%"},{header:h((()=>[g("h4",null,p(a.currentChatMessage.tNickname),1),f(x,{size:30,onClick:s[3]||(s[3]=e=>l.navToPage(a.currentChatMessage.tUid))},{default:h((()=>[g("img",{src:a.currentChatMessage.tIcon,alt:""},null,8,["src"])])),_:1})])),default:h((()=>[g("div",{style:{"overflow-y":"auto",height:"calc(100vh - 60px - 120px)"},ref:"box"},[g("div",{id:"box"},[(r(!0),y(v,null,L(a.currentChatMessage.messages,(e=>(r(),y("div",{class:"box"},["ME"===e[0]?(r(),y("div",{key:0,class:"chatBoxMessageRight"},[g("div",{style:{"background-color":"#5ac95a","border-radius":"20%",padding:"10px","margin-right":"10%"}},p(e[1]),1),g("div",null,[f(x,{size:30},{default:h((()=>[g("img",{src:a.MyIcon,alt:""},null,8,["src"])])),_:1})])])):b("v-if",!0),"HE"===e[0]?(r(),y("div",{key:1,class:"chatBoxMessageLeft"},[g("div",null,[f(x,{size:30},{default:h((()=>[g("img",{src:a.currentChatMessage.tIcon,alt:""},null,8,["src"])])),_:1})]),g("div",{style:{"background-color":"#eee","border-radius":"20%",padding:"10px","margin-left":"3%"}},p(e[1]),1)])):b("v-if",!0)])))),256))])],512)])),footer:h((()=>[f(U,null,{default:h((()=>[f(k,{span:"18"},{default:h((()=>[g("div",null,[f(S,{type:"text",modelValue:a.message,"onUpdate:modelValue":s[4]||(s[4]=e=>a.message=e),placeholder:"输入内容..."},null,8,["modelValue"])])])),_:1}),f(k,{span:"6"},{default:h((()=>[f(n,{type:"primary",onClick:s[5]||(s[5]=e=>l.sendMessage(a.currentChatMessage.tUid))},{default:h((()=>[m("发送")])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"])])),_:1})}],["__scopeId","data-v-d6afd932"]]);export{w as default};
