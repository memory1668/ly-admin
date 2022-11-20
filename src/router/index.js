import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index'

export const routes = [
  {
    path: '/',
    component: Layout,
    meta: { title: '首页', icon: 'el-icon-menu' },
    children: [{
      path: 'home',
      component: () => import('@/views/Home'),
      meta: { title: '首页', icon: 'el-icon-menu' }
    }]
  },
  {
    path: '/product-management',
    component: Layout,
    meta: { title: '商品管理', icon: 'el-icon-menu' },
    children: [{
      path: 'product-list',
      component: () => import('@/views/product-management/product-list'),
      meta: { title: '商品列表', icon: 'el-icon-menu' }
    }, {
      path: 'package-list',
      component: () => import('@/views/product-management/package-list'),
      meta: { title: '套餐列表', icon: 'el-icon-menu' }
    }]
  },
  {
    path: '/about',
    component: Layout,
    meta: { title: '关于', icon: 'el-icon-menu' },
    children: [{
      path: 'index',
      component: () => import('@/views/About'),
      meta: { title: '关于', icon: 'el-icon-menu' }
    }]
  }
]

Vue.use(Router)

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

const router = createRouter()

export default router
