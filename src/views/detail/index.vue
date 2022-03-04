<template>
  <div class="detail-contain">
    <!-- 标题 -->
    <van-nav-bar
      :title="houseInfo.community"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- 轮播图 -->
    <!--     <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in houseInfo.houseImg" :key="index"
        ><img :src="`http://liufusong.top:8080${item.houseImg}`" alt="" />{{
          item.houseImg
        }}</van-swipe-item
      >
    </van-swipe> -->
    <van-swipe :autoplay="3000" class="my-swipe">
      <van-swipe-item v-for="(image, index) in houseInfo.houseImg" :key="index">
        <img :src="`http://liufusong.top:8080${image}`" />
      </van-swipe-item>
    </van-swipe>
    <!-- tag部分 -->
    <div class="tag">
      <p>{{ houseInfo.title }}</p>
      <van-tag
        type="success"
        v-for="(item, index) in houseInfo.tags"
        :key="index"
        >{{ item }}</van-tag
      >
    </div>
    <van-divider />
    <!-- 租金 房型 面积 -->
    <div class="rent">
      <div class="text">
        <span class="top">{{ houseInfo.price }}/月</span>
        <span class="bottom">租金</span>
      </div>
      <div class="text">
        <span class="top">{{ houseInfo.roomType }}</span>
        <span class="bottom">房型</span>
      </div>
      <div class="text">
        <span class="top">{{ houseInfo.size }}</span>
        <span class="bottom">面积</span>
      </div>
    </div>
    <van-divider />
    <!-- 装修，楼层，朝向，类型 -->
    <div class="type">
      <div class="floor">
        <span>装修： 精装</span>
        <span
          >朝向：<span
            v-for="(item, index) in houseInfo.oriented"
            :key="index"
            >{{ item }}</span
          ></span
        >
      </div>
      <div class="floor">
        <span> 楼层：{{ houseInfo.floor }}</span> <span>类型：普通住宅</span>
      </div>
    </div>
    <van-divider />
    <!-- 小区 -->
    <div class="village">
      <p>小区:天山星城</p>
      <img src="" alt="" />
      <p>房屋配套</p>
      <van-divider />
      <i>洗衣机</i>
      <i>空调</i>
    </div>
    <div class="tabbar">
      <div class="contain" style="color: #999999" @click="onCollectHandle">
        <van-icon name="star-o" :class="{ star: isFavorite }" />
        收藏
      </div>
      <div class="contain" style="color: #999999">在线咨询</div>
      <div class="contain" style="background-color: rgb(33, 185, 122)">
        电话预约
      </div>
    </div>
  </div>
</template>

<script>
import {
  findDetailHouse,
  isCollectHouse,
  addCollect,
  deleteCollect,
} from '@/api/house.js'
export default {
  name: 'Detail',
  data() {
    return {
      houseInfo: {}, //房屋信息
      isFavorite: false, //是否被收藏
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
  },
  created() {
    this.findDetailHouse()
    this.isCollectHouse()
  },
  methods: {
    // 1.房屋具体信息
    async findDetailHouse() {
      this.$toast.loading({
        message: '加载中.......',
        duration: 0,
      })
      try {
        let res = await findDetailHouse(this.id)
        console.log('房屋具体信息', res.data.body)
        this.houseInfo = res.data.body
      } catch (error) {
        this.$toast.fail('房屋信息更新失败')
      }
      this.$toast.clear()
    },

    // 2.房屋是否被收藏
    async isCollectHouse() {
      this.$toast.loading({
        message: '加载中.......',
        duration: 0,
      })
      try {
        let res = await isCollectHouse(this.houseInfo.houseCode)
        this.isFavorite = res.data.body.isFavorite
        this.$toast.clear()
      } catch (error) {
        this.$toast.fail('房屋收藏信息更新失败!')
      }
    },
    // 3.添加或者删除收藏
    async onCollectHandle() {
      try {
        if (!this.isFavorite) {
          let res = await addCollect(this.houseInfo.houseCode)
          this.$toast.success('已添加至收藏')
          // 更新视图
          this.isFavorite = true
        } else {
          let res = await deleteCollect(this.houseInfo.houseCode)
          this.$toast.success('已删除收藏')
          // 更新视图
          this.isFavorite = false
        }
      } catch (error) {
        this.$toast.fail('添加收藏失败!')
      }
    },
  },
}
</script>

<style lang='less' scoped>
.detail-contain {
  box-sizing: border-box;
  padding-bottom: 60px;
  padding-top: 45px;
}
/deep/ .van-nav-bar {
  background-color: rgb(33, 185, 122);
}
/deep/ .van-nav-bar__title,
/deep/.van-icon-arrow-left {
  color: #fff;
}
.my-swipe .van-swipe-item {
  width: 100%;
  height: 252px;
  img {
    width: 100%;
    height: 100%;
  }
  /* color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed; */
}
.tag {
  width: 100%;
  height: 80px;
  font-size: 16px;
  padding: 10px 0px 0px 15px;
  box-sizing: border-box;
  p {
    color: #333 !important;
  }
}
.rent {
  display: flex;
  justify-content: space-evenly;
  .text {
    display: flex;
    flex-direction: column;
    // align-content: center;
    align-items: center;
  }
  .top {
    color: #fa5741;
    font-size: 18px;
    font-weight: 600;
  }
  .bottom {
    font-size: 14px;
  }
}
.type {
  width: 100%;
  height: 80px;
  font-size: 13px;
  color: #333333;
  box-sizing: border-box;
  padding: 5px;
  .floor {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: space-evenly;
    padding-left: 20px;
    span {
      flex: 1;
    }
  }
}
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #cecece;
  text-align: center;
  font-size: 17px;
  color: #999;
  background-color: #fff;
  display: flex;
  // height: 50px;
  // justify-content: space-evenly;
  .contain {
    width: 33%;
    height: 50px;
    text-align: center;
    box-sizing: border-box;
    border: 2px solid rgb(234, 234, 235);
  }
}
.village {
  width: 100%;
  img {
    display: block;
    background-color: #bfa;
    width: 375px;
    height: 145px;
  }
}
.tabbar[data-v-3316eea4] {
  color: #fff;
}
.star {
  color: #fa5741;
}
</style>