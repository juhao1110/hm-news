import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入通用样式
import './style/base.less'
// 引入字体图片样式
import './style/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
