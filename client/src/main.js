import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'
import moment from 'moment'

Vue.use(Vuetify)
Vue.use(BootstrapVue)
Vue.use(VueMaterial)
Vue.config.productionTip = false
Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('dddd, MMMM D YYYY')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
