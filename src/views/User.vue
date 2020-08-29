<template>
  <div class="user">
     <div class="header">
         <div class="avatar">
            <img src="../assets/ia_100000002.jpg">
         </div>
         <div class="info">
             <div class="name">
                 <span class="iconfont iconxingbienan"></span>
                 <span>寂寞的天</span>
            </div>
             <div class="time">2020-08-27</div>
         </div>
         <div class="arrow">
             <span class="iconfont iconjiantou1"></span>
         </div>
     </div>
     <!-- 导航条 -->
     <!-- 父传子  把跳转的页面传给子组件(to是自定义属性) -->
     <hm-navitem to='/follow'>
       <template>我的关注</template>
       <template  #content>关注的用户</template>
     </hm-navitem>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.user {
  .header {
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 3px solid #ddd;
    .avatar {
      width: 75px;
      height: 75px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .info {
      flex: 1;
      padding-left: 15px;
      font-size: 16px;
      .iconfont {
        padding-right: 5px;
        color: rgb(128, 187, 228);
      }
      .time {
        padding-top: 10px;
        color: #666;
      }
    }
  }
}
</style>
