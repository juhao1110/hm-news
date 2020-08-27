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
  methods: {
    async  login () {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less">
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
