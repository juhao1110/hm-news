<template>
  <div class="nav" @click="clickFn">
      <div class="title"><slot></slot></div>
      <div class="content"><slot name="content"></slot></div>
      <div class="arrow">
          <span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>
export default {
  // 接收父组件传的值
  props: {
    to: String
  },
  methods: {
    // 注册点击跳转到父组件传来的地址
    clickFn () {
      if (this.to) this.$router.push(this.to)
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 18px;
    border-bottom: 1px solid #ddd;
    margin-left: 20px;
    padding-right: 20px;
    .content {
        flex: 1;
        text-align: right;
        color: #666;
    }
    .arrow {
        padding-left: 10px;
    }
}
</style>
