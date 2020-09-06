<template>
  <div class="post-detail">
    <div class="header">
      <div class="left" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <div class="followed" v-if="post.has_follow" @click="unfollow">已关注</div>
        <div class="follow" v-else @click="follow">关注</div>
      </div>
    </div>
    <div class="content">
      <div class="title">{{post.title}}</div>
      <div class="name">
        <span>{{post.user.nickname}}</span>
        <span>{{post.create_date | time}}</span>
      </div>
      <div v-if="post.type === 1" class="info" v-html="post.content"></div>
      <video v-else :src="getUrl(post.content)" controls autoplay muted></video>
    </div>
    <div class="buttons">
      <div class="good">
        <span class="iconfont icondianzan"></span>
        <span>112</span>
      </div>
      <div class="share">
        <span class="iconfont iconweixin"></span>
        <span>微信</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.getInfo()
  },
  data () {
    return {
      post: {
        // 为了防止一开始没有加载到数据，所以先给user空对象
        user: {}
      }
    }
  },
  methods: {
    async getInfo () {
      // 需要id
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post/${id}`)
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
        console.log(this.post)
      }
    },
    getUrl (url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    },
    async follow () {
      // 判断是否登录
      const token = localStorage.getItem('token')
      if (!token) {
        // 没有登录
        // 进行登录，并且传参back为true，方便登录后跳回该页面
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        return
      }
      // 登录了就发送请求关注该用户
      const res = await this.$axios.get(`/user_follows/${this.post.user.id}`)
      // console.log(res.data)
      if (res.data.statusCode === 200) {
        this.$toast.success('关注成功')
        this.getInfo()
      }
    },
    async unfollow () {
      // 发送请求取消关注
      const res = await this.$axios.get(`/user_unfollow/${this.post.user.id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('取消关注成功')
        // 重新渲染
        this.getInfo()
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
  border-bottom: 1px solid #ccc;
  height: 50px;
  .left {
    span {
      line-height: 50px;
    }
  }
  .center {
    flex: 1;
    span {
      font-size: 50px;
    }
  }
  .right {
    font-size: 14px;
    div {
      width: 60px;
      height: 30px;
      text-align: center;
      border-radius: 15px;
      line-height: 30px;
    }
  }
  .followed {
    border: 1px solid #ccc;
  }
  .follow {
    color: #fff;
    background-color: #f00;
  }
}
.content {
  padding: 10px;
  .title {
    font-weight: 700;
    font-size: 18px;
  }
  .name {
    font-size: 14px;
    color: #666;
    margin: 10px 0;
    span:first-child {
      margin-right: 20px;
    }
  }
  .info {
    font-size: 14px;
    /deep/  img {
      width: 100%;
    }
  }
  video {
    width: 100%;
  }
}
.buttons {
   display: flex;
   padding: 20px 0;
   justify-content: space-around;
   > div {
     width: 120px;
     height: 40px;
     line-height: 40px;
     border-radius: 20px;
     border: 1px solid #ccc;
     text-align: center;
     font-size: 16px;
     .iconfont {
       font-size: 18px;
       margin-right: 5px;
     }
     .iconweixin {
       color: lime;
     }
   }
 }
</style>
