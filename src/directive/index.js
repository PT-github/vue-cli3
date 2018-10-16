import Vue from 'vue'
// 坑位埋点指令
Vue.directive('stat', {
  bind(el, binding) {
    el.addEventListener('click', () => {
      const data = binding.value;
      console.log(data)
    }, false);
  }
});