import Vue from 'vue'
import Vuex from 'vuex'
// import axios from './scripts/axios.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    mutIsLogin (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    checkToken (context) {
      let token = localStorage.getItem('token')

      if (token) {
        context.commit('mutIsLogin', true)
      } else {
        context.commit('mutIsLogin', false)
      }
    }
  }
})
