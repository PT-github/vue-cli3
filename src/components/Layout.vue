<template>
  <div class="layout">
    <header class="header">头部</header>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Layout'
}
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid red;
  }
  .container {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>

