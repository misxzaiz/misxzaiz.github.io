import{_ as e,k as a,f as l,o as s,c as o,a as t,b as i,w as d,e as r,F as n,r as m,d as u,g as c}from"./index-4ab51a6b.js";import{u as f,b as p}from"./main.c8ecacb9.js";import{P as h}from"./sort.25787466.js";import{h as g}from"./post.4b5053fa.js";const v=e({name:"details.vue",data:()=>({sorts:h,dialogVisible:!1,goodsSortList:[],FileUserList:[],form:{postImages:[]},fileList:[],headers:{Authorization:a("token")},uploadUrl:f,dialogImageUrl:""}),onLoad(e){},created(){this.getFileUserList()},methods:{saveGoods(){g(this.form).then((e=>{200===e.data.code&&this.$message.success(e.data.message)}))},handleSuccess(e,a){this.form.postImages.push(e.data.id)},handlePictureCardPreview(e){if(e.raw){const a=URL.createObjectURL(e.raw);this.dialogImageUrl=a,this.dialogVisible=!0}},handleRemove(e,a){const l=e.response.data.id,s=this.form.postImages.indexOf(l);s>-1&&this.form.postImages.splice(s,1)},getFileUserList(){l({url:p+"/web/fileUser   /getIdByName/论坛",success:e=>{200===e.data.code&&(this.uploadData.fileUseId=e.data.data.id)}})}}},[["render",function(e,a,l,f,p,h){const g=r("el-input"),v=r("el-option"),V=r("el-select"),w=r("el-text"),U=r("el-icon"),b=r("el-upload"),I=r("el-dialog"),L=r("el-button");return s(),o("div",{class:"container"},[t("div",null,[i(g,{placeholder:"标题",modelValue:p.form.title,"onUpdate:modelValue":a[0]||(a[0]=e=>p.form.title=e)},null,8,["modelValue"]),i(g,{placeholder:"内容",modelValue:p.form.content,"onUpdate:modelValue":a[1]||(a[1]=e=>p.form.content=e)},null,8,["modelValue"]),i(V,{modelValue:p.form.sort,"onUpdate:modelValue":a[2]||(a[2]=e=>p.form.sort=e),placeholder:"分类",style:{width:"100%"}},{default:d((()=>[(s(!0),o(n,null,m(p.sorts,(e=>(s(),u(v,{key:e.id,label:e.name,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),t("div",null,[i(w,{class:"mx-1",type:"info"},{default:d((()=>[c("注意：图片显示出来才算上传成功！")])),_:1})]),i(b,{"file-list":p.fileList,"onUpdate:fileList":a[3]||(a[3]=e=>p.fileList=e),action:p.uploadUrl,headers:p.headers,"list-type":"picture-card","on-preview":h.handlePictureCardPreview,"on-remove":h.handleRemove,"on-success":h.handleSuccess},{default:d((()=>[i(U,null,{default:d((()=>[(s(),o("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg","data-v-ea893728":""},[t("path",{fill:"currentColor",d:"M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"})]))])),_:1})])),_:1},8,["file-list","action","headers","on-preview","on-remove","on-success"]),i(I,{modelValue:p.dialogVisible,"onUpdate:modelValue":a[4]||(a[4]=e=>p.dialogVisible=e)},{default:d((()=>[t("img",{src:p.dialogImageUrl,alt:"Preview Image",style:{width:"100%"}},null,8,["src"])])),_:1},8,["modelValue"]),i(L,{onClick:h.saveGoods,style:{width:"100%","background-color":"rgb(0, 8, 255)",color:"#fff"}},{default:d((()=>[c("添加")])),_:1},8,["onClick"])])])}],["__scopeId","data-v-4785d875"]]);export{v as default};