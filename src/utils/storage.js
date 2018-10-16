// 数据存储工具函数
var storage = {
  setItem: (key, value) => {
    localStorage.setItem(key, value)
  },
  getItem: key => {
    return localStorage.getItem(key)
  },
  clear: () => {
    localStorage.clear()
  }
}
export default storage