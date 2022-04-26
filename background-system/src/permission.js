import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration


router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  const hasUserInfo = store.getters.user;  // 获取本地用户信息

  if (to.meta.auth) {
    if (hasUserInfo) {
      // 本地仓库有用户信息，放行
      next();
    } else {
      // 没有用户信息，看下是否有token
      const token = localStorage.getItem('adminToken');
      if (token) {
        // 有token，还需要判断token有效性(根据token发送请求)
        try {
          await store.dispatch('user/getInfo');
          next();
        } catch (error) {
          // token无效
          await store.dispatch('user/resetToken');
          Message.error('登录过期，请重新登录');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      } else {
        // 没有token
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  } else {
    // 访问的页面不需要权限
    if (to.path === '/login' && hasUserInfo) {
      // 目前是已登录的状态，还去登录页面，则跳到首页
      next({ path: '/' })
    } else {
      next();
    }
    NProgress.done();
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
