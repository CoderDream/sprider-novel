import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制面板', icon: 'dashboard' }
    }]
  },
  {
    path: '/page',
    component: Layout,
    meta: { title: '页面配置', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'page',
        component: () => import('@/views/page/index'),
        meta: { title: '页面配置', icon: 'education' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },
  {
    path: '/novel',
    component: Layout,
    children: [
      {
        path: 'novel',
        name: 'novel',
        component: () => import('@/views/novel/index'),
        meta: { title: '小说管理', icon: 'eye' }
      }
    ]
  },
  {
    path: '/novel_spider_config',
    component: Layout,
    name: '爬虫管理',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/novel_spider/index'),
        meta: { title: '爬虫管理', icon: 'bug' }
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'novel',
        component: () => import('@/views/novel/index'),
        meta: { title: '日志管理', icon: 'edit' }
      }
    ]
  },
  {
    path: '/recommend',
    component: Layout,
    children: [
      {
        path: 'recommend',
        name: 'recommend',
        component: () => import('@/views/novel/index'),
        meta: { title: '推荐管理', icon: 'excel' }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    children: [
      {
        path: 'message',
        name: 'message',
        component: () => import('@/views/novel/index'),
        meta: { title: '站长私信', icon: 'email' }
      }
    ]
  },
  {
    path: '/ad',
    component: Layout,
    children: [
      {
        path: 'ad',
        name: 'ad',
        component: () => import('@/views/novel/index'),
        meta: { title: '广告管理', icon: 'money' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
