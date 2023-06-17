let reqUrl = "http://xiaozaiz.xyz" // 使用 // 解决 https网站请求 http
// let reqUrl = "http://8.130.73.113"
// let reqUrl = "http://192.168.43.244"
// 设置后台服务地址
axios.defaults.baseURL = reqUrl;
// axios.defaults.timeout = 2000;
// request拦截器，将用户token放入头中
let token = sessionStorage.getItem("token");
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
        location.href = "pages/login/index.html"
      }, 200);
      return Promise.reject("请先登录");
    }
    return Promise.reject("服务器异常");
  });