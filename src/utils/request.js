// 发送请求设置
import Vue from 'vue'
import axios from 'axios'
import router from '../router/index.js'
import { Toast } from 'vant'

// 把axios对象添加到Vue的原型对象中，这样发送请求是就可以直接用原型对象中$axios，不用在各个页面分别引用
Vue.prototype.$axios = axios
// 给axios配置默认的baseURL，基准地址，发送请求是会自动拼接，直接写接口，也方便管理
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 设置请求拦截器,在请求中添加请求头（带上token），以免以后请求时再发送token
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  // 因为请求拦截器函数, 要求返回config参数，不然会报错
  return config
})
// 设置响应拦截器，处理token验证不通过的情况
axios.interceptors.response.use(function (response) {
  // console.log(response.data)
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 清除token和userId
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // 跳转到登录页面
    router.push('/login')
    // 提示验证失败
    Toast.fail('验证失败，请登录')
  }
  return response
})
