import{_ as e,r as t,o as a,c as s,b as i,d as l,w as n,F as o,e as d,t as r,a as p,h as u,f as g,j as m,g as c}from"./index-b5be8391.js";import{b as h}from"./main.f5021bed.js";const C=e({name:"details.vue",data:()=>({likeColor:"#000",details:{id:1,title:"标题1",content:"内容1",userId:1,createTime:"2020-01-01 12:00:00",likeCount:10,userDto:{id:1,uid:1,phone:"12345678910",email:"123456@qq.com",username:"张三",icon:""},postImageList:[{id:1,postId:1,fileId:1,image:"",createTime:"2020-01-01 12:00:00"}]},dialogFormVisible:!1,postComment:null,parentComment:null,post:null,isPostLikeDisabled:!1,id:null,postId:null,parentId:null,parentCommentList:[],pageDto:{id:null,total:10,current:1,size:3,pages:0,pageList:null},currentPage:1,pageSize:3,totalValue:0,small:!0,disabled:!1,background:!1,drawer:!1}),onLoad(e){this.details.id=e.id,console.log(this.details.id),this.getDetails(this.details.id),this.checkLike(this.details.id),new URLSearchParams(location.search),this.postId=this.details.id,this.pageDto.id=this.details.id,this.getPageList()},created(){},methods:{checkLike(e){t({url:h+"/web/postLike/check/"+e,success:e=>{1===e.data.data&&(this.likeColor="#f00",this.isPostLikeDisabled=!0)}})},getDetails(e){t({url:h+"/web/post/"+e,success:e=>{200===e.data.code&&(this.details=e.data.data,this.post=e.data.data)}})},addComment(){console.log(0===this.parentCommentList.length),0===this.parentCommentList.length?(console.log("this.addPostComment()"),this.addPostComment()):this.addParentComment()},addParentComment(){""!=this.postComment?t({url:h+"/web/postController/addCommentWithParent",method:"POST",data:{postId:this.postId,content:this.postComment,parentId:this.parentId},success:e=>{200===e.data.code&&(this.pageDto.pageList.unshift(e.data.data),this.$message.success(e.data.message))}}):ElMessage.error("请输入评论")},addPostComment(){""!=this.postComment?t({url:h+"/web/postController/addCommentWithPost",method:"POST",data:{postId:this.postId,content:this.postComment},success:e=>{200===e.data.code&&(this.pageDto.pageList.unshift(e.data.data),this.$message.success(e.data.message))}}):ElMessage.error("请输入评论")},likePost(e){this.isPostLikeDisabled||t({url:h+"/web/postLike/"+e,success:e=>{200===e.data.code&&(this.post.likeCount=this.post.likeCount+1,this.details.likeCount=this.details.likeCount+1,this.isPostLikeDisabled=!0,this.likeColor="#f00")}})},tranPage(){console.log("tranPage"),this.totalValue=parseInt(this.pageDto.total),this.currentPage=parseInt(this.pageDto.current),this.pageSize=parseInt(this.pageDto.size)},getPageList(){t({url:h+"/web/postController/getTopComment",method:"POST",data:{current:this.currentPage,size:this.pageSize,id:this.postId},success:e=>{200===e.data.code&&(this.pageDto=e.data.data,this.tranPage(),this.$message.success(e.data.message))}})},getPageListWithParent(e,a){0===a&&(this.currentPage=1,this.parentId=e.id,this.parentCommentList.push({total:this.pageDto.total,current:this.pageDto.current,size:this.pageDto.size,pages:this.pageDto.pages,data:e})),t({url:h+"/web/postController/getCommentByParent",method:"POST",data:{current:this.currentPage,size:this.pageSize,id:this.parentId},success:e=>{200===e.data.code&&(this.pageDto=e.data.data,this.tranPage(),this.$message.success(e.data.message))}})},returnParent(e){console.log("returnParent:"+e),this.id=e;const a=this.parentCommentList.length;if(1===a)this.parentCommentList.pop(),this.getPageList();else{let s;for(let t=a-1;t>=0;t--){if(s=this.parentCommentList[t].data.id,console.log(s),e===s){this.id=this.parentCommentList[t-1].data.id,this.parentCommentList.pop();break}this.parentCommentList.pop()}console.log(this.id),this.parentId=this.id,t({url:h+"/web/postController/getCommentByParent",method:"POST",data:{current:this.currentPage,size:this.pageSize,id:this.id},success:e=>{200===e.data.code&&(console.log(e.data.data),this.pageDto=e.data.data,this.tranPage(),this.$message.success(e.data.message))}})}},handleSizeChange(e){console.log("handleSizeChange"),console.log(e),this.pageDto.current=e,this.currentPage=e,0===this.parentCommentList.length?this.getPageList():this.getPageListWithParent(this.pageDto.data,1)},handleCurrentChange(e){console.log("handleCurrentChange"),console.log(e),this.pageDto.current=e,this.currentPage=e,0===this.parentCommentList.length?this.getPageList():this.getPageListWithParent(this.pageDto.data,1)},closeDrawer(){this.parentCommentList=[]}}},[["render",function(e,t,h,C,P,k){const y=m,b=d("van-icon"),f=d("el-card"),L=d("el-input"),v=d("el-button"),D=d("el-col"),z=d("el-pagination"),S=d("el-row"),_=d("el-drawer");return a(),s(o,null,[i("div",{class:"container"},[l(f,{class:"redbook-card",onClick:t[1]||(t[1]=e=>k.getDetails(P.details.id))},{default:n((()=>[i("div",{class:"card-content-wrapper"},[i("div",{class:"author-info"},[l(y,{url:"../user/user?uid="+P.details.userDto.uid,"open-type":"navigate"},{default:n((()=>[null!=P.details.userDto.icon?(a(),s("img",{key:0,src:P.details.userDto.icon,class:"author-avatar",alt:"icon"},null,8,["src"])):(a(),s("img",{key:1,src:"https://static.runoob.com/images/demo/demo1.jpg",class:"author-avatar",alt:"icon"})),i("span",{class:"author-name"},r(P.details.userDto.username),1)])),_:1},8,["url"]),p('          <el-button type="primary" style="margin-left: 16px" @click="drawer = true">评论</el-button>'),i("span",{class:"like-count",onClick:t[0]||(t[0]=e=>k.likePost(P.details.id))},[u(r(P.details.likeCount)+" ",1),l(b,{name:"like",color:P.likeColor,size:"20px"},null,8,["color"])])]),i("h3",{class:"title"},r(P.details.title),1),i("div",null,[i("span",{class:"author-desc"},r(P.details.content),1)])]),P.details.postImageList.length>0?(a(!0),s(o,{key:0},g(P.details.postImageList,((e,t)=>(a(),s("div",null,[i("img",{src:e.image,class:"image"},null,8,["src"])])))),256)):p("v-if",!0)])),_:1})]),i("div",null,[l(S,null,{default:n((()=>[l(D,{style:{"margin-bottom":"2%"}},{default:n((()=>[i("div",{style:{display:"flex","justify-content":"center","align-items":"center"}},[p(" 不加评论二字，评论框显示较慢"),i("div",null,"评论："),i("div",null,[l(L,{modelValue:P.postComment,"onUpdate:modelValue":t[2]||(t[2]=e=>P.postComment=e),placeholder:"输入评论!"},null,8,["modelValue"])]),i("div",null,[l(v,{type:"primary",onClick:t[3]||(t[3]=e=>k.addComment())},{default:n((()=>[u("发送")])),_:1})]),u("· ")])])),_:1}),p(" 父评论 "),P.parentCommentList.length>0?(a(!0),s(o,{key:0},g(P.parentCommentList,((e,t)=>(a(),c(D,{span:22,key:e.id,style:{margin:"2%"}},{default:n((()=>[l(f,{"body-style":{padding:"0px"}},{default:n((()=>[i("div",{style:{padding:"14px"}},[i("span",null,r(e.data.userDto.username),1),i("div",{class:"bottom"},[i("time",{class:"time"},r(e.data.content),1),l(v,{size:"small",type:"primary",style:{"margin-left":"16px"},onClick:t=>k.returnParent(e.data.id)},{default:n((()=>[u("返回")])),_:2},1032,["onClick"])])])])),_:2},1024)])),_:2},1024)))),128)):p("v-if",!0),p(" 分页 "),i("div",{class:"demo-pagination-block"},[l(z,{"current-page":P.currentPage,"onUpdate:currentPage":t[4]||(t[4]=e=>P.currentPage=e),"page-size":P.pageSize,"onUpdate:pageSize":t[5]||(t[5]=e=>P.pageSize=e),total:P.totalValue,"onUpdate:total":t[6]||(t[6]=e=>P.totalValue=e),small:P.small,disabled:P.disabled,background:P.background,layout:"prev, pager, next, jumper",onSizeChange:k.handleSizeChange,onCurrentChange:k.handleCurrentChange},null,8,["current-page","page-size","total","small","disabled","background","onSizeChange","onCurrentChange"])]),p(" 评论列表 "),(a(!0),s(o,null,g(P.pageDto.pageList,((e,t)=>(a(),c(D,{span:22,key:e.id,style:{margin:"2%"}},{default:n((()=>[l(f,{"body-style":{padding:"0px"}},{default:n((()=>[i("div",{style:{padding:"14px"}},[i("span",null,r(e.userDto.username),1),i("div",{class:"bottom"},[i("time",{class:"time"},r(e.content),1),l(v,{size:"small",type:"primary",style:{"margin-left":"16px"},onClick:t=>k.getPageListWithParent(e,0)},{default:n((()=>[u("展开")])),_:2},1032,["onClick"])])])])),_:2},1024)])),_:2},1024)))),128))])),_:1})]),i("div",null,[l(_,{modelValue:P.drawer,"onUpdate:modelValue":t[12]||(t[12]=e=>P.drawer=e),title:"评论区",direction:"btt",size:"70%"},{default:n((()=>[i("div",null,[l(S,null,{default:n((()=>[l(D,{style:{"margin-bottom":"2%"}},{default:n((()=>[i("div",{style:{display:"flex","justify-content":"center","align-items":"center"}},[p(" 不加评论二字，评论框显示较慢"),i("div",null,"评论："),i("div",null,[l(L,{modelValue:P.postComment,"onUpdate:modelValue":t[7]||(t[7]=e=>P.postComment=e),placeholder:"输入评论!"},null,8,["modelValue"])]),i("div",null,[l(v,{type:"primary",onClick:t[8]||(t[8]=e=>k.addComment())},{default:n((()=>[u("发送")])),_:1})]),u("· ")])])),_:1}),p(" 父评论 "),P.parentCommentList.length>0?(a(!0),s(o,{key:0},g(P.parentCommentList,((e,t)=>(a(),c(D,{span:22,key:e.id,style:{margin:"2%"}},{default:n((()=>[l(f,{"body-style":{padding:"0px"}},{default:n((()=>[i("div",{style:{padding:"14px"}},[i("span",null,r(e.data.userDto.username),1),i("div",{class:"bottom"},[i("time",{class:"time"},r(e.data.content),1),l(v,{size:"small",type:"primary",style:{"margin-left":"16px"},onClick:t=>k.returnParent(e.data.id)},{default:n((()=>[u("返回")])),_:2},1032,["onClick"])])])])),_:2},1024)])),_:2},1024)))),128)):p("v-if",!0),p(" 分页 "),i("div",{class:"demo-pagination-block"},[l(z,{"current-page":P.currentPage,"onUpdate:currentPage":t[9]||(t[9]=e=>P.currentPage=e),"page-size":P.pageSize,"onUpdate:pageSize":t[10]||(t[10]=e=>P.pageSize=e),total:P.totalValue,"onUpdate:total":t[11]||(t[11]=e=>P.totalValue=e),small:P.small,disabled:P.disabled,background:P.background,layout:"prev, pager, next, jumper",onSizeChange:k.handleSizeChange,onCurrentChange:k.handleCurrentChange},null,8,["current-page","page-size","total","small","disabled","background","onSizeChange","onCurrentChange"])]),p(" 评论列表 "),(a(!0),s(o,null,g(P.pageDto.pageList,((e,t)=>(a(),c(D,{span:22,key:e.id,style:{margin:"2%"}},{default:n((()=>[l(f,{"body-style":{padding:"0px"}},{default:n((()=>[i("div",{style:{padding:"14px"}},[i("span",null,r(e.userDto.username),1),i("div",{class:"bottom"},[i("time",{class:"time"},r(e.content),1),l(v,{size:"small",type:"primary",style:{"margin-left":"16px"},onClick:t=>k.getPageListWithParent(e,0)},{default:n((()=>[u("展开")])),_:2},1032,["onClick"])])])])),_:2},1024)])),_:2},1024)))),128))])),_:1})])])),_:1},8,["modelValue"])])],64)}],["__scopeId","data-v-6491eabb"]]);export{C as default};
