// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui' 
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.css'
import App from './App'
import router from './router'
import CusBread from './components/cusBread.vue'

import HttpServer from './components/http'

Vue.use(ElementUI)
Vue.use(HttpServer)

Vue.config.productionTip = false


Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
});

Vue .component(CusBread.name,CusBread);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
