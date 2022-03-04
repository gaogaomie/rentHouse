<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item name="home" icon="home-o" to="/home"
        >首页</van-tabbar-item
      >
      <van-tabbar-item name="list" icon="search" to="/home/list"
        >找房</van-tabbar-item
      >
      <van-tabbar-item name="news" icon="newspaper-o" to="/home/news"
        >资讯</van-tabbar-item
      >
      <van-tabbar-item name="my" icon="manager-o" to="/home/my"
        >我的</van-tabbar-item
      >
    </van-tabbar>
    <!-- /标签导航栏 -->
  </div>
</template>

<script>
export default {}
</script>

<style>
.layout-container {
  padding-bottom: 50px;
}
</style>