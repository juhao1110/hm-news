<template>
  <div class="hm-post" @click="$router.push(`/post-detail/${post.id}`)">
    <div class="video-post" v-if="post.type === 2">
      <div class="title">{{post.title}}</div>
      <div class="video">
        <span class="iconfont iconshipin"></span>
        <img :src="$url(post.cover[0].url)" alt="">
      </div>
      <div class="user">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}} 跟帖</span>
      </div>
    </div>
    <div class="single-img-post" v-else-if="post.cover.length > 0 && post.cover.length < 3">
      <div class="info">
        <div class="title">{{post.title}}</div>
        <div class="user">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}} 跟帖</span>
        </div>
      </div>
      <div class="img">
        <img :src="$url(post.cover[0].url)" alt="">
      </div>
    </div>
    <div class="multiple-img-post" v-else-if="post.cover.length >= 3">
      <div class="title">{{post.title}}</div>
      <div class="img">
        <img :src="$url(post.cover[0].url)" alt="">
        <img :src="$url(post.cover[1].url)" alt="">
        <img :src="$url(post.cover[2].url)" alt="">
      </div>
      <div class="user">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}} 跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style lang="less" scoped>
.user {
      color: #666;
      font-size: 14px;
      span:first-child {
        margin-right: 10px;
      }
    }
.single-img-post {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .info {
    flex: 1;
    font-size: 16px;
    display: flex;
    // 改变主轴方向
    flex-direction: column;
    // 主轴的对齐方式
    justify-content: space-between;
  }
  .img {
    img {
      width: 120px;
      height: 74px;
      //  作用和background-size类似，，设置图片的大小
      // cover的缺点：保证图片覆盖完整的大小， 缺点：会有一部分被截取掉
      // contain: 保证图片被完整的显示，会有留白
      object-fit: cover;
    }
  }
}
.multiple-img-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .title {
    font-size: 16px;
  }
  .img {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    img {
      width: 110px;
      height: 74px;
      object-fit: cover;
    }
  }
}
.video-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .title {
    font-size: 16px;
  }
  .video {
    position: relative;
    padding: 10px 0;
    img {
      width: 100%;
      height: 170px;
      object-fit: cover;
    }
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      background-color: rgba(255, 255, 255, .5);
      border-radius: 50%;
      text-align: center;
      line-height: 50px;
      font-size: 24px;
    }
  }
}
</style>
