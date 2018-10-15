import Vue from 'vue'
import App from '@/components/App.vue'
import '@/filter'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
