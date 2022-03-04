import request from '@/utils/request'
/* 根据城市名称查询该城市信息 */
export const cityInfo =(params) => {
  return request({
   url:'/area/info',
   method:'get',
   params
  })
 }
 /* 获取城市列表数据 */
 export const getCityList =(level) => {
  return request({
   url:`/area/city?level=${level}`,
   method:'get',
  })
 }
 /* 热门城市 */
 export const getHotCity =() => {
  return request({
   url:'/area/hot',
   method:'get',
  })
 }

 /* 获取子级城市列表 */

 export const getChildCity =(id) => {
  return request({
   url:`/area?id=${id}`,
   method:'get',
  })
 }
 /* 地图找房  查询房源数据 */
 export const findMapSearchHouse =(id) => {
  return request({
   url:`/area/map?id=${id}`,
   method:'get',
  })
 }
 /* 搜索小区 */
 export const searchCommunity =(params) => {
  return request({
   url:'area/community',
   method:'get',
   params
  })
 }