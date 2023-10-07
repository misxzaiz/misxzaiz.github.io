import{_ as e,k as s,r as l,E as a,o as t,g as o,w as r,i as c,c as u,b as d,d as i,h,a as v,f as n,F as m,e as b,t as p,l as g}from"./index-1a793410.js";import{b as k}from"./main.6dd7c69f.js";const y=e({name:"login.vue",data:()=>({roleId:4,voucherOrders:[],voucherCount:null,couponId:null,vouchers:[{title:"80元优惠卷",subTitle:"周一至周日均可使用",payValue:100,actualValue:80,stock:10,createTime:"2023-06-01",updateTime:"2025-06-01"}]}),mounted(){this.queryVoucher(),this.getMyOrder();const e=JSON.parse(s("userDto"));this.roleId=e.roleId},methods:{seckill(){l({url:k+"/web/voucher-order/seckill/1",method:"GET",success:e=>{200===e.data.code?(this.$message.success("抢卷成功！"),this.$message.success("优惠卷订单号为："+e.data.data),this.getMyOrder()):a.error(e.data.message)}})},queryVoucher(){l({url:k+"/web/voucher/list",method:"GET",success:e=>{200===e.data.code?this.vouchers=e.data.data:a.error(e.data.message)}})},getMyOrder(){l({url:k+"/web/voucher-order/list",method:"GET",success:e=>{200===e.data.code?this.voucherOrders=e.data.data:a.error(e.data.message)}})},formatTime:e=>"",deleteVoucherOrderByUserId(){l({url:k+"/web/voucher-order/delete",method:"GET",success:e=>{200===e.data.code?this.$message.success("删除成功！"):a.error(e.data.message)}})},updateVoucherCount(e){l({url:k+"/web/voucher/setVoucherCount/"+e,method:"GET",success:e=>{200===e.data.code?this.$message.success("修改成功！"):a.error(e.data.message)}})}}},[["render",function(e,s,l,a,k,y){const V=b("el-button"),f=b("el-input"),T=b("van-cell"),C=c;return t(),o(C,null,{default:r((()=>[1==k.roleId?(t(),u("div",{key:0},[d("div",null,[i(V,{onClick:s[0]||(s[0]=e=>y.deleteVoucherOrderByUserId())},{default:r((()=>[h("删除我的优惠卷")])),_:1})]),d("div",null,[i(f,{modelValue:k.voucherCount,"onUpdate:modelValue":s[1]||(s[1]=e=>k.voucherCount=e),value:k.voucherCount,placeholder:"请输入优惠券数量",style:{width:"10%"}},null,8,["modelValue","value"]),i(V,{onClick:s[2]||(s[2]=e=>y.updateVoucherCount(k.voucherCount))},{default:r((()=>[h("修改")])),_:1})])])):v("v-if",!0),d("div",{class:"shop-voucher"},[d("div",null,[d("span",{class:"voucher-icon"},"券"),d("span",{style:{"font-weight":"bold"}},"代金券")]),(t(!0),u(m,null,n(k.vouchers,(e=>(t(),u("div",{class:"voucher-box",key:e.id},[d("div",{class:"voucher-circle"},[d("div",{class:"voucher-b"}),d("div",{class:"voucher-b"}),d("div",{class:"voucher-b"})]),d("div",{class:"voucher-left"},[d("div",{class:"voucher-title"},p(e.title),1),d("div",{class:"voucher-subtitle"},p(e.subTitle),1),d("div",{class:"voucher-price"},[d("div",null,"￥ "+p(e.payValue),1),d("span",null,p(10*e.payValue/e.actualValue)+"折",1)])]),d("div",{class:"voucher-right"},[d("div",{class:"seckill-box"},[d("div",{class:g(["voucher-btn",{"disable-btn":e.stock<1}]),onClick:s[3]||(s[3]=e=>y.seckill())},"限时抢购",2),d("div",{class:"seckill-stock"},[h("剩余 "),d("span",null,p(e.stock),1),h(" 张")]),d("div",{class:"seckill-time"},p(y.formatTime(e)),1)])])])))),128))]),d("div",{style:{"margin-top":"10%"}},[d("div",null,"我的优惠卷："),(t(!0),u(m,null,n(k.voucherOrders,(e=>(t(),u("div",null,[d("div",{style:{margin:"5%","background-color":"#ec0000",color:"white"}},[i(T,{title:e.voucher.title,label:e.voucher.subTitle},null,8,["title","label"])])])))),256))])])),_:1})}],["__scopeId","data-v-23d79322"]]);export{y as default};
