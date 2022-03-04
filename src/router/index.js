import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout'
import Home from '@/views/home'
import News from '@/views/news'
import List from '@/views/list'
import My from '@/views/my'

Vue.use(VueRouter)
const router=new VueRouter({
routes:[
{path:'/',redirect:'/home'},
  {path:'/login',name:'Login',component:Login},
  {path:'/home',component:Layout, name: 'layout',
children:[{path:'',component:Home, name: 'home'},
{path:'list',component:List, name: 'list'},
{path:'news',component:News, name: 'news'},
{path:'my',component:My, name: 'my'}]},
{path:'/city',name:'City',component:() =>import('@/views/city')} ,
{path:'/detail/:id', name: 'Detail',component:()=>import('@/views/detail')},
{path:'/area/map',component:()=>import('@/views/map'), name: 'Map'},
{path:'/favorate',component:()=>import('@/views/favorate'), name: 'favorate'},
{path:'/rent',component:()=>import('@/views/rent'), name: 'rent'},
{path:'/loading',component:()=>import('@/views/loading'), name: 'loading'},
{path:'/rent/add',component:()=>import('@/views/rentAdd'), name: 'rentAdd'},
{path:'/rent/search',component:()=>import('@/views/rentSearch'), name: 'rentSearch'},

]
})

export default router

