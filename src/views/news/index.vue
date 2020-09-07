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
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- 管理Tab粘性盒子 -->
    <van-sticky class="more-sticky">
      <div class="more" @click="$router.push('/manage')">
        <span class="iconfont iconlianjie"></span>
      </div>
    </van-sticky>
    <!-- 导航Tab标签页 -->
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="tab.name" v-for="tab in tabList" :key="tab.id">
        <!-- 内容 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="50  "
            :immediate-check="false"
            >
            <hm-post :post="item" v-for="item in newsList" :key="item.id"></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'index',
  // created () {
  //   // this.getTabList()
  // },
  activated () {
    // 页面缓存被激活时触发的事件，重新获取tab数据
    // this.getTabList()
    console.log('缓存')
    this.getTabList()
  },
  data () {
    return {
      active: 0,
      tabList: [],
      pageIndex: 1,
      pageSize: 6,
      newsList: [],
      // 加载状态
      loading: false,
      // 是否加载完成
      finished: false,
      // 是否处于加载中状态
      refreshing: false
    }
  },
  methods: {
    async getTabList () {
      // 优先看本地是否有缓存栏目,如果有就直接渲染，没有在发送请求
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      if (activeList) {
        this.tabList = activeList
        // 发送请求获得第一个tab栏的数据
        this.getNewsList(this.tabList[0].id)
        return
      }
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
      if (this.pageIndex === 1) this.newsList = []
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
        // 上拉会加载新的数据，不能直接赋值，要拼接
        this.newsList = [...this.newsList, ...data]
        // console.log(this.newsList)
        // 把上拉加载状态改为false
        this.loading = false
        // 把下拉的加载状态改为false
        this.refreshing = false
        // 判断是否有更多的数据
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      // 加载下一页数据
      this.pageIndex++
      // active是栏目下标，this.tabList[this.active].id就是当前栏目的id
      this.getNewsList(this.tabList[this.active].id)
    },
    onRefresh () {
      // 下拉刷新
      this.newsList = []
      this.pageIndex = 1
      this.loading = true
      this.finished = false
      this.getNewsList(this.tabList[this.active].id)
    }
  },
  watch: {
    // 数据监听，监听到tab栏的下标active有变化，就说明切换tab栏
    // 简单类型监听
    active (value) {
      // 重新加载当前tab栏的数据，清除之前的数据
      this.newsList = []
      // 当前页恢复为1
      this.pageIndex = 1
      // 是否全部加载完毕改为false
      this.finished = false
      // 加载状态改为true，不然会重复加载，因为数据变化就加载了
      this.loading = true
      // 重新加载新闻数据
      this.getNewsList(this.tabList[value].id)
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
  .more {
    position: absolute;
    right: 0;
    width: 15%;
    height: 44px;
    z-index: 999;
    background-color: #fff;
    text-align: center;
    line-height: 44px;
  }
  /deep/ .van-tabs__wrap {
    width: 85%;
  }
  // 解决页面滚动到下面，会导致点击不了的问题，因为父盒子层级不够
  .more-sticky {
      /deep/ .van-sticky--fixed {
      z-index: 100;
    }
  }
}
</style>
