import 'vuetify/src/stylus/app.styl'
// main.js
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSwal from 'vue-swal'


Vue.use(VueSwal)
Vue.use(VueAxios, axios)


Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    primary: '#00bcd4',
      secondary: '#3f51b5',
      accent: '#ff5722',
      error: '#e91e63',
      warning:'#ffc107',
      info: '#03a9f4',
      success: '#4caf50'
  }
})