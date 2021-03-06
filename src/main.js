// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import gt from './install'
import iView from 'iview'
import './filters'
import 'iview/dist/styles/iview.css'    // 使用 CSS

Vue.config.productionTip = false
Vue.use(iView)

Vue.use(gt)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
