import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Layout from '@/layout/index'

/**
 * 静态路由，所有用户都会有的路由
 * @type {*[]}
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    meta: { title: '首页', icon: 'el-icon-menu' },
    children: [{
      path: 'home',
      component: Home,
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
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      meta: { title: '关于', icon: 'el-icon-menu' }
    }]
  }
]

Vue.use(Router)

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router
