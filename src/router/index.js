import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import Users from '@/components/users.vue'

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
    component: Home,
    children:[{
      name: 'users',
      path: '/users',
      component: Users
    }]
  }, {
    name: 'login',
    path: '/login',
    component: Login
<<<<<<< HEAD
  }]
})
>>>>>>> dev-login
=======
  }
]
})
>>>>>>> dev-login
