<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="search_box">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- 导航Tab标签页 -->
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="tab.name" v-for="tab in tabList" :key="tab.id">
        <hm-post :post="item" v-for="item in newsList" :key="item.id"></hm-post>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  created () {
    this.getTabList()
  },
  data () {
    return {
      active: 0,
      tabList: [],
      pageIndex: 1,
      pageSize: 20,
      newsList: []
    }
  },
  methods: {
    async getTabList () {
      const res = await this.$axios.get('/category')
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        // 发起请求获得文章详情（参数是栏目id）
        this.getNewsList(this.tabList[0].id)
      }
    },
    async getNewsList (id) {
      const res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          category: id
        }
      })
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.newsList = data
        console.log(this.newsList)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  .header {
    display: flex;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    background-color: #ff0000;
    .logo,
    .user {
      width: 70px;
    }
    .logo {
      span {
        font-size: 50px;
      }
    }
    .user {
      span {
        font-size: 24px;
      }
    }
    .search {
      flex: 1;
      .search_box {
        height: 34px;
        line-height: 34px;
        background-color: rgba(255,255,255,.5);
        border-radius: 17px;
        margin-top: 8px;
        font-size: 14px;
        .iconsearch {
          padding-right: 5px;
        }
      }
    }
  }
}
</style>
