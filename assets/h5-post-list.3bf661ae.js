import{_ as t,n as e,f as s,o as i,c as a,b as o,w as l,d as n,F as c,r,e as d,a as m,t as g}from"./index-fd703f15.js";import{b as u}from"./main.ca0f6ec6.js";const h=t({name:"login.vue",data:()=>({isLoading:!1,listPage:[],list:{total:0,current:1,size:6,pageList:[{id:1,title:"标题1",content:"内容1",userId:1,createTime:"2020-01-01 12:00:00",likeCount:10,userDto:{id:1,uid:1,phone:"12345678910",email:"123456@qq.com",username:"张三",icon:"https://static.runoob.com/images/demo/demo1.jpg"},postImageList:[{id:1,postId:1,fileId:1,image:"https://static.runoob.com/images/demo/demo1.jpg",createTime:"2020-01-01 12:00:00"}]}]}}),created(){this.getList()},mounted(){window.addEventListener("scroll",this.handleScroll)},beforeDestroy(){window.removeEventListener("scroll",this.handleScroll)},methods:{getDetails(t){console.log("getDetails"),e({url:"/h5/post/details?id="+t})},getList(){s({url:u+"/web/post/page",method:"POST",data:{current:this.list.current,size:this.list.size},success:t=>{200===t.data.code&&(this.listPage=this.listPage.concat(t.data.data.pageList),this.list=t.data.data)}})},handleScroll(){const t=document.documentElement.scrollHeight,e=document.documentElement.scrollTop,s=document.documentElement.clientHeight;!this.isLoading&&e+s>=t&&(this.isLoading=!0,setTimeout((()=>{this.getNextPage()}),100))},getNextPage(){this.list.current<this.list.total&&(this.list.current++,this.getList()),this.isLoading=!1},prevPage(){this.list.current>1&&(this.list.current--,this.getList())},nextPage(){this.list.current<this.list.total&&(this.list.current++,this.getList())},formatDate:t=>new Date(t).toLocaleString()}},[["render",function(t,e,s,u,h,p){const L=n("el-card"),f=n("el-col"),v=n("el-row");return i(),a("div",{class:"container"},[o(v,null,{default:l((()=>[(i(!0),a(c,null,r(h.listPage,((t,e)=>(i(),d(f,{span:12,key:t.id,style:{"margin-bottom":"20px"}},{default:l((()=>[o(L,{class:"redbook-card",onClick:e=>p.getDetails(t.id)},{default:l((()=>[m("div",{class:"image-wrapper"},[t.postImageList.length>0?(i(),a("img",{key:0,src:t.postImageList[0].image,class:"image"},null,8,["src"])):(i(),a("img",{key:1,src:"https://static.runoob.com/images/demo/demo2.jpg",class:"image"}))]),m("div",{class:"card-content-wrapper"},[m("h3",{class:"title"},g(t.title),1),m("div",{class:"author-info"},[null!=t.userDto.icon?(i(),a("img",{key:0,src:t.userDto.icon,class:"author-avatar",alt:"icon"},null,8,["src"])):(i(),a("img",{key:1,src:"https://static.runoob.com/images/demo/demo1.jpg",class:"author-avatar",alt:"icon"})),m("span",{class:"author-name"},g(t.userDto.username),1),m("span",{class:"like-count"},g(t.likeCount),1)])])])),_:2},1032,["onClick"])])),_:2},1024)))),128))])),_:1})])}],["__scopeId","data-v-89c19361"]]);export{h as default};
