<template>
  <div class="comment">
    <div class="header">
      <hm-header>我的评论</hm-header>
    </div>
    <!-- List 组件可以与 PullRefresh 组件结合使用，实现下拉刷新的效果 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check= "false"
          @load="onLoad"
          >
          <div class="item" v-for="item in list" :key="item.id">
            <div class="time">{{item.create_date | time('YYYY-MM-DD HH:mm')}}</div>
            <div class="comment" v-if="item.parent">
              <div class="name">回复：{{item.parent.user.nickname}}</div>
              <div class="comment_content">{{item.parent.content}}</div>
            </div>
            <div class="content">{{item.content}}</div>
            <div class="origin">
              <div class="one-txt-cut" @click="$router.push(`/post-detail/${item.post.id}`)"> 原文：{{item.post.title}}</div>
              <span class="iconfont iconjiantou1"></span>
            </div>
          </div>
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  created () {
    this.getCommentList()
  },
  data () {
    return {
      list: [],
      // 代表加载状态，如果loading为true的时候，代表List组件正在加载数据，onLoad就不再触发
      loading: false,
      // 代表是否结束， false代表还有数据
      finished: false,
      // 当前页
      pageIndex: 1,
      // 每页的条数
      pageSize: 6,
      // 代表是否正在下拉刷新
      // 等数据加载完成，需要把下拉刷新改成false
      refreshing: false
    }
  },
  methods: {
    async getCommentList () {
      const res = await this.$axios.get('/user_comments/', {
        // get请求传数据，可以写在params对象中
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // 因为后面会多次加载数据，所以不能直接赋值，不然会覆盖，要展开数据拼接
        this.list = [...this.list, ...data]
        //  数据已全部加载完毕，组件则直接将finished设置成true。所以手动把loading改成false
        this.loading = false
        //  把下拉的状态改成false
        this.refreshing = false
        // 判断是否有更多的数据更新，如果没有，finished改成true (数据的数据长度小于6，就说明没有更多的数据了)
        if (data.length < 6) {
          this.finished = true
        }
      }
    },
    onLoad () {
      // 页面增加
      this.pageIndex++
      // 重新加载渲染
      this.getCommentList()
    },
    onRefresh () {
      // 下拉重新刷新加载第一页，要把所有数据还原
      // 清空一开始的数据
      this.list = []
      // 防止之前就没有数据了
      this.finished = false
      // 因为下拉就在加载，手动把list的loading改成true,避免重复加载
      this.loading = true
      // 加载第一页
      this.pageIndex = 1
      // 发送请求加载
      this.getCommentList()
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  padding: 20px 20px 10px 20px;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  .time {
    color: #666;
  }
  .comment {
    padding: 10px;
    margin: 10px 0;
    background-color: #ddd;
    color: #666;
    .name {
      font-size: 14px;
    }
    .comment_content {
      padding-top: 10px;
    }
  }
  .origin {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;
    color: #999;
  }
}
</style>
