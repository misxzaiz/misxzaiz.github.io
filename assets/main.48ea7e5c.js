import{C as o,k as e,n as s}from"./index-4883e42d.js";const l="localhost:81",t="http://",n="ws",a=t+l,c=t+l+"/web/file/upload";o("request",{invoke(o){const l=e("token");console.log("token"),l||s({url:"/h5/user/login"}).then((o=>{})),o.header={Authorization:e("token")}},success(o){console.log("success")},fail(o){console.log("fail"),console.log("interceptor-fail")},complete(o){console.log("interceptor-complete"),console.log(o.statusCode),null!=o.statusCode&&401==o.statusCode&&(console.log(o.statusCode),s({url:"/h5/user/login"}).then((o=>{})))}});export{n as a,a as b,c as u,l as w};
