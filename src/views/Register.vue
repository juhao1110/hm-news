<template>
  <div class="register">
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="register">
      <van-field
        v-model="user.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="user.nickname"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        :rules="rules.nickname"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <p class="tip">已有账号？去 <router-link to="/login">登录</router-link></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '请输入5-11位数字', trigger: 'onChange' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'onChange' },
          { pattern: /^[\u4E00-\u9FA5]{2,6}$/, message: '请输入2-6位中文', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '请输入3-9位数字', trigger: 'onChange' }
        ]
      }
    }
  },
  methods: {
    async  register () {
      const res = await this.$axios.post('/register', this.user)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push('/login')
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style>
</style>
