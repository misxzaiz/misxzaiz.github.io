import{_ as e,r as t,n as a,b as s,o as i,e as l,a as d,w as o,i as c,F as n,f as r,g as u,h as g,c as h}from"./index-d8d576be.js";const m=e({name:"list.vue",data:()=>({search:"",isLoading:!1,listPage:[],list:{total:"5",current:"1",size:"6",pageList:[{id:"1690372967496806402",name:"电脑",goodsSortId:"2",userId:"1678003959205982209",price:100,status:0,description:"2800元",createTime:"2023-08-12T22:41:35.000+00:00",updateTime:"2023-08-12T22:41:35.000+00:00",userDto:{id:"1678003959205982209",uid:"2840927713",phone:"13266424762",email:"2840927713@qq.com",username:"1.2",icon:"缩-230812-101c177b9ab0b8b3.jpg",fileId:"1690354477125726210",roleId:"1"},webUserDto:{id:"1678003959205982209",uid:"2840927713",username:"1.2",icon:"缩-230812-101c177b9ab0b8b3.jpg"},goodsImagesList:[{id:"1690372967891070978",goodsId:"1690372967496806402",fileId:"1690372949360635906",image:""}]}]}}),created(){this.getList()},onReachBottom(){this.getNextPage()},methods:{onSearch(){t({url:`/api/web/goods/list/search/${this.search}`,method:"GET",success:e=>{200===e.data.code&&(this.listPage=e.data.data)}})},getDetails(e){a({url:"/pages/campus/goods/details?id="+e})},getList(){t({url:s+"/web/goods/page",method:"POST",data:{current:this.list.current,size:this.list.size},success:e=>{200===e.data.code&&(this.listPage=this.listPage.concat(e.data.data.pageList),this.list=e.data.data,this.list.total=e.data.data.total,this.list.current=e.data.data.current)}})},getNextPage(){this.list.current*this.list.size<this.list.total&&(this.list.current++,this.getList())},formatDate:e=>new Date(e).toLocaleString()}},[["render",function(e,t,a,s,m,p){const b=g("van-search"),f=c,I=g("van-card"),L=g("el-col"),_=g("el-row"),P=g("van-button");return i(),l("div",{class:"container"},[d(f,null,{default:o((()=>[d(b,{modelValue:m.search,"onUpdate:modelValue":t[0]||(t[0]=e=>m.search=e),placeholder:"请输入搜索关键词","show-action":"",onSearch:p.onSearch},null,8,["modelValue","onSearch"])])),_:1}),d(f,null,{default:o((()=>[d(_,null,{default:o((()=>[(i(!0),l(n,null,r(m.listPage,((e,t)=>(i(),h(L,{span:24,key:e.id},{default:o((()=>[d(f,{onClick:t=>p.getDetails(e.id)},{default:o((()=>[e.goodsImagesList.length>0?(i(),h(I,{key:0,num:"1",price:e.price,desc:e.description,title:e.name,thumb:e.goodsImagesList[0].image},null,8,["price","desc","title","thumb"])):(i(),h(I,{key:1,num:"1",price:e.price,desc:e.description,title:e.name,thumb:"https://static.runoob.com/images/demo/demo2.jpg"},null,8,["price","desc","title"]))])),_:2},1032,["onClick"])])),_:2},1024)))),128))])),_:1})])),_:1}),d(f,null,{default:o((()=>[d(P,{onClick:p.getNextPage,style:{width:"100%"}},{default:o((()=>[u("上拉刷新")])),_:1},8,["onClick"])])),_:1})])}],["__scopeId","data-v-349d3145"]]);export{m as default};
