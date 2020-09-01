<template>
  <div class="user-edit">
      <hm-header>编辑资料</hm-header>
      <div class="avatar">
          <img :src="$axios.defaults.baseURL + user.head_img" alt="">
          <!-- 上传组件，可修改头像 -->
          <van-uploader :after-read="afterRead" />
      </div>
      <hm-navitem @click="showNickname">
          <template>昵称</template>
          <template #content>{{user.nickname}}</template>
      </hm-navitem>
      <hm-navitem @click="showPassword">
          <template>密码</template>
          <template #content>******</template>
      </hm-navitem>
      <hm-navitem @click="showGender">
          <template>性别</template>
          <template #content>{{user.gender === 0 ? "女" : "男"}}</template>
      </hm-navitem>
      <!-- 修改昵称的修改框 -->
      <van-dialog v-model="isNickNameShow" title="编辑昵称" show-cancel-button @confirm="updateNickname">
        <!-- field输入框 ref可以给一个DOM对象或者组件添加一个引用（标记） -->
        <van-cell-group>
          <van-field v-model="nickname" ref="nickname" />
        </van-cell-group>
      </van-dialog>
      <!-- 修改密码的修改框 -->
      <van-dialog v-model="isPasswordShow" title="编辑密码" show-cancel-button @confirm="updatePassword">
        <!-- field输入框 -->
        <van-cell-group>
          <van-field v-model="password" ref="password"/>
        </van-cell-group>
      </van-dialog>
      <!-- 修改性别的修改框 -->
      <van-dialog v-model="isGenderShow" title="编辑性别" show-cancel-button @confirm="updateGender">
        <van-radio-group v-model="gender">
          <!-- Cell和CellGroup组件 -->
          <van-cell-group>
            <van-cell title="女" clickable @click="gender = 0">
              <template #right-icon>
                <van-radio :name="0" />
              </template>
            </van-cell>
            <van-cell title="男" clickable @click="gender = 1">
              <template #right-icon>
                <van-radio :name="1" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-dialog>
      <!-- 截取图片的组件 -->
      <div class="mask" v-show="isShowMask">
        <van-button type="primary" class="crop" @click="crop">裁剪</van-button>
        <van-button type="danger" class="cancel" @click="cancel">取消</van-button>
        <VueCropper
        ref="cropper"
        :img="img"
        autoCrop
        autoCropWidth="100"
        autoCropHeight="100"
        fixed>
        </VueCropper>
      </div>
  </div>
</template>

<script>
// 引入截图插件
import { VueCropper } from 'vue-cropper'
export default {
  created () {
    // 渲染页面
    this.getUserInfo()
  },
  components: {
    VueCropper
  },
  data () {
    return {
      user: '',
      // 隐藏昵称修改框
      isNickNameShow: false,
      nickname: '',
      isPasswordShow: false,
      password: '',
      isGenderShow: false,
      gender: '',
      isShowMask: false,
      img: ''
    }
  },
  methods: {
    // 封装 渲染页面的请求
    async  getUserInfo () {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) this.user = data
    },
    // 封装 更改信息的请求
    async updateUser (data) {
      // 点确认时，发送请求更改昵称
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      if (res.data.statusCode === 200) {
        // 重新渲染页面
        this.getUserInfo()
        // 提示更改成功
        this.$toast.success('更改成功')
      }
    },
    async  showNickname () {
      // 显示修改框
      this.isNickNameShow = true
      // 回显昵称
      this.nickname = this.user.nickname
      // 点击修改框，自动聚焦 已经用ref标记了要聚焦的组件，用this.$refs.标记名来获取
      // 但是页面数据更新完，DOM要下一次才更新，所以用this.$nextTick()
      // 等待页面更新
      await this.$nextTick()
      // 用this.$refs.标记名来获取，并调用方法聚焦
      this.$refs.nickname.focus()
    },
    updateNickname () {
      this.updateUser({ nickname: this.nickname })
    },
    async  showPassword () {
      // 显示修改框
      this.isPasswordShow = true
      // 回显密码
      this.password = this.user.password
      // 等待DOM更新
      await this.$nextTick()
      // 修改密码框自动聚焦
      this.$refs.password.focus()
    },
    updatePassword () {
      this.updateUser({ password: this.password })
    },
    showGender () {
      // 显示修改框
      this.isGenderShow = true
      this.gender = this.user.gender
    },
    updateGender () {
      this.updateUser({ gender: this.gender })
    },
    // 封装函数，判断上传的类型
    isImg (name) {
      if (name.endsWith('.gif') || name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg')) {
        return true
      } else {
        return false
      }
    },
    // 文件上传完毕触发该回调函数
    async  afterRead (file) {
      // 此时可以自行将文件上传至服务器  file.file
      // console.log(file.file)
      // 发送请求先限制图片大小和格式，如果满足才上传，不满足就提示
      if (!this.isImg(file.file.name)) {
        // 不是图片
        return this.$toast.fail('上传图片格式不正确')
      }
      if (file.file.size >= 20 * 1024) {
        return this.$toast.fail('图片过大')
      }
      // 符合显示截图框
      this.isShowMask = true
      // 设置截取的图片 (base64格式的)
      this.img = file.content
    },
    // 点击取消按钮
    cancel () {
      // 截取框隐藏
      this.isShowMask = false
    },
    // 点击截图按钮
    crop () {
      // 内置方法 通过this.$refs.cropper 调用
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob(async info => {
      // do something
        // console.log(info)
        // 发送请求，上传文件
        // 如果是通过ajax上传文件，请求体不能直接是一个普通对象，必须是一个formData对象
        const fd = new FormData()
        // 把需要发送的信息追加到fs实例对象中
        fd.append('file', info)
        const res = await this.$axios.post('/upload', fd)
        // console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          // 把发送修改头像请求（之前已封装）
          this.updateUser({
            head_img: data.url
          })
        }
        // 隐藏截取框
        this.isShowMask = false
      })
    }
  }
}
</script>

<style lang="less" scoped >
.user-edit {
    .avatar {
        position: relative;
        padding: 40px 0;
        text-align: center;
        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
        // 上传组件的样式
        .van-uploader {
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translate(-50%);
          width: 100px;
          height: 100px;
          opacity: 0;
        }
    }
    // 深度选择器，能够覆盖组件动态生成的子元素的样式
    /deep/ .van-dialog__content {
      padding: 20px;
      .van-field {
        border: 1px solid #ccc;
      }
    }
    .mask {
      position: fixed;
      z-index: 999;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .crop,
      .cancel {
        position: fixed;
        top: 0;
        z-index: 999;
      }
      .cancel {
        right: 0;
      }
    }
}

</style>
