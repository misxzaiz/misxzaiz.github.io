import{_ as s,n as e,f as a,E as t,p as i,s as d,o as r,e as l,w as u,i as n,b as c,a as o,t as m,h as g,g as h,c as p,r as f,F as y,d as b}from"./index-adcaaed7.js";import{b as k}from"./main.fafcc896.js";const v=s({name:"user.vue",data:()=>({List:{},isFriend:!1,user:{}}),onLoad(s){this.user.uid=s.uid,this.getUser(this.user.uid),this.checkFriend(this.user.uid)},methods:{getDetails(s){e({url:"/h5/post/details?id="+s})},getUserList(s){a({url:k+"/web/post/list/"+s,method:"GET",success:s=>{200===s.data.code?this.List=s.data.data:t.error(s.data.message)}})},navigateToChat(s){i("chatWithTuid",s),d({url:"/h5/chat/index"})},addFriend(s){a({url:k+"/web/user-friend/add/"+s,method:"GET",success:s=>{200===s.data.code?t.success(s.data.message):t.error(s.data.message)}})},getUser(s){a({url:k+"/web/user/uid/"+s,method:"GET",success:s=>{200===s.data.code?(this.user=s.data.data,this.getUserList(this.user.id)):t.error(s.data.message)}})},checkFriend(s){a({url:k+"/web/user-friend/check/"+s,method:"GET",success:s=>{200===s.data.code&&(this.isFriend=!0)}})}}},[["render",function(s,e,a,t,i,d){const k=b("el-avatar"),v=b("el-button"),_=b("el-card"),F=n,L=b("el-col"),T=b("el-row");return r(),l(F,null,{default:u((()=>[c(F,null,{default:u((()=>[c(_,{style:{padding:"0"}},{default:u((()=>[o("div",{class:"avatar",style:{margin:"3%"}},[c(k,{size:150,src:i.user.icon},null,8,["src"])]),o("div",{style:{padding:"14px"}},[o("span",null,m("用户名: "+i.user.username),1),o("div",{class:"bottom"},[o("time",{class:"time"},m("UID: "+i.user.uid),1),g(" TODO "),i.isFriend?(r(),l(v,{key:0,type:"primary",onClick:e[0]||(e[0]=s=>d.navigateToChat(i.user.uid))},{default:u((()=>[h("聊天")])),_:1})):(r(),l(v,{key:1,class:"button",onClick:e[1]||(e[1]=s=>d.addFriend(i.user.uid))},{default:u((()=>[h("添加")])),_:1}))])])])),_:1})])),_:1}),c(F,null,{default:u((()=>[c(T,null,{default:u((()=>[(r(!0),p(y,null,f(i.List,((s,e)=>(r(),l(L,{span:22,key:s.id,style:{margin:"2%"}},{default:u((()=>[c(_,{"body-style":{padding:"0px"}},{default:u((()=>[o("div",{onClick:e=>d.getDetails(s.id)},[s.postImageList.length>0?(r(),p("img",{key:0,src:s.postImageList[0].image,class:"image"},null,8,["src"])):(r(),p("img",{key:1,src:"https://static.runoob.com/images/demo/demo2.jpg",class:"image"}))],8,["onClick"]),o("div",{style:{padding:"14px"}},[o("span",null,m(s.title),1),o("div",{class:"bottom"},[o("time",{class:"time"},m(s.content),1)])])])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-21e99907"]]);export{v as default};
