import{_ as e,o as d,d as t,w as o,h as i,c as n,r as l,y as s,z as r,b as a,a as u,t as V,F as v,g as c,A as h,B as I,i as m,f as O,e as f}from"./index-84ddc011.js";import{b as p}from"./main.49e1c158.js";const x=e({name:"index.vue",components:{demo:e({name:"index.vue",data:()=>({currentVideoIndex:0,video:{list:[{uri:"http://localhost:80/01.mp4",title:"的话时候工程网络生产本站.",content:"也是类别拥有应用.部分应该看到现在.提高电子功能如此类别次数.的话有些相关方式.\n程序查看手机国际.自己那些或者来自这是.评论以上搜索记者参加.\n希望是一通过而且所以.来源报告产品方式一个.\n各种今天你的一个音乐那么.组织电话项目使用个人你的全部.人民网络经济虽然使用工具推荐登录.以及法律服务会员.\n名称经验男人.到了专业无法音乐程序文件他们.会员日期工程学校起来人民."},{uri:"http://localhost:80/01.mp4",title:"国际教育他的包括知道市场或者.",content:"出现用户要求相关什么同时不过朋友.汽车评论要求推荐大小增加过程.\n最大所以网站威望觉得原因事情.这么标题一切.不过电影就是.\n还有所有生产人民当前注意.当然国家科技作者专业然后非常.\n当前作品音乐应用您的.帖子以上工具汽车来源.\n质量生产研究新闻.推荐图片搜索.\n虽然主要相关一种提高资料.进行制作有关活动女人合作.\n手机数据专业北京感觉增加.如此这样能够网上一起电脑成为发生.增加设备之后注册."},{uri:"http://localhost:80/01.mp4",title:"这种系列支持大学关于目前人员单位.",content:"最新提供品牌图片其实空间.经营事情女人数据制作这个.美国的人提供留言然后出来帖子.\n一个特别工具当前.那么以下登录.单位怎么注意一种.\n信息最新什么首页最大通过.或者的话开发手机主要日期城市.\n可能专业投资更多电子.回复具有也是.\n国内内容人民个人准备设计觉得.状态大学起来软件介绍公司.生产中心决定作品.不过推荐经济发现汽车点击.\n具有更多如果结果结果会员.北京广告游戏大学一样."}]}}),methods:{prevVideo(){this.currentVideoIndex>0&&this.currentVideoIndex--},nextVideo(){this.currentVideoIndex<this.video.list.length-1&&this.currentVideoIndex++}},mounted(){},onLoad(){},beforeDestroy(){},destroyed(){}},[["render",function(e,O,f,p,x,y){const b=h,k=I,C=m;return d(),t(C,null,{default:o((()=>[i(" 视频列表 "),(d(!0),n(v,null,l(x.video.list,(e=>s((d(),n("div",{key:e.uri},[a(b,{src:e.uri,controls:"",style:{width:"100%"}},null,8,["src"]),u("h2",null,V(e.title),1),u("p",null,V(e.content),1)])),[[r,x.video.list.indexOf(e)===x.currentVideoIndex]]))),128)),i(" 上下切换按钮 "),a(k,{onClick:y.prevVideo,disabled:0===x.currentVideoIndex},{default:o((()=>[c("上一个")])),_:1},8,["onClick","disabled"]),a(k,{onClick:y.nextVideo,disabled:x.currentVideoIndex===x.video.list.length-1},{default:o((()=>[c("下一个")])),_:1},8,["onClick","disabled"])])),_:1})}]]),videoComponent:e({name:"video.vue",data:()=>({currentVideoIndex:0,videoVO:{videoId:0,title:"",content:"",url:"",updateTime:"",likeId:0,favoriteId:0}}),methods:{prevVideo(){null==this.videoVO.videoId&&(this.videoVO.videoId=-1),this.videoVO.videoId--,this.getVideoVOByVideoId()},nextVideo(){null==this.videoVO.videoId&&(this.videoVO.videoId=-1),this.videoVO.videoId++,this.getVideoVOByVideoId()},getVideoVOByVideoId(){var e;null==this.videoVO.videoId&&(this.videoVO.videoId=-1),(e=this.videoVO.videoId,O({url:`${p}/web/video/getVideoVOByVideoId/${e}`})).then((e=>{this.videoVO=e.data.data}))}},mounted(){this.getVideoVOByVideoId()},onLoad(){},beforeDestroy(){},destroyed(){}},[["render",function(e,n,l,s,r,v){const O=h,f=I,p=m;return d(),t(p,null,{default:o((()=>[i(" 视频列表 "),u("div",null,[a(O,{src:r.videoVO.url,controls:"",style:{width:"100%"}},null,8,["src"]),u("h2",null,V(r.videoVO.title),1),u("p",null,V(r.videoVO.content),1)]),i(" 上下切换按钮 "),a(f,{onClick:v.nextVideo},{default:o((()=>[c("上一个")])),_:1},8,["onClick"]),a(f,{onClick:v.prevVideo},{default:o((()=>[c("下一个")])),_:1},8,["onClick"])])),_:1})}]])},data:()=>({}),methods:{},mounted(){},onLoad(){},beforeDestroy(){},destroyed(){}},[["render",function(e,i,n,l,s,r){const u=f("videoComponent"),V=m;return d(),t(V,null,{default:o((()=>[a(u)])),_:1})}]]);export{x as default};