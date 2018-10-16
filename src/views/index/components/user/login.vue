<template>
  <div class="login">
    <div class="login-container">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        name: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    onSubmit () {
      this.Login(this.form)
    },
    ...mapActions([
      'Login'
    ])
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .login-container {
    width: 500px;
    height: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -250px;
    border: 1px solid #CCC;
    padding: 30px;
  }
}
</style>

