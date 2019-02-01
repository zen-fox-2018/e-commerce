<template>
    <b-navbar toggleable="md" type="dark" sticky variant="info" style="background-color: black !important;height: 9%;">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand><router-link :to="{name: 'home'}" style="color: white;" >  <h3> ShoCheap </h3>  </router-link> </b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>

                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">

                <b-nav-form @keyup="search">
                    <b-form-input v-model="query" class="mr-sm-2" type="text" placeholder="Search"/>
                </b-nav-form>

                <b-nav-item-dropdown right >

                    <template slot="button-content">
                    <em style="color: white"> User </em>
                    </template>
                    <div v-if="isLogin">
                        <b-dropdown-item><router-link :to="{ name: 'profile', params: {userId: user._id} }" style="color: black">Profile</router-link></b-dropdown-item>
                        <b-dropdown-item @click="signOut">Signout</b-dropdown-item>
                    </div>
                    <div v-else>
                        <b-dropdown-item><router-link :to="{ name: 'login' }" style="color: black"> Login </router-link></b-dropdown-item>
                        <b-dropdown-item ><router-link :to="{ name: 'register' }" style="color: black"> Register </router-link></b-dropdown-item>
                    </div>
                </b-nav-item-dropdown>
                <b-nav-item v-if="isLogin"><router-link :to="{ name: 'sell' }" style="color: white"> <em> Sell </em> </router-link></b-nav-item>
                 
                <b-nav-item-dropdown right >
                    <template slot="button-content">
                        <i class="fas fa-shopping-cart" style="color: white"></i>
                    </template>
                        <div>
                            <b-dropdown-item bg-variant="light" class="bg-light">
                                <b-card no-body bg-variant="light" >
                                    <h6 class="text-left mt-1 ml-1">Total items: {{ total }} </h6>
                                </b-card>
                            </b-dropdown-item>
                            <b-dropdown-item bg-variant="light" class="bg-light" v-for="cart in cartList" :key="cart._id">
                                    <b-card body-bg-variant="light" bg-variant="light" style="width: 400px">
                                        <div class="row ">
                                        <div class="col-2">
                                            <img v-if="cart.productId.image" :src="cart.productId.image" :alt="cart.productId.image" class="mr-2" style="width: 50px; height: 60px">
                                            <img v-else src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAACtra0wMDDz8/Oenp60tLQQEBDs7Oy7u7u/v7/Y2Nj6+vqEhIQWFhbPz8+Li4ttbW08PDzi4uLHx8dXV1empqZBQUFISEiAgIBycnJdXV2RkZE5OTkeHh4LCwsrKytPT08kJCRubm4bukFuAAADuklEQVR4nO3cbXOiMBQFYFG0KFCxWm2tVu3+//+4Qx1bt+XcBMiS3Mx5vjNzzyB5uQRHIyIiIiIiIiIiIiIiIiIiIiIiIiKKTpovZtOqLPdleZjO5sss9V2RQ9m83D0kv3xcqvnad20OLMv33+HurMaZ7xL7yKqTGO9qMtUaMn+ziHd1WfgutoP1s3W+2mnsu+C2ylb59GVcNoydZuel77qtHbrkq+19V26p3RP4Lw23sZj0CJgkU9/1G6XyDG/2x3cCk353sPbsO4Ls0jtg4BHbT4NNAh5SN04CBjzcFI4CJknuOwqwd5bww3eUZrmzgEly8B2m0YvDhEmIXY6ly4DJq+84DUzL0Uk1z7OiKNL1Zrs3bz7Cu4lrueDqR9cpfzUkDG/GECf7fcMdSVdiwvfhIxhI1c6aL5mJEUNrNUrLmQ26aCElDO1nKsz2W3yV9NN+Ga54K4+wUnGrgC9LkmKo2q0II6nY75V+3GEtTrewzkq+cIcTgvHJEzzyG2buOU5YDlO6JfiCwrj6wgmD6tiksEzjrIbv/m6Iym3BjdOT8VI87T8OULg1WKZ52hZG4QEKtzZFRZpHfPwDDyohXNFYzNo6EqK94dniWtwk/89Ft4Lm7ZXFtToSoiptJm0YMKix9Dh5uPdVpEW3JYMJg5oPe8ANrICb+63AiSbQnml7R5hw7rs0N4QlTWiNmo7wwvvkuzQ3hFtoM5cq8IQThrXF7woPpKE1ojqSXuZE8SMVX3WE1WnrRnyjGlo/uAuhyxbHLZQPpuh/ClNhmqipH0hNb8Th2yotpGmwpn1XUZiOuGt/CNfSG7Va0Cf3LMiTRAQBjWfA33xX2JN8/iLR35wxfkajfRQVXvhead8TGj9T0L4YNT2Du/COsrVjWsiEeBqxFdP5Wu2P4Gh0FvN96G+OjsWA2leiNfFjIeHkmxrihlD7JPFJOBG8U7+f/4THmRiaaiPpSMnRd2mO4EOW2tcxN/BwpvqW0w06UaR9u/vtAhLqX8ncgIDaWzJ3QEL9q+0bdCooloEU7pwiOYtQA9NhPCMp2jqp39V/Aw2M0L5s6gE0uuMZSkdVc8JIDq7VwKItmkUpbAVr+DMaS8vFzWz8bav1X8yIiIiI4lRkX9J7cbySqcGvhIP6/q4PeJTtwXdlrsCE8d9DJlSDCfWDs8XEd2WuMKF+TKgfE+rHhPoxoX5MqB/80sL8f3VKMKF+8KvKaJ7DfPv17n567xDDdxZERERERERERERERERERERERERERERERD/8BaxwJRZqIHjRAAAAAElFTkSuQmCC" alt="no image" class="mr-2" style="width: 50px; height: 60px">
                                        </div>
                                        <div class="col">
                                            <div class="row">
                                                <div class="col ml-1">
                                                {{ cart.productId.name }}
                                                </div>
                                                <div class="col-2">
                                                    {{ cart.qty }}
                                                </div>
                                            </div>
                                            <div class="row ml-1 text-muted">
                                               <p> {{ cart.productId.description }} </p>
                                            </div>
                                            <div class="row ml-1 text-muted">
                                               <p >From: {{ cart.productId.userId.name}} </p>
                                            </div>
                                        </div>
                                        </div>
                                    </b-card>
                            </b-dropdown-item>
                            <b-dropdown-item bg-variant="light" class="bg-light">
                                <router-link :to="{name: 'cart', params: {userId: user._id}}" style="color: black"> 
                                    <b-card body-bg-variant="light" bg-variant="light" style="width: 400px">
                                        <h5 class="text-center">My Cart</h5>
                                    </b-card>
                                </router-link>
                            </b-dropdown-item>
                        </div>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import jwt from 'jsonwebtoken'
var socket = io.connect('http://localhost:3000')

export default {
  name: 'navbar',
  data () {
      return {
          query: '',
          isLogin: false
      }
  },
  props: {
      cartList: Array,
      total: Number,
      user: Object
  },
  methods: {
      signOut () {
          localStorage.removeItem('token')
          this.isLogin = false
          swal("Yeay!", "You signed out", "success")
          this.$router.push({ name: 'home'})
      },
      search () {
          this.$emit('search', this.query)
      },
      getAll () {
          this.$emit('getAll')
      }
  },
  created () {
      if (this.user == '{}' || !localStorage.token) {
          this.isLogin = false
      } else {
          this.isLogin = true
      }
  },
  watch: {
      user (val) {
          if (val) {
              this.isLogin = true
          }
      }
  }
}
</script>

<style>

</style>
