import{y as o,k as e,n as s}from"./index-23cb123e.js";const t="dominant-ant-formerly.ngrok-free.app",l="https://"+t,n="https://"+t+"/web/file/upload";o("request",{invoke(o){const t=e("token");console.log("token"),t||s({url:"/h5/user/login"}).then((o=>{})),o.header={Authorization:e("token")}},success(o){console.log("success")},fail(o){console.log("fail"),console.log("interceptor-fail")},complete(o){console.log("interceptor-complete"),console.log(o.statusCode),null!=o.statusCode&&401==o.statusCode&&(console.log(o.statusCode),s({url:"/h5/user/login"}).then((o=>{})))}});export{l as b,n as u,t as w};
