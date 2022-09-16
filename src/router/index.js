import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Layout from '@/layout/index'
import store from '@/store'
import { spreadListScopedRouters } from '@/utils/router'

Vue.use(Router)

/**
 * 判断要跳转的路由路径属于哪个路由作用域
 * @param path 路由路径
 * @param routers 路由配置列表
 * @returns {string}
 */
const getScope = (path, routers) => {
  let scope = ''
  for (const item of routers) {
    if (item.formatted_full_path && path === item.formatted_full_path) {
      scope = item.scope
      break
    }

    if (item.children) {
      scope = getScope(path, item.children)
      if (scope) {
        break
      }
    }
  }
  return scope
}

/**
 * 首页路由作用域配置
 */
const scopedRouterHome = {
  name: 'group-spm-home',
  meta: { title: '首页', icon: 'el-icon-menu' },

  children: [{
    name: 'spm-home',
    meta: { title: '首页', icon: 'el-icon-menu' },

    routers: [{
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
      path: '/about',
      component: Layout,
      meta: { title: '关于', icon: 'el-icon-menu' },
      children: [{
        path: 'index',
        component: () => import('../views/About.vue'),
        meta: { title: '关于', icon: 'el-icon-menu' }
      }]
    }]
  }]
}

/**
 * 进销存路由作用域配置
 */
const scopedRouterWarehouse = {
  name: 'group-spm-warehouse',
  meta: { title: '进销存', icon: 'el-icon-menu' },

  children: [{
    name: 'spm-warehouse',
    meta: { title: '进销存', icon: 'el-icon-menu' },

    routers: [
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
      }]
  }]
}

/**
 * 数据分析路由作用域配置
 */
const scopedRouterStat = {
  name: 'group-spm-stat',
  meta: { title: '数据分析', icon: 'el-icon-menu' },

  children: [{
    name: 'spm-stat-goods',
    meta: { title: '商品分析', icon: 'el-icon-menu' },

    routers: [
      {
        path: '/stat-goods',
        component: Layout,
        meta: { title: '商品分析', icon: 'el-icon-menu' },
        children: [{
          path: 'index',
          component: () => import('@/views/stat/goods/index'),
          meta: { title: '商品分析', icon: 'el-icon-menu' }
        }]
      }]
  }, {
    name: 'spm-stat-user',
    meta: { title: '用户分析', icon: 'el-icon-menu' },

    routers: [
      {
        path: '/stat-user',
        component: Layout,
        meta: { title: '用户分析', icon: 'el-icon-menu' },
        children: [{
          path: 'index',
          component: () => import('@/views/stat/user/index'),
          meta: { title: '用户分析', icon: 'el-icon-menu' }
        }]
      }]
  }]
}

/**
 * 路由作用域列表
 */
const listScopedRouters = [
  scopedRouterHome,
  scopedRouterWarehouse,
  scopedRouterStat
]
/**
 * 从路由作用域列表解析出作用域列表scopeList和路由列表routerList
 */
const { scopeList, routerList } = spreadListScopedRouters(listScopedRouters)

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: routerList
})

const router = createRouter()

router.beforeEach(async (to, from, next) => {
  // 修改顶部菜单栏
  const routerScope = getScope(to.path, routerList)
  await store.dispatch('changeRouterScope', { scope: routerScope })
  next()
})

export {
  scopeList,
  routerList
}
export default router
