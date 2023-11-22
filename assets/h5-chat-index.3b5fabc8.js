import{k as e,q as s,u as t,E as i,_ as a,f as l,p as n,n as d,v as r,x as o,o as u,e as c,w as h,i as f,a as g,b as m,g as L,c as y,r as p,F as b,t as v,d as x,I as C,h as M}from"./index-1a2794cd.js";import{a as k,w as _,b as w}from"./main.c662165b.js";let S=JSON.parse(e("userDto")||"[]");function F(){const t=e("token");t&&s({url:k+"://"+_+"/chat?token="+t,success:function(){console.log("WebSocket连接成功")},fail:function(){console.log("WebSocket连接失败")}})}JSON.parse(e(S.uid+"myFriendList")||"[]");const $=a({name:"index.vue",data:()=>({drawerChatBox:!1,currentChatMessage:{},drawer:!1,addList:null,activeTab:null,socket:null,message:null,MyPhone:null,MyUid:null,MyIcon:null,phone:null,sendMsg:{uid:null,message:null},friendList:[]}),methods:{getFriendList(){const s=JSON.parse(e(this.MyUid+"myFriendList"))||[];l({url:w+"/web/user-friend/getUserFriendList",success:e=>{if(200===e.data.code){const t=e.data.data;let i=0;for(let e=0;e<t.length;e++){for(let a=0;a<s.length;a++)t[e].id==s[a].id&&(i=1);1!=i&&s.push(t[e]),i=0}this.friendList=s,n(this.MyUid+"myFriendList",JSON.stringify(s))}}})},navToPage(e){d({url:"/h5/user/user?uid="+e})},tranCurrentChat(e){this.drawerChatBox=!0,this.currentChatMessage=this.friendList.find((s=>s.tuid===e)),this.$nextTick((()=>{null!=this.$refs.box&&(this.$refs.box.scrollTop=this.$refs.box.scrollHeight)}));for(var s=0;s<this.friendList.length;s++)this.friendList[s].tuid==e&&(this.friendList[s].mesCount=0,n(this.MyUid+"myFriendList",JSON.stringify(this.friendList)))},sendMessage(e){if(""!=this.message){var s;this.uid=e,this.sendMsg={tid:this.uid,message:this.message},s=JSON.stringify(this.sendMsg),t({data:""+s,success:function(){console.log("消息发送成功")},fail:function(){console.log("消息发送失败"),i.error("消息发送失败"),F()}}),console.log("length："+this.friendList.length);for(var a=0;a<this.friendList.length;a++)if(console.log("uid："+this.friendList[a].uid),this.friendList[a].tuid===e){null==this.friendList[a].messages?this.friendList[a].messages=[["ME",this.message]]:this.friendList[a].messages.push(["ME",this.message]);break}n(this.MyUid+"myFriendList",JSON.stringify(this.friendList)),this.$nextTick((()=>{null!=this.$refs.box&&(this.$refs.box.scrollTop=this.$refs.box.scrollHeight)})),this.message=""}else i.error("请输入消息")},getAddList(){this.drawer=!0,l({url:w+"/web/user-friend/getAddList",success:e=>{200===e.data.code&&(this.addList=e.data.data)}})},agree(e){l({url:w+"/web/user-friend/agree/"+e,success:e=>{200===e.data.code&&(this.$message.success(e.data.message),this.getFriendList())}})}},mounted(){const s=JSON.parse(e(this.MyUid+"myFriendList"))||[];this.friendList=s,0==this.friendList.length&&this.getFriendList(),r((s=>{console.log("收到服务器内容："+s.data);const t=s.data,[i,a]=t.split(","),l=JSON.parse(e("userDto")),d=JSON.parse(e(l.uid+"myFriendList"));console.log(d),console.log(this.friendList),console.log(this.friendList);for(let e=0;e<this.friendList.length;e++)if(console.log("uid："+this.friendList[e].uid),this.friendList[e].tuid===i){null==this.friendList[e].messages?this.friendList[e].messages=[["HE",a]]:this.friendList[e].messages.push(["HE",a]),null==this.friendList[e].mesCount?this.friendList[e].mesCount=1:this.friendList[e].mesCount++;break}console.log(d),console.log(this.friendList),this.friendList=this.friendList,n(this.MyUid+"myFriendList",JSON.stringify(this.friendList)),this.$nextTick((()=>{null!=this.$refs.box&&(this.$refs.box.scrollTop=this.$refs.box.scrollHeight)}))}))},onLoad(){this.activeTab=e("chatWithTuid");const s=JSON.parse(e("userDto"));this.MyPhone=s.phone,this.MyUid=s.uid,this.MyIcon=s.icon,F()},beforeDestroy(){console.log("beforeDestroy: 实例销毁之前"),o({code:1e3,reason:"用户退出",success(e){console.log("WebSocket已关闭！")}})},destroyed(){console.log("destroyed: 实例销毁完成")}},[["render",function(e,s,t,i,a,l){const n=x("el-button"),d=x("el-card"),r=x("el-drawer"),o=x("el-avatar"),k=x("van-col"),_=x("van-cell"),w=x("van-row"),S=x("van-cell-group"),F=C,$=f;return u(),c($,null,{default:h((()=>[g("div",{style:{"margin-bottom":"3%"}},[m(n,{type:"primary",onClick:s[0]||(s[0]=e=>l.getAddList()),id:"getAddList"},{default:h((()=>[L("新朋友")])),_:1}),m(n,{type:"primary",onClick:s[1]||(s[1]=e=>l.getFriendList()),id:"getAddList"},{default:h((()=>[L("刷新")])),_:1}),m(r,{modelValue:a.drawer,"onUpdate:modelValue":s[2]||(s[2]=e=>a.drawer=e),title:"新朋友",size:"70%"},{default:h((()=>[(u(!0),y(b,null,p(a.addList,(e=>(u(),y("div",{key:e.id},[m(d,null,{default:h((()=>[g("div",{style:{padding:"14px"}},[g("div",{class:"bottom"},[g("time",{class:"time"},"uid："+v(e.tuid),1),m(n,{type:"primary",class:"button",onClick:s=>l.agree(e.tuid)},{default:h((()=>[L("同意")])),_:2},1032,["onClick"]),M(' <el-button class="button">拒绝</el-button> ')])])])),_:2},1024)])))),128))])),_:1},8,["modelValue"])]),(u(!0),y(b,null,p(a.friendList,(e=>(u(),c(S,null,{default:h((()=>[m(w,{style:{"margin-top":"3%"},onClick:s=>l.tranCurrentChat(e.tuid)},{default:h((()=>[m(k,{span:"4"},{default:h((()=>[m(o,{size:60,style:{"margin-top":"5%"}},{default:h((()=>[g("img",{src:e.ticon,alt:""},null,8,["src"])])),_:2},1024)])),_:2},1024),m(k,{span:"17"},{default:h((()=>[g("div",null,[m(_,{title:e.tnickname,label:"描述信息"},null,8,["title"])])])),_:2},1024),m(k,{span:"2"},{default:h((()=>[null!=e.mesCount&&e.mesCount>0?(u(),y("div",{key:0,style:{color:"red"}},v(e.mesCount),1)):M("v-if",!0)])),_:2},1024)])),_:2},1032,["onClick"])])),_:2},1024)))),256)),m(r,{modelValue:a.drawerChatBox,"onUpdate:modelValue":s[6]||(s[6]=e=>a.drawerChatBox=e),size:"100%"},{header:h((()=>[g("h4",null,v(a.currentChatMessage.tnickname),1),m(o,{size:30,onClick:s[3]||(s[3]=e=>l.navToPage(a.currentChatMessage.tuid))},{default:h((()=>[g("img",{src:a.currentChatMessage.ticon,alt:""},null,8,["src"])])),_:1})])),default:h((()=>[g("div",{style:{"overflow-y":"auto",height:"calc(100vh - 60px - 120px)"},ref:"box"},[g("div",{id:"box"},[(u(!0),y(b,null,p(a.currentChatMessage.messages,(e=>(u(),y("div",{class:"box"},["ME"===e[0]?(u(),y("div",{key:0,class:"chatBoxMessageRight"},[g("div",{style:{"background-color":"#5ac95a","border-radius":"20%",padding:"10px","margin-right":"10%"}},v(e[1]),1),g("div",null,[m(o,{size:30},{default:h((()=>[g("img",{src:a.MyIcon,alt:""},null,8,["src"])])),_:1})])])):M("v-if",!0),"HE"===e[0]?(u(),y("div",{key:1,class:"chatBoxMessageLeft"},[g("div",null,[m(o,{size:30},{default:h((()=>[g("img",{src:a.currentChatMessage.ticon,alt:""},null,8,["src"])])),_:1})]),g("div",{style:{"background-color":"#eee","border-radius":"20%",padding:"10px","margin-left":"3%"}},v(e[1]),1)])):M("v-if",!0)])))),256))])],512)])),footer:h((()=>[m(w,null,{default:h((()=>[m(k,{span:"18"},{default:h((()=>[g("div",null,[m(F,{type:"text",modelValue:a.message,"onUpdate:modelValue":s[4]||(s[4]=e=>a.message=e),placeholder:"输入内容..."},null,8,["modelValue"])])])),_:1}),m(k,{span:"6"},{default:h((()=>[m(n,{type:"primary",onClick:s[5]||(s[5]=e=>l.sendMessage(a.currentChatMessage.tuid))},{default:h((()=>[L("发送")])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"])])),_:1})}],["__scopeId","data-v-dff35387"]]);export{$ as default};
