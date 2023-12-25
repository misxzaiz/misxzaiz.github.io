import{_ as e,k as a,f as l,o,c as t,b as s,w as d,d as i,a as r,F as u,r as n,g as m,e as c}from"./index-3ed3001b.js";import{u as f,b as p}from"./main.8e5f0cbc.js";import{P as h}from"./sort.25787466.js";const v=e({name:"details.vue",data:()=>({active:0,postSorts:h,dialogVisible:!1,goodsSortList:[],status:[{value:0,name:"出售中"},{value:1,name:"停止出售"}],FileUserList:[],form:{postImages:[],goodsImages:[]},fileList:[],headers:{Authorization:a("token")},uploadData:{fileUseId:null},uploadDataGoods:{fileUseId:null},uploadUrl:f,dialogImageUrl:""}),onLoad(e){},created(){this.getFileUserList(),this.getGoodsSortList()},methods:{getGoodsSortList(){l({url:p+"/web/goodsSort/list",method:"GET",success:e=>{200===e.data.code&&(this.goodsSortList=e.data.data)}})},saveGoods(){l({url:p+"/web/goods/save",method:"POST",data:this.form,success:e=>{200===e.data.code&&this.$message.success(e.data.message)}})},savePost(){l({url:p+"/web/post/save",method:"POST",data:this.form,success:e=>{200===e.data.code&&this.$message.success(e.data.message)}})},handleSuccess(e,a){this.form.postImages.push(e.data.id),this.form.goodsImages.push(e.data.id)},handlePictureCardPreview(e){if(e.raw){const a=URL.createObjectURL(e.raw);this.dialogImageUrl=a,this.dialogVisible=!0}},handleRemove(e,a){const l=e.response.data.id,o=this.form.postImages.indexOf(l);o>-1&&this.form.postImages.splice(o,1)},getFileUserList(){l({url:p+"/web/fileUser/getIdByName/论坛",success:e=>{200===e.data.code&&(this.uploadData.fileUseId=e.data.data.id)}}),l({url:p+"/web/fileUser/getIdByName/商品",success:e=>{200===e.data.code&&(this.uploadDataGoods.fileUseId=e.data.data.id)}})}}},[["render",function(e,a,l,f,p,h){const v=i("el-input"),g=i("el-option"),V=i("el-select"),w=i("el-text"),U=i("el-icon"),b=i("el-upload"),I=i("el-dialog"),L=i("el-button"),_=i("van-tab"),S=i("el-input-number"),y=i("van-tabs");return o(),t("div",{class:"container"},[s(y,{modelValue:p.active,"onUpdate:modelValue":a[12]||(a[12]=e=>p.active=e)},{default:d((()=>[s(_,{title:"分享"},{default:d((()=>[r("div",null,[s(v,{placeholder:"标题",modelValue:p.form.title,"onUpdate:modelValue":a[0]||(a[0]=e=>p.form.title=e)},null,8,["modelValue"]),s(v,{placeholder:"内容",modelValue:p.form.content,"onUpdate:modelValue":a[1]||(a[1]=e=>p.form.content=e)},null,8,["modelValue"]),s(V,{modelValue:p.form.sort,"onUpdate:modelValue":a[2]||(a[2]=e=>p.form.sort=e),placeholder:"分类",style:{width:"100%"}},{default:d((()=>[(o(!0),t(u,null,n(p.postSorts,(e=>(o(),c(g,{key:e.id,label:e.name,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),r("div",null,[s(w,{class:"mx-1",type:"info"},{default:d((()=>[m("注意：图片显示出来才算上传成功！")])),_:1})]),s(b,{"file-list":p.fileList,"onUpdate:fileList":a[3]||(a[3]=e=>p.fileList=e),action:p.uploadUrl,headers:p.headers,data:p.uploadData,"list-type":"picture-card","on-preview":h.handlePictureCardPreview,"on-remove":h.handleRemove,"on-success":h.handleSuccess},{default:d((()=>[s(U,null,{default:d((()=>[(o(),t("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg","data-v-ea893728":""},[r("path",{fill:"currentColor",d:"M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"})]))])),_:1})])),_:1},8,["file-list","action","headers","data","on-preview","on-remove","on-success"]),s(I,{modelValue:p.dialogVisible,"onUpdate:modelValue":a[4]||(a[4]=e=>p.dialogVisible=e)},{default:d((()=>[r("img",{"w-full":"",src:p.dialogImageUrl,alt:"Preview Image",style:{width:"100%"}},null,8,["src"])])),_:1},8,["modelValue"]),s(L,{onClick:h.savePost,style:{width:"100%","background-color":"rgb(0, 8, 255)",color:"#fff"}},{default:d((()=>[m("添加")])),_:1},8,["onClick"])])])),_:1}),s(_,{title:"商品"},{default:d((()=>[r("div",null,[s(v,{placeholder:"名称",modelValue:p.form.name,"onUpdate:modelValue":a[5]||(a[5]=e=>p.form.name=e)},null,8,["modelValue"]),s(v,{placeholder:"描述",modelValue:p.form.description,"onUpdate:modelValue":a[6]||(a[6]=e=>p.form.description=e)},null,8,["modelValue"]),r("div",null,[s(S,{placeholder:"价格",modelValue:p.form.price,"onUpdate:modelValue":a[7]||(a[7]=e=>p.form.price=e),min:0,max:100},null,8,["modelValue"])]),s(V,{modelValue:p.form.status,"onUpdate:modelValue":a[8]||(a[8]=e=>p.form.status=e),placeholder:"状态"},{default:d((()=>[(o(!0),t(u,null,n(p.status,(e=>(o(),c(g,{key:e.value,label:e.name,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),s(V,{modelValue:p.form.goodsSortId,"onUpdate:modelValue":a[9]||(a[9]=e=>p.form.goodsSortId=e),placeholder:"分类"},{default:d((()=>[(o(!0),t(u,null,n(p.goodsSortList,(e=>(o(),c(g,{key:e.id,label:e.name,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),s(b,{"file-list":p.fileList,"onUpdate:fileList":a[10]||(a[10]=e=>p.fileList=e),action:p.uploadUrl,headers:p.headers,data:p.uploadDataGoods,"list-type":"picture-card","on-preview":h.handlePictureCardPreview,"on-remove":h.handleRemove,"on-success":h.handleSuccess},{default:d((()=>[s(U,null,{default:d((()=>[(o(),t("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg","data-v-ea893728":""},[r("path",{fill:"currentColor",d:"M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"})]))])),_:1})])),_:1},8,["file-list","action","headers","data","on-preview","on-remove","on-success"]),s(I,{modelValue:p.dialogVisible,"onUpdate:modelValue":a[11]||(a[11]=e=>p.dialogVisible=e)},{default:d((()=>[r("img",{"w-full":"",src:p.dialogImageUrl,alt:"Preview Image",style:{width:"100%"}},null,8,["src"])])),_:1},8,["modelValue"]),s(L,{onClick:h.saveGoods,style:{width:"100%","background-color":"rgb(0, 8, 255)",color:"#fff"}},{default:d((()=>[m("添加")])),_:1},8,["onClick"])])])),_:1})])),_:1},8,["modelValue"])])}],["__scopeId","data-v-f8d5325d"]]);export{v as default};
