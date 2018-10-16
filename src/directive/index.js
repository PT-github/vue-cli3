import Vue from 'vue'
// 坑位埋点指令
Vue.directive('stat', {
  bind(el, binding) {
    el.addEventListener('click', () => {
      const data = binding.value;
      console.log('点击事件埋点', data)
    }, false);
  }
});