import Vue from 'vue'
import Vuex from 'vuex'
import axios from './scripts/axios.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: '',
    carts: [],
    registerMessage: '',
    showModalLogin: false,
    showModalRegister: false
  },
  mutations: {
    mutationLogin (state, payload) {
      state.isLogin = payload
      state.user = localStorage.getItem('user')
    },
    mutationRegister (state, payload) {
      state.registerMessage = payload
    },
    mutationShowLogin (state, payload) {
      state.showModalLogin = payload
    },
    mutationShowRegister (state, payload) {
      state.showModalRegister = payload
    },
    mutationFetchCart (state, payload) {
      state.carts = payload
    },
    mutationAddToCarts (state, payload) {
      state.carts.push(payload)
    }
  },
  actions: {
    checkToken (context) {
      let token = localStorage.getItem('token')
      if (token) {
        context.commit('mutationLogin', true)
      } else {
        context.commit('mutationLogin', false)
      }
    },
    dologin ({ commit, dispatch }, data) {
      axios.post('/login', data)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', data.userId)
          dispatch('checkToken')
        })
        .catch(({ response: { data } }) => {
          console.log(data.message)
        })
    },
    doregister ({ commit }, payload) {
      axios.post('/register', payload)
        .then(({ data }) => {
          commit('mutationRegister', { snackbar: true, message: 'Great! Please login now', color: 'success' })
        })
        .catch(({ response: { data: { error: { errors } } } }) => {
          // console.log()
          commit('mutationRegister', { snackbar: true, message: `Oops! Something wrong. ${errors.email.message}`, color: 'error' })
        })
    },
    doLogout ({ commit, dispatch }) {
      localStorage.removeItem('token')
      dispatch('checkToken')
    },
    showRegisterModal ({ commit }) {
      commit('mutationShowRegister', true)
    },
    showLoginModal ({ commit }) {
      commit('mutationShowLogin', true)
    },
    fetchCart ({ commit }) {
      axios.get('/carts', { headers: {
        token: localStorage.getItem('token')
      }
      })
        .then(({ data }) => {
          // console.log(data)
          commit('mutationFetchCart', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    addToCart ({ commit, dispatch }, payload) {
      axios.post(`/carts`, payload, { headers: {
        token: localStorage.getItem('token')
      }
      })
        .then(({ data }) => {
          // console.log(data, 'cart--------')
          dispatch('fetchCart')
        })
        .catch(({ response }) => {
          console.log(response, 'errrrrr')
        })
    },
    removeCart ({ commit, dispatch }, payload) {
      // console.log(payload,"id cart")
      axios.delete(`/carts/${payload}`, { headers: {
        token: localStorage.getItem('token')
      }
      })
        .then(({ data }) => {
          // console.log(data, 'cart--------')
          dispatch('fetchCart')
        })
        .catch(({ response }) => {
          console.log(response, 'errrrrr')
        })
    }
  }
})
