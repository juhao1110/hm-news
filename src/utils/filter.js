// 过滤器设置
import Vue from 'vue'
import moment from 'moment'

// 过滤器，过滤时间格式
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
