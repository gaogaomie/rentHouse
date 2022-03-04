<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      background="rgba(0,0,0,0)"
      :label="currentCity.label || 'b'"
      placeholder="请输入小区或地址"
      show-action
      v-model="value"
      @search="onSearch"
      arrow-down
      fixed
    >
      <van-icon
        slot="left-icon"
        name="arrow-down"
        @click="$router.push('/city')"
      ></van-icon>
      <template #action>
        <div @click="onSearch">
          <i class="iconfont icon-map" @click="$router.push('/area/map')"></i>
        </div>
      </template>
    </van-search>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="image in list" :key="image.id">
        <img
          :src="`http://liufusong.top:8080${image.imgSrc}`"
          style="width: 100%"
        />
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图 -->
    <div class="house">
      <div class="tubiao" @click="$router.push('/home/list')">
        <img src="@/assets/images/nav-1.png" alt="" />
        <div>整租</div>
      </div>
      <div class="tubiao" @click="$router.push('/home/list')">
        <img src="@/assets/images/nav-2.png" alt="" />
        <div>合租</div>
      </div>
      <div class="tubiao" @click="$router.push('/area/map')">
        <img src="@/assets/images/nav-3.png" alt="" />
        <div>地图找房</div>
      </div>
      <div class="tubiao" @click="$router.push('/rent/add')">
        <img src="@/assets/images/nav-4.png" alt="" />
        <div>去出租</div>
      </div>
    </div>
    <div class="title">
      <!-- style="margin-top:30px display:flex flex justify-content:space-between width:100%" -->
      <span style="font-size: 13px">租房小组</span>
      <span style="font-size: 13px">更多 </span>
    </div>
    <!-- 租房小组下面的图片 -->
    <div>
      <van-grid direction="horizontal" :column-num="2">
        <van-grid-item v-for="item in homeGroupsList" :key="item.id">
          <template #default>
            <img
              :src="`http://liufusong.top:8080${item.imgSrc}`"
              alt=""
              class="address"
            />
            <div class="text">
              <p>{{ item.title }}</p>
              <p>{{ item.desc }}</p>
            </div>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { swiper, homeGroups } from '@/api/home.js'

export default {
  name: 'Home',

  data() {
    return {
      list: [], //轮播图
      value: '', //输入框内容
      homeGroupsList: [], //租房小组信息
      currentCity: this.$store.state.currentCity, //vuex里面当前城市的数据
    }
  },
  created() {
    this.swiper()
    this.homeGroups()
  },
  methods: {
    // 轮播图请求
    async swiper() {
      try {
        let res = await swiper()
        this.list = res.data.body
      } catch (error) {
        console.log(error)
      }
    },

    // 租房小组信息
    async homeGroups() {
      let res = await homeGroups(this.currentCity.value)
      this.homeGroupsList = res.data.body
      console.log('租房小组信息')
    },
    // 输入框搜索
    onSearch() {
      console.log(this.value)
    },
  },
}
</script>

<style lang='less' scoped>
.van-search {
  position: fixed;
  width: 100%;
  height: 40px;
  top: 15px;
  z-index: 2;
}
.iconfont icon-map {
  font-size: 13px;
  color: #fff;
}
.title {
  background-color: rgb(246, 245, 246);
  // margin-top:30px;
  width: 100%;
  height: 20px;
  display: flex;
  text-align: center;
  justify-content: space-between;
  padding: 10px 0px;
  align-items: flex-end;
  span {
    margin: 0px 10px;
  }
}
.house {
  height: 87px;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-evenly;
  padding: 5px 0px;
  .tubiao {
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-content: center;
  }
  div {
    font-size: 12px;
    text-align: center;
  }
}
.house img {
  width: 100%;
  height: 100%;
}
.address {
  width: 50px;
  height: 50px;
  display: block;
  overflow: hidden;
}
.text {
  margin-left: 5px;
  p {
    font-size: 14px;
    color: #333;
    line-height: 0.3;
  }
}
/deep/ .van-search .van-search--show-action {
  position: fixed;
  width: 100%;
  height: 40px;
  top: 15px;
  z-index: 2;
}
/deep/.icon-map {
  color: #fff;
  font-size: 24px;
}
</style>