import{_ as t,f as e,n as a,o as s,c as i,b as l,w as o,i as d,F as c,r,g as n,d as u,e as g}from"./index-210dd68e.js";import{b as h}from"./main.d94c0398.js";const m=t({name:"list.vue",data:()=>({search:"",isLoading:!1,listPage:[],list:{total:"5",current:"1",size:"6",pageList:[{id:"1690372967496806402",name:"电脑",goodsSortId:"2",userId:"1678003959205982209",price:100,status:0,description:"2800元",createTime:"2023-08-12T22:41:35.000+00:00",updateTime:"2023-08-12T22:41:35.000+00:00",userDto:{id:"1678003959205982209",uid:"2840927713",phone:"13266424762",email:"2840927713@qq.com",username:"1.2",icon:"缩-230812-101c177b9ab0b8b3.jpg",fileId:"1690354477125726210",roleId:"1"},webUserDto:{id:"1678003959205982209",uid:"2840927713",username:"1.2",icon:"缩-230812-101c177b9ab0b8b3.jpg"},goodsImagesList:[{id:"1690372967891070978",goodsId:"1690372967496806402",fileId:"1690372949360635906",image:""}]}]}}),created(){this.getList()},onReachBottom(){this.getNextPage()},methods:{onSearch(){e({url:h+"/web/goods/list/search/"+this.search,method:"GET",success:t=>{200===t.data.code&&(this.listPage=t.data.data)}})},getDetails(t){a({url:"/h5/goods/details?id="+t})},getList(){e({url:h+"/web/goods/page",method:"POST",data:{current:this.list.current,size:this.list.size},success:t=>{200===t.data.code&&(this.listPage=this.listPage.concat(t.data.data.pageList),this.list=t.data.data,this.list.total=t.data.data.total,this.list.current=t.data.data.current)}})},getNextPage(){this.list.current*this.list.size<this.list.total&&(this.list.current++,this.getList())},formatDate:t=>new Date(t).toLocaleString()}},[["render",function(t,e,a,h,m,p){const b=u("van-search"),f=d,I=u("van-card"),L=u("el-col"),_=u("el-row"),P=u("van-button");return s(),i("div",{class:"container"},[l(f,null,{default:o((()=>[l(b,{modelValue:m.search,"onUpdate:modelValue":e[0]||(e[0]=t=>m.search=t),placeholder:"请输入搜索关键词","show-action":"",onSearch:p.onSearch},null,8,["modelValue","onSearch"])])),_:1}),l(f,null,{default:o((()=>[l(_,null,{default:o((()=>[(s(!0),i(c,null,r(m.listPage,((t,e)=>(s(),g(L,{span:24,key:t.id},{default:o((()=>[l(f,{onClick:e=>p.getDetails(t.id)},{default:o((()=>[t.goodsImagesList.length>0?(s(),g(I,{key:0,num:"1",price:t.price,desc:t.description,title:t.name,thumb:t.goodsImagesList[0].image},null,8,["price","desc","title","thumb"])):(s(),g(I,{key:1,num:"1",price:t.price,desc:t.description,title:t.name,thumb:"https://static.runoob.com/images/demo/demo2.jpg"},null,8,["price","desc","title"]))])),_:2},1032,["onClick"])])),_:2},1024)))),128))])),_:1})])),_:1}),l(f,null,{default:o((()=>[l(P,{onClick:p.getNextPage,style:{width:"100%"}},{default:o((()=>[n("上拉刷新")])),_:1},8,["onClick"])])),_:1})])}],["__scopeId","data-v-924a92d2"]]);export{m as default};
