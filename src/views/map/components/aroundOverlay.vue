<template>
  <bm-overlay ref="customOverlay" class="around" pane="labelPane" @draw="draw">
    <div>
      <!-- div中的内容可自己调整 -->
      <p>{{ text.title }}</p>
      <p>{{ Math.ceil(text.initialPrice / 10000) }}万</p>
    </div>
  </bm-overlay>
</template>

<script>
export default {
  props: ['text', 'position', 'active'],
  watch: {
    position: {
      handler() {
        this.$refs.customOverlay.reload()
      },
      deep: true,
    },
  },
  methods: {
    draw({ el, BMap, map }) {
      const { lng, lat } = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      // 让周边房源气泡的中心和坐标对应上
      el.style.left = pixel.x - 61 + 'px'
      el.style.top = pixel.y - 18 + 'px'
    },
  },
}
</script>

<style lang="less" scoped>
.around {
  overflow: hidden;
  width: 122px;
  height: 36px;
  padding: 5px;
  box-shadow: 0 0 1px #bbb;
  background-color: rgba(58, 126, 255, 0.9);
  color: #fff;
  text-align: center;
  position: absolute;
  font-size: 12px;
  line-height: 13px;
  border-radius: 5px;
  box-sizing: border-box;

  div {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    justify-content: space-between;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
