import request from '@/utils/request'

/* 登录请求 */
export const login =(data) => {
 return request({
  url:'/user/login',
  method:'post',
  data
 })
}

/* 获取用户的信息资料 */
export const getUserInfo =() => {
  return request({
   url:'/user',
   method:'get',

  })
 }