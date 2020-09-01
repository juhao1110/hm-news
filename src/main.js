import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入通用样式
import './style/base.less'
// 引入字体图片样式
import './style/iconfont.css'

// 引入amfe-flexible   rem适配用的 html的fontSize会被设置为屏幕宽度的1/10
import 'amfe-flexible'

// 引入公共组件js
import './utils/global'
// 引入请求设置js
import './utils/request'
// 引入过滤器设置js
import './utils/filter'
// 引入vant插件js
import './utils/vant'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
