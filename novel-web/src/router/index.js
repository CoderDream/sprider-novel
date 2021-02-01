import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 解决重复点击导航路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRoutes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index/index'),
    hidden: true
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test')
  }, {
    path: '/chapter',
    name: 'chapter',
    component: () => import('@/views/chapter/Chapter')
  }, {
    path: '/read',
    name: 'read',
    component: () => import('@/views/read/Read')
  }, {
    path: '/search_list',
    name: 'search',
    component: () => import('@/views/searchlist/SearchList')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test')
  },
  {
    path: '/novelShelf',
    name: 'novelShelf',
    component: () => import('@/views/novelShelf/index')
  }

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
