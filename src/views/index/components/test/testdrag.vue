<template>
  <div class="test-container">
    <draggable :list="list" :options="options"></draggable>
    <p style="margin-top: 20px;margin-bottom: 10px;">暂存区</p>
    <div class="storage-area"
      @dragover="dragover"
      @drop="drop($event, idx)">
      
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
      storageList: []
    }
  },
  methods: {
    dragover (e) {
      console.log(e.target)
    },
    drop (e) {
      console.log(e.target, '=============')
    }
  },
  components: {
    draggable
  }
}
</script>
<style lang="scss" scoped>
.test-container {
  .storage-area {
    border: 1px solid red;
    background-color: #999;
    width: 500px;
    height: 300px;
    border-radius: 5px;
    background-image: url(/static/images/logo2.png);
    display: block;
  }
}
</style>
<style lang="scss">
    
</style>

