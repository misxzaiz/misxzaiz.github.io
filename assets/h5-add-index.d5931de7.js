import{_ as e,k as a,o as l,c as o,b as t,w as s,e as d,a as i,F as r,r as n,d as u,g as m,h as c}from"./index-2007efc8.js";import{d as p,u as v}from"./main.de0242ca.js";import{P as h}from"./sort.25787466.js";import{h as f}from"./post.08ee9640.js";function g(e){return p("CampusServer/FileUserBiz/getFileUseList/V1",e)}const w=e({name:"details.vue",data:()=>({active:0,postSorts:h,dialogVisible:!1,goodsSortList:[],status:[{value:0,name:"出售中"},{value:1,name:"停止出售"}],FileUserList:[],form:{postImages:[],goodsImages:[]},fileList:[],headers:{Authorization:a("token")},uploadData:{fileUseId:null},uploadDataGoods:{fileUseId:null},uploadUrl:v,dialogImageUrl:""}),onLoad(e){},created(){this.getFileUserList(),this.getGoodsSortList()},methods:{getGoodsSortList(){p("CampusServer/GoodsBiz/getGoodsSortList/V1",null).then((e=>{200===e.data.code&&(this.goodsSortList=e.data.data)}))},saveGoods(){var e;(e=this.form,p("CampusServer/GoodsBiz/saveGoods/V1",e)).then((e=>{200===e.data.code&&this.$message.success(e.data.message)}))},savePost(){f(this.form).then((e=>{200===e.data.code&&this.$message.success(e.data.message)}))},handleSuccess(e,a){this.form.postImages.push(e.data.id),this.form.goodsImages.push(e.data.id)},handlePictureCardPreview(e){if(e.raw){const a=URL.createObjectURL(e.raw);this.dialogImageUrl=a,this.dialogVisible=!0}},handleRemove(e,a){const l=e.response.data.id,o=this.form.postImages.indexOf(l);o>-1&&this.form.postImages.splice(o,1)},getFileUserList(){g("论坛").then((e=>{200===e.data.code&&(this.uploadData.fileUseId=e.data.data.id)})),g("商品").then((e=>{200===e.data.code&&(this.uploadDataGoods.fileUseId=e.data.data.id)}))}}},[["render",function(e,a,p,v,h,f){const g=d("el-input"),w=d("el-option"),V=d("el-select"),b=d("el-text"),U=d("el-icon"),I=d("el-upload"),L=d("el-dialog"),S=d("el-button"),y=d("van-tab"),G=d("van-tabs");return l(),o("div",{class:"container"},[t(G,{modelValue:h.active,"onUpdate:modelValue":a[5]||(a[5]=e=>h.active=e)},{default:s((()=>[t(y,{title:"分享"},{default:s((()=>[i("div",null,[t(g,{placeholder:"标题",modelValue:h.form.title,"onUpdate:modelValue":a[0]||(a[0]=e=>h.form.title=e)},null,8,["modelValue"]),t(g,{placeholder:"内容",modelValue:h.form.content,"onUpdate:modelValue":a[1]||(a[1]=e=>h.form.content=e)},null,8,["modelValue"]),t(V,{modelValue:h.form.sort,"onUpdate:modelValue":a[2]||(a[2]=e=>h.form.sort=e),placeholder:"分类",style:{width:"100%"}},{default:s((()=>[(l(!0),o(r,null,n(h.postSorts,(e=>(l(),u(w,{key:e.id,label:e.name,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),i("div",null,[t(b,{class:"mx-1",type:"info"},{default:s((()=>[m("注意：图片显示出来才算上传成功！")])),_:1})]),t(I,{"file-list":h.fileList,"onUpdate:fileList":a[3]||(a[3]=e=>h.fileList=e),action:h.uploadUrl,headers:h.headers,data:h.uploadData,"list-type":"picture-card","on-preview":f.handlePictureCardPreview,"on-remove":f.handleRemove,"on-success":f.handleSuccess},{default:s((()=>[t(U,null,{default:s((()=>[(l(),o("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg","data-v-ea893728":""},[i("path",{fill:"currentColor",d:"M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"})]))])),_:1})])),_:1},8,["file-list","action","headers","data","on-preview","on-remove","on-success"]),t(L,{modelValue:h.dialogVisible,"onUpdate:modelValue":a[4]||(a[4]=e=>h.dialogVisible=e)},{default:s((()=>[i("img",{"w-full":"",src:h.dialogImageUrl,alt:"Preview Image",style:{width:"100%"}},null,8,["src"])])),_:1},8,["modelValue"]),t(S,{onClick:f.savePost,style:{width:"100%","background-color":"rgb(0, 8, 255)",color:"#fff"}},{default:s((()=>[m("添加")])),_:1},8,["onClick"])])])),_:1}),c('      <van-tab title="商品">'),c("        <div>"),c('          <el-input placeholder="名称" v-model="form.name"></el-input>'),c('          <el-input placeholder="描述" v-model="form.description"></el-input>'),c('          <div><el-input-number placeholder="价格" v-model="form.price" :min="0" :max="100"  /></div>'),c('          <el-select v-model="form.status" placeholder="状态">'),c('            <el-option v-for="item in status" :key="item.value" :label="item.name" :value="item.value"></el-option>'),c("          </el-select>"),c('          <el-select v-model="form.goodsSortId" placeholder="分类">'),c('            <el-option v-for="item in goodsSortList" :key="item.id" :label="item.name" :value="item.id"></el-option>'),c("          </el-select>"),c("          <el-upload"),c('              v-model:file-list="fileList"'),c('              :action="uploadUrl"'),c('              :headers="headers"'),c('              :data="uploadDataGoods"'),c('              list-type="picture-card"'),c('              :on-preview="handlePictureCardPreview"'),c('              :on-remove="handleRemove"'),c('              :on-success="handleSuccess"'),c("          >"),c('            <el-icon><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"></path></svg></el-icon>'),c("          </el-upload>"),c('          <el-dialog v-model="dialogVisible">'),c('            <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%;"/>'),c("          </el-dialog>"),c('          <el-button @click="saveGoods" style="width: 100%; background-color:rgb(0, 8, 255); color: #fff;">添加</el-button>'),c("        </div>"),c("      </van-tab>")])),_:1},8,["modelValue"])])}],["__scopeId","data-v-fa9dbd56"]]);export{w as default};
