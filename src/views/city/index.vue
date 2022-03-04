<template>
  <div>
    <van-nav-bar
      :fixed="true"
      :z-index="100"
      title="城市列表"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 自定义索引列表 -->
    <van-index-bar class="city-list" :index-list="indexList">
      <van-index-anchor
        v-for="(item, index) in cityList"
        :key="index"
        :index="index"
      >
        <span v-if="index === '#'">当前城市</span>
        <span v-else-if="index === '热'">热门城市</span>
        <span v-else>{{ index }}</span>
        <van-cell
          v-for="citem in item"
          :key="citem.value"
          :title="citem.label"
          @click="chooseCity(citem)"
        />
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>

<script>
import { getHotCity, getCityList } from '@/api/area'

export default {
  name: 'City',
  data() {
    return {
      currentCity: [this.$store.state.currentCity] || [
        {
          label: '北京',
          value: 'AREA|88cff55c-aaa4-e2e0',
          pinyin: 'beijing',
          short: 'bj',
        },
      ], // 当前城市
      indexList: [], // 右侧索引列表
      hotCityList: [], // 热门城市列表
      cityList: {}, // 城市
    }
  },
  created() {
    this.getCityList()
    this.getHotCity()
  },

  methods: {
    // 获取热门城市
    async getHotCity() {
      try {
        const {
          status,
          data: { body },
        } = await getHotCity()
        if (status === 200) {
          this.hotCityList = body
        }
      } catch (err) {
        this.$toast('获取热门城市失败~')
      }
    },
    // 获取城市列表
    async getCityList() {
      try {
        const {
          status,
          data: { body },
        } = await getCityList(1)
        if (status === 200) {
          // 处理右侧索引列表
          const tempArr = []
          body.forEach((item) => {
            let firstName = item.pinyin.substring(0, 1).toUpperCase()
            if (!tempArr.includes(firstName)) {
              tempArr.push(firstName)
            }
          })
          this.indexList = ['#', '热', ...tempArr.sort()]

          // 处理城市列表
          let city = {}
          this.indexList.forEach((item) => {
            city[item] = []
            body.forEach((val) => {
              let f = val.pinyin.substring(0, 1).toUpperCase()
              if (item === '热') {
                city[item] = this.hotCityList
              } else if (item === '#') {
                city[item] = this.currentCity
              } else if (f === item) {
                city[item].push(val)
              }
            })
          })
          this.cityList = city
        }
      } catch (err) {
        console.log(err)
        this.$toast('获取城市列表失败~')
      }
    },
    // 选择城市
    chooseCity(citem) {
      // 存储数据
      this.$store.commit('setCurrentCity', citem)
      // 跳转路由
      this.$router.back()
    },
  },
}
</script>

<style lang="less">
.van-index-anchor {
  font-size: 14px;
  padding: 10px 15px;
  color: #999;
}
.city-list {
  padding-top: 58px;
}
</style>
