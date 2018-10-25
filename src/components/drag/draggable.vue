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
          'item-draggable-in-not-allow': draggableData && draggableData.mutex && draggableData.mutex.indexOf(item.id) !== -1, // 正在拖拽，该组件不允许被放置
          'item-draggabled': dragging && idx !== index, // 正在拖拽 其他科拖拽dom的样式
          'item-draggable-in': dragenterDomIndex === idx, // 拖拽进入
          'bottomSpace': idx >= 15 && idx < 20 // 底部空隙
        }"
        :draggable="draggable" >
        <div class="title">{{ item.name + (item.mutex ? '【有拖拽限制[' + item.mutex.join(',') + ']】' : '') }}</div>
        <div class="text">（{{ item.teacher }}）</div>
      </div>
    </template>
  </div>
</template>
<script>
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
    }
  },
  created () {
    if (this.list && this.list.length > 0) {
      this.list.forEach(item => {
        this.sortList.push(item)
      });
    }
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
    }
  },
  methods: {
    dragstart (e, idx) {
      this.index = idx
      e.dataTransfer.setData("idx", idx); // firefox必须有数据才允许拖拽
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
      } else {
        this.dragging = true
      }
    },
    dragend () {
      // 拖拽结束
      if (!this.needConfirm) {
        this.reset()
      }
    },
    dragenter (e, idx) {
      let dom = this.fiterDraggableDom(e.target)
      // 拖拽到目标dom中 - 判断是否为el-draggable_group容器
      if (dom && this.index!== idx) {
        this.dragenterDomIndex = idx
      }
    },
    dragleave (e) {
      if (e.target.className.indexOf('el-draggable_group') !== -1) {
        // console.log('【离开目标dom】', e.target)
      }
    },
    dragover (e) {
      e.preventDefault()
      // console.log('放下目标界面是触发事件', e.target)
    },
    drop (e, idx) {
      e.preventDefault()
      console.log('AAAAAAAAAAAAAA')
      let dom = this.fiterDraggableDom(e.target)
      if (dom) {
        // 内部拖拽
        if (this.index === idx) {
          // 没有拖动
          return
        }
        console.log('移动拖动的元素到所选择的放置目标节点====', this.index, idx, dom)
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
      } else if (e.target.className.indexOf('storage-area') !== -1) {
        console.log('外部拖拽')
        this.reset()
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
      if (target.className.indexOf('el-draggable_group') !== -1) {
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

