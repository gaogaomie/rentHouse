<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <van-list>
      <van-cell
        v-for="item in list"
        :key="item.area"
        :title="item.communityName"
        @click="onSearchHandle(item)"
      />
    </van-list>
  </div>
</template>

<script>
import { searchCommunity } from '@/api/area.js'
export default {
  data() {
    return {
      value: '', //关键词
      list: [],
      loading: false,
      finished: false,
      id: this.$store.state.currentCity.value,
    }
  },
  methods: {
    async onSearch(val) {
      this.$toast.loading({
        message: '加载中',
        duration: 0,
      })
      try {
        let res = await searchCommunity({
          name: val,
          id: this.id,
        })
        this.list = res.data.body
        if (this.list.length) {
          this.$toast.clear()
        } else {
          this.$toast('查询无数据,请重新输入')
        }
      } catch (error) {
        this.$toast.fail('查询失败!')
      }
    },
    onCancel() {
      Toast('取消')
    },
    onSearchHandle(item) {
      this.$router.push({
        name: 'rentAdd',
        params: item,
      })
    },
  },
}
</script>

<style>
</style>