module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 设置vant按需加载的配置
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
