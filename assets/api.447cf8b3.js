import{f as e}from"./index-c56eda7d.js";const r="https://dominant-ant-formerly.ngrok-free.app",t=()=>e({url:`${r}/server/getTopServerList`,method:"GET"}),a=t=>e({url:`${r}/server/getServerList/${t}`,method:"GET"}),s=t=>e({url:`${r}/server/getServerBalance/${t}`,method:"GET"}),o=t=>e({url:`${r}/server/setServerDetail`,method:"POST",data:t}),d=t=>e({url:`${r}/server/dealMethod`,method:"POST",data:t});export{a,s as b,d,t as g,o as s};
