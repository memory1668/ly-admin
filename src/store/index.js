import Vue from 'vue'
import Vuex from 'vuex'
import router, { routerList } from '@/router'

Vue.use(Vuex)

/**
 * 过滤路由作用域对应可访问的路由
 * @param routes
 * @param scope
 * @returns {Array}
 */
function filterScopeRoutes (routes, scope) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }

    // 过滤作用域
    if (tmp.scope !== scope) {
      return
    }

    if (tmp.children) {
      tmp.children = filterScopeRoutes(tmp.children, scope)
    }

    // 不显示没有子菜单的侧边栏
    if (tmp.children && tmp.children.length === 0) {
      return
    }

    res.push(tmp)
  })

  return res
}

export default new Vuex.Store({
  state: {
    // 当前选中的域名作用域（页面顶部菜单）
    routerScope: 'spm-home',
    // 当前用户角色可访问的域名作用域（页面顶部菜单列表）
    scopeList: [],
    // 当前用户可访问的路由集合
    routes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.routes = routes
    },

    SET_ROUTER_SCOPE: (state, scope) => {
      state.routerScope = scope
    }
  },
  actions: {
    /**
     * 点击顶部菜单栏，切换路由作用域
     * @param commit
     * @param scope
     * @param pushFirstRouter // 跳转到第一个路由
     * @param roles
     */
    changeRouterScope ({ commit }, { scope, pushFirstRouter }) {
      return new Promise(resolve => {
        const accessedRoutes = filterScopeRoutes(routerList, scope)

        commit('SET_ROUTES', accessedRoutes)
        commit('SET_ROUTER_SCOPE', scope)

        // 默认选中第一个动态路由元素
        if (pushFirstRouter && accessedRoutes.length > 0) {
          if (accessedRoutes[0].children && accessedRoutes[0].children.length > 0) {
            router.push(accessedRoutes[0].children[0].formatted_full_path)
          } else {
            router.push(accessedRoutes[0].path)
          }
        }

        resolve(accessedRoutes)
      })
    }
  },
  modules: {
  }
})
