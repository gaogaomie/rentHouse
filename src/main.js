/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router/index.js'
// 引入vuex组件
import store from '@/store/index'
Vue.config.productionTip = false
// vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
// 适配
import 'amfe-flexible'
// 引入样式
import './styles/fonts/iconfont.css'

// 引入百度地图
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'TMEH5hx5aVpclHY1Q1FUq1GfyXG7PFRn'
})

Vue.use(Vant);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
