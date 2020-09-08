<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="goBack">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <input type="search" placeholder="请输入搜索关键字" v-model="key" @keyup.enter="search" @input="recommend">
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <!-- 输入关键词的推荐页面 -->
    <div class="recommend" v-if="recommendList.length">
      <div
      class="item one-txt-cut"
      v-for="item in recommendList"
      :key="item.id"
      @click="goSearch(item.title)"
      >{{item.title}}</div>
    </div>
    <!-- 搜索的页面 -->
    <div class="list" v-else-if="list.length">
      <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
    </div>
    <!-- 进入到搜索页面时的页面 -->
    <div class="content" v-else>
      <div class="history">
        <h3>历史记录</h3>
        <div class="list">
          <div
          class="item one-txt-cut"
          v-for="item in history"
          :key="item"
          @click="goSearch(item)"
          >{{item}}</div>
        </div>
      </div>
      <hr>
      <div class="hot">
        <h3>热门搜索</h3>
        <div class="list">
          <div class="item" v-for="item in hot" :key="item" @click="goSearch(item)">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入防抖函数
import { debounce } from '../../utils/tools'
export default {
  created () {
    // 读取缓存中的历史记录
    this.history = JSON.parse(localStorage.getItem('history')) || []
  },
  data () {
    return {
      // 搜索框的内容
      key: '',
      // 存放搜索结果
      list: [],
      // 存放历史记录
      history: [],
      // 因为没有提供热门的接口，就假设已经接收到了数据
      hot: ['华为', '情火', '姑娘', '关晓彤'],
      // 推荐的内容
      recommendList: [],
      // 控制是否推荐
      flag: true
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
        // 得到数据就不需要推荐
        this.flag = false
        // 如果获取到的数据为空，就提示
        if (this.list.length === 0) this.$toast('没有相关内容')
      }
      // 把搜索记录存放到本地
      // 1、如果原来就的历史记录过滤掉
      // 2、把新的搜素记录加在最前面
      // 3、把得到的历史搜索记录存在本地
      this.history = this.history.filter(item => item !== this.key)
      this.history.unshift(this.key)
      localStorage.setItem('history', JSON.stringify(this.history))
      // 清除推荐列表数据
      this.recommendList = []
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
    },
    // 点击历史记录、热门、搜索推荐发送搜索请求
    goSearch (item) {
      // 让历史记录内容赋值给key
      this.key = item
      // 发送搜索请求
      this.search()
    },
    // input输入时发送推荐请求（防抖动）
    recommend: debounce(async function () {
      // 非空判断
      if (!this.key) return
      // 节流阀控制是否发送请求推荐
      if (!this.flag) return this.$toast('已有文章，不发送推荐请求')
      // 发送请求
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.key
        }
      })
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.recommendList = data
      }
    }, 1000)
  },
  watch: {
    // 监听key
    key (value) {
      // 如果搜索框没有内容，那就清除list，显示历史页面
      if (value === '') {
        this.list = ''
      } else {
        // 当key有变化时，打开推荐请求的节流阀
        this.flag = true
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
.recommend {
  padding: 0 10px;
  .item {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
  }
}
</style>
