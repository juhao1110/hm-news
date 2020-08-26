<template>
  <div id="app">
    <router-view></router-view>
    <router-link to="/login">我是登录页面</router-link>
    <router-link to="/register">我是注册页面</router-link>
    <hr />
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-icon name="success" />
    <van-icon name="like-o" />
    <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup v-model="show">内容</van-popup>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    showPopup () {
      this.show = true
    }
  }
}
</script>
<style lang="less">
</style>
