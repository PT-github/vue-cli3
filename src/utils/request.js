import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
	baseURL: process.env.VUE_APP_SERVICE_CONFIG, // api的base_url
	timeout: 5000, // request timeout
  withCredentials: true
})
service.interceptors.response.use(
	response => {
		const res = response.data;
		/**
		 * 通过response自定义success来标示请求状态
		 */
		if (res && res.code === '00000000') {
			return res;
		} else {
			Message({
				message: res.viewMsg,
				type: 'error',
				duration: 3 * 1000
			})
			return Promise.reject('error');
		}
	},
	error => {
    console.log('err' + error)// for debug
    let errorMsg = '<span style="font-weight: bold; font-size: 13px; display: inline-block; padding-bottom: 5px;">请求失败</span><br/>' +
    '<span>请刷新页面重新操作，如果问题依旧存在，请联系管理员</span>';
		Message({
			message: errorMsg,
			type: 'error',
			dangerouslyUseHTMLString: true,
			duration: 3 * 1000
		})
		return Promise.reject(error)
	})

export default service