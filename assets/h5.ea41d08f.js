import{_ as t,f as a,n as e,E as s,o as l,e as i,w as o,i as r,b as c,a as n,c as d,r as u,F as m,g,d as h,t as p}from"./index-fc26f8ba.js";import f from"./h5-post-sort.f2375e07.js";import{P as _}from"./sort.25787466.js";import{b as v}from"./main.3c4401b6.js";const b=t({name:"Index",components:{PostSort:f},data:()=>({postSort:_,search:"",listPage:[],list:{total:0,current:0,size:6,pageList:[{id:1,title:"标题1",content:"内容1",userId:1,createTime:"2020-01-01 12:00:00",likeCount:10,userDto:{id:1,uid:1,phone:"12345678910",email:"123456@qq.com",username:"张三",icon:""},postImageList:[{id:1,postId:1,fileId:1,image:"",createTime:"2020-01-01 12:00:00"}]}]}}),created(){this.getALLList()},onReachBottom(){this.getNextPage()},methods:{onSearch(){""!==this.search&&a({url:v+"/web/post/list/search/"+this.search,method:"GET",success:t=>{200===t.data.code&&(this.listPage=t.data.data)}})},getDetails(t){console.log("getDetails"),e({url:"/h5/post/details?id="+t})},getVoucher(){e({url:"/h5/voucher/index"})},getALLList(){a({url:v+"/web/post/page",method:"POST",data:{current:this.list.current,size:this.list.size},success:t=>{200===t.data.code&&(this.listPage=this.listPage.concat(t.data.data.pageList),this.list=t.data.data,this.list.total=t.data.data.total,this.list.current=t.data.data.current)}})},getNextPage(){this.list.current*this.list.size<this.list.total?(this.list.current++,this.getALLList()):s.error("已到尽头！")}}},[["render",function(t,a,e,s,f,_){const v=h("van-search"),b=r,k=h("van-swipe-item"),L=h("van-swipe"),w=h("el-card"),P=h("el-col"),y=h("el-row"),x=h("van-button"),C=h("van-tab"),I=h("PostSort"),S=h("van-tabs");return l(),i(b,null,{default:o((()=>[c(b,null,{default:o((()=>[c(v,{modelValue:f.search,"onUpdate:modelValue":a[0]||(a[0]=t=>f.search=t),placeholder:"请输入搜索关键词","show-action":"",onSearch:_.onSearch},null,8,["modelValue","onSearch"])])),_:1}),c(b,null,{default:o((()=>[c(S,null,{default:o((()=>[c(C,{title:"全部"},{default:o((()=>[n("div",{class:"type-list"},[n("div",{class:"type-box"},[c(L,{autoplay:3e3},{default:o((()=>[c(k,null,{default:o((()=>[n("img",{src:"https://www.dgut.edu.cn/images/n_about_fl01_img1.jpg",alt:"图片"})])),_:1}),c(k,{onClick:_.getVoucher},{default:o((()=>[n("img",{src:"/assets/liping-86098c1e.png",alt:"图片"})])),_:1},8,["onClick"]),c(k,null,{default:o((()=>[n("img",{src:"https://pic3.zhimg.com/v2-150d3bb89688130269ad1eb0247d4961_r.jpg",alt:"图片"})])),_:1})])),_:1})])]),n("div",{class:"container"},[c(y,null,{default:o((()=>[(l(!0),d(m,null,u(f.listPage,((t,a)=>(l(),i(P,{span:12,key:t.id,style:{"margin-bottom":"20px"}},{default:o((()=>[c(w,{class:"redbook-card",onClick:a=>_.getDetails(t.id)},{default:o((()=>[n("div",{class:"image-wrapper"},[t.postImageList.length>0?(l(),d("img",{key:0,src:t.postImageList[0].image,class:"image",alt:""},null,8,["src"])):(l(),d("img",{key:1,src:"https://static.runoob.com/images/demo/demo2.jpg",class:"image",alt:""}))]),n("div",{class:"card-content-wrapper"},[n("h3",{class:"title"},p(t.title),1),n("div",{class:"author-info"},[null!=t.userDto.icon?(l(),d("img",{key:0,src:t.userDto.icon,class:"author-avatar",alt:"icon"},null,8,["src"])):(l(),d("img",{key:1,src:"https://static.runoob.com/images/demo/demo1.jpg",class:"author-avatar",alt:"icon"})),n("span",{class:"author-name"},p(t.userDto.username),1),n("span",{class:"like-count"},p(t.likeCount),1)])])])),_:2},1032,["onClick"])])),_:2},1024)))),128))])),_:1})]),c(x,{onClick:_.getNextPage,style:{width:"100%"}},{default:o((()=>[g("上拉刷新")])),_:1},8,["onClick"])])),_:1}),(l(!0),d(m,null,u(f.postSort,(t=>(l(),i(b,null,{default:o((()=>[c(C,{title:t.name},{default:o((()=>[c(I,{"sort-id":t.id},null,8,["sort-id"])])),_:2},1032,["title"])])),_:2},1024)))),256))])),_:1}),n("div",{style:{"text-align":"center"}},[n("div",null,[n("a",{href:"https://beian.miit.gov.cn/",target:"_blank"},"粤ICP备2023038789号")])])])),_:1})])),_:1})}],["__scopeId","data-v-6356ef40"]]);export{b as default};
