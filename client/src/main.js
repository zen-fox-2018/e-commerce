import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const local = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.prototype.$http = local

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
