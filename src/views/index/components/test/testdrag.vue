<template>
  <div class="test-container">
    <div class="drag-content">
      <draggable ref="drag" :storageDragging="storageDragging" :storageDragData="storageDragData" :list="list" :options="options" @dragOutOfBound="dragOutOfBound" @exchangeData="exchangeData"></draggable>
    </div>
    <p style="margin-top: 20px;margin-bottom: 10px;">暂存区</p>
    <div class="storage-area"
      @dragover="dragoverStorage"
      @drop="dropStorage"
      @dragenter="dragenterStorage"
      @dragleave="drageleaveStorage"
      >
      <div class="draggable-n"
        @dragstart="dragstart($event, index)"
        @dragend="dragend"
        @dragover="dragover"
        @drop="drop"
        draggable="true"
        v-for="(item, index) in storageList"
        :key="'draggable_n-' + index" >
        <div class="title">{{ item.name ? (item.name + (item.mutex ? '【有拖拽限制[' + item.mutex.join(',') + ']】' : '')) : '' }}</div>
        <div class="text">{{ item.teacher ? '（' + item.teacher + '）' : '' }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from '@/components/drag/draggable'
export default {
  name: 'testDrag',
  data () {
    return {
      options: {
        draggable: true
      },
      list: [
        {
          id: 1,
          name: '语文',
          teacher: '李自菊',
          mutex: [2, 3]
        },
        {
          id: 2,
          name: '专题',
          teacher: '舒彩凤'
        },
        {
          id: 3,
          name: '体育',
          teacher: '贺定顺'
        },
        {
          id: 4,
          name: '美术',
          teacher: '邓淑菊'
        },
        {
          id: 5,
          name: '科学',
          teacher: '唐苏湘'
        },
        {
          id: 6,
          name: '体育',
          teacher: '贺定顺'
        },
        {
          id: 7,
          name: '数学',
          teacher: '邓淑菊'
        },
        {
          id: 8,
          name: '劳动',
          teacher: '李自菊'
        },
        {
          id: 9,
          name: '语文',
          teacher: '李自菊'
        },
        {
          id: 10,
          name: '体育',
          teacher: '贺定顺'
        },
        {
          id: 11,
          name: '数学',
          teacher: '邓淑菊'
        },
        {
          id: 12,
          name: '足球',
          teacher: '刘军华'
        },
        {
          id: 13,
          name: '语文',
          teacher: '李自菊'
        },
        {
          id: 14,
          name: '音乐',
          teacher: '李含维'
        },
        {
          id: 15,
          name: '语文',
          teacher: '李自菊'
        },
        {
          id: 16,
          name: '音乐',
          teacher: '李含维'
        },{
          id: 17,
          name: '语文',
          teacher: '李自菊'
        },
        {
          id: 18,
          name: '研学',
          teacher: '李自菊'
        },
        {
          id: 19,
          name: '实践',
          teacher: '李自菊'
        },
        {
          id: 20,
          name: '数学',
          teacher: '邓淑菊'
        },
        {
          id: 21,
          name: '语文',
          teacher: '李自菊'
        },{
          id: 22,
          name: '科学',
          teacher: '唐苏湘'
        },
        {
          id: 23,
          name: '美术',
          teacher: '邓淑菊'
        },
        {
          id: 24,
          name: '英语',
          teacher: '舒彩凤'
        },
        {
          id: 25,
          name: '思品',
          teacher: '李自菊'
        },
        {
          id: 26,
          name: '英语',
          teacher: '舒彩凤'
        },{
          id: 27,
          name: '思品',
          teacher: '李自菊'
        },
        {
          id: 28,
          name: '科学',
          teacher: '唐苏湘'
        },
        {
          id: 29,
          name: '数学',
          teacher: '邓淑菊'
        },
        {
          id: 30,
          name: '团体活动',
          teacher: '李自菊',
          public: true
        }
      ],
      dragToStorage: false,
      storageList: [],
      storageDragging: false,
      storageDragDataIndex: '',
      storageDragData: null
    }
  },
  methods: {
    dragstart (e, index) {
      this.storageDragging = true
      this.storageDragDataIndex = index
      this.storageDragData = this.storageList[index]
      e.dataTransfer.setData('TEXT', 'AAAAAAAAAA'); // firefox必须有数据才允许拖拽
    },
    dragend () {
      this.storageDragging = false
      this.$refs.drag.reset()
    },
    dragover (e) {
      console.log('111111111')
      e.preventDefault()
    },
    drop (e) {
      console.log('2222')
      e.preventDefault()
    },
    exchangeData (o) {
      if (o) {
        this.$set(this.storageList, this.storageDragDataIndex, o)
      } else {
        this.storageList.splice(this.storageDragDataIndex, 1)
      }
    },
    dragOutOfBound(index, o) {
      if (this.dragToStorage) {
        this.storageList.push(o)
        this.$refs.drag.removeData(index)
        this.dragToStorage = false
      }
    },
    dragenterStorage () {
      console.log('enter')
      // console.log('dragenterStorage')
      // this.storageTempIndex = this.index
      // console.log(this.storageTempIndex, '==============')
    },
    drageleaveStorage () {
      console.log('leave')
      // console.log('drageleaveStorage')
      // this.storageTempIndex = ''
    },
    dragoverStorage (e) {
      e.preventDefault()
      this.dragToStorage = true
      // this.storageList.push(this.sortList[this.index])
      // this.$set(this.sortList, this.index, {
      //   name: '',
      //   teacher: ''
      // })
    },
    dropStorage (e) {
      e.stopPropagation();
      e.preventDefault();
    }
  },
  components: {
    draggable
  }
}
</script>
<style lang="scss" scoped>
.test-container {
  .drag-content {
    margin: 50px 10px;
    border: 1px solid red;
    position: relative;
  }
  .storage-area {
    position: relative;
    border: 1px solid red;
    width: 872px;
    min-height: 100px;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    align-content: baseline;
    .draggable-n {
      width: 170px;
      height: 60px;
      border: 1px solid #000;
      border-radius: 5px;
      background: #fdcccc;
      cursor: pointer;
      margin-bottom: 5px;
      margin-right: 5px;
      &:nth-child(5n) {
        margin-right: 0;
      }
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
}
</style>

