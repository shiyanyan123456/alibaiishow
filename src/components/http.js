
import axios from 'axios'

// Vue插件
const HttpServer = {};

HttpServer.install = function (Vue) {

  // 插件要封装的功能
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

  // 除了登录之外的, 才需要下面2行代码
  // 登录的响应req和其他请求req一样
  // 拦截->axios拦截请求


  // 请求拦截器的代码
  // 100个请求
  axios.interceptors.request.use(function (config) {

    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem("token");
      config.headers["Authorization"] = AUTH_TOKEN;
    }
    // 当请求不是login, 先加头部,然后继续发送请求

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  Vue.prototype.$http = axios





}
export default HttpServer;
