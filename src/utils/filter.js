// 过滤器设置
import Vue from 'vue'
import moment from 'moment'

// 过滤器，过滤时间格式
Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})
