import request from '@/utils/request'

/* 登录请求 */
export const searchHouseCondition =(id) => {
 return request({
  url:`/houses/condition?id=${id}`,
  method:'get'
 })
}

/* 条件筛选房屋 */

export const pickHouse =(params) => {
  return request({
   url:'/houses',
   method:'get',
   params

  })
 }

 /* 房屋具体信息 */
 export const findDetailHouse =(id) => {
  return request({
   url:`/houses/${id}`,
   method:'get',

  })
 }
 /* 房屋收藏列表 */
 export const collectHouse =() => {
  return request({
   url:'/user/favorites',
   method:'get',
  })
 }
 /* 房屋是否收藏 */
 export const isCollectHouse =(id) => {
  return request({
   url:`/user/favorites/${id}`,
   method:'get',
  })
 }
 /* 房屋添加收藏 */
 export const addCollect=(id) => {
  return request({
   url:`/user/favorites/${id}`,
   method:'post',
  })
 }
 /* 删除房屋收藏 */
 export const deleteCollect=(id) => {
  return request({
   url:`/user/favorites/${id}`,
   method:'delete',
  })
 }
 /* 房屋管理 */
 export const adminHouse =() => {
  return request({
   url:`/user/houses`,
   method:'get',
  })
 }

 /* 发布房源 */
 export const publishHouse =(data) => {
  return request({
   url:'/user/houses',
   method:'post',
   data
  })
 }