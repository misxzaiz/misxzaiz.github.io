import{_ as a,n as s,f as t,o as e,c as i,b as d,w as l,d as o,a as r,t as u,F as c,r as n,h as m,j as g}from"./index-761681e4.js";import{b as p}from"./main.a06e3ca3.js";const h=a({name:"details.vue",data:()=>({tuid:null,likeColor:"#000",details:{userDto:{uid:null},goodsImagesList:[]}}),onLoad(a){this.details.id=a.id,this.getDetails(this.details.id)},created(){},methods:{navToPage(a){s({url:"/h5/user/user?uid="+a})},getDetails(a){t({url:p+"/web/goods/"+a,success:a=>{200===a.data.code&&(this.details=a.data.data,console.log(a.data.data.userDto.uid),this.tuid=a.data.data.userDto.uid)}})}}},[["render",function(a,s,t,p,h,v){const f=g,D=o("el-card");return e(),i("div",{class:"container"},[d(D,{class:"redbook-card"},{default:l((()=>[r("div",{class:"card-content-wrapper"},[r("div",{class:"author-info"},[d(f,{url:"../user/user?uid="+h.tuid,"open-type":"navigate"},{default:l((()=>[null!=h.details.userDto.icon?(e(),i("img",{key:0,src:h.details.userDto.icon,class:"author-avatar",alt:"icon"},null,8,["src"])):(e(),i("img",{key:1,src:"https://static.runoob.com/images/demo/demo1.jpg",class:"author-avatar",alt:"icon"})),r("span",{class:"author-name"},u(h.details.userDto.username),1)])),_:1},8,["url"])]),r("h3",{class:"title"},u(h.details.name),1),r("span",{class:"price"},u(h.details.price)+" 元 ",1),r("div",null,[r("span",{class:"author-desc"},u(h.details.description),1)])]),h.details.goodsImagesList.length>0?(e(!0),i(c,{key:0},n(h.details.goodsImagesList,((a,s)=>(e(),i("div",null,[r("img",{src:a.image,class:"image",alt:""},null,8,["src"])])))),256)):m("v-if",!0)])),_:1})])}],["__scopeId","data-v-14f3b525"]]);export{h as default};
