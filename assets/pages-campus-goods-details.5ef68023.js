import{_ as a,n as s,r as e,b as t,o as i,e as d,a as l,w as o,h as r,d as u,t as c,F as n,f as g,j as m,k as p}from"./index-c4b61f01.js";const h=a({name:"details.vue",data:()=>({tuid:null,likeColor:"#000",details:{userDto:{uid:null},goodsImagesList:[]}}),onLoad(a){this.details.id=a.id,this.getDetails(this.details.id)},created(){},methods:{navToPage(a){s({url:"/pages/campus/user/user?uid="+a})},getDetails(a){e({url:t+"/web/goods/"+a,success:a=>{200===a.data.code&&(this.details=a.data.data,console.log(a.data.data.userDto.uid),this.tuid=a.data.data.userDto.uid)}})}}},[["render",function(a,s,e,t,h,v){const f=p,D=r("el-card");return i(),d("div",{class:"container"},[l(D,{class:"redbook-card"},{default:o((()=>[u("div",{class:"card-content-wrapper"},[u("div",{class:"author-info"},[l(f,{url:"../user/user?uid="+h.tuid,"open-type":"navigate"},{default:o((()=>[null!=h.details.userDto.icon?(i(),d("img",{key:0,src:h.details.userDto.icon,class:"author-avatar",alt:"icon"},null,8,["src"])):(i(),d("img",{key:1,src:"https://static.runoob.com/images/demo/demo1.jpg",class:"author-avatar",alt:"icon"})),u("span",{class:"author-name"},c(h.details.userDto.username),1)])),_:1},8,["url"])]),u("h3",{class:"title"},c(h.details.name),1),u("span",{class:"price"},c(h.details.price)+" 元 ",1),u("div",null,[u("span",{class:"author-desc"},c(h.details.description),1)])]),h.details.goodsImagesList.length>0?(i(!0),d(n,{key:0},g(h.details.goodsImagesList,((a,s)=>(i(),d("div",null,[u("img",{src:a.image,class:"image",alt:""},null,8,["src"])])))),256)):m("v-if",!0)])),_:1})])}],["__scopeId","data-v-5390858e"]]);export{h as default};
