<template>
  <div class="main">
    首页<br/>
    <router-link :to="'/about'" tag="a">go about</router-link><br/>
    <router-link :to="'/otherAbout'" tag="a">go otherAbout</router-link><br/>
    <el-button class="testBtn" type="primary" @click="testApi" v-stat="{a: 1, b: 2}">测试接口请求</el-button>
  </div>
</template>
<script>
// import { login } from '../../store/api'
export default {
  name: 'Main',
  methods: {
    testApi () {
      this.$_showLoading({
        text: '加载中...'
      })
      // login({a:1,b:2}).then(res =>{
      //   console.log(res)
      // }).catch(e =>{
      //   console.log(e)
      // })
      setTimeout(() => {
        this.$_hideLoading()
      }, 1000)
    }
  }
}
</script>
