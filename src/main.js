import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import App from '@/components/App.vue'
import '@/filter'
import '@/directive'
import '@/utils/mixin'
import router from './views/index/router'
import store from './views/index/store/store'
import storage from '@/utils/storage'

let token = storage.getItem('token') || ''
if (token) {
  store.dispatch('SetToken', token)
}

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
