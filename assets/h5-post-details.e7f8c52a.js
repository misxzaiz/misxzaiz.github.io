import{_ as e,o as t,c as a,a as s,b as i,w as n,F as l,e as o,t as d,h as r,g as p,r as g,d as u,j as m}from"./index-302f575b.js";import"./main.9b257bae.js";import{c,a as h,b as C,d as k,s as y,e as P,f}from"./post.f945851b.js";const L=e({name:"details.vue",data:()=>({likeColor:"#000",details:{id:1,title:"标题1",content:"内容1",userId:1,createTime:"2020-01-01 12:00:00",likeCount:10,userDto:{id:1,uid:1,phone:"12345678910",email:"123456@qq.com",username:"张三",icon:""},postImageList:[{id:1,postId:1,fileId:1,image:"",createTime:"2020-01-01 12:00:00"}]},dialogFormVisible:!1,postComment:null,parentComment:null,post:null,isPostLikeDisabled:!1,id:null,postId:null,parentId:null,parentCommentList:[],pageDto:{id:null,total:10,current:1,size:3,pages:0,pageList:null},currentPage:1,pageSize:3,totalValue:0,small:!0,disabled:!1,background:!1,drawer:!1}),onLoad(e){this.details.id=e.id,console.log(this.details.id),this.getDetails(this.details.id),this.checkLike(this.details.id),new URLSearchParams(location.search),this.postId=this.details.id,this.pageDto.id=this.details.id,this.getPageList()},created(){},methods:{checkLike(e){c(e).then((e=>{1===e.data.data&&(this.likeColor="#f00",this.isPostLikeDisabled=!0)}))},getDetails(e){h(e).then((e=>{200===e.data.code&&(this.details=e.data.data,this.post=e.data.data)}))},addComment(){console.log(0===this.parentCommentList.length),0===this.parentCommentList.length?(console.log("this.addPostComment()"),this.addPostComment()):this.addParentComment()},addParentComment(){""!=this.postComment?C({postId:this.postId,content:this.postComment,parentId:this.parentId}).then((e=>{200===e.data.code&&(this.pageDto.pageList.unshift(e.data.data),this.$message.success(e.data.message))})):ElMessage.error("请输入评论")},addPostComment(){""!=this.postComment?k({postId:this.postId,content:this.postComment}).then((e=>{200===e.data.code&&(this.pageDto.pageList.unshift(e.data.data),this.$message.success(e.data.message))})):ElMessage.error("请输入评论")},likePost(e){this.isPostLikeDisabled||y(e).then((e=>{200===e.data.code&&(this.post.likeCount=this.post.likeCount+1,this.details.likeCount=this.details.likeCount+1,this.isPostLikeDisabled=!0,this.likeColor="#f00")}))},tranPage(){console.log("tranPage"),this.totalValue=parseInt(this.pageDto.total),this.currentPage=parseInt(this.pageDto.current),this.pageSize=parseInt(this.pageDto.size)},getPageList(){P({current:this.currentPage,size:this.pageSize,id:this.postId}).then((e=>{200===e.data.code&&(this.pageDto=e.data.data,this.tranPage(),this.$message.success(e.data.message))}))},getPageListWithParent(e,t){0===t&&(this.currentPage=1,this.parentId=e.id,this.parentCommentList.push({total:this.pageDto.total,current:this.pageDto.current,size:this.pageDto.size,pages:this.pageDto.pages,data:e})),f({current:this.currentPage,size:this.pageSize,id:this.parentId}).then((e=>{200===e.data.code&&(this.pageDto=e.data.data,this.tranPage(),this.$message.success(e.data.message))}))},returnParent(e){console.log("returnParent:"+e),this.id=e;const t=this.parentCommentList.length;if(1===t)this.parentCommentList.pop(),this.getPageList();else{let a;for(let s=t-1;s>=0;s--){if(a=this.parentCommentList[s].data.id,console.log(a),e===a){this.id=this.parentCommentList[s-1].data.id,this.parentCommentList.pop();break}this.parentCommentList.pop()}console.log(this.id),this.parentId=this.id,f({current:this.currentPage,size:this.pageSize,id:this.parentId}).then((e=>{200===e.data.code&&(this.pageDto=e.data.data,this.tranPage(),this.$message.success(e.data.message))}))}},handleSizeChange(e){console.log("handleSizeChange"),console.log(e),this.pageDto.current=e,this.currentPage=e,0===this.parentCommentList.length?this.getPageList():this.getPageListWithParent(this.pageDto.data,1)},handleCurrentChange(e){console.log("handleCurrentChange"),console.log(e),this.pageDto.current=e,this.currentPage=e,0===this.parentCommentList.length?this.getPageList():this.getPageListWithParent(this.pageDto.data,1)},closeDrawer(){this.parentCommentList=[]}}},[["render",function(e,c,h,C,k,y){const P=m,f=o("van-icon"),L=o("el-card"),b=o("el-input"),v=o("el-button"),z=o("el-col"),D=o("el-pagination"),I=o("el-row"),_=o("el-drawer");return t(),a(l,null,[s("div",{class:"container"},[i(L,{class:"redbook-card",onClick:c[1]||(c[1]=e=>y.getDetails(k.details.id))},{default:n((()=>[s("div",{class:"card-content-wrapper"},[s("div",{class:"author-info"},[i(P,{url:"../user/user?uid="+k.details.userDto.uid,"open-type":"navigate"},{default:n((()=>[null!=k.details.userDto.icon?(t(),a("img",{key:0,src:k.details.userDto.icon,class:"author-avatar",alt:"icon"},null,8,["src"])):(t(),a("img",{key:1,src:"https://static.runoob.com/images/demo/demo1.jpg",class:"author-avatar",alt:"icon"})),s("span",{class:"author-name"},d(k.details.userDto.username),1)])),_:1},8,["url"]),r('          <el-button type="primary" style="margin-left: 16px" @click="drawer = true">评论</el-button>'),s("span",{class:"like-count",onClick:c[0]||(c[0]=e=>y.likePost(k.details.id))},[p(d(k.details.likeCount)+" ",1),i(f,{name:"like",color:k.likeColor,size:"20px"},null,8,["color"])])]),s("h3",{class:"title"},d(k.details.title),1),s("div",null,[s("span",{class:"author-desc"},d(k.details.content),1)])]),k.details.postImageList.length>0?(t(!0),a(l,{key:0},g(k.details.postImageList,((e,i)=>(t(),a("div",null,[s("img",{src:e.image,class:"image"},null,8,["src"])])))),256)):r("v-if",!0)])),_:1})]),s("div",null,[i(I,null,{default:n((()=>[i(z,{style:{"margin-bottom":"2%"}},{default:n((()=>[s("div",{style:{display:"flex","justify-content":"center","align-items":"center"}},[r(" 不加评论二字，评论框显示较慢"),s("div",null,"评论："),s("div",null,[i(b,{modelValue:k.postComment,"onUpdate:modelValue":c[2]||(c[2]=e=>k.postComment=e),placeholder:"输入评论!"},null,8,["modelValue"])]),s("div",null,[i(v,{type:"primary",onClick:c[3]||(c[3]=e=>y.addComment())},{default:n((()=>[p("发送")])),_:1})]),p("· ")])])),_:1}),r(" 父评论 "),k.parentCommentList.length>0?(t(!0),a(l,{key:0},g(k.parentCommentList,((e,a)=>(t(),u(z,{span:22,key:e.id,style:{margin:"2%"}},{default:n((()=>[i(L,{"body-style":{padding:"0px"}},{default:n((()=>[s("div",{style:{padding:"14px"}},[s("span",null,d(e.data.userDto.username),1),s("div",{class:"bottom"},[s("time",{class:"time"},d(e.data.content),1),i(v,{size:"small",type:"primary",style:{"margin-left":"16px"},onClick:t=>y.returnParent(e.data.id)},{default:n((()=>[p("返回")])),_:2},1032,["onClick"])])])])),_:2},1024)])),_:2},1024)))),128)):r("v-if",!0),r(" 分页 "),s("div",{class:"demo-pagination-block"},[i(D,{"current-page":k.currentPage,"onUpdate:currentPage":c[4]||(c[4]=e=>k.currentPage=e),"page-size":k.pageSize,"onUpdate:pageSize":c[5]||(c[5]=e=>k.pageSize=e),total:k.totalValue,"onUpdate:total":c[6]||(c[6]=e=>k.totalValue=e),small:k.small,disabled:k.disabled,background:k.background,layout:"prev, pager, next, jumper",onSizeChange:y.handleSizeChange,onCurrentChange:y.handleCurrentChange},null,8,["current-page","page-size","total","small","disabled","background","onSizeChange","onCurrentChange"])]),r(" 评论列表 "),(t(!0),a(l,null,g(k.pageDto.pageList,((e,a)=>(t(),u(z,{span:22,key:e.id,style:{margin:"2%"}},{default:n((()=>[i(L,{"body-style":{padding:"0px"}},{default:n((()=>[s("div",{style:{padding:"14px"}},[s("span",null,d(e.userDto.username),1),s("div",{class:"bottom"},[s("time",{class:"time"},d(e.content),1),i(v,{size:"small",type:"primary",style:{"margin-left":"16px"},onClick:t=>y.getPageListWithParent(e,0)},{default:n((()=>[p("展开")])),_:2},1032,["onClick"])])])])),_:2},1024)])),_:2},1024)))),128))])),_:1})]),s("div",null,[i(_,{modelValue:k.drawer,"onUpdate:modelValue":c[12]||(c[12]=e=>k.drawer=e),title:"评论区",direction:"btt",size:"70%"},{default:n((()=>[s("div",null,[i(I,null,{default:n((()=>[i(z,{style:{"margin-bottom":"2%"}},{default:n((()=>[s("div",{style:{display:"flex","justify-content":"center","align-items":"center"}},[r(" 不加评论二字，评论框显示较慢"),s("div",null,"评论："),s("div",null,[i(b,{modelValue:k.postComment,"onUpdate:modelValue":c[7]||(c[7]=e=>k.postComment=e),placeholder:"输入评论!"},null,8,["modelValue"])]),s("div",null,[i(v,{type:"primary",onClick:c[8]||(c[8]=e=>y.addComment())},{default:n((()=>[p("发送")])),_:1})]),p("· ")])])),_:1}),r(" 父评论 "),k.parentCommentList.length>0?(t(!0),a(l,{key:0},g(k.parentCommentList,((e,a)=>(t(),u(z,{span:22,key:e.id,style:{margin:"2%"}},{default:n((()=>[i(L,{"body-style":{padding:"0px"}},{default:n((()=>[s("div",{style:{padding:"14px"}},[s("span",null,d(e.data.userDto.username),1),s("div",{class:"bottom"},[s("time",{class:"time"},d(e.data.content),1),i(v,{size:"small",type:"primary",style:{"margin-left":"16px"},onClick:t=>y.returnParent(e.data.id)},{default:n((()=>[p("返回")])),_:2},1032,["onClick"])])])])),_:2},1024)])),_:2},1024)))),128)):r("v-if",!0),r(" 分页 "),s("div",{class:"demo-pagination-block"},[i(D,{"current-page":k.currentPage,"onUpdate:currentPage":c[9]||(c[9]=e=>k.currentPage=e),"page-size":k.pageSize,"onUpdate:pageSize":c[10]||(c[10]=e=>k.pageSize=e),total:k.totalValue,"onUpdate:total":c[11]||(c[11]=e=>k.totalValue=e),small:k.small,disabled:k.disabled,background:k.background,layout:"prev, pager, next, jumper",onSizeChange:y.handleSizeChange,onCurrentChange:y.handleCurrentChange},null,8,["current-page","page-size","total","small","disabled","background","onSizeChange","onCurrentChange"])]),r(" 评论列表 "),(t(!0),a(l,null,g(k.pageDto.pageList,((e,a)=>(t(),u(z,{span:22,key:e.id,style:{margin:"2%"}},{default:n((()=>[i(L,{"body-style":{padding:"0px"}},{default:n((()=>[s("div",{style:{padding:"14px"}},[s("span",null,d(e.userDto.username),1),s("div",{class:"bottom"},[s("time",{class:"time"},d(e.content),1),i(v,{size:"small",type:"primary",style:{"margin-left":"16px"},onClick:t=>y.getPageListWithParent(e,0)},{default:n((()=>[p("展开")])),_:2},1032,["onClick"])])])])),_:2},1024)])),_:2},1024)))),128))])),_:1})])])),_:1},8,["modelValue"])])],64)}],["__scopeId","data-v-6c245eea"]]);export{L as default};
