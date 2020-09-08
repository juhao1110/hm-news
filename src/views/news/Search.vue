<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="goBack">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <input type="search" placeholder="请输入搜索关键字" v-model="key">
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <div class="list" v-if="list.length">
      <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
    </div>
    <div class="content" v-else>
      <div class="history">
        <h3>历史记录</h3>
        <div class="list">
          <div class="item">关晓彤</div>
          <div class="item">关晓彤</div>
          <div class="item">关晓彤</div>
        </div>
      </div>
      <hr>
      <div class="hot">
        <h3>热门搜索</h3>
        <div class="list">
          <div class="item">华为</div>
          <div class="item">华为</div>
          <div class="item">华为</div>
          <div class="item">华为</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 搜索框的内容
      key: '',
      // 存放搜索结果
      list: []
    }
  },
  methods: {
    // 点击搜索发送请求
    async search () {
      // 非空判断
      if (!this.key) return this.$toast('请输入搜索关键词')
      // 发送请求
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.key
        }
      })
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    // 点击回退按钮
    goBack () {
      // 如果有搜索关键词，就清空
      if (this.key) {
        this.key = ''
      } else {
        // 回退上个页面
        this.$router.back()
      }
    }
  },
  watch: {
    // 监听key
    key (value) {
      // 如果搜索框没有内容，那就清除list，显示历史页面
      if (value === '') {
        this.list = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 55px;
  border-bottom: 1px solid #ccc;
  line-height: 55px;
  .center {
    flex: 1;
    position: relative;
    padding: 0 10px;
    input {
      width: 100%;
      height: 35px;
      border-radius: 17px;
      border: 1px solid #ccc;
      font-size: 14px;
      padding-left: 30px;
      margin-bottom: 13px;
    }
    .iconfont {
      position: absolute;
      top: 5px;
      left: 22px;
    }
  }
  .right {
    font-size: 14px;
  }
}
.content {
  padding: 10px;
  .history {
    margin-bottom: 10px;
  }
  h3 {
    font-size: 14px;
    margin: 10px 0;
  }
  .list {
    overflow: hidden;
  }
  .item {
    float: left;
    margin: 5px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 13px;
    background-color: #ccc;
  }
}
</style>
