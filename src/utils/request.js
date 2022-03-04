import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
import axios from 'axios'
import store from '@/store'
import router  from '@/router/index'
import { removeItem } from '@/utils/storage';
const HOUSETOKEN='house_token'
// 创建一个axios实例
const instance=axios.create({
  baseURL:' http://liufusong.top:8080/'
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //并不是所有的请求，都需要添加token，也并不是所有的请求发送之前就有了token
  //作出判断，是否有token
const {token}=store.state.user
if(token){
  config.headers.Authorization=`${token}`
}
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.data.status!==200){
    Toast.fail(response.data.description)
    return Promise.reject(new Error(response.data.description));
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  if(error.response.status===400){
    // 1.提示信息
   Toast.fail(error.response.description)
   //不在组件里面，不要用this
  //  2.本地token失效了，删除
  removeItem(HOUSETOKEN)
   //在工具里面 要引入并且大写
  //  3.跳转到登录页
  router.push('/login')
  }else{
    Toast.fail(error.response.body.description)
  }
  return Promise.reject(error);
});

export default instance