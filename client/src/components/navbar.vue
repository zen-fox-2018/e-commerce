<template>
  <v-toolbar
    color="orange"
    dark
    m-3
  >
    <v-img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Sign_language_Y.svg/2000px-Sign_language_Y.svg.png" max-width="55"></v-img>
    <v-btn flat @click="move('/')">
      Kandang-Literasi
    </v-btn>

    <v-spacer></v-spacer>

    <v-menu
      bottom
      origin="center center"
      transition="scale-transition"
      v-if="isLogin"
    >
      <v-btn
        slot="activator"
        flat
        icon
        dark
      >
        <v-icon>shopping_cart</v-icon>
      </v-btn>

      <v-list>
        <v-list-tile
          v-for="(item, i) in cart.items"
          :key="i"
          style="min-width:20vw"
        >
          <v-layout align-center style="margin-right:3vw">
            <v-btn flat icon @click="remove(item.product._id)">
              <v-icon color="red">delete</v-icon>
            </v-btn>
            <v-list-tile-title>{{ item.product.title }}</v-list-tile-title>
            <v-layout align-center>
              <v-btn flat icon @click="min(item.product._id)" v-if="item.total > 1">
                <strong>-</strong>
              </v-btn>
              <div><Strong>{{ item.total }}</Strong></div>
              <v-btn flat icon @click="plus(item.product._id)">
                <strong>+</strong>
              </v-btn>
            </v-layout>
          </v-layout>
        </v-list-tile>
        <v-layout align-center justify-space-around>
          <v-btn flat color="orange" @click="checkout">Checkout</v-btn>
          <div>Total: <strong>${{ total }}</strong></div>
        </v-layout>
      </v-list>
    </v-menu>

    <v-btn icon @click="move('/login')" v-if="!isLogin">
      <v-icon>perm_identity</v-icon>
    </v-btn>

    <v-btn icon v-if="isLogin" @click="logout">
      <v-icon>logout</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import server from '@/server/server'

export default {
  name: 'navbar',
  props: ['isLogin', 'cart'],
  data () {
    return {
      total: 0
    }
  },
  methods: {
    move: function (direction) {
      this.$router.push(direction)
    },
    checkout: async function () {
      try {
        await server.delete(`/cart/${this.cart._id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        swal('Chekouted!', 'yuhuuuuuuuuu', 'success')
        this.$emit('checkCart')
      } catch ({ response }) {
        console.error(response)
        swal('Internal error', 'error')
      }
    },
    plus: async function (id) {
      try {
        await server.put(`/cart/total/${this.cart._id}`, {
          product: id,
          total: 1
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        this.$emit('checkCart')
      } catch ({ response }) {
        console.error(response)
        swal('Internal server error', 'error')
      }
    },
    min: async function (id) {
      try {
        await server.put(`/cart/total/${this.cart._id}`, {
          product: id,
          total: -1
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        this.$emit('checkCart')
      } catch ({ response }) {
        console.error(response)
        swal('Internal server error', 'error')
      }
    },
    logout: async function () {
      this.$emit('logout')
    },
    remove: async function (id) {
      try {
        await server.put(`/cart/${this.cart._id}/product/${id}`, {}, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        this.$emit('checkCart')
      } catch ({ response }) {
        console.error(response)
        swal('Internal server error', 'error')
      }
    }
  },
  watch: {
    cart: function (val) {
      let count = 0
      val.items.forEach(e => {
        count += e.product.price * e.total
      });
      this.total = count
    }
  }
}
</script>

<style>

</style>
