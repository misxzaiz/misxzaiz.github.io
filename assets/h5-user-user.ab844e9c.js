import{_ as s,n as a,E as e,p as t,s as i,o as d,d as r,w as l,i as n,b as o,a as u,t as c,h as m,g,c as h,r as p,F as f,e as y}from"./index-302f575b.js";import"./main.9b257bae.js";import{j as v}from"./post.f945851b.js";import{a as _,c as k}from"./userFriend.d6a5d896.js";import{a as F}from"./user.49c371bb.js";const b=s({name:"user.vue",data:()=>({List:{},isFriend:!1,user:{}}),onLoad(s){this.user.uid=s.uid,this.getUser(this.user.uid),this.checkFriend(this.user.uid)},methods:{getDetails(s){a({url:"/h5/post/details?id="+s})},getUserList(s){v(s).then((s=>{200===s.data.code?this.List=s.data.data:e.error(s.data.message)}))},navigateToChat(s){t("chatWithTuid",s),i({url:"/h5/chat/index"})},addFriend(s){_(s).then((s=>{200===s.data.code?e.success(s.data.message):e.error(s.data.message)}))},getUser(s){F(s).then((s=>{200===s.data.code?(this.user=s.data.data,this.getUserList(this.user.id)):e.error(s.data.message)}))},checkFriend(s){k(s).then((s=>{200===s.data.code&&(this.isFriend=!0)}))}}},[["render",function(s,a,e,t,i,v){const _=y("el-avatar"),k=y("el-button"),F=y("el-card"),b=n,L=y("el-col"),j=y("el-row");return d(),r(b,null,{default:l((()=>[o(b,null,{default:l((()=>[o(F,{style:{padding:"0"}},{default:l((()=>[u("div",{class:"avatar",style:{margin:"3%"}},[o(_,{size:150,src:i.user.icon},null,8,["src"])]),u("div",{style:{padding:"14px"}},[u("span",null,c("用户名: "+i.user.username),1),u("div",{class:"bottom"},[u("time",{class:"time"},c("UID: "+i.user.uid),1),m(" TODO "),i.isFriend?(d(),r(k,{key:0,type:"primary",onClick:a[0]||(a[0]=s=>v.navigateToChat(i.user.uid))},{default:l((()=>[g("聊天")])),_:1})):(d(),r(k,{key:1,class:"button",onClick:a[1]||(a[1]=s=>v.addFriend(i.user.uid))},{default:l((()=>[g("添加")])),_:1}))])])])),_:1})])),_:1}),o(b,null,{default:l((()=>[o(j,null,{default:l((()=>[(d(!0),h(f,null,p(i.List,((s,a)=>(d(),r(L,{span:22,key:s.id,style:{margin:"2%"}},{default:l((()=>[o(F,{"body-style":{padding:"0px"}},{default:l((()=>[u("div",{onClick:a=>v.getDetails(s.id)},[s.postImageList.length>0?(d(),h("img",{key:0,src:s.postImageList[0].image,class:"image"},null,8,["src"])):(d(),h("img",{key:1,src:"https://static.runoob.com/images/demo/demo2.jpg",class:"image"}))],8,["onClick"]),u("div",{style:{padding:"14px"}},[u("span",null,c(s.title),1),u("div",{class:"bottom"},[u("time",{class:"time"},c(s.content),1)])])])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-b4ff0c52"]]);export{b as default};
