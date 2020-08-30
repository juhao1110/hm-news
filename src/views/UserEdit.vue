<template>
  <div class="user-edit">
      <hm-header>编辑资料</hm-header>
      <div class="avatar">
          <img :src="$axios.defaults.baseURL + user.head_img" alt="">
      </div>
      <hm-navitem @click="showNickname">
          <template>昵称</template>
          <template #content>{{user.nickname}}</template>
      </hm-navitem>
      <hm-navitem @click="showPassword">
          <template>密码</template>
          <template #content>******</template>
      </hm-navitem>
      <hm-navitem>
          <template>性别</template>
          <template #content>{{user.gender === 0 ? "女" : "男"}}</template>
      </hm-navitem>
      <!-- 修改昵称的修改框 -->
      <van-dialog v-model="isNickNameShow" title="编辑昵称" show-cancel-button @confirm="updateNickname">
        <!-- field输入框 -->
        <van-cell-group>
          <van-field v-model="nickname" />
        </van-cell-group>
      </van-dialog>
      <!-- 修改密码的修改框 -->
      <van-dialog v-model="isPasswordShow" title="编辑密码" show-cancel-button @confirm="updatePassword">
        <!-- field输入框 -->
        <van-cell-group>
          <van-field v-model="password" />
        </van-cell-group>
      </van-dialog>
      <!-- 修改性别的修改框 -->
  </div>
</template>

<script>
export default {
  created () {
    // 渲染页面
    this.getUserInfo()
  },
  data () {
    return {
      user: '',
      // 隐藏昵称修改框
      isNickNameShow: false,
      nickname: '',
      isPasswordShow: false,
      password: ''
    }
  },
  methods: {
    // 封装 渲染页面的请求
    async  getUserInfo () {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) this.user = data
    },
    // 封装 更改信息的请求
    async updateUser (data) {
      // 点确认时，发送请求更改昵称
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      if (res.data.statusCode === 200) {
        // 重新渲染页面
        this.getUserInfo()
        // 提示更改成功
        this.$toast.success('更改成功')
      }
    },
    showNickname () {
      // 显示修改框
      this.isNickNameShow = true
      // 回显昵称
      this.nickname = this.user.nickname
    },
    updateNickname () {
      this.updateUser({ nickname: this.nickname })
    },
    showPassword () {
      // 显示修改框
      this.isPasswordShow = true
      // 回显密码
      this.password = this.user.password
    },
    updatePassword () {
      this.updateUser({ password: this.password })
    }
  }
}
</script>

<style lang="less" scoped >
.user-edit {
    .avatar {
        padding: 40px 0;
        text-align: center;
        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    }
    // 深度选择器，能够覆盖组件动态生成的子元素的样式
    /deep/ .van-dialog__content {
      padding: 20px;
      .van-field {
        border: 1px solid #ccc;
      }
    }
}

</style>
