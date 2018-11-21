import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },

  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home'
      }
    ]
  },
  {
    path: '/member',
    name: 'member',
    meta: {
      notCache: true,
      showAlways: true,
      icon: 'md-contact',
      title: '会员管理'
    },
    component: Main,
    children: [
      {
        path: 'memberList',
        name: 'memberList',
        meta: {
          notCache: true,
          icon: 'md-search',
          title: '会员查询'
        },
        component: () => import('@/view/member/memberList.vue')
      },
      {
        path: 'memberEdit',
        name: 'memberEdit',
        meta: {
          hideInMenu: true,
          notCache: true,
          icon: 'md-add-circle',
          title: '编辑会员'
        },
        component: () => import('@/view/member/memberEdit.vue')
      }
    ]
  },
  {
    path: '/company',
    name: 'company',
    meta: {
      notCache: true,
      showAlways: true,
      icon: 'md-bookmarks',
      title: '单位管理'
    },
    component: Main,
    children: [
      // {
      //   path: 'companyList',
      //   name: 'companyList',
      //   meta: {
      //     notCache: true,
      //     icon: 'md-search',
      //     title: '单位查询'
      //   },
      //   component: () => import('@/view/company/companyList.vue')
      // },
      {
        path: '/companyList',
        name: 'companyList',
        meta: {
          title: '单位查询',
          icon: 'md-search',
          notCache: true
        },
        component: () => import('@/view/page/company_search.vue')
      },
      {
        path: '/companyEdit',
        name: 'companyEdit',
        meta: {
          hideInMenu: true,
          notCache: true,
          icon: 'md-add-circle',
          title: '编辑单位'
        },
        component: () => import('@/view/company/companyEdit.vue')
      }
    ]
  },
  {
    path: '/sethrdata',
    name: 'set_hr_data',
    meta: {
      notCache: true,
      showAlways: true,
      icon: 'md-bookmarks',
      title: 'HR数据导入'
    },
    component: Main,
    children: [
      {
        path: 'sethrexcel',
        name: 'sethrexcel',
        meta: {
          notCache: true,
          icon: 'md-search',
          title: 'hr数据导入'
        },
        component: () => import('@/view/excel/upload-excel.vue')
      }

    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
