<template>
  <div class="login">
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="login">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <p class="tip">
      没有账号？去 <router-link to="/register">注册</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名为5-11位数字', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码为3-9位数字', trigger: 'onChange' }
        ]
      }
    }
  },
  created () {
    // 数据加载成功就去获取route中的query参数，并且赋值（为了让注册页面注册成功，跳转到登录页面就能带入已注册的信息）
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  },
  methods: {
    async  login () {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        // 登录成功把token和id存到本地
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        // 跳转到用户页面(用了路由名字)
        // this.$router.push('user')
        // 在新闻详情页面点击关注也需要登录，在新闻详情页登录时，会在地址栏传参back=true
        // 所以进行判断，如果有参数back，那么就跳回前一页，不然登录成功就跳到用户页
        if (this.$route.query.back) {
          this.$router.back()
        } else {
          this.$router.push('/user')
        }
      } else {
        // 提示失败
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// scoped属性是为了让当前组件样式只在当前组件成效
.tip {
  height: 50px;
  line-height: 50px;
  text-align: right;
  margin: 15px;
  a {
    color: red;
  }
}
</style>
