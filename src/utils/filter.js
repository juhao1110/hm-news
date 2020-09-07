// 过滤器设置
import Vue from 'vue'
import moment from 'moment'

// 给moment全局定义语言环境
moment.locale('zh-CN')
// 过滤器，过滤时间格式
Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})
// 过滤时间格式，在多少事件前发布的
Vue.filter('now', input => {
  return moment(input).fromNow()
})
