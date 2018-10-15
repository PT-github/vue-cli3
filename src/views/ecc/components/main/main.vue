<template>
  <div class="main">
    ECC---------首页<br/>
    <a href="/index.html#/">跳转到index入口</a><br>
    <router-link :to="'/about'" tag="a">go about</router-link>
    <router-link :to="'/otherAbout'" tag="a">go otherAbout</router-link>
  </div>
</template>
<script>
export default {
  name: 'Main'
}
</script>
