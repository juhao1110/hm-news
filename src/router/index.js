import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入页面组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)
const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' }
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
export default router
