<template>
  <div class="rent-add">
    <!-- 标题 -->
    <van-nav-bar
      title="发布房源"
      left-arrow
      @click-left="$router.push('/home')"
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
      <template #extra> {{ roomType.label || '请选择' }} ></template>
    </van-field>
    <!-- 所在楼层 -->
    <van-field label="所在楼层" @click="showFloor = true">
      <template #extra> {{ roomFloor.label || '请选择' }} ></template>
    </van-field>
    <!-- 朝向 -->
    <van-field label="朝向" @click="showDirection = true">
      <template #extra> {{ direction.label || '请选择' }} ></template>
    </van-field>
    <!-- 房屋标题 -->
    <p>房屋标题</p>
    <van-field
      v-model="title"
      placeholder="请输入标题(例如:整租 小区名 2 室 5500元)"
    />
    <p>房屋图像</p>
    <div class="imgHouse" @click="$refs.inputFile.click()">
      <van-image class="avatar" fit="cover" round :src="photo" />
      <input type="file" hidden ref="inputFile" @change="inputChange" />
      <van-icon name="plus"></van-icon>
    </div>
    <!-- 房屋配置 -->
    <p>房屋配置</p>
    <!-- 
    <van-grid :border="false" :column-num="5">
      <van-grid-item text="衣柜">
        <template #icon>
          <i class="iconfont icon-wardrobe"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="洗衣机">
        <template #icon>
          <i class="iconfont icon-wash"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="空调">
        <template #icon>
          <i class="iconfont icon-air"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="天然气">
        <template #icon>
          <i class="iconfont icon-gas"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="冰箱">
        <template #icon>
          <i class="iconfont icon-ref"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="暖气">
        <template #icon>
      <i class="iconfont icon-Heat"></i>

        </template>
      </van-grid-item>
      <van-grid-item text="电视">
        <template #icon>
      <i class="iconfont icon-vid"></i>

        </template>
      </van-grid-item>
      <van-grid-item text="热水器">
        <template #icon>
            <i class="iconfont icon-heater"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="宽带">
        <template #icon>
          <i class="iconfont icon-wardrobe"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="沙发">
        <template #icon>
             <i class="iconfont icon-sofa"></i>
        </template>
      </van-grid-item>
    </van-grid> -->

    <div class="deploy" @click="iconHandle">
      <i
        class="iconfont icon-wardrobe"
        :style="{ color: supporting.includes('衣柜') ? 'red' : 'black' }"
        >衣柜</i
      >
      <i
        class="iconfont icon-wash"
        :style="{ color: supporting.includes('洗衣机') ? 'red' : 'black' }"
        >洗衣机</i
      >
      <i
        class="iconfont icon-air"
        :style="{ color: supporting.includes('空调') ? 'red' : 'black' }"
        >空调</i
      >
      <i
        class="iconfont icon-gas"
        :style="{ color: supporting.includes('天然气') ? 'red' : 'black' }"
        >天然气</i
      >
      <i
        class="iconfont icon-ref"
        :style="{ color: supporting.includes('冰箱') ? 'red' : 'black' }"
        >冰箱</i
      >
    </div>
    <div class="deploy" @click="iconHandle">
      <i
        class="iconfont icon-Heat"
        :style="{ color: supporting.includes('暖气') ? 'red' : 'black' }"
        >暖气</i
      >
      <i
        class="iconfont icon-vid"
        :style="{ color: supporting.includes('电视') ? 'red' : 'black' }"
        >电视</i
      >
      <i
        class="iconfont icon-heater"
        :style="{ color: supporting.includes('热水器') ? 'red' : 'black' }"
        >热水器</i
      >
      <i
        class="iconfont icon-broadband"
        :style="{ color: supporting.includes('宽带') ? 'red' : 'black' }"
        >宽带</i
      >
      <i
        class="iconfont icon-sofa"
        :style="{ color: supporting.includes('沙发') ? 'red' : 'black' }"
        >沙发</i
      >
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
    <div class="anniu">
      <span class="cancel" @click="$router.back()">取消</span>
      <span class="confirm" @click="btnOk">确定</span>
    </div>
  </div>
</template>


<script>
import picker from './components/picker.vue'
import { publishHouse } from '@/api/house.js'
export default {
  components: { picker },
  data() {
    return {
      areaName: '', //小区名称
      price: '', //租金
      floorage: '', //建筑面积
      roomTypes: this.$store.state.conditionObj.roomType, //户型
      roomType: '', //户型
      showRoomType: false, //户型弹出层
      roomFloors: this.$store.state.conditionObj.floor, //楼层
      roomFloor: '', //所在楼层
      showFloor: false, //所在楼层弹出层
      directions: this.$store.state.conditionObj.oriented, //朝向
      direction: '', //朝向
      showDirection: false, //朝向
      title: '', //房屋标题
      description: '', //房屋描述
      photo: '', //图片地址
      supporting: [], //图标
    }
  },
  created() {
    this.areaName = this.$route.params.communityName
  },
  methods: {
    // 图片处理
    inputChange() {
      // 获取文件对象
      const file = this.$refs.inputFile.files[0]
      // 获取blob数据
      this.photo = window.URL.createObjectURL(file)
      //  清缓存
      this.$refs.inputFile.value = ''
    },
    //确定
    async btnOk() {
      const formData = new FormData()
      formData.append('photo', blob)
      try {
        let res = await publishHouse({
          title: this.title,
          description: this.description,
          houseImg: formData,
          oriented: this.direction.value,
          supporting: this.supporting.join('|'),
          price: this.price,
          roomType: this.roomType.value,
          size: this.floorage,
          floor: this.roomFloor.value,
          community: this.$route.params.community,
        })
        console.log(res)
      } catch (error) {
        console.dir(error)
      }
      this.$router.push('/home')
    },
    iconHandle(e) {
      if (this.supporting.includes(e.target.innerHTML)) {
        this.supporting = this.supporting.filter((item) => {
          return e.target.innerHTML !== item
        })
      } else {
        console.log(e.target.innerHTML)
        this.supporting.push(e.target.innerHTML)
      }

      console.log('事件对象', this.supporting)
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
  width: 100%;
  height: 45px;
  display: flex;
  font-size: 14px;
  i {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-content: center;
    text-align: center;
    font-size: 15px;
    margin-bottom: 10px;
  }
}
.anniu {
  display: flex;
  width: 100%;
  .cancel {
    flex: 1;
    text-align: center;
    border-radius: 0;
    color: #21b97a;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
  }
  .confirm {
    flex: 2;
    text-align: center;
    background-color: #21b97a;
    height: 50px;
    line-height: 50px;
    color: #fff;
    font-size: 18px;
  }
}
div.imgHouse {
  height: 50px !important;
  width: 50px !important;
  border: 2px dashed #333333;
  margin-left: 10px;
  text-align: center;
  line-height: 50px;
}
.active {
  color: rgb(33, 185, 122);
}
</style>