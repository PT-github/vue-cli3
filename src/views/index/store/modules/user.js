import {login, logout} from '../api'
import storage from '@/utils/storage'
const user = {
  state: {
    token: '',
    auth: ['A']
  },
  mutations: {
    SET_TOKEN: (state, token) => {
        state.token = token
    }
  },
  actions: {
    SetToken({commit}, token) {
      storage.setItem('token', token)
      commit('SET_TOKEN', token)
    },
    // 用户登录
    Login({commit}, userInfo) {
      const username = userInfo.name.trim()
      const password = userInfo.password.trim()
      return new Promise((resolve, reject) => {
        login(username, password, userInfo.type).then(response => {
          const data = response.data
          storage.setItem('userInfo', JSON.stringify(data))
          commit('SetToken', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.account).then(() => {
          commit('SET_USERINFO', {})
          commit('SET_ISLOGIN', false)
          localStorage.clear()
          resolve()
        }).catch(error => {
            reject(error)
        })
      })
    }
  }
}

export default user