import{_ as e,k as a,f as l,o as s,c as o,a as t,b as d,w as i,d as r,F as n,r as u,g as m,e as c}from"./index-8f70e036.js";import{u as f,b as p}from"./main.971e41f6.js";import{P as h}from"./sort.25787466.js";const g=e({name:"details.vue",data:()=>({sorts:h,dialogVisible:!1,goodsSortList:[],FileUserList:[],form:{postImages:[]},fileList:[],headers:{Authorization:a("token")},uploadData:{fileUseId:null},uploadUrl:f,dialogImageUrl:""}),onLoad(e){},created(){this.getFileUserList()},methods:{saveGoods(){l({url:p+"/web/post/save",method:"POST",data:this.form,success:e=>{200===e.data.code&&this.$message.success(e.data.message)}})},handleSuccess(e,a){this.form.postImages.push(e.data.id)},handlePictureCardPreview(e){if(e.raw){const a=URL.createObjectURL(e.raw);this.dialogImageUrl=a,this.dialogVisible=!0}},handleRemove(e,a){const l=e.response.data.id,s=this.form.postImages.indexOf(l);s>-1&&this.form.postImages.splice(s,1)},getFileUserList(){l({url:p+"/web/fileUser/getIdByName/论坛",success:e=>{200===e.data.code&&(this.uploadData.fileUseId=e.data.data.id)}})}}},[["render",function(e,a,l,f,p,h){const g=r("el-input"),v=r("el-option"),w=r("el-select"),U=r("el-text"),V=r("el-icon"),b=r("el-upload"),I=r("el-dialog"),L=r("el-button");return s(),o("div",{class:"container"},[t("div",null,[d(g,{placeholder:"标题",modelValue:p.form.title,"onUpdate:modelValue":a[0]||(a[0]=e=>p.form.title=e)},null,8,["modelValue"]),d(g,{placeholder:"内容",modelValue:p.form.content,"onUpdate:modelValue":a[1]||(a[1]=e=>p.form.content=e)},null,8,["modelValue"]),d(w,{modelValue:p.form.sort,"onUpdate:modelValue":a[2]||(a[2]=e=>p.form.sort=e),placeholder:"分类",style:{width:"100%"}},{default:i((()=>[(s(!0),o(n,null,u(p.sorts,(e=>(s(),c(v,{key:e.id,label:e.name,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),t("div",null,[d(U,{class:"mx-1",type:"info"},{default:i((()=>[m("注意：图片显示出来才算上传成功！")])),_:1})]),d(b,{"file-list":p.fileList,"onUpdate:fileList":a[3]||(a[3]=e=>p.fileList=e),action:p.uploadUrl,headers:p.headers,data:p.uploadData,"list-type":"picture-card","on-preview":h.handlePictureCardPreview,"on-remove":h.handleRemove,"on-success":h.handleSuccess},{default:i((()=>[d(V,null,{default:i((()=>[(s(),o("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg","data-v-ea893728":""},[t("path",{fill:"currentColor",d:"M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"})]))])),_:1})])),_:1},8,["file-list","action","headers","data","on-preview","on-remove","on-success"]),d(I,{modelValue:p.dialogVisible,"onUpdate:modelValue":a[4]||(a[4]=e=>p.dialogVisible=e)},{default:i((()=>[t("img",{src:p.dialogImageUrl,alt:"Preview Image",style:{width:"100%"}},null,8,["src"])])),_:1},8,["modelValue"]),d(L,{onClick:h.saveGoods,style:{width:"100%","background-color":"rgb(0, 8, 255)",color:"#fff"}},{default:i((()=>[m("添加")])),_:1},8,["onClick"])])])}],["__scopeId","data-v-fad659fb"]]);export{g as default};
