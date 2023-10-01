// let webSocketUri = "localhost"
let reqUrl = "https://dominant-ant-formerly.ngrok-free.app";
let webSocketUri = "dominant-ant-formerly.ngrok-free.app"
// 设置后台服务地址
axios.defaults.baseURL = reqUrl;
// axios.defaults.timeout = 2000;
// request拦截器，将用户token放入头中
let token = localStorage.getItem("token");
//let token = sessionStorage.getItem("token");
let userDto = JSON.parse(localStorage.getItem("userDto"));


axios.interceptors.request.use(
  config => {
    if(token) config.headers['authorization'] = token
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(function (response) {
    // 判断执行结果
    if (!response.data.success) {
      return Promise.reject(response.data.errorMsg)
    }
    return response;
  }, function (error) {
    // 一般是服务端异常或者网络异常
    console.log(error)
    if(error.response.status == 401){
      // 未登录，跳转
      setTimeout(() => {
        location.href = "/pages/login/login.html"
      }, 200);
      return Promise.reject("请先登录");
    }
    return Promise.reject("服务器异常");
  });