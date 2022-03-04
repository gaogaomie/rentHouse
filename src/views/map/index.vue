<template>
  <div id="index">
    <van-nav-bar title="地图找房" left-arrow @click-left="$router.back()" />
    <baidu-map
      class="map"
      :center="center"
      :zoom="zoom"
      @ready="handler"
      :scroll-wheel-zoom="true"
      @zoomend="syncCenterAndZoom"
    >
      <bm-boundary
        v-if="showBoundary"
        :name="zoneBoundary"
        :strokeWeight="2"
        strokeColor="blue"
        fillColor="skyblue"
        :fillOpacity="0.4"
      ></bm-boundary>
      <div v-if="showZone">
        <ZoneOverlay
          v-for="(item, index) in zoneGeoPoints"
          :key="index"
          :position="{ lng: item.coord.longitude, lat: item.coord.latitude }"
          :text="item"
          :class="zoneIndex === index ? 'active' : ''"
          @mouseover.native="selectZone(item, index)"
          @mouseleave.native="cancelZone"
        >
          >
        </ZoneOverlay>
      </div>
    </baidu-map>
  </div>
</template>

<script>
import { findMapSearchHouse } from '@/api/area.js'
import ZoneOverlay from './components/zone-overlay.vue'
export default {
  name: 'Map',
  components: { ZoneOverlay },
  data() {
    return {
      initCity: this.$store.state.currentCity.label, //初始化城市
      center: { lng: 0, lat: 0 },
      zoom: 0,
      id: this.$store.state.currentCity.value, //城市id
      zoneGeoPoints: [], //请求回来的数据
      zoneIndex: '',
      showZone: 11, //泡泡出现的等级
      showBoundary: false, //边缘出现
    }
  },
  async created() {
    try {
      let res = await findMapSearchHouse(this.id)
      this.zoneGeoPoints = res.data.body
    } catch (error) {
      this.$toast.fail('获取地图数据失败')
    }
  },
  mounted() {},
  methods: {
    handler({ BMap, map }) {
      map.centerAndZoom(`${this.initCity}`, 11) // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    },
    // 双向绑定 zoom
    // ZOOMBOUNDARY 为常量，表示区域气泡消失或显示的 zoom 临界值
    // const ZOOMBOUNDARY = 15
    syncCenterAndZoom(e) {
      const ZOOMBOUNDARY = 15
      this.zoom = e.target.getZoom()
      this.showZone = this.zoom < ZOOMBOUNDARY
    },
    selectZone(item, index) {
      this.zoneBoundary = `${this.posCity}${item.name}` // 行政区名字，只供参考
      this.showBoundary = true
    },
    cancelZone() {
      this.zoneBoundary = ''
      this.showBoundary = false
    },
  },
}
</script>
<style lang="less" scoped>
.map {
  width: 500px;
  height: 500px;
}
div.map,
.BMap_mask {
  position: absolute;
  left: 0px;
  top: 45px;
  z-index: 9;
  overflow: hidden;
  user-select: none;
  width: 375px;
  height: 622px;
}
.van-nav-bar {
  background-color: rgb(33, 185, 122);
}
/deep/.van-nav-bar__title {
  color: #fff;
}
/deep/ .van-icon-arrow-left::before {
  color: #fff;
}
div.zone:hover {
  z-index: 99;
  background-color: red !important;
  color: #fff;
}
</style>
