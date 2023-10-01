import{_ as e,l as s,r as t,b as i,s as a,n as l,E as d,x as n,y as r,z as o,A as u,o as h,c,w as g,i as f,d as m,a as L,g as y,e as p,f as b,F as v,t as x,h as C,I as M,j as k}from"./index-c4b61f01.js";const _=e({name:"index.vue",data:()=>({drawerChatBox:!1,currentChatMessage:{},drawer:!1,addList:null,activeTab:null,socket:null,message:null,MyPhone:null,MyUid:null,MyIcon:null,phone:null,sendMsg:{uid:null,message:null},friendList:[]}),methods:{getFriendList(){const e=JSON.parse(s(this.MyUid+"myFriendList"))||[];t({url:i+"/web/user-friend/getUserFriendList",success:s=>{if(200===s.data.code){const t=s.data.data;let i=0;for(let s=0;s<t.length;s++){for(let a=0;a<e.length;a++)t[s].id==e[a].id&&(i=1);1!=i&&e.push(t[s]),i=0}this.friendList=e,a(this.MyUid+"myFriendList",JSON.stringify(e))}}})},navToPage(e){l({url:"/pages/campus/user/user?uid="+e})},tranCurrentChat(e){this.drawerChatBox=!0,this.currentChatMessage=this.friendList.find((s=>s.tuid===e)),this.$nextTick((()=>{null!=this.$refs.box&&(this.$refs.box.scrollTop=this.$refs.box.scrollHeight)}));for(var s=0;s<this.friendList.length;s++)this.friendList[s].tuid==e&&(this.friendList[s].mesCount=0,a(this.MyUid+"myFriendList",JSON.stringify(this.friendList)))},sendMessage(e){if(""!=this.message){this.uid=e,this.sendMsg={tid:this.uid,message:this.message},n(JSON.stringify(this.sendMsg)),console.log("length："+this.friendList.length);for(var s=0;s<this.friendList.length;s++)if(console.log("uid："+this.friendList[s].uid),this.friendList[s].tuid===e){null==this.friendList[s].messages?this.friendList[s].messages=[["ME",this.message]]:this.friendList[s].messages.push(["ME",this.message]);break}a(this.MyUid+"myFriendList",JSON.stringify(this.friendList)),this.$nextTick((()=>{null!=this.$refs.box&&(this.$refs.box.scrollTop=this.$refs.box.scrollHeight)})),this.message=""}else d.error("请输入消息")},getAddList(){this.drawer=!0,t({url:i+"/web/user-friend/getAddList",success:e=>{200===e.data.code&&(this.addList=e.data.data)}})},agree(e){t({url:i+"/web/user-friend/agree/"+e,success:e=>{200===e.data.code&&(this.$message.success(e.data.message),this.getFriendList())}})}},mounted(){const e=JSON.parse(s(this.MyUid+"myFriendList"))||[];this.friendList=e,0==this.friendList.length&&this.getFriendList(),r((e=>{console.log("收到服务器内容："+e.data);const t=e.data,[i,l]=t.split(","),d=JSON.parse(s("userDto")),n=JSON.parse(s(d.uid+"myFriendList"));console.log(n),console.log(this.friendList),console.log(this.friendList);for(let s=0;s<this.friendList.length;s++)if(console.log("uid："+this.friendList[s].uid),this.friendList[s].tuid===i){null==this.friendList[s].messages?this.friendList[s].messages=[["HE",l]]:this.friendList[s].messages.push(["HE",l]),null==this.friendList[s].mesCount?this.friendList[s].mesCount=1:this.friendList[s].mesCount++;break}console.log(n),console.log(this.friendList),this.friendList=this.friendList,a(this.MyUid+"myFriendList",JSON.stringify(this.friendList)),this.$nextTick((()=>{null!=this.$refs.box&&(this.$refs.box.scrollTop=this.$refs.box.scrollHeight)}))}))},onLoad(){this.activeTab=s("chatWithTuid");const e=JSON.parse(s("userDto"));this.MyPhone=e.phone,this.MyUid=e.uid,this.MyIcon=e.icon,o()},beforeDestroy(){console.log("beforeDestroy: 实例销毁之前"),u({code:1e3,reason:"用户退出",success(e){console.log("WebSocket已关闭！")}})},destroyed(){console.log("destroyed: 实例销毁完成")}},[["render",function(e,s,t,i,a,l){const d=C("el-button"),n=C("el-card"),r=C("el-drawer"),o=C("el-avatar"),u=C("van-col"),_=C("van-cell"),w=C("van-row"),F=C("van-cell-group"),$=M,U=f;return h(),c(U,null,{default:g((()=>[m("div",{style:{"margin-bottom":"3%"}},[L(d,{type:"primary",onClick:s[0]||(s[0]=e=>l.getAddList()),id:"getAddList"},{default:g((()=>[y("新朋友")])),_:1}),L(d,{type:"primary",onClick:s[1]||(s[1]=e=>l.getFriendList()),id:"getAddList"},{default:g((()=>[y("刷新")])),_:1}),L(r,{modelValue:a.drawer,"onUpdate:modelValue":s[2]||(s[2]=e=>a.drawer=e),title:"新朋友",size:"70%"},{default:g((()=>[(h(!0),p(v,null,b(a.addList,(e=>(h(),p("div",{key:e.id},[L(n,null,{default:g((()=>[m("div",{style:{padding:"14px"}},[m("div",{class:"bottom"},[m("time",{class:"time"},"uid："+x(e.tuid),1),L(d,{type:"primary",class:"button",onClick:s=>l.agree(e.tuid)},{default:g((()=>[y("同意")])),_:2},1032,["onClick"]),k(' <el-button class="button">拒绝</el-button> ')])])])),_:2},1024)])))),128))])),_:1},8,["modelValue"])]),(h(!0),p(v,null,b(a.friendList,(e=>(h(),c(F,null,{default:g((()=>[L(w,{style:{"margin-top":"3%"},onClick:s=>l.tranCurrentChat(e.tuid)},{default:g((()=>[L(u,{span:"4"},{default:g((()=>[L(o,{size:60,style:{"margin-top":"5%"}},{default:g((()=>[m("img",{src:e.ticon,alt:""},null,8,["src"])])),_:2},1024)])),_:2},1024),L(u,{span:"17"},{default:g((()=>[m("div",null,[L(_,{title:e.tnickname,label:"描述信息"},null,8,["title"])])])),_:2},1024),L(u,{span:"2"},{default:g((()=>[null!=e.mesCount&&e.mesCount>0?(h(),p("div",{key:0,style:{color:"red"}},x(e.mesCount),1)):k("v-if",!0)])),_:2},1024)])),_:2},1032,["onClick"])])),_:2},1024)))),256)),L(r,{modelValue:a.drawerChatBox,"onUpdate:modelValue":s[6]||(s[6]=e=>a.drawerChatBox=e),size:"100%"},{header:g((()=>[m("h4",null,x(a.currentChatMessage.tnickname),1),L(o,{size:30,onClick:s[3]||(s[3]=e=>l.navToPage(a.currentChatMessage.tuid))},{default:g((()=>[m("img",{src:a.currentChatMessage.ticon,alt:""},null,8,["src"])])),_:1})])),default:g((()=>[m("div",{style:{"overflow-y":"auto",height:"calc(100vh - 60px - 120px)"},ref:"box"},[m("div",{id:"box"},[(h(!0),p(v,null,b(a.currentChatMessage.messages,(e=>(h(),p("div",{class:"box"},["ME"===e[0]?(h(),p("div",{key:0,class:"chatBoxMessageRight"},[m("div",{style:{"background-color":"#5ac95a","border-radius":"20%",padding:"10px","margin-right":"10%"}},x(e[1]),1),m("div",null,[L(o,{size:30},{default:g((()=>[m("img",{src:a.MyIcon,alt:""},null,8,["src"])])),_:1})])])):k("v-if",!0),"HE"===e[0]?(h(),p("div",{key:1,class:"chatBoxMessageLeft"},[m("div",null,[L(o,{size:30},{default:g((()=>[m("img",{src:a.currentChatMessage.ticon,alt:""},null,8,["src"])])),_:1})]),m("div",{style:{"background-color":"#eee","border-radius":"20%",padding:"10px","margin-left":"3%"}},x(e[1]),1)])):k("v-if",!0)])))),256))])],512)])),footer:g((()=>[L(w,null,{default:g((()=>[L(u,{span:"18"},{default:g((()=>[m("div",null,[L($,{type:"text",modelValue:a.message,"onUpdate:modelValue":s[4]||(s[4]=e=>a.message=e),placeholder:"输入内容..."},null,8,["modelValue"])])])),_:1}),L(u,{span:"6"},{default:g((()=>[L(d,{type:"primary",onClick:s[5]||(s[5]=e=>l.sendMessage(a.currentChatMessage.tuid))},{default:g((()=>[y("发送")])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"])])),_:1})}],["__scopeId","data-v-77966332"]]);export{_ as default};
