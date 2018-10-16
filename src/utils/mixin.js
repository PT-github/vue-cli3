import Vue from 'vue'
const mixin = {
  data () {
    return {
      $_loading: false,
      $_loadingObj: null
    }
  },
  methods: {
    $_hideLoading () {
      if (this.$_loading) {
        this.$_loadingObj.close()
        this.$_loading = false
      }
    },
    $_showLoading (options = {}) {
      if (!this.$_loading) {
        this.$_loadingObj = this.$loading({
          lock: true,
          text: options.text || 'Loading',
          target: options.target || 'document.body',
          spinner: 'el-icon-loading',
          fullscreen: options.target ? false : true,
          background: options.background || 'rgba(0, 0, 0, 0.7)'
        })
        this.$_loading = true
      }
      // const loading = this.$loading({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })
    }
  }
}
// export default mixin
Vue.mixin(mixin)