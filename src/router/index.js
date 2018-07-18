import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Insure from '@/views/chudan/Insure.vue'
import Surrend from '@/views/chudan/Surrend.vue'
import Query from '@/views/chudan/Query.vue'








Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path:'/chudan',
      component: Home,
      children: [
        { path: '/chudan/insure', component: Insure, name: 'insure' },
        { path: '/chudan/surrend', component: Surrend, name: 'surrend' },
        { path: '/chudan/query', component: Query, name: 'query' },
         ]
    },
  ]
})
