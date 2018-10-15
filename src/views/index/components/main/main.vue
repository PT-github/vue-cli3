<template>
  <div class="main">
    首页
    <router-link :to="'/about'" tag="a">go about</router-link>
    <router-link :to="'/otherAbout'" tag="a">go otherAbout</router-link>
  </div>
</template>
<script>
export default {
  name: 'Main'
}
</script>
