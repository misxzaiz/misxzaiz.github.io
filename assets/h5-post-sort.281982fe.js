import{_ as t,n as s,f as a,E as e,o as i,c as o,b as l,w as r,d as c,F as n,r as d,g as u,e as g,a as m,t as h}from"./index-f35e6997.js";const p=t({name:"PostSort.vue",props:{sortId:""},data:()=>({listPage:[],list:{total:0,current:0,size:6,pageList:[{id:1,title:"标题1",content:"内容1",userId:1,createTime:"2020-01-01 12:00:00",likeCount:10,userDto:{id:1,uid:1,phone:"12345678910",email:"123456@qq.com",username:"张三",icon:""},postImageList:[{id:1,postId:1,fileId:1,image:"",createTime:"2020-01-01 12:00:00"}]}]}}),created(){this.getListBySortId(this.sortId)},onReachBottom(){this.getNextPage()},methods:{getDetails(t){console.log("getDetails"),s({url:"/h5/post/details?id="+t})},getListBySortId(t){a({url:`/api/web/post/page/${t}`,method:"POST",data:{current:this.list.current,size:this.list.size},success:t=>{200===t.data.code&&(this.listPage=this.listPage.concat(t.data.data.pageList),this.list=t.data.data,this.list.total=t.data.data.total,this.list.current=t.data.data.current)}})},getNextPage(){this.list.current*this.list.size<this.list.total?(this.list.current++,this.getListBySortId(this.sortId)):e.error("已到尽头！")}}},[["render",function(t,s,a,e,p,k){const I=c("el-card"),f=c("el-col"),y=c("el-row"),v=c("van-button");return i(),o("div",{class:"container"},[l(y,null,{default:r((()=>[(i(!0),o(n,null,d(p.listPage,((t,s)=>(i(),g(f,{span:12,key:t.id,style:{"margin-bottom":"20px"}},{default:r((()=>[l(I,{class:"redbook-card",onClick:s=>k.getDetails(t.id)},{default:r((()=>[m("div",{class:"image-wrapper"},[t.postImageList.length>0?(i(),o("img",{key:0,src:t.postImageList[0].image,class:"image"},null,8,["src"])):(i(),o("img",{key:1,src:"https://static.runoob.com/images/demo/demo2.jpg",class:"image"}))]),m("div",{class:"card-content-wrapper"},[m("h3",{class:"title"},h(t.title),1),m("div",{class:"author-info"},[null!=t.userDto.icon?(i(),o("img",{key:0,src:t.userDto.icon,class:"author-avatar",alt:"icon"},null,8,["src"])):(i(),o("img",{key:1,src:"https://static.runoob.com/images/demo/demo1.jpg",class:"author-avatar",alt:"icon"})),m("span",{class:"author-name"},h(t.userDto.username),1),m("span",{class:"like-count"},h(t.likeCount),1)])])])),_:2},1032,["onClick"])])),_:2},1024)))),128))])),_:1}),l(v,{onClick:k.getNextPage,style:{width:"100%"}},{default:r((()=>[u("上拉刷新")])),_:1},8,["onClick"])])}],["__scopeId","data-v-09e9f5b7"]]);export{p as default};
