import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {getUserId} from "@/api/user"
require('@/styles/index.css')
Vue.config.productionTip = false
Vue.use(Element)

import fabricAction from '@/common/js/fabric_action'
Vue.prototype.fabricAction=fabricAction
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted(){
  	getUserId(this)
  }
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})