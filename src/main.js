// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui' 
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.css'
import App from './App'
import router from './router'
import moment from 'moment'
//登录接口

// 登录接口

// import axios from 'axios'
// axios.defaults.baseURL='http://localhost:8888/api/private/v1/'
// Vue.prototype.$http=axios
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

<<<<<<< HEAD
// Vue.filter('fmtdate',(v)=>{
//   return moment(v).format('YYYY-MM-DD')
// })
=======
>>>>>>> dev-users
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
