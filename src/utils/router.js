/**
 * 展开路由作用域列表
 * @param listScopedRouters
 * @returns {{scopeList: Array, routerList: Array}}
 */
export const spreadListScopedRouters = (listScopedRouters) => {
  const scopeList = []
  let routerList = []

  listScopedRouters.forEach((scopedRouter) => {
    // 1.1 水平导航栏数据结构整理
    // 当子元素只有 1 个的时候，显示直接点击的菜单项
    // 子元素大于 1 个的时候，显示下拉列表
    if (scopedRouter.children && scopedRouter.children.length > 0) {
      if (scopedRouter.children.length === 1) {
        const child = scopedRouter.children[0]
        scopeList.push({
          name: child.name,
          meta: child.meta
        })
      } else {
        const group = {
          name: scopedRouter.name,
          meta: scopedRouter.meta,
          children: []
        }
        scopedRouter.children.forEach((item) => {
          group.children.push({
            name: item.name,
            meta: item.meta
          })
        })
        scopeList.push(group)
      }
    }

    // 2.1 解析所有子元素路由
    routerList = routerList.concat(spreadScopedRouters(scopedRouter))
  })

  return { scopeList, routerList }
}

/**
 * 展开作用域的路由配置
 * 备注：原对象的值会被修改
 * @param scopedRouter
 * @returns {Array}
 */
export const spreadScopedRouters = (scopedRouter) => {
  if (!scopedRouter) {
    throw new Error('作用域路由配置: scope 字段不能为空')
  }

  // 作用域路由的配置
  let routerList = []

  // 设置菜单 router 的 scope 字段
  if (scopedRouter.children && scopedRouter.children.length > 0) {
    scopedRouter.children.forEach((childScope) => {
      routerList = routerList.concat(setRouterScope(childScope))
    })
  }

  return routerList
}

/**
 * 设置每一项的元素的 scope 字段
 * @param scope
 * @returns {*}
 */
export const setRouterScope = (scope) => {
  scope.routers.forEach((item) => {
    formatRootEle(scope, item, '')
  })

  return scope.routers
}

/**
 * 设置一个路由配置项
 * @param scope
 * @param item
 * @param basePath
 */
const formatRootEle = (scope, item, basePath) => {
  // 1.1 设置 scope 字段
  item.scope = scope.name

  // 类似路径 path 一样，拼接 name, 例如： spm-platform:platform:index、spm-platform:platform:reserve
  // 2.1 重新设置 name 为 scope + ':{name}'
  if (item.name) {
    item.name = (item.virtual_scope_name ? item.virtual_scope_name : scope.name) + ':' + item.name
  } else {
    item.name = (item.virtual_scope_name ? item.virtual_scope_name : scope.name) + ':' + item.path.replace('/', '-')
  }

  // 3.1 组合item的完整路径
  let formattedFullPath = ''
  if (basePath) {
    if (item.path) {
      if (item.path.indexOf('/') === 0) {
        formattedFullPath = item.path
      } else {
        formattedFullPath = (basePath === '/' ? '' : basePath) + '/' + item.path
      }
    }
  } else {
    basePath = item.path
    formattedFullPath = basePath
  }

  item.formatted_full_path = formattedFullPath
  if (item.children) {
    item.children.forEach((childItem) => {
      childItem.virtual_scope_name = item.name
      formatRootEle(scope, childItem, basePath)
    })
  }
}
