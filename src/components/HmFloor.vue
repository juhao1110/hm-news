<template>
  <div>
    <!-- 楼层的递归组件 -->
    <hm-floor :comment="comment.parent" :count="count -1" v-if="comment.parent"></hm-floor>
    <div class="hm-floor">
      <div class="title">
        <div class="left">{{count}}.{{comment.user.nickname}}</div>
        <div class="center">{{comment.create_date | now}}</div>
        <div class="right">回复</div>
      </div>
      <div class="content">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    comment: Object,
    count: Number
  }
}
</script>

<style lang="less" scoped>
.hm-floor {
  border: 1px solid red;
  padding: 10px;
  margin-top: -1px;
  .title {
    display: flex;
    font-size: 14px;
    .center {
      flex: 1;
      font-size: 12px;
      color: #666;
      padding-left: 10px;
    }
    .right {
      color: #666;
    }
  }
  .content {
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
