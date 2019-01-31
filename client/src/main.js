import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  data() {
    return {
      cart:[]
    }
  },
  render: h => h(App),
  watch: {
    '$route': function(value) {

      }
    }
}).$mount('#app')
