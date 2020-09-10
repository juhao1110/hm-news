module.exports = {
  devServer: {
    // 自动开启浏览器
    open: true
  },
  // 合并覆盖webpack的配置参数
  configureWebpack: {
    // 排除依赖包
    externals: {
      // 参数1：排除的模块名
      // 参数2： 全局变量名
      vue: 'Vue',
      'vue-router': 'VueRouter',
      moment: 'moment',
      axios: 'axios'
    }
  }
}
