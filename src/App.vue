<template>
  <div id="app">
    <!-- keep-alive 被keep-alive包裹的组件都会被缓存下来，不会销毁，默认全部组件会缓存 -->
    <!-- include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
    exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
    max - 数字。最多可以缓存多少组件实例。 -->
    <!-- 如果某个组件需要被缓存，一定要给该组件提供name属性 -->
    <keep-alive include="index">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="less">
</style>
