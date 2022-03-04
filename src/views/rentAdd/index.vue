<template>
  <div class="rent-add">
    <!-- 标题 -->
    <van-nav-bar
      title="发布房源"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- 输入框 -->
    <!-- 小区名称 -->
    <van-field label="房源信息" />
    <van-field label="小区名称" @click="$router.push('/rent/search')">
      <template #extra>
        <span>{{ areaName || '请输入小区名称' }}></span>
      </template>
    </van-field>
    <!-- 租金 -->
    <van-field
      v-model="price"
      label="租金"
      placeholder="请输入租金/月"
      type="number"
    >
      <template #extra>
        <span>￥/月</span>
      </template>
    </van-field>
    <!-- 建筑面积 -->
    <van-field
      v-model="floorage"
      label="租金"
      placeholder="请输入建筑面积"
      type="number"
    >
      <template #extra>
        <span>m2</span>
      </template>
    </van-field>
    <!-- 户型 -->
    <van-field label="户型" @click="showRoomType = true">
      <template #extra> {{ roomType || '请选择' }} ></template>
    </van-field>
    <!-- 所在楼层 -->
    <van-field label="所在楼层" @click="showFloor = true">
      <template #extra> {{ roomFloor || '请选择' }} ></template>
    </van-field>
    <!-- 朝向 -->
    <van-field label="朝向" @click="showDirection = true">
      <template #extra> {{ direction || '请选择' }} ></template>
    </van-field>
    <!-- 房屋标题 -->
    <p>房屋标题</p>
    <van-field
      v-model="title"
      placeholder="请输入标题(例如:整租 小区名 2 室 5500元)"
    />
    <p>房屋图像</p>
    <van-uploader :after-read="afterRead" />
    <!-- 房屋配置 -->
    <p>房屋配置</p>
    <div class="deploy">
      <i class="iconfont icon-wardrobe">衣柜</i>
      <i class="iconfont icon-wash">洗衣机</i>
      <i class="iconfont icon-air">空调</i>
      <i class="iconfont icon-gas">天然气</i>
      <i class="iconfont icon-ref">冰箱</i>
    </div>
    <div class="deploy">
      <i class="iconfont icon-Heat">暖气</i>
      <i class="iconfont icon-vid">电视</i>
      <i class="iconfont icon-heater">热水器</i>
      <i class="iconfont icon-broadband">宽带</i>
      <i class="iconfont icon-sofa">沙发</i>
    </div>
    <p>房屋标题</p>
    <van-field v-model="description" placeholder="请输入房屋描述信息" />
    <!-- 户型弹出层 -->
    <van-popup
      v-model="showRoomType"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <picker
        :columns="roomTypes"
        @close="showRoomType = false"
        :type.sync="roomType"
      ></picker>
    </van-popup>
    <!-- 所在楼层 -->
    <van-popup v-model="showFloor" position="bottom" :style="{ height: '40%' }">
      <picker
        :columns="roomFloors"
        @close="showFloor = false"
        :type.sync="roomFloor"
      ></picker>
    </van-popup>
    <!-- 朝向 -->
    <van-popup
      v-model="showDirection"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <picker
        :columns="directions"
        @close="showDirection = false"
        :type.sync="direction"
      ></picker>
    </van-popup>
  </div>
</template>


<script>
import picker from './components/picker.vue'
export default {
  components: { picker },
  data() {
    return {
      areaName: '', //小区名称
      price: '', //租金
      floorage: '', //建筑面积
      roomTypes: ['一室', '二室', '三室', '四室', '四室+'], //户型
      roomType: '', //户型
      showRoomType: false, //户型弹出层
      roomFloors: ['高楼层', '中楼层', '低楼层'],
      roomFloor: '', //所在楼层
      showFloor: false, //所在楼层弹出层
      directions: ['东', '南', '西', '北', '东南', '东北', '西南', '西北'], //朝向
      direction: '', //朝向
      showDirection: false, //朝向
      title: '', //房屋标题
      description: '', //房屋描述
    }
  },
  created() {
    this.areaName = this.$route.params.communityName
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
  },
}
</script>

<style lang='less' scoped>
/deep/ .van-nav-bar {
  background-color: rgb(33, 185, 122);
  margin-bottom: 50px;
}
/deep/ .van-nav-bar__title,
/deep/.van-icon-arrow-left {
  color: #fff;
}
.rent-add {
  padding: 50px 0px;
}
p {
  font-size: 13px;
  padding-left: 10px;
}
.deploy {
  display: flex;
  justify-content: space-evenly;
  font-size: 14px;
  i {
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
    font-size: 15px;
    margin-bottom: 10px;
  }
}
</style>