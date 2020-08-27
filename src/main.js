import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入通用样式
import './style/base.less'
// 引入字体图片样式
import './style/iconfont.css'
// 全局导入Vant（移动端的组件插件）
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入amfe-flexible   rem适配用的 html的fontSize会被设置为屏幕宽度的1/10
import 'amfe-flexible'
// 引入公共头部
import HmHeader from './components/HmHeader.vue'
// 使用Vant
Vue.use(Vant)

Vue.config.productionTip = false
Vue.component('hm-header', HmHeader)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
