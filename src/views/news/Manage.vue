<template>
  <div class="manage">
    <hm-header>栏目管理</hm-header>
    <div class="content">
      <div class="active">
        <h3>点击删除以下频道(必须保留4项及以上)</h3>
        <div class="list">
          <div class="item" v-for="item in activeList" :key="item.id" @click="delTab(item.id)" >{{item.name}}</div>
        </div>
      </div>
      <div class="deactive">
        <h3>点击添加以下频道</h3>
        <div class="list">
          <div class="item" v-for="item in deactiveList" :key="item.id" @click="addTab(item.id)" >{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 存放激活的栏目
      activeList: [],
      // 存放未激活的栏目
      deactiveList: []
    }
  },
  async created () {
    // 渲染时优先从本地拿，如果没有就发送请求
    const activeList = JSON.parse(localStorage.getItem('activeList'))
    const deactiveList = JSON.parse(localStorage.getItem('deactiveList'))
    if (activeList) {
      this.activeList = activeList
      this.deactiveList = deactiveList
      return
    }
    // 渲染栏目
    const res = await this.$axios.get('/category')
    console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.activeList = data
    }
  },
  methods: {
    delTab (id) {
      // 保留至少4个
      if (this.activeList.length <= 4) return
      // 先找到要删除的栏目下标
      const index = this.activeList.findIndex(item => item.id === id)
      // 添加到未激活的栏目中
      this.deactiveList.push(this.activeList[index])
      // 删除激活栏目中的该栏目
      this.activeList.splice(index, 1)
    },
    addTab (id) {
      const index = this.deactiveList.findIndex(item => item.id === id)
      this.activeList.push(this.deactiveList[index])
      this.deactiveList.splice(index, 1)
    }
  },
  watch: {
    // 栏目数据发生了改变，就存到本地（要转为json字符串，因为只能存字符串）
    // 复杂数据，完成写法
    activeList: {
      deep: true,
      handler (value) {
        localStorage.setItem('activeList', JSON.stringify(this.activeList))
        localStorage.setItem('deactiveList', JSON.stringify(this.deactiveList))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 10px;
  .active,
  .deactive {
    h3 {
      font-size: 14px;
      font-weight: normal;
      margin: 10px 0;
    }
    .list {
      overflow: hidden;
      .item {
        float: left;
        margin: 5px;
        width: 60px;
        height: 30px;
        border: 1px solid #ccc;
        background-color: #eee;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
      }
    }
  }
}
</style>
