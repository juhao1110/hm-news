<template>
  <div class="user">
     <div class="header" @click="$router.push('/edit')">
         <div class="avatar">
           <!-- 数据中的是相对定位，要拼接基地址,动态绑定 -->
            <img :src="$axios.defaults.baseURL+info.head_img">
         </div>
         <div class="info">
             <div class="name">
                 <span v-if="info.gender === 1" class="iconfont iconxingbienan"></span>
                 <span v-else class="iconfont iconxingbienv"></span>
                 <span>{{info.nickname}}</span>
            </div>
             <div class="time">{{info.create_date | time}}</div>
         </div>
         <div class="arrow">
             <span class="iconfont iconjiantou1"></span>
         </div>
     </div>
     <!-- 导航条 -->
     <!-- 父传子  把跳转的页面传给子组件(to是自定义属性) -->
     <hm-navitem to="/follow">
       <template>我的关注</template>
       <template  #content>关注的用户</template>
     </hm-navitem>
     <hm-navitem >
       <template>我的跟帖</template>
       <template  #content>跟帖/回复</template>
     </hm-navitem>
     <hm-navitem >
       <template>我的收藏</template>
       <template  #content>文章/视频</template>
     </hm-navitem>
     <hm-navitem to="/edit">
       <template>设置</template>
     </hm-navitem>
    <!-- 退出按钮 -->
    <div class="logout" @click="logout">
      <van-button type="primary" size="large">退出</van-button>
    </div>
  </div>
</template>

<script>
export default {
  // 数据加载完成就要发送请求获取个人信息
  async created () {
    // 因为在main.js写了请求拦截器中添加了token的请求头，所以以下注释掉
    // 获取个人信息的时候，需要传递userId和token
    // token必须放在请求头中，请求头中的 Authorization(授权)
    // const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`, {
      // 设置请求头
      // headers: {
      //   Authorization: token
      // }
    })
    // console.log(res.data)
    const { statusCode, data } = res.data
    // 如果请求成功就把请求数据赋值给定义的info（方便渲染）
    if (statusCode === 200) {
      this.info = data
    }
  },
  data () {
    return {
      info: ''
    }
  },
  methods: {
    // 因为请求有失败的情况，点击取消就是请求失败，如果没有捕捉就会报错，所以用try...catch捕捉异常
    // try 里面是可能请求失败的请求，catch 里面是失败的处理逻辑
    async  logout () {
      try {
        // 点击退出，跳出确认框
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '是否确定退出登录'
        })
        // 点击确认就是请求成功，确认退出
        // 清除token和userId
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        // 提示退出成功
        this.$toast.success('退出成功')
        // 返回到登录页面
        this.$router.push('/login')
      } catch {
        // 提示取消退出
        this.$toast('取消退出')
      }
    }
  }
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
      .iconxingbienan {
        padding-right: 5px;
        color: rgb(128, 187, 228);
      }
      .iconxingbienv {
        padding-right: 5px;
        color: pink;
      }
      .time {
        padding-top: 10px;
        color: #666;
      }
    }
  }
  .logout {
    padding: 20px;
  }
}
</style>
