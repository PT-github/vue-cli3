<template>
  <div class="el-draggable-container">
    <template v-if="sortList.length > 0">
      <div class="el-draggable el-draggable_group" v-for="(item, idx) in sortList" :key="'el-draggable-' + idx"
        @dragstart="dragstart($event, idx)"
        @drag="drag"
        @dragend="dragend"
        @dragenter="dragenter($event, idx)"
        @dragleave="dragleave"
        @dragover="dragover"
        @drop="drop($event, idx)"
        :class="{
          'item-draggable-in-not-allow': (draggableData && draggableData.mutex && draggableData.mutex.indexOf(item.id) !== -1) || (storageDragData && storageDragData.mutex && storageDragData.mutex.indexOf(item.id) !== -1) , // 正在拖拽，该组件不允许被放置
          'item-draggabled': (dragging && idx !== index) || storageDragging, // 正在拖拽 其他科拖拽dom的样式
          'item-draggable-in': dragenterDomIndex === idx, // 拖拽进入
          'bottomSpace': idx >= 15 && idx < 20 // 底部空隙
        }"
        :draggable="draggable" >
        <div class="title">{{ item.name ? (item.name + (item.mutex ? '【有拖拽限制[' + item.mutex.join(',') + ']】' : '')) : '' }}</div>
        <div class="text">{{ item.teacher ? '（' + item.teacher + '）' : '' }}</div>
      </div>
    </template>
  </div>
</template>
<script>
import { isEmptyObject } from '@/utils'
export default {
  name: 'elDraggable',
  props: {
    options: Object,
    list: {
      type: Array,
      required: false,
      default: () => []
    },
    value: {
      type: Array,
      required: false,
      default: null
    },
    storageDragging: {
      type: Boolean,
      required: false,
      default: false
    },
    storageDragData: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  created () {
    if (this.list && this.list.length > 0) {
      this.list.forEach(item => {
        this.sortList.push(item)
      });
    }
    // this.dragImg = new Image()
    // this.dragImg.src = require('../../assets/logo.png')
  },
  computed: {
    draggable () {
      if (this.options && this.options.draggable) {
        return true
      } else {
        return false
      }
    },
    draggableData () {
      return this.index !== '' ? this.sortList[this.index] : {}
    }
  },
  data () {
    return {
      sortList: [],
      index: '',
      dragging: false, // 拖拽中
      dragenterDomIndex: '', // 拖拽进入的dom标识
      needConfirm: false, // 是否需要二次确认
      storageList: [],
      storageTempIndex: ''
      // dragImg: null
    }
  },
  methods: {
    createElement (target, data) {
      let div = document.createElement('div')
      div.className = 'el-draggable-clone'
      div.style.top = target.offsetTop + 'px'
      div.style.left = target.offsetLeft + 'px'
      div.style.zIndex = -1
      div.innerHTML = `
        <div class="title">${data.name}</div>
        <div class="text">${data.teacher}</div>
      `
      return div
    },
    dragstart (e, idx) {
      this.index = idx
      e.dataTransfer.setData("Text", 'Hello World'); // firefox必须有数据才允许拖拽
      // e.dataTransfer.setDragImage(this.dragImg, 10, 10) // IE不支持 移除该功能
      // e.target.parentElement.appendChild(this.createElement(e.target, this.sortList[idx]))
      // 开始拖拽
    },
    drag (e) {
      // 正在拖拽中
      let width = this.$el.offsetWidth,
        height = this.$el.offsetHeight,
        left = this.$el.getBoundingClientRect().left,
        top = this.$el.getBoundingClientRect().top,
        clientX = e.clientX,
        clientY = e.clientY
      if (clientX > (left + width) || clientX < left || clientY > (top + height) || clientY < top) {
        // 拖拽离开容器 reset样式
        this.dragging = false
        this.dragenterDomIndex = ''
        // 记录拖拽的下标
        this.storageTempIndex = this.index
      } else {
        this.dragging = true
        // 移除拖拽出界的下标
        this.storageTempIndex = ''
      }
    },
    removeData (index) {
      this.$set(this.sortList, index, {})
    },
    dragend () {
      // 拖拽结束
      if (!this.needConfirm) {
        this.reset()
        if (this.storageTempIndex || this.storageTempIndex === 0) {
          let o = this.sortList[this.storageTempIndex]
          console.log('拖拽出界')
          // 拖拽出界
          !isEmptyObject(o) && this.$emit('dragOutOfBound', this.storageTempIndex, o)
        }
      }
    },
    dragenter (e, idx) {
      console.log(e.target)
      let dom = this.fiterDraggableDom(e.target)
      
      // 拖拽到目标dom中 - 判断是否为el-draggable_group容器
      if (dom && this.index!== idx) {
        this.dragenterDomIndex = idx
      }
    },
    dragleave () {
      // if (e.target.className.indexOf('el-draggable_group') !== -1) {
      //   // console.log('【离开目标dom】', e.target)
      // }
    },
    dragover (e) {
      e.preventDefault()
      // console.log('放下目标界面是触发事件', e.target)
    },
    drop (e, idx) {
      // e.preventDefault()
      e.stopPropagation();
      e.preventDefault();
      // e.dataTransfer = e.originalEvent.dataTransfer;
      let dom = this.fiterDraggableDom(e.target)
      if (dom) {
        // 外部暂存区拖拽到组件内的拖拽区域内
        if (this.storageDragging) {
          console.log('外部暂存区拖拽到组件内拖拽区域上')
          // 判断是会否有有限制
          let obj = this.storageDragData, targetObj = this.sortList[idx]
          if (isEmptyObject(targetObj)) {
            // 目标元素是空元素 那么直接放置被拖拽的组件
            console.log('目标元素是空元素')
            this.$set(this.sortList, idx, obj)
            this.$emit('exchangeData', null)
          } else if (obj && obj.mutex && obj.mutex.length > 0 && obj.mutex.indexOf(targetObj.id) !== -1) {
            console.log('有限制 不能拖拽')
            // 有限制 不能拖拽
            this.$message({
              message: '互斥 不允许拖动',
              type: 'error',
              duration: 1000,
              showClose: true
            })
            return
          } else {
            // 调换数据
            console.log('调换数据')
            this.$emit('exchangeData', targetObj)
            this.$set(this.sortList, idx, obj)
          }
          return
        }
        // 内部拖拽
        if (this.index === idx) {
          // 没有拖动
          return
        }
        if (this.sortList[this.index].name === this.sortList[idx].name && this.sortList[this.index].teacher === this.sortList[idx].teacher) {
          this.$message({
            message: '目标相同 不允许拖动',
            type: 'info',
            duration: 1000,
            showClose: true
          })
        } else if (this.sortList[this.index].mutex && this.sortList[this.index].mutex.length > 0 && this.sortList[this.index].mutex.indexOf(this.sortList[idx].id) !== -1) {
          this.$message({
            message: '互斥 不允许拖动',
            type: 'error',
            duration: 1000,
            showClose: true
          })
        } else if (this.sortList[idx].public) {
          this.needConfirm = true
          this.$confirm('确认是否将该课程调整到公共课', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.needConfirm = false
            this.sort(idx)
            this.reset()
          }).catch(() => {
            this.needConfirm = false
            this.reset()
          });
        } else {
          this.sort(idx)
        }
      }
    },
    sort (idx) {
      if (this.index < idx) {
        this.sortList.splice(idx, 0, this.sortList[this.index])
        this.sortList.splice(this.index, 1)
        this.sortList.splice(this.index, 0, this.sortList[idx])
        this.sortList.splice(idx + 1, 1)
      } else {
        this.sortList.splice(idx, 0, this.sortList[this.index])
        this.sortList.splice(this.index + 1, 1)
        this.sortList.splice(this.index + 1, 0, this.sortList[idx + 1])
        this.sortList.splice(idx + 1, 1)
      }
    },
    reset () {
      this.dragging = false
      this.dragenterDomIndex = ''
      this.index = ''
    },
    fiterDraggableDom (target) {
      let dom
      if (target.className && target.className.indexOf('el-draggable_group') !== -1) {
        dom = target
      } else if (target.parentElement.className.indexOf('el-draggable_group') !== -1) {
        dom = target.parentElement
      }
      return dom
    }
  }
}
</script>
<style lang="scss" scoped>
.el-draggable-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .el-draggable {
    width: 19%;
    margin-right: 5px;
    margin-bottom: 5px;
    &:nth-child(5n) {
      margin-right: 0;
    }
    text-align: center;
    background: #fdcccc;
    border: 1px solid #000;
    border-radius: 5px;
    cursor: pointer;
    .title {
      height: 35px;
      line-height: 35px;
    }
    .text {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
    }
  }
  .item-draggabled {
    background: yellow;
  }
  .item-draggable-in {
    background: green;
  }
  .bottomSpace {
    margin-bottom: 20px;
  }
  .item-draggable-in-not-allow {
    background: #ccc;
  }
}
</style>
<style lang="scss">
.el-draggable-container {
  .el-draggable-clone {
    position: absolute;
    width: 19%;
    text-align: center;
    background: black;
    border: 1px solid #000;
    border-radius: 5px;
    .title {
      height: 35px;
      line-height: 35px;
    }
    .text {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
    }
  }
}
</style>

