<template>
  <div class="user-edit">
      <hm-header>编辑资料</hm-header>
      <div class="avatar">
          <img :src="$axios.defaults.baseURL + user.head_img" alt="">
      </div>
      <hm-navitem>
          <template>昵称</template>
          <template #content>{{user.nickname}}</template>
      </hm-navitem>
      <hm-navitem>
          <template>密码</template>
          <template #content>******</template>
      </hm-navitem>
      <hm-navitem>
          <template>性别</template>
          <template #content>{{user.gender === 0 ? "女" : "男"}}</template>
      </hm-navitem>
  </div>
</template>

<script>
export default {
  created () {
    this.getUserInfo()
  },
  methods: {
    // 封装 渲染页面的请求
    async  getUserInfo () {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      this.user = res.data.data
    }
  },
  data () {
    return {
      user: ''
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
}

</style>
