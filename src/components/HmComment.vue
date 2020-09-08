<template>
  <div class="hm-comment">
    <div class="title">
      <div class="left">
        <img :src="$base + comment.user.head_img" alt="">
      </div>
      <div class="center">
        <p>{{comment.user.nickname}}</p>
        <p>{{comment.create_date | now}}</p>
      </div>
      <div class="right" @click="reply">回复</div>
    </div>
    <!-- 楼层组件 -->
    <hm-floor :comment="comment.parent" :count="count" v-if="comment.parent"></hm-floor>
    <!-- 评论内容 -->
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object
  },
  data () {
    return {
      count: this.getCount(0, this.comment)
    }
  },
  methods: {
    getCount (num, data) {
      // 获取楼层数的封装函数
      // num 是楼层数 data是要判断的数据，如果data里面有parent，那就是有一个楼层
      if (data.parent) {
        return this.getCount(num + 1, data.parent)
      } else {
        return num
      }
    },
    reply () {
      // 触发reply事件，并且传id和nickname
      this.$bus.$emit('reply', this.comment.id, this.comment.user.nickname)
    }
  }
}
</script>

<style lang="less" scoped>
.hm-comment {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .title {
    display: flex;
    .left {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      padding-left: 10px;
      font-size: 14px;
      p {
        line-height: 26px;
      }
    }
    .right {
      font-size: 14px;
      color: #666;
    }
  }
  .content {
    font-size: 18px;
    // 自动换行
    word-wrap:break-word;
    word-break:break-all;
  }
}

</style>
