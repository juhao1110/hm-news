<template>
  <div class="my-follow">
    <hm-header>我的关注</hm-header>
    <div class="list">
        <div class="item" v-for="item in list" :key="item.id">
          <div class="avatar">
            <img :src="$base + item.head_img" alt="">
          </div>
          <div class="title">
            <p>{{item.nickname}}</p>
            <p>{{item.create_date | time('YYYY-MM-DD  HH:mm')}}</p>
          </div>
          <div class="cancel">
            <van-button type="primary" round size="small" @click="unfollow(item.id)">取消关注</van-button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    // 渲染数据
    this.getFollowList()
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 封装渲染请求
    async  getFollowList () {
      const res = await this.$axios.get('/user_follows')
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    // 取消关注事件
    async  unfollow (id) {
      try {
        // 跳出确认模态框框
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您是否确认取关该用户'
        })
      } catch {
        // 点击模态框中的取消
        return this.$toast('取消操作')
      }
      // 点击确认发送取关请求
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      // console.log(res)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('取消成功')
        // 重新渲染
        this.getFollowList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ccc;
  .avatar {
    width: 60px;
    height: 60px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .title {
    flex: 1;
    padding-left: 10px;
    font-size: 16px;
  }
}
</style>
