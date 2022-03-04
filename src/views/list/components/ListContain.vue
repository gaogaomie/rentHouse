<template>
  <div>
    <div
      class="house-box"
      v-for="(item, index) in houseLists"
      :key="index"
      @click="onDetailHandle(item.houseCode)"
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
import { pickHouse } from '@/api/house.js'
export default {
  name: 'ListContain',
  data() {
    return {
      houseLists: [], //房屋信息请求回来的数据
    }
  },
  props: ['conditionParams'],
  created() {
    this.pickHouse()
  },
  methods: {
    onDetailHandle(id) {
      this.$router.push({
        name: 'Detail',
        params: {
          id: id,
        },
      })
    },
    // 发送筛选房屋请求
    async pickHouse() {
      this.$toast.loading({
        message: '加载中.......',
        duration: 0,
      })
      try {
        let res = await pickHouse(this.conditionParams)
        console.log(res.data.body)
        this.houseLists = res.data.body.list
        this.$toast.clear()
      } catch (error) {
        this.$toast.fail('房屋筛选失败')
      }
    },
  },
}
</script>

<style scoped lang="less">
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
</style>