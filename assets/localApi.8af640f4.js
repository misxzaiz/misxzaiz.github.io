import{f as e}from"./index-fd703f15.js";const r="http://127.0.0.1:8000",t=()=>e({url:`${r}/server/getTopServerList`,method:"GET"}),s=t=>e({url:`${r}/server/getServerList/${t}`,method:"GET"}),a=t=>e({url:`${r}/server/getServerBalance/${t}`,method:"GET"}),d=t=>e({url:`${r}/server/setServerDetail`,method:"POST",data:t}),o=t=>e({url:`${r}/server/dealMethod`,method:"POST",data:t});export{s as a,a as b,o as d,t as g,d as s};