import{_ as a,n as s,r as e,o as t,d as i,a as d,w as l,g as o,b as r,t as u,F as c,e as n,h as g,j as m}from"./index-191a9f24.js";const p=a({name:"details.vue",data:()=>({tuid:null,likeColor:"#000",details:{userDto:{uid:null},goodsImagesList:[]}}),onLoad(a){this.details.id=a.id,this.getDetails(this.details.id)},created(){},methods:{navToPage(a){s({url:"/pages/campus/user/user?uid="+a})},getDetails(a){e({url:"/api/web/goods/"+a,success:a=>{200===a.data.code&&(this.details=a.data.data,console.log(a.data.data.userDto.uid),this.tuid=a.data.data.userDto.uid)}})}}},[["render",function(a,s,e,p,h,v){const D=m,f=o("el-card");return t(),i("div",{class:"container"},[d(f,{class:"redbook-card"},{default:l((()=>[r("div",{class:"card-content-wrapper"},[r("div",{class:"author-info"},[d(D,{url:"../user/user?uid="+h.tuid,"open-type":"navigate"},{default:l((()=>[null!=h.details.userDto.icon?(t(),i("img",{key:0,src:h.details.userDto.icon,class:"author-avatar",alt:"icon"},null,8,["src"])):(t(),i("img",{key:1,src:"https://static.runoob.com/images/demo/demo1.jpg",class:"author-avatar",alt:"icon"})),r("span",{class:"author-name"},u(h.details.userDto.username),1)])),_:1},8,["url"])]),r("h3",{class:"title"},u(h.details.name),1),r("span",{class:"price"},u(h.details.price)+" 元 ",1),r("div",null,[r("span",{class:"author-desc"},u(h.details.description),1)])]),h.details.goodsImagesList.length>0?(t(!0),i(c,{key:0},n(h.details.goodsImagesList,((a,s)=>(t(),i("div",null,[r("img",{src:a.image,class:"image",alt:""},null,8,["src"])])))),256)):g("v-if",!0)])),_:1})])}],["__scopeId","data-v-1492b53a"]]);export{p as default};
