<template>
  <div class="list-contain">
    <!-- 搜索框 -->
    <van-search
      background="rgba(33, 185, 122,1)"
      :label="currentCity.label"
      placeholder="请输入小区或地址"
      show-action
      v-model="value"
      arrow-down
      fixed
    >
      <van-icon
        slot="left-icon"
        name="arrow-down"
        @click="$router.push('/city')"
      ></van-icon>
      <template #left>
        <div @click="$router.back()">
          <i
            class="iconfont icon-back"
            style="font-size: 20px; color: #fff; padding-right: 10px"
          ></i>
        </div>
      </template>
      <template #action>
        <div @click="onSearch">
          <i
            class="iconfont icon-map"
            style="font-size: 24px; color: #fff"
            @click="$router.push('/area/map')"
          ></i>
        </div>
      </template>
    </van-search>
    <!-- 搜索框 -->
    <!-- 下拉选框 -->
    <van-dropdown-menu>
      <van-dropdown-item title="区域" ref="menu1">
        <van-picker
          show-toolbar
          value-key="label"
          title=" "
          :columns="houseLists"
          @confirm="onConfirmHandle"
          ref="picker"
        >
          <template #confirm>
            <van-button type="primary" @click="onConfirm1">确定</van-button>
          </template>
          <template #cancel>
            <van-button plain @click="onCancel1" type="primary"
              >取消</van-button
            >
          </template>
        </van-picker>
      </van-dropdown-item>
      <van-dropdown-item title="方式" ref="menu2">
        <van-picker
          show-toolbar
          value-key="label"
          title=" "
          :columns="conditionObj.rentType"
          confirm-button-text=" "
          cancel-button-text=" "
        >
          <template #columns-bottom>
            <div
              style="display:flex justify-content: space-between;"
              class="anniu"
            >
              <span class="cancel" @click="onConfirm2">取消</span>
              <span class="confirm" @click="onConfirm2">确定</span>
            </div>
          </template>
        </van-picker>
      </van-dropdown-item>
      <van-dropdown-item title="租金" ref="menu3">
        <van-picker
          show-toolbar
          value-key="label"
          title=" "
          :columns="conditionObj.price"
          confirm-button-text=" "
          cancel-button-text=" "
        >
          <template #columns-bottom>
            <div
              style="display:flex justify-content: space-between;"
              class="anniu"
            >
              <span class="cancel" @click="onConfirm3">取消</span>
              <span class="confirm" @click="onConfirm3">确定</span>
            </div>
          </template>
        </van-picker>
      </van-dropdown-item>
      <van-dropdown-item
        title="筛选"
        @open="show = true"
        overlay="false"
        ref="menu4"
      >
        <van-popup v-model="show" position="right" :style="{ height: '100%' }">
          <div class="room">
            <dl>
              <dt>户型</dt>
              <dd>
                <span
                  v-for="(item, index) in conditionObj.roomType"
                  :key="index"
                  :class="active.includes(item.value) ? 'active' : ''"
                  @click="handleClass(item.value)"
                  >{{ item.label }}</span
                >
              </dd>
              <van-divider />
              <dt>朝向</dt>
              <dd>
                <span
                  v-for="(item, index) in conditionObj.oriented"
                  :key="index"
                  :class="active.includes(item.value) ? 'active' : ''"
                  @click="handleClass(item.value)"
                  >{{ item.label }}</span
                >
              </dd>
              <van-divider />
              <dt>楼层</dt>
              <dd>
                <span
                  v-for="(item, index) in conditionObj.floor"
                  :key="index"
                  :class="active.includes(item.value) ? 'active' : ''"
                  @click="handleClass(item.value)"
                  >{{ item.label }}</span
                >
                <van-divider />
              </dd>

              <dt>房屋亮点</dt>
              <dd>
                <span
                  v-for="(item, index) in conditionObj.characteristic"
                  :key="index"
                  :class="active.includes(item.value) ? 'active' : ''"
                  @click="handleClass(item.value)"
                  >{{ item.label }}</span
                >
              </dd>
            </dl>
          </div>

          <div
            style="display:flex justify-content: space-between;"
            class="anniu"
          >
            <span class="cancel" @click="onConfirm4">清除</span>
            <span class="confirm" @click="onConfirm4">确定</span>
          </div>
        </van-popup>
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 下拉选框 -->
    <!-- 弹出层组件 -->
    <!-- 图片展示区域 -->
    <list-contain :conditionParams="conditionParams"></list-contain>
    <!-- 图片展示区域 -->
  </div>
</template>
<script>
import { searchHouseCondition } from '@/api/house.js'
import _ from 'lodash'
import ListContain from './components/ListContain.vue'

export default {
  components: { ListContain },
  name: 'list',
  data() {
    return {
      value: '', //输入框内容
      currentCity: this.$store.state.currentCity, //vuex里面当前城市的数据
      conditionObj: {}, //请求回来的所有数据存放点
      houseLists: [], //省市级三级联动数据
      show: false, //控制弹出层显示
      active: [], //控制样式
      conditionParams: {
        cityId: this.$store.state.currentCity.value,
        area: [],
        subway: '',
        rentType: '',
        price: '',
        more: '',
        roomType: '',
        oriented: '',
        characteristic: '',
        floor: '',
        start: 1,
        end: 30,
      },
    }
  },
  created() {
    this.searchHouseCondition()
  },
  methods: {
    onSearch() {
      console.log('onSearch')
    },
    // 关闭下拉选框 区域
    onConfirm1() {
      this.$refs.menu1.toggle()
    },
    onConfirmHandle(value, index) {
      console.log('picke选择器返回值', value, index)
    },
    onCancel1() {
      this.$refs.menu1.toggle()
    },
    // 关闭下拉选框 方式

    onConfirm2() {
      this.$refs.menu2.toggle()
    },
    // 关闭下拉选框 租金

    onConfirm3() {
      this.$refs.menu3.toggle()
    },
    // 关闭下拉选框 筛选

    onConfirm4() {
      this.$refs.menu4.toggle()
      this.show = false
    },
    //  获取子级城市的信息
    async searchHouseCondition() {
      try {
        let res = await searchHouseCondition(this.currentCity.value)
        console.log(this.currentCity)
        this.conditionObj = res.data.body
        // 地区信息
        this.houseLists = this.transformTree([
          _.cloneDeepWith(res.data.body.area),
          _.cloneDeepWith(res.data.body.subway),
        ])
      } catch (error) {
        console.log(error)
        this.$toast.fail('查询房屋信息失败')
      }
    },
    // 转化 添加children数组
    transformTree(arr) {
      arr.forEach((item) => {
        if (!item.children) {
          item.children = []
        } else {
          this.transformTree(item.children)
        }
      })
      return arr
    },
    // 处理样式
    handleClass(value) {
      if (this.active.includes(value)) {
        this.active = this.active.filter((item) => {
          return value !== item
        })
      } else {
        this.active.push(value)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.van-search {
  box-sizing: border-box;
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
.select-contain {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  div {
    font-size: 17px;
    span {
      color: #333333;
      margin-right: 5px;
    }
  }
  div:hover span,
  div:hover {
    color: #21b97a;
  }
}
.van-popup {
  z-index: 999;
  width: 265px;
  height: 100%;
  padding-left: 20px;
}
/deep/.van-dropdown-menu__bar--opened {
  z-index: 0 !important;
}
.room {
  font-size: 12px;
  dt {
    margin: 20px 0;
    font-size: 15px;
  }
  span {
    border: 1px solid #21b97a;
    display: inline-block;
    height: 32px;
    width: 70px;
    margin: 0 18px 15px 0;
    border: 1px solid #ddd;
    border-radius: 3px;
    line-height: 32px;
    text-align: center;
    font-size: 12px;
    color: #888;
  }
}
/deep/.active {
  border: 2px solid #21b97a;
  color: #21b97a;
  background-color: #defaef;
}
.van-picker__toolbar {
  display: flex;
  .van-picker__cancel {
    flex: 1;
  }
  .van-picker__confirm {
    flex: 2;
  }
}
/deep/.icon-map {
  color: #fff;
  font-size: 24px !important;
}
</style>
