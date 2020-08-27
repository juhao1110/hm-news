module.exports = {
  plugins: {
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    // 设置1rem的大小
    // 1rem大小需要设置为37.5，并且量出来的大小也要 / 2
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
