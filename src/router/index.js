import Vue from 'vue'
import VueRouter from 'vue-router'
import { Toast } from 'vant'
// 导入页面组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'
import Follow from '../views/Follow.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/edit', component: UserEdit, name: 'edit' },
  { path: '/follow', component: Follow, name: 'follow' }
]

//  解决重复跳转到当前路由的异常,全局的把push的异常给处理了
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  // 原理：捕捉跳转异常，并替换原来的push方法
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})
// 导航卫士：全局前置收尾，如果跳转的页面不是user页面或者有token，就能跳转，不然就回到登录页
// 把需要守卫的导航名写在一个数组中
const authUrls = ['user', 'edit', 'follow']
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // 判断，如果要跳转的网页不是需要守卫的名字，或者有token就放行
  if (!authUrls.includes(to.name) || token) {
    next()
  } else {
    router.push('login')
    Toast.fail('请先登录')
  }
})
export default router
