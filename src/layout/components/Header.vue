<template>
  <div>
    <div class="header">
      <div class="header-box">
        <a href="javascript:void(0)">
          <div class="logo-box">
            <img class="logo-img" src="http://file-lianyubao.oss-cn-hangzhou.aliyuncs.com/media/20220111/e98942177eea719d6d796b321ff8be81.png" alt="">
            <div class="logo-text-box">
              <div class="logo-text">连娱宝</div>
            </div>
          </div>
        </a>

        <div class="menu-container">
          <el-menu
            :default-active="activeHeaderMenuIndex"
            class="header-el-menu"
            mode="horizontal"
            @select="handleSelect"
          >
            <template v-for="scope in scopeList">
              <!--判断菜单是否要展开-->
              <el-menu-item v-if="!scope.children || scope.children.length === 0" :key="scope.name" :index="scope.name">
                <div v-if="scope.name !== 'generate' || env === 'development'" slot="title" class="menu-title">
                  <i v-if="scope.meta.icon" :class="scope.meta.icon" style="margin-right: 0;" />
                  <span>{{ scope.meta.title }}</span>
                </div>
              </el-menu-item>
              <el-submenu v-else :key="scope.name" :index="scope.name" :show-timeout="0" :hide-timeout="50">
                <template slot="title">
                  <i :class="scope.meta.icon" /> {{ scope.meta.title }}
                </template>
                <el-menu-item v-for="sub in scope.children" :key="sub.name" :index="sub.name">
                  <i :class="sub.meta.icon" /> {{ sub.meta.title }}
                </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>

        </div>

        <div class="header-userinfo">
          张三
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { scopeList } from '@/router'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      env: process.env.NODE_ENV,
      activeHeaderMenuIndex: 'spm-system',
      isUserInfoRightIconDown: true,

      keyword: '',

      // 切换酒吧
      dialogChangeVisible: false,
      merchants: [],
      scopeList: scopeList
    }
  },
  computed: {
    ...mapState([
      'routerScope'
    ])
  },
  watch: {
    /**
       * 监听当前 active 的作用域路由（顶部菜单），当发生变更时，修改顶部菜单激活的元素
       */
    routerScope () {
      this.activeHeaderMenuIndex = this.routerScope
    }
  },
  mounted () {
    // 初始化头部菜单栏选中
    this.activeHeaderMenuIndex = this.routerScope
  },
  methods: {
    handleSelect (selectedIndex) {
      // 选中当前的菜单，直接返回
      if (this.routerScope === selectedIndex) {
        return
      }
      this.$store.dispatch('changeRouterScope', {
        scope: selectedIndex,
        pushFirstRouter: true
      }).then(() => {
        console.log('selectedIndex: ', selectedIndex, 'routerScope: ', this.routerScope)
      })
    }
  }
}
</script>
<style lang="scss">
  .header .el-menu--horizontal .el-submenu .el-submenu__title {
    border-bottom: none !important;
    height: 33px;
    line-height: 33px;
  }

  .header .el-menu {
    background-color: transparent;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/variables.scss';
  .header {
    height: 50px;
    width: 100%;
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
    box-shadow: 0 0 5px rgba(0, 0, 0, .08);

    .header-box {
      height: 50px;
      width: 100%;
      display: flex;
      flex-direction: row;

      .header-userinfo {
        margin-top: 15px;
        margin-right: 15px;
      }
    }

    .logo-box {
      display: flex;
      flex-direction: row;
      padding: 6px 10px 0;
      margin-right: 0px;
      margin-top: 2px;

      .logo-img {
        width: 32px;
        height: 32px;
        border-radius: 4px;
      }

      .logo-text-box {
        margin-left: 8px;

        .edition-label {
          transform: scale(0.7);
          display: flex;
          margin-left: -9px;
          margin-top: -2px;
        }
      }

      .logo-text {
        color: white;
        font-size: 14px;
        font-weight: bold;
        //letter-spacing: 1px;
      }

    }

    .menu-container {
      flex: 1;
      .el-menu.el-menu--horizontal {
        border: none;
      }
    }

    .search-box {
      width: 280px;
      margin-left: 20px;
      padding-top: 9px;
    }

    .header-el-menu {
      margin-left: 20px;
      padding-top: 8px;

      .el-menu-item {
        border-bottom: none !important;
      }
    }

    &.dark {
      background-color: #0F0C3A;

      .logo-box {
        .logo-img {
          //border: 1px solid rgba(255, 255, 255, 0);
        }
        .logo-text {
          color: rgba(255, 255, 255, .75)!important;
        }

      }

      .header-username ,
      .icon-user-info {
        color: rgba(255, 255, 255, .75);
      }
    }
  }

  .header .el-menu--horizontal > .el-menu-item.is-active,
  .header-el-menu .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
    border-bottom: none !important;
  }

  .header .el-menu--horizontal > .el-menu-item {
    height: 33px;
    line-height: 33px;
    margin-right: 5px;
    i {
      font-size: 16px;
    }

    /*color: #666 !important;*/
    padding: 0 10px;
    border-radius: 3px;
    color: $color-theme-text-dark-light !important;
    i {
      color: $color-theme-text-dark-light !important;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.15);

      //color: rgba(255, 255, 255, 0.75) !important;
      //i {
      //  color: rgba(255, 255, 255, 0.75) !important;
      //}
    }

  }

  .header.dark .el-menu--horizontal > .el-menu-item {

    /*color: #666 !important;*/
    padding: 0 10px;
    border-radius: 3px;
    color: rgba(255, 255, 255, 0.75) !important;
    i {
      color: rgba(255, 255, 255, 0.75) !important;
    }

    &:hover {
      //background-color: rgba(255, 255, 255, 0.15);

      color: white !important;
      i {
        color: white !important;
      }
    }
  }

  .header .el-menu--horizontal > .el-menu-item.is-active {
    /*font-weight: bold;*/
    border-radius: 3px;

    //background-color: rgba(255, 255, 255, 0.15);
    //background-color: rgba(255, 0, 137, .06);
    font-weight: bold;
    color: $color-theme !important;
    i {
      color: $color-theme !important;
    }

    &:focus {
      background-color: rgba(255, 255, 255, 0.15);
    }
    &:hover {
      i {
        color: $color-theme !important;
      }
      color: $color-theme !important;
    }
  }

  .header.dark .el-menu--horizontal > .el-menu-item.is-active {
    color: white !important;
    i {
      color: white !important;
    }

    &:focus {
      background-color: rgba(255, 255, 255, 0.15);
    }
    &:hover {
      i {
        color: white !important;
      }
      color: white !important;
    }
  }

  /*头部用户信息*/
  .header-userinfo {
    /*position: absolute;*/
    /*top: 0;*/
    /*right: 0;*/
    height: 50px;
    /*min-width: 200px;*/
    /*max-width: 300px;*/
  }

  .menu-userinfo {
    float: right;
    margin-top: 18px;
    margin-right: 15px;
  }

  .header-avatar {
    display: inline-block;
    vertical-align: middle;
    width: 25px;
    height: 25px;
    border-radius: 15px;
    margin-right: 5px;
  }

  .header-username {
    display: inline-block;
    vertical-align: middle;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #333;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .website {
    text-align: right;
    padding: 10px;
    a {
      color: #333;
      font-size: 14px;
      margin: auto 10px;
    }
    a:hover {
      color: #333;
    }
  }

  .icon-user-info {
    display: inline-block;
    font-size: 12px;
  }

  .logo-text {
    color: #333 !important;
  }

  .merchant-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 15px;
  }

  .merchant-item {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-basis: 250px;
    margin-right: 15px;
    margin-bottom: 15px;
    padding: 15px;
    border: 1px solid #efefef;
    border-radius: 5px;
    overflow: hidden;
    &.active {
      border: 1px solid $color-theme;
      background-color: $color-bg;
    }

    &:hover {
      border: 1px solid $color-theme;
      cursor: pointer;
    }

    .beata-text {
      position: absolute;
      top: 7px;
      right: 2px;
      z-index: 99;
      font-size: 12px;
      transform: rotate(45deg);
      color: white;
    }

    .top-rate-triangle {
      width: 0;
      height: 0;
      border-top: 40px solid $color-theme;
      border-left: 40px solid transparent;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 99;
    }
  }

  .merchant-avatar {
    width: 32px;
    height: 32px;
    border-radius: 5px;
  }

  .merchant-info {
    margin-left: 15px;

    .merchant-name {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 5px;
      margin-top: 5px;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

</style>
