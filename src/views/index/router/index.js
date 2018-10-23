import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout.vue'
import store from '../store/store'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'test',
      component: () => import(/* webpackChunkName: "main" */ '@/views/index/components/test/testdrag.vue'),
      meta: { title: '拖拽测试' }
    },
    {
      path: '/root',
      name: 'home',
      component: Layout,
      redirect: { name: 'main' },
      meta: { title: '测试界面TITLE' },
      children: [
        {
          path: 'main',
          name: 'main',
          component: () => import(/* webpackChunkName: "main" */ '@/views/index/components/main/main.vue'),
          meta: { needAuth: true, uid: 'A' }
        },
        {
          path: 'about',
          name: 'about',
          component: () => import(/* webpackChunkName: "about" */ '@/views/index/components/about/about.vue'),
          meta: { needAuth: true, uid: 'B' }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/index/components/user/login.vue')
    },
    {
      path: '/otherAbout',
      name: 'otherAbout',
      component: () => import(/* webpackChunkName: "about" */ '@/views/index/components/about/about.vue')
    },
    {
      path: '/noAuth',
      name: 'noAuth',
      component: () => import(/* webpackChunkName: "noAuth" */ '@/views/page/noAuth.vue')
    },
    {
      path: '*',
      name: '404',
      // route level code-splitting
      // this generates a separate chunk (404.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // 如果该组件需要预先加载 注入webpackPrefetch: true
      component: () => import(/* webpackChunkName: "404" */ '@/views/page/404.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.needAuth) {
    if (store.state.user.auth.indexOf(to.meta.uid) !== -1) {
      // console.log('页面埋点:' + to.path)
      next()
    } else {
      // console.log('页面埋点:' + to.path)
      next({ path: '/noAuth' })
    }
  } else {
    // console.log('页面埋点:' + to.path)
    next()
  }
})
// 使用 afterEach 钩子函数，保证路由已经跳转成功之后修改 title 页面埋点
router.afterEach((route) => {
  let documentTitle = '';
  route.matched.forEach((path) => {
    if (path.meta.title) {
      documentTitle = `${path.meta.title}`;
    }
  });
  console.log('页面埋点:' + route.path, '当前环境：' + process.env.VUE_APP_SERVICE_CONFIG)
  document.title = documentTitle;
});

export default router