import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import Users from '@/components/users.vue'
import Rights from'@/components/rights.vue'
import Roles from '@/components/roles.vue'
import Goodslist from '@/components/goodslist.vue'
import Goodsadd from '@/components/goodsadd.vue'

Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[{
        path:'/users',
        name:'users',
        component: Users,
      },
    {
      path:'/rights',
        name:'rights',
        component: Rights,
    },{
      path:'/roles',
        name:'roles',
        component: Roles,
    },{
      path:'/goodslist',
        name:'goods',
        component: Goodslist,
    },{
      path:'/goods',
        name:'goodsadd',
        component: Goodsadd,
    }
  ]
    },{
      name:'login',
      path:'/login',
      component:Login
    }
  ]
})

