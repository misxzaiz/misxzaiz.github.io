import"./main.b5d24f53.js";import{_ as e,o as i,c as t,h as a}from"./index-ca14f322.js";const s=e({name:"list.vue",data:()=>({search:"",isLoading:!1,listPage:[],list:{total:"5",current:"1",size:"6",pageList:[{id:"1690372967496806402",name:"电脑",goodsSortId:"2",userId:"1678003959205982209",price:100,status:0,description:"2800元",createTime:"2023-08-12T22:41:35.000+00:00",updateTime:"2023-08-12T22:41:35.000+00:00",userDto:{id:"1678003959205982209",uid:"2840927713",phone:"13266424762",email:"2840927713@qq.com",username:"1.2",icon:"缩-230812-101c177b9ab0b8b3.jpg",fileId:"1690354477125726210",roleId:"1"},webUserDto:{id:"1678003959205982209",uid:"2840927713",username:"1.2",icon:"缩-230812-101c177b9ab0b8b3.jpg"},goodsImagesList:[{id:"1690372967891070978",goodsId:"1690372967496806402",fileId:"1690372949360635906",image:""}]}]}}),created(){},onReachBottom(){},methods:{}},[["render",function(e,s,o,c,d,m){return i(),t("div",{class:"container"},[a("    <view>"),a("      <van-search"),a('          v-model="search"'),a('          placeholder="请输入搜索关键词"'),a("          show-action"),a('          @search="onSearch"'),a("      />"),a("    </view>"),a("    <view>"),a("      <el-row>"),a('        <el-col :span="24" v-for="(item, index) in listPage" :key="item.id">'),a('          <view @click="getDetails(item.id)">'),a('            <van-card v-if="item.goodsImagesList.length > 0"'),a('                      num="1"'),a('                      :price="item.price"'),a('                      :desc="item.description"'),a('                      :title="item.name"'),a('                      :thumb="item.goodsImagesList[0].image"'),a("            />"),a("            <van-card v-else"),a('                      num="1"'),a('                      :price="item.price"'),a('                      :desc="item.description"'),a('                      :title="item.name"'),a('                      thumb="https://static.runoob.com/images/demo/demo2.jpg"'),a("            />"),a("          </view>"),a("        </el-col>"),a("      </el-row>"),a("    </view>"),a("    <view>"),a('      <van-button @click="getNextPage" style="width: 100%">上拉刷新</van-button>'),a("    </view>")])}],["__scopeId","data-v-e10548c8"]]);export{s as default};
