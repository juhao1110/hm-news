<template>
  <div class="star">
    <div class="header">
      <hm-header>我的收藏</hm-header>
    </div>
    <div class="list">
      <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.getStarList()
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    async getStarList () {
      const res = await this.$axios.get('/user_star')
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        // 因为后台的原因，返回的评论跟另一个接口的不一样，所以把这个接口的每项数据添加一下属性，不然不能渲染有几条跟帖
        this.list.forEach(item => {
          item.comment_length = item.comments.length
        })
        this.comment_length = data.comments
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
