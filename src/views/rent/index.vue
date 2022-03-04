x<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar
      title="房屋管理"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <div
      class="house-box"
      v-for="(item, index) in adminHouseLists"
      :key="index"
      @click="$router.push('/loading')"
    >
      <!-- 房子图片 -->
      <div class="img-box">
        <van-image
          width="106"
          height="80"
          fit="cover"
          :src="`http://liufusong.top:8080${item.houseImg}`"
        />
      </div>
      <!-- 房子信息 -->
      <div class="info-box">
        <h2 class="h-box3">{{ item.title }}</h2>
        <h4 class="s-box1">{{ item.desc }}</h4>
        <span class="h-box1" v-for="(i, p) in item.tags" :key="p">{{ i }}</span>
        <h4 class="h-box2"><span>2800</span> 元/月</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { adminHouse } from '@/api/house.js'
export default {
  name: 'rent',
  data() {
    return {
      adminHouseLists: [], //房屋管理请求回来的数据
    }
  },
  created() {
    this.adminHouse()
  },
  methods: {
    // 房屋收藏
    async adminHouse() {
      this.$toast.loading({
        message: 'loading......',
        duration: 0,
      })
      try {
        let res = await adminHouse()
        console.log('房屋管理', res.data)
        this.adminHouseLists = res.data.body
      } catch (error) {
        console.log('房屋管理', error)
      }
      this.$toast.clear()
    },
  },
}
</script>

<style scoped lang="less">
/deep/ .van-nav-bar {
  background-color: rgb(33, 185, 122);
}
/deep/ .van-nav-bar__title,
/deep/.van-icon-arrow-left {
  color: #fff;
}
.house-box {
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 10px 0 20px 0;
  .img-box {
    margin-right: 10px;
  }
  .info-box {
    .s-box1 {
      color: rgb(156, 156, 156);
      margin: 2px 0;
    }
    .h-box1 {
      color: #39becd;
      background: #e1f5f8;
      font-size: 14px;
      font-weight: 400;
      margin: 3px;
    }
    .h-box2 {
      color: #fa5741;
      font-size: 14px;
      margin: 3px;
      span {
        color: #fa5741;
        font-size: 20px;
      }
    }
    .h-box3 {
      margin: 0;
    }
  }
  h2 {
    font-size: 20px;
  }
}
.info-box {
  font-size: 15px;
  color: #394043;
}
.house-box {
  margin-top: 50px;
}
</style>
  