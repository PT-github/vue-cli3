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
// 拖拽
// Vue.directive('drag', {
//   bind(el, binding) {
//     console.log(el)
//     el.setAttribute('draggable', true)
//     el.className = 'el-draggable'
//     let dragged
    
//     el.addEventListener('dragstart', (e) => {
//       console.log('2222')
//       dragged = e.target
//       dragged.style.opacity = .5
//       const data = binding.value;
//       console.log('开始拖拽', data)
//     }, false);
//     el.addEventListener('drag', (e) => {
//       // console.log('拖拽中.....')
//     }, false);
//     el.addEventListener('dragend', () => {
//       dragged.style.opacity = 1
//       console.log('拖拽结束')
//     }, false);
//     el.addEventListener('dragenter', (e) => {
//       if (event.target.className.indexOf("el-draggable") !== -1) {
//         console.log(e.target)
//         // dragged.style.opacity = 1
//         console.log('拖拽进入目标元素 触发事件')
//       }
//     }, false);
//   }
// });