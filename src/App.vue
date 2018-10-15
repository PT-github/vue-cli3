<template>
  <div id="app">
    <div id="nav">
      <img :src="'/static/images/logo2.png'" alt="">
      {{env}}
      <button class="test">测试按钮</button>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      baseUrl: process.env.BASE_URL
    }
  },
  computed: {
    env () {
      return process.env.VUE_APP_SERVICE_CONFIG
    }
  },
  mounted () {
    console.log(process.env.VUE_APP_SERVICE_CONFIG, '=====')
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
