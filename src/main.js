import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

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
import HmLogo from './components/HmLogo.vue'
import HmNavItem from './components/HmNavItem.vue'
// 使用Vant
Vue.use(Vant)

Vue.config.productionTip = false
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-navitem', HmNavItem)
// 把axios对象添加到Vue的原型对象中，这样发送请求是就可以直接用原型对象中$axios，不用在各个页面分别引用
Vue.prototype.$axios = axios
// 给axios配置默认的baseURL，基准地址，发送请求是会自动拼接，直接写接口，也方便管理
axios.defaults.baseURL = 'http://127.0.0.1:3000'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
