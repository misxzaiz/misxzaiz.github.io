import{f as request,_ as _export_sfc,o as openBlock,c as createElementBlock,a as createBaseVNode,b as createVNode,w as withCtx,t as toDisplayString,h as createCommentVNode,e as resolveComponent,g as createTextVNode,d as createBlock}from"./index-4ab51a6b.js";const MAIN_URI="http://127.0.0.1:8000",getTopServerListApi=()=>request({url:`${MAIN_URI}/interface/getTopServerList`,method:"GET"}),getServerListApi=e=>request({url:`${MAIN_URI}/interface/getServerList/${e}`,method:"GET"}),getServerUsedApi=e=>request({url:`${MAIN_URI}/interface/getServerUsed/${e}`,method:"GET"}),getServerBalanceApi=e=>request({url:`${MAIN_URI}/server/getServerBalance/${e}`,method:"GET"}),setServerDetailApi=e=>request({url:`${MAIN_URI}/interface/setServerDetail`,method:"POST",data:e}),dealMethodApi=e=>request({url:`${MAIN_URI}/server/dealMethod`,method:"POST",data:e}),interface_vue_vue_type_style_index_0_scoped_323580e6_lang="",_sfc_main={data:()=>({list:{serverTopList:[],serverList:[]},po:{serverDetail:{serverName:null,name:null,desc:null},serverPo:{name:null,ip:null,port:null,weight:null,area:null,classItemList:[]},classItem:{className:null,classPath:null,classMark:null,methodList:[]},methodDetail:{methodName:null,methodArgsTypes:[]},methodArgsType:{name:null,args:[],argsJson:null},dealMethodPo:{id:null,token:null,serverName:null,className:null,version:null,methodName:null,data:null,result:null,jsonData:{}}},dialog:{editServer:!1}}),onLoad(){},mounted(){this.getTopServerList()},methods:{getTopServerList(){getTopServerListApi().then((e=>{this.list.serverTopList=e.data}))},getServerList(e){this.po.dealMethodPo.serverName=e.serverName,getServerListApi(e.serverName).then((t=>{e.status=0!==t.data.length,this.list.serverList=t.data}))},getServerUsed(e){this.po.dealMethodPo.serverName=e.serverName,getServerUsedApi(e.serverName).then((t=>{e.status=0!==t.data.length,this.list.serverList=t.data}))},getServerBalance(e){this.po.dealMethodPo.serverName=e.serverName,getServerBalanceApi(e.serverName).then((t=>{e.status=0!==t.data.length,this.list.serverList=t.data}))},editDialog(e){this.dialog.editServer=!0,this.po.serverDetail=e},edit(){setServerDetailApi(this.po.serverDetail).then((e=>{this.$message.success("修改成功！")}))},showServerDetail(e){this.po.dealMethodPo.name=e.name,this.po.serverPo=e},showMethod(method,row){if(this.po.dealMethodPo.className=row.className,this.po.dealMethodPo.methodName=method.methodName,this.po.dealMethodPo.version=row.classMark,0!==method.methodArgsTypes.length){let args=method.methodArgsTypes[0].args;null!==args?(this.po.dealMethodPo.data=method.methodArgsTypes[0].argsJson,this.po.dealMethodPo.jsonData=eval("("+method.methodArgsTypes[0].argsJson+")"),console.log(this.po.dealMethodPo.jsonData)):this.po.dealMethodPo.data=""}else this.po.dealMethodPo.data=""},dealMethod(){dealMethodApi(this.po.dealMethodPo).then((e=>{this.po.dealMethodPo.result=e.data,this.po.dealMethodPo.result.dataJson=JSON.stringify(e.data.data,null,2).replace(/\\n/g,"\n")}))},showMethodDetail(e){this.po.dealMethodPo.className=e.className,this.po.dealMethodPo.version=e.classMark,this.po.classItem=e}}};function _sfc_render(e,t,o,a,l,r){const d=resolveComponent("el-button"),s=resolveComponent("el-table-column"),i=resolveComponent("el-text"),n=resolveComponent("el-table"),c=resolveComponent("el-input"),m=resolveComponent("el-form-item"),p=resolveComponent("el-form"),h=resolveComponent("el-dialog"),u=resolveComponent("el-tag"),N=resolveComponent("el-descriptions-item"),v=resolveComponent("el-descriptions");return openBlock(),createElementBlock("div",{class:"container"},[createBaseVNode("div",{class:"server-list"},[createVNode(n,{data:l.list.serverTopList,style:{width:"100%"},stripe:""},{default:withCtx((()=>[createVNode(s,{prop:"serverName",label:"项目名",width:"120"},{default:withCtx((e=>[createBaseVNode("div",{class:"table-cell"},[createVNode(d,{type:"text",plain:"",onClick:t=>r.getServerUsed(e.row)},{default:withCtx((()=>[createTextVNode(toDisplayString(e.row.serverName),1)])),_:2},1032,["onClick"])])])),_:1}),createVNode(s,{prop:"status",label:"状态",width:"80"},{default:withCtx((e=>[createBaseVNode("div",{class:"table-cell"},[e.row.status?(openBlock(),createBlock(i,{key:0,type:"success"},{default:withCtx((()=>[createTextVNode("运行中")])),_:1})):(openBlock(),createBlock(i,{key:1,type:"danger"},{default:withCtx((()=>[createTextVNode("停止中")])),_:1}))])])),_:1}),createCommentVNode('        <el-table-column prop="serverName" label="负载均衡" width="100">'),createCommentVNode('          <template #default="scope">'),createCommentVNode('            <div class="table-cell">'),createCommentVNode('              <el-button type="text" plain @click="getServerBalance(scope.row)">随机</el-button>'),createCommentVNode("            </div>"),createCommentVNode("          </template>"),createCommentVNode("        </el-table-column>"),createVNode(s,{prop:"name",label:"名字","min-width":"120"}),createVNode(s,{prop:"desc",label:"描述","min-width":"120"}),createVNode(s,{prop:"edit",label:"编辑",width:"80"},{default:withCtx((e=>[createBaseVNode("div",{class:"table-cell"},[createVNode(d,{type:"text",plain:"",onClick:t=>r.editDialog(e.row)},{default:withCtx((()=>[createTextVNode("编辑")])),_:2},1032,["onClick"])])])),_:1})])),_:1},8,["data"]),createVNode(h,{modelValue:l.dialog.editServer,"onUpdate:modelValue":t[3]||(t[3]=e=>l.dialog.editServer=e),title:l.po.serverDetail.serverName},{default:withCtx((()=>[createVNode(p,{model:l.po.serverDetail},{default:withCtx((()=>[createVNode(m,{label:"昵称"},{default:withCtx((()=>[createVNode(c,{modelValue:l.po.serverDetail.name,"onUpdate:modelValue":t[0]||(t[0]=e=>l.po.serverDetail.name=e)},null,8,["modelValue"])])),_:1}),createVNode(m,{label:"描述"},{default:withCtx((()=>[createVNode(c,{modelValue:l.po.serverDetail.desc,"onUpdate:modelValue":t[1]||(t[1]=e=>l.po.serverDetail.desc=e)},null,8,["modelValue"])])),_:1})])),_:1},8,["model"]),createBaseVNode("div",{slot:"footer",class:"dialog-footer"},[createVNode(d,{onClick:t[2]||(t[2]=e=>l.dialog.editServer=!1)},{default:withCtx((()=>[createTextVNode("取消")])),_:1}),createVNode(d,{type:"primary",onClick:r.edit},{default:withCtx((()=>[createTextVNode("确认")])),_:1},8,["onClick"])])])),_:1},8,["modelValue","title"]),createVNode(n,{data:l.list.serverList,style:{width:"100%"},stripe:""},{default:withCtx((()=>[createVNode(s,{prop:"name",label:"服务名","min-width":"120"},{default:withCtx((e=>[createBaseVNode("div",{class:"table-cell"},[createVNode(d,{type:"text",plain:"",onClick:t=>r.showServerDetail(e.row)},{default:withCtx((()=>[createTextVNode(toDisplayString(e.row.name),1)])),_:2},1032,["onClick"])])])),_:1}),createVNode(s,{prop:"ip",label:"IP","min-width":"100"}),createVNode(s,{prop:"port",label:"端口号",width:"80"}),createVNode(s,{prop:"weight",label:"权重",width:"80"}),createVNode(s,{prop:"area",label:"区域",width:"80"})])),_:1},8,["data"]),createVNode(n,{data:l.po.serverPo.classItemList,style:{width:"100%"},stripe:""},{default:withCtx((()=>[createVNode(s,{prop:"className",label:"接口名","min-width":"120"},{default:withCtx((e=>[createBaseVNode("div",{class:"table-cell"},[createVNode(d,{type:"text",plain:"",onClick:t=>r.showMethodDetail(e.row)},{default:withCtx((()=>[createTextVNode(toDisplayString(e.row.className),1)])),_:2},1032,["onClick"])])])),_:1}),createVNode(s,{prop:"serverName",label:"服务名","min-width":"120"}),createVNode(s,{prop:"classPath",label:"类路径","min-width":"120"}),createVNode(s,{prop:"classMark",label:"类标识","min-width":"120"})])),_:1},8,["data"]),createVNode(n,{data:l.po.classItem.methodList,style:{width:"100%"},stripe:""},{default:withCtx((()=>[createVNode(s,{prop:"methodName",label:"方法","min-width":"120"},{default:withCtx((e=>[createBaseVNode("div",{class:"table-cell"},[createVNode(d,{type:"text",plain:"",onClick:t=>r.showMethod(e.row,l.po.classItem)},{default:withCtx((()=>[createTextVNode(toDisplayString(e.row.methodName),1)])),_:2},1032,["onClick"])])])),_:1}),createVNode(s,{prop:"deal",label:"属性",width:"80"},{default:withCtx((e=>[e.row.methodArgsTypes.length>0?(openBlock(),createElementBlock("div",{key:0,class:"table-cell"},toDisplayString(e.row.methodArgsTypes[0].name),1)):createCommentVNode("v-if",!0)])),_:1})])),_:1},8,["data"])]),createBaseVNode("div",{class:"service-list"},[createBaseVNode("div",{style:{width:"100%","margin-top":"20px"}},[createBaseVNode("div",{style:{"font-size":"large","font-weight":"bolder","margin-bottom":"1%"}},toDisplayString(l.po.dealMethodPo.serverName)+" - "+toDisplayString(l.po.dealMethodPo.className)+" - "+toDisplayString(l.po.dealMethodPo.methodName)+" - "+toDisplayString(l.po.dealMethodPo.version),1),createCommentVNode("        <div>"),createCommentVNode('          <el-form :model="po.dealMethodPo">'),createCommentVNode('            <el-form-item v-for="(value, key) in po.dealMethodPo.jsonData" :key="key" :label="key">'),createCommentVNode('              <el-input v-model="po.dealMethodPo.jsonData[key]" placeholder="data" clearable :rows="6" />'),createCommentVNode("            </el-form-item>"),createCommentVNode("            <el-form-item>"),createCommentVNode('              <el-button type="primary" @click="dealMethod">执行</el-button>'),createCommentVNode("            </el-form-item>"),createCommentVNode("          </el-form>"),createCommentVNode("        </div>"),createBaseVNode("div",null,[createVNode(p,{model:l.po.dealMethodPo,style:{"margin-top":"10px"}},{default:withCtx((()=>[createVNode(m,{label:""},{default:withCtx((()=>[createVNode(c,{type:"textarea",modelValue:l.po.dealMethodPo.data,"onUpdate:modelValue":t[4]||(t[4]=e=>l.po.dealMethodPo.data=e),placeholder:"data",clearable:"",rows:6,size:"mini"},null,8,["modelValue"])])),_:1}),createCommentVNode("            <el-form-item>"),createCommentVNode('              <el-button type="primary" @click="dealMethod" size="mini">执行</el-button>'),createCommentVNode("            </el-form-item>")])),_:1},8,["model"])]),createBaseVNode("div",null,[createBaseVNode("div",null,[createVNode(v,{title:"",size:"mini"},{default:withCtx((()=>[null!=l.po.dealMethodPo.result?(openBlock(),createBlock(N,{key:0,label:"结果状态码"},{default:withCtx((()=>[200===l.po.dealMethodPo.result.code?(openBlock(),createBlock(u,{key:0,class:"ml-2",type:"success",size:"mini"},{default:withCtx((()=>[createTextVNode(toDisplayString(l.po.dealMethodPo.result.code),1)])),_:1})):(openBlock(),createBlock(u,{key:1,class:"ml-2",type:"danger",size:"mini"},{default:withCtx((()=>[createTextVNode(toDisplayString(l.po.dealMethodPo.result.code),1)])),_:1}))])),_:1})):createCommentVNode("v-if",!0),null!=l.po.dealMethodPo.result?(openBlock(),createBlock(N,{key:1,label:"结果消息"},{default:withCtx((()=>[createTextVNode(toDisplayString(l.po.dealMethodPo.result.message),1)])),_:1})):createCommentVNode("v-if",!0)])),_:1})]),null!=l.po.dealMethodPo.result?(openBlock(),createElementBlock("div",{key:0,label:"结果数据"},[createVNode(c,{type:"textarea",modelValue:l.po.dealMethodPo.result.dataJson,"onUpdate:modelValue":t[5]||(t[5]=e=>l.po.dealMethodPo.result.dataJson=e),placeholder:"data",clearable:"",rows:6,size:"mini"},null,8,["modelValue"])])):createCommentVNode("v-if",!0)])])])])}const _interface=_export_sfc(_sfc_main,[["render",_sfc_render],["__scopeId","data-v-323580e6"]]);export{_interface as default};
