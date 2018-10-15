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
          component: () => import(/* webpackChunkName: "main" */ '@/views/index/components/main/main.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import(/* webpackChunkName: "about" */ '@/views/index/components/about/about.vue')
        }
      ]
    },
    {
      path: '/otherAbout',
      name: 'otherAbout',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // 如果该组件需要预先加载 注入webpackPrefetch: true
      component: () => import(/* webpackChunkName: "about" */ '@/views/index/components/about/about.vue')
    }
  ]
})
