import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'


Vue.use(Vuetify)
Vue.prototype.$axios = axios.create({
  baseURL: 'https://timecommercer-server.khevin.pro'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
