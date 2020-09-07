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
      <div class="buttons">
        <div class="good" @click="like" :class="{active : post.has_like}">
          <span class="iconfont icondianzan"></span>
          <span>{{post.like_length || 0}}</span>
        </div>
        <div class="share">
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
    <!-- 评论 -->
    <div class="comment_list">
      <h3>精彩跟帖</h3>
      <!-- 评论组件 -->
      <hm-comment :comment="comment" v-for="comment in commentList" :key="comment.id"></hm-comment>
    </div>
    <!-- 文本域形式的底部（写评论的） -->
    <div class="footer-textarea" v-if="isShowTextarea">
      <textarea  :placeholder="'回复：'+ this.nickname" ref="textarea" v-model="content"></textarea>
      <van-button type="primary" @click="publish">发送</van-button>
    </div>
    <!-- 文本框形式的底部 -->
    <div class="footer-input" v-else>
      <div class="search">
        <input type="text" placeholder="回复" @focus="onFocus">
      </div>
      <span class="iconfont iconpinglun-"><i>{{post.comment_length}}</i></span>
      <span class="iconfont iconshoucang" :class="{now: post.has_star}" @click="star"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    // 请求文章详情
    this.getInfo()
    // 请求评论详情
    this.getCommentList()
    // 给bus 注册发布评论事件,获得回复id和要回复的昵称
    this.$bus.$on('reply', async (id, nickname) => {
      console.log('bus', id, nickname)
      // 显示评论框
      this.isShowTextarea = true
      // 等待DOM更新
      await this.$nextTick()
      // 评论框自动获得焦点
      this.$refs.textarea.focus()
      // 赋值回显
      this.replyId = id
      this.nickname = '@' + nickname
    })
  },
  destroyed () {
    // 离开页面销毁bus的reply事件
    this.$bus.$off('reply')
  },
  data () {
    return {
      post: {
        // 为了防止一开始没有加载到数据，所以先给user空对象
        user: {}
      },
      commentList: '',
      isShowTextarea: false,
      // 评论的内容
      content: '',
      // 要回复的id
      replyId: '',
      // 要回复的昵称
      nickname: ''
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
    noLogin () {
      // 判断是否登录的封装函数
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
        // 代表没有登录
        return true
      } else {
        // 代表登录了
        return false
      }
    },
    async follow () {
      // 判断是否登录,如没有登录就return掉
      if (this.noLogin()) return
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
    },
    async like () {
      // 先判断是否登录
      if (this.noLogin()) return
      // 登录了发送请求点赞
      const res = await this.$axios.get(`/post_like/${this.post.id}`)
      console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast(message)
        // 重新渲染
        this.getInfo()
      }
    },
    async star () {
      // 是否登录
      if (this.noLogin()) return
      // 发送请求
      const res = await this.$axios.get(`/post_star/${this.post.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast(message)
        // 重新渲染
        this.getInfo()
      }
    },
    async getCommentList () {
      // 请求评论详情
      // 获得文章id
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
      }
    },
    async onFocus () {
      // input获得焦点就显示出textarea输出框
      this.isShowTextarea = true
      // 等DOM更新
      await this.$nextTick()
      // 让textarea自动获得焦点
      this.$refs.textarea.focus()
    },
    async publish () {
      // 发送发布评论请求
      // 判断是否登录,如没有登录就return掉
      if (this.noLogin()) return
      // 评论非空判断
      if (!this.content) {
        this.$toast('评论不能为空')
        this.isShowTextarea = false
        return
      }
      // 登录了就发送请求
      const res = await this.$axios.post(`/post_comment/${this.post.id}`, {
        content: this.content,
        parent_id: this.replyId
      })
      // console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        // 重新渲染文章数据和评论数据
        this.getCommentList()
        this.getInfo()
        // 清空文本域内容
        this.content = ''
        // 清空回复的id
        this.replyId = ''
        // 清空要回复的昵称
        this.nickname = ''
        // 隐藏文本域
        this.isShowTextarea = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.post-detail {
  padding-bottom: 50px;
}
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
  border-bottom: 3px solid #ccc;
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
   .active {
     border-color: red;
     color: red;
   }
 }
}
.comment_list {
  h3 {
    text-align: center;
    padding: 10px 0;
    font-size: 16px;
  }
}
.footer-input {
  background-color: #fff;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  align-items: center;
  padding: 0 10px;
  .iconfont {
    font-size: 24px;
  }
  .now {
    color: red;
  }
  .iconpinglun- {
    position: relative;
    i {
      position: absolute;
      right: -5px;
      top: 0;
      background-color: red;
      font-size: 10px;
      color: #fff;
      padding: 0 3px;
      border-radius: 5px;
      font-style: normal;
    }
  }
  .search {
    width: 180px;
    padding-right: 10px;
    input {
      height: 30px;
      background-color: #ddd;
      border-radius: 15px;
      width: 100%;
      border: none;
      font-size: 14px;
      padding-left: 20px;
    }
  }
}
.footer-textarea {
  display: flex;
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  z-index: 999;
  padding: 10px;
  align-items: flex-end;
  background-color: #fff;
  border-top: 1px solid #ccc;
  justify-content: space-around;
  textarea {
    width: 260px;
    height: 80px;
    background-color: #ccc;
    border-radius: 5px;
    border: none;
    padding: 10px;
    font-size: 14px;
    // 禁止拖动
    resize: none;
  }
}
</style>
