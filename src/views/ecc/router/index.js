import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      redirect: { name: 'main' },
      children: [
        {
          path: 'main',
          name: 'main',
          component: () => import(/* webpackChunkName: "main" */ '@/views/ecc/components/main/main.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import(/* webpackChunkName: "about" */ '@/views/ecc/components/about/about.vue')
        }
      ]
    }
  ]
})
