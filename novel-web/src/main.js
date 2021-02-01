import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import App from './App.vue'
import router from './router'
import './icons/iconfont.css'
import store from './store'
import VueJsonp from 'vue-jsonp'

Vue.use(VueJsonp)
Vue.config.productionTip = false
import Base64 from '@/utils/base64Util'

Vue.prototype.$Base64 = Base64
Vue.use(ElementUI)
new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
