import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast/index.js'

Vue.use(toast)
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false
//事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
