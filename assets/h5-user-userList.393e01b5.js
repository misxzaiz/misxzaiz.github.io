import{_ as e,k as t,E as s,f as l,o as a,e as d,w as n,i,a as o,b as u,c as r,r as c,F as h,d as f,t as p,h as m}from"./index-f8a0c12d.js";import{w as y,b}from"./main.1676879d.js";const g=e({name:"index.vue",data:()=>({headers:{Authorization:t("token")},uploadData:{fileUseId:null},uploadUrl:"https://"+y+"/web/user/import",file:null,List:[]}),mounted(){this.getUserList()},methods:{handleSuccess(e,t){s.success(e.data.message)},getUserList(){l({url:b+"/web/user/list",method:"GET",success:e=>{200===e.data.code?this.List=e.data.data:s.error(e.data.message)}})}}},[["render",function(e,t,s,l,y,b){const g=f("el-upload"),L=i;return a(),d(L,null,{default:n((()=>[o("div",{style:{display:"flex","justify-content":"flex-end","align-items":"center"}},[o("div",{style:{"padding-top":"3%",width:"100%",display:"flex","justify-content":"center","align-items":"center","background-color":"#1b2864"}},[u(g,{"file-list":e.fileList,"onUpdate:fileList":t[0]||(t[0]=t=>e.fileList=t),action:y.uploadUrl,headers:y.headers,data:y.uploadData,"on-success":b.handleSuccess},{default:n((()=>[o("span",{style:{color:"white"}},"批量注册用户")])),_:1},8,["file-list","action","headers","data","on-success"])])]),o("div",{class:"table-container"},[o("table",{class:"table"},[o("thead",null,[o("tr",null,[o("th",null,"uid"),o("th",null,"username"),o("th",null,"phone"),o("th",null,"email"),o("th",null,"role")])]),o("tbody",null,[(a(!0),r(h,null,c(y.List,((e,t)=>(a(),r("tr",{key:t},[o("td",null,p(e.uid),1),o("td",null,p(e.username),1),o("td",null,p(e.phone),1),o("td",null,p(e.email),1),1==e.roleId?(a(),r("td",{key:0,style:{color:"red"}},"超级管理员")):2==e.roleId?(a(),r("td",{key:1,style:{color:"blue"}},"管理员")):3==e.roleId?(a(),r("td",{key:2},"用户")):m("v-if",!0)])))),128))])])])])),_:1})}],["__scopeId","data-v-0d0faef0"]]);export{g as default};
