import request from '@/utils/request'
/* 主页轮播图 */
export const swiper =() => {
  return request({
   url:'/home/swiper',
   method:'get',
  })
 }
 /* 租房小组 */
 export const homeGroups =(params) => {
  return request({
   url:'/home/groups',
   method:'get',
   params
  })
 }