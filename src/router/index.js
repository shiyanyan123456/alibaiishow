import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'

Vue.use(Router)

export default new Router({
<<<<<<< HEAD
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      name:'login',
      path:'/login',
      component:Login
    }
  ]
})
=======
  routes: [{
    name: 'home',
    path: '/',
    component: Home
  }, {
    name: 'login',
    path: '/login',
    component: Login
  }]
})
>>>>>>> dev-login
