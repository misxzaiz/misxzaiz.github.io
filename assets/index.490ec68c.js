import{_ as t,o,c as a,a as e,b as s,w as n,F as i,r as l,d as c,e as p,t as d,R as h,f as r,g as w,h as u}from"./index-761681e4.js";import{_ as m}from"./wx.9b4e9afb.js";let g={"常用":{Binjie:["https://c.binjie.fun/","GPT",""],"豆包":["https://www.doubao.com/chat/","抖音的GPT","https://lf-cdn-tos.bytescm.com/obj/static/doubao_web/logo-icon.png"],"星火大模型":["https://xinghuo.xfyun.cn/","星火大模型",""],"文心一言":["https://yiyan.baidu.com/","百度的GPT（要申请）","https://nlp-eb.cdn.bcebos.com/logo/favicon.ico"],"通义千问":["https://tongyi.aliyun.com/","阿里的GPT（要申请）","https://img.alicdn.com/imgextra/i4/O1CN01c26iB51UyR3MKMFvk_!!6000000002586-2-tps-124-122.png"],Jinshu:["https://chat.jinshutuan.com/","GPT",""],Wuguokai:["https://chat.wuguokai.cn/","GPT",""],AiDuTu:["https://chat.aidutu.cn/","GPT",""],MST:["https://mst.ai/","AIS（基础GPT、AI画图）GPT较慢（要登录）","https://img.mst.xyz/assets/favicon-8f9e8d04.ico"],RightBrain:["https://rightbrain.art/store","AI绘画",""],Wiki:["https://openai.wiki/","openai.wiki","https://openai.wiki/wp-content/uploads/cropped-logo-192x192.png"],AgentGpt:["https://agentgpt.reworkd.ai/","AgentGpt",""],CXY521:["http://www.cxy521.com/ai.html","程序员导航（AI部分）",""],aiLogo:["https://ailogo.qq.com/","腾讯的LoGo生产器","https://ailogo.qq.com/favicon.ico"],Claude:["https://misxzaiz.slack.com/","Claude",""],"new Bing":["https://www.bing.com/","new Bing",""],Bito:["https://marketplace.visualstudio.com/items?itemName=Bito.bito","Bito - GPT-4 and ChatGPT to write code, explain code, create tests",""]},Learn:{aixcoder:["https://codesearch.aixcoder.com/#/","代码查询",""],leetcode:["https://leetcode.cn/studyplan/coding-interviews/","剑指Offer",""],LeetCodeHot100:["https://leetcode.cn/studyplan/top-100-liked/","LeetCodeHot100",""],HelloAlog:["https://www.hello-algo.com/","Hello算法","https://www.hello-algo.com/index.assets/conceptual_rendering.png"],Guava:["https://wizardforcel.gitbooks.io/guava-tutorial/content/1.html","Google Guava官方教程（中文版）",""],WoShipm:["https://www.woshipm.com/","人人都是产品经理",""],MBA:["https://wiki.mbalib.com/","MBA智库",""],"菜鸟教程":["https://www.runoob.com","菜鸟教程",""],W3schools:["https://www.w3schools.cn/default.asp","w3schools","https://www.w3schools.cn/static/images/html5_icon.svg"]},Dev:{v0:["https://v0.dev/","AI的UI",""],vercel:["https://vercel.com/","静态页面搭建",""],anaconda:["https://anaconda.cloud/","anaconda云平台",""]},Company:{"牛客网":["https://www.nowcoder.com/","牛客网",""],"智联招聘":["https://www.zhaopin.com/","智联招聘","https://infinityicon.infinitynewtab.com/user-share-icon/17165df2da2da97518b20d377161d457.png"],"实习僧":["https://www.shixiseng.com/","实习僧",""],"拉勾":["https://www.lagou.com/","拉勾","https://infinityicon.infinitynewtab.com/user-share-icon/3098c596e95db790d11c91742f08eef0.png"],BOSS:["https://www.zhipin.com/dongguan/","BOSS",""],"职友集":["https://www.jobui.com/","查看公司信息","http://cdnhtm4.jobui.com/template_1/images/putRerord.png"],"24 365":["https://www.ncss.cn/","国家大学生就业服务平台",""]},Tool:{codesandbox:["https://codesandbox.io/","在线Dev",""],DrawIO:["https://www.drawio.com/","画图工具","https://www.drawio.com/assets/svg/icons/icon-2.svg"],SpssPro:["https://www.spsspro.com/","数学分析工具",""],MindShow:["https://www.mindshow.fun/","PPT生成工具",""],"语雀":["https://www.yuque.com/dashboard","在线笔记（电脑/手机app、浏览器）",""],"幕布":["https://mubu.com/list","在线思维导图（电脑/手机app、浏览器）",""],Cursor:["https://www.cursor.so/","gpt编辑器",""],PhpStudy:["https://www.xp.cn/","php集成环境",""],"宝塔":["https://www.bt.cn/","服务器管理",""],Jotform:["https://www.jotform.com/myforms/","页面模板",""],"Ngrok.cc":["https://www.ngrok.cc/","内网穿透，国内版",""],Ngrok:["https://ngrok.com/","内网穿透",""],passwordmonster:["https://www.passwordmonster.com/","测试密码安全性",""]},API:{"夏柔":["https://api.aa1.cn/","api",""],"Free-Api":["https://gitee.com/fahawifi/free-api","api",""],TianApi:["https://www.tianapi.com/","api",""],"聚合":["https://www.juhe.cn/","api",""],APIspace:["https://www.apispace.com/","api",""],YouDao:["https://ai.youdao.com/","有道翻译API",""]},Cloud:{algolia:["https://www.algolia.com/","搜索、推荐服务平台","https://www.algolia.com/algoliaweb-static-favicons/light-mode/favicon-32x32.png"],PlanetScale:["https://planetscale.com/","云数据库",""],FormSpree:["https://formspree.io/","云邮箱",""],Analytics:["https://analytics.google.com/","网站分析",""],"百度统计":["https://tongji.baidu.com/","百度网站统计分析",""]},Bingo:{AirPano:["https://www.airpano.com/","云游世界，360全景",""],"孔明灯":["https://henxiangsi.com/","在线放孔明灯",""],ChiShenMe:["https://chishenme.xyz/","中午吃什么",""]},Github:{GitStar:["https://gitstar-ranking.com/","GitStar排名",""],"Material-for-MkDocs":["https://github.com/squidfunk/mkdocs-material/tree/master","开源文档主题 Material-for-MkDocs",""],HelloAlog:["https://github.com/krahets/hello-algo","hello算法","https://www.hello-algo.com/index.assets/conceptual_rendering.png"]},UI:{"vue-admin":["https://vue-admin-beautiful.com/","vue-admin",""],"UI-NOTES":["https://uinotes.com/","ui-notes",""]},"中间件":{druid:["https://github.com/alibaba/druid/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98","druid",""],rocketmq:["https://rocketmq.apache.org/","消息队列",""],elasticsearch:["https://www.elastic.co/cn/elasticsearch/","搜索",""]}};function v(t){window.open(t)}let f={Blog:{StackOverFlow:["https://stackoverflow.com/","StackOverFlow社区",""],StackOverFlowBlog:["https://stackoverflow.blog/","StackOverFlow博客",""],apnic:["https://blog.apnic.net/","apnic博客",""],discord:["https://discord.com/channels/@me","discord",""],oschina:["https://www.oschina.net/","开源中国",""]},"比赛":{Qiniu:["https://www.qiniu.com/activity/detail/651297ed0d50912d3d53307b","七牛云1024编程比赛",""]},Learn:{geeksforgeeks:["https://auth.geeksforgeeks.org/","geeksforgeeks",""]},"技术":{Java:["https://www.yuque.com/wangyouzhi-u3woi/wvkm9u/uw8c5iyvpgnqpzmg","Java技术栈-语雀-王有志",""],javaguide:["https://javaguide.cn/","javaguide",""],javaFamily:["https://java-family.cn/","java-family",""],xiaolincoding:["https://xiaolincoding.com/","xiaolincoding",""],"牛客网":["https://www.nowcoder.com/","牛客网",""],HelloAlog:["https://www.hello-algo.com/","Hello算法","https://www.hello-algo.com/index.assets/conceptual_rendering.png"]},"读书":{"读万卷书":["https://www.yuque.com/yinghanzhu/aoiyrw/ugr4h1","读万卷书-语雀-博谦",""]},New:{investopedia:["https://www.investopedia.com/","投资百科",""]},Go:{"7days-golang":["https://github.com/geektutu/7days-golang","7days-golang",""],geektutu:["https://geektutu.com/post/gee.html","7days-golang",""],"golang-design-pattern":["https://github.com/senghoo/golang-design-pattern","设计模式",""],"go-pkg":["https://pkg.go.dev/std","go库",""],go:["https://cloud.tencent.com/developer/doc/1101","腾讯go库",""]}};const b=t({name:"index.vue",components:{RouterLink:h,NavComponents:t({name:"NavComponents",data:()=>({navs:g}),methods:{navToUrl:v}},[["render",function(t,h,r,w,u,m){const g=c("el-avatar"),v=c("van-col"),f=c("van-row"),b=c("el-card"),k=c("el-col"),y=c("el-row"),_=c("van-tab"),C=c("van-tabs");return o(),a("div",null,[e("div",null,[s(C,null,{default:n((()=>[(o(!0),a(i,null,l(u.navs,((t,c,h)=>(o(),a("div",null,[s(_,{title:c},{default:n((()=>[s(y,null,{default:n((()=>[(o(!0),a(i,null,l(t,((t,a)=>(o(),p(k,{key:t,span:24},{default:n((()=>[s(b,{onClick:o=>m.navToUrl(t[0])},{default:n((()=>[s(f,null,{default:n((()=>[s(v,{style:{"padding-right":"2%"}},{default:n((()=>[""!==t[2]&&null!==t[2]?(o(),p(g,{key:0,shape:"square",src:t[2]},null,8,["src"])):(o(),p(g,{key:1,style:{width:"100%"},shape:"square",src:"./static/images/logo/logo1.png"}))])),_:2},1024),s(v,null,{default:n((()=>[e("div",null,[e("h3",null,d(a),1)]),e("div",{style:{color:"#4c4c4c"}},d(t[1]),1)])),_:2},1024)])),_:2},1024)])),_:2},1032,["onClick"])])),_:2},1024)))),128))])),_:2},1024)])),_:2},1032,["title"])])))),256))])),_:1})])])}],["__scopeId","data-v-94a937b1"]]),TestComponents:t({name:"TestComponents",data:()=>({}),methods:{}},[["render",function(t,s,n,i,l,c){return o(),a("div",null,[e("div",null," 11 ")])}],["__scopeId","data-v-787bb4f1"]]),ReadComponents:t({name:"ReadComponents",data:()=>({reads:f}),methods:{navToUrl:v}},[["render",function(t,h,r,w,u,m){const g=c("el-avatar"),v=c("van-col"),f=c("van-row"),b=c("el-card"),k=c("el-col"),y=c("el-row"),_=c("van-tab"),C=c("van-tabs");return o(),a("div",null,[e("div",null,[s(C,null,{default:n((()=>[(o(!0),a(i,null,l(u.reads,((t,c,h)=>(o(),a("div",null,[s(_,{title:c},{default:n((()=>[s(y,null,{default:n((()=>[(o(!0),a(i,null,l(t,((t,a)=>(o(),p(k,{key:t,span:24},{default:n((()=>[s(b,{onClick:o=>m.navToUrl(t[0])},{default:n((()=>[s(f,null,{default:n((()=>[s(v,{style:{"padding-right":"2%"}},{default:n((()=>[""!==t[2]&&null!==t[2]?(o(),p(g,{key:0,shape:"square",src:t[2]},null,8,["src"])):(o(),p(g,{key:1,style:{width:"100%"},shape:"square",src:"./static/images/logo/logo1.png"}))])),_:2},1024),s(v,null,{default:n((()=>[e("div",null,[e("h3",null,d(a),1)]),e("div",{style:{color:"#4c4c4c"}},d(t[1]),1)])),_:2},1024)])),_:2},1024)])),_:2},1032,["onClick"])])),_:2},1024)))),128))])),_:2},1024)])),_:2},1032,["title"])])))),256))])),_:1})])])}],["__scopeId","data-v-7f0dc549"]]),WriteComponents:t({name:"WriteComponents",data:()=>({}),methods:{}},[["render",function(t,s,n,i,l,c){return o(),a("div",null,[e("div")])}],["__scopeId","data-v-266692e4"]])},data:()=>({action:0,showChat:!1,noticeTest:"未来可期",images:["./static/images/bg/bg1.jpg","./static/images/bg/bg2.jpg","./static/images/bg/bg3.jpg"]}),created(){},mounted(){r({url:"https://v.api.aa1.cn/api/pyq/index.php?aa1=json",success:t=>{this.noticeTest=t.data.pyq}})},methods:{tranVanTabbarAction(t){console.log(t),this.action=t}}},[["render",function(t,d,h,r,g,v){const f=c("WriteComponents"),b=c("router-link"),k=c("el-menu-item"),y=c("el-menu"),_=c("van-notice-bar"),C=c("van-swipe-item"),x=c("van-swipe"),T=c("NavComponents"),A=c("ReadComponents"),j=c("van-tabbar-item"),G=c("van-tabbar"),P=c("van-floating-bubble"),S=c("van-popup");return o(),a("div",null,[e("div",null,[s(f)]),e("div",null,[s(y,{mode:"horizontal",ellipsis:!1},{default:n((()=>[s(k,{index:"0",style:{color:"#1c1c1e"}},{default:n((()=>[s(b,{to:"/",className:"post-link"},{default:n((()=>[e("h1",null,"erBai")])),_:1})])),_:1}),e("div",{class:"flex-grow"}),s(k,{index:"1"},{default:n((()=>[s(b,{to:"/h5",className:"post-link"},{default:n((()=>[e("h3",null,"我的")])),_:1})])),_:1})])),_:1})]),s(_,{text:g.noticeTest,"left-icon":"volume-o"},null,8,["text"]),e("div",{style:{margin:"2%"},class:"swipe"},[s(x,{autoplay:3e3,"lazy-render":""},{default:n((()=>[(o(!0),a(i,null,l(g.images,(t=>(o(),p(C,{key:t},{default:n((()=>[e("img",{style:{width:"100%","border-radius":"3%"},src:t,alt:"轮播图"},null,8,["src"])])),_:2},1024)))),128))])),_:1})]),0===g.action?(o(),a("div",{key:0},[s(T)])):(o(),a("div",{key:1},[s(A)])),e("div",null,[s(G,{"active-color":"#000"},{default:n((()=>[s(j,{icon:"home-o",onClick:d[0]||(d[0]=t=>g.action=0)},{default:n((()=>[w("导航")])),_:1}),s(j,{icon:"search",onClick:d[1]||(d[1]=t=>g.action=1)},{default:n((()=>[w("阅读")])),_:1}),u('        <van-tabbar-item icon="friends-o" @click="tranVanTabbarAction(2)">标签</van-tabbar-item>'),u('        <van-tabbar-item icon="setting-o" @click="tranVanTabbarAction(3)">标签</van-tabbar-item>')])),_:1})]),e("div",null,[s(P,{icon:"chat",onClick:d[2]||(d[2]=t=>g.showChat=!0)}),s(S,{show:g.showChat,onClick:d[3]||(d[3]=t=>g.showChat=!1)},{default:n((()=>[e("img",{style:{width:"100%"},src:m,alt:"微信联系方式"})])),_:1},8,["show"])])])}],["__scopeId","data-v-2994bfbf"]]);export{b as default};
