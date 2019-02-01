<template>
  <div id="app">
    <div class="row">
      <div class="col-2 box">
        <img src="https://i.pinimg.com/originals/5e/22/86/5e2286e02a8d3a65558ad3adf7534670.jpg" style="width:200px; height:200px;">
        <h5 v-if="!isAdmin"><router-link to="/">HOME</router-link></h5>
        <h5 v-if="!isAdmin"><router-link to="/cart">CART({{ count_cart }})</router-link></h5>
        <h5 v-if="!isAdmin"><router-link to="/history">HISTORY</router-link></h5>
        <h5 v-if="isAdmin"><router-link to="/admin">ADMIN</router-link></h5>
        <h5 v-if="isAdmin"><router-link to="/items">ITEMS</router-link></h5>
        <br><br>
        <h5 v-if="!isLogin"><router-link to="/auth">SIGN IN</router-link></h5>
        <h5 @click="logout" v-if="isLogin">LOGOUT</h5>
      </div>
      <div class="col-10">
        <router-view :detailPayload="detail_product" @minusOne="finalMinus" @plusOne="finalOne" @new_qty="updateQty" @success_login="loggedMeIn" @detailitem_from_home="receiveDetail" @item_from_home="receiveItemFromHome" :itemPayload="item_payload" @reset_count_cart="resetCount" @renew_payload="renewItemPayload"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLogin: false,
      isAdmin: false,
      item_payload: [],
      count_cart: 0,
      server: 'http://localhost:3000',
      detail_product: {},
    }
  },
  methods: {
    loggedMeIn() {
      this.checkState();
      this.getAllCartFromDb();
    },
    logout() {
      this.item_payload = [];
      this.count_cart = 0;
      localStorage.clear();
      this.isAdmin = false;
      this.$router.push('/')
      this.checkState();
    },
    checkState() {
      let token = localStorage.getItem('token');
      if (token) {
        this.isLogin = true;
        if (localStorage.getItem('role') == 'false') {
          // not admin
          this.isAdmin  = false;
        } else {
          this.isAdmin = true;
          this.$router.push('/admin') 
        }
      } else {
        this.isLogin = false;
      }
    },
    receiveItemFromHome(item) {
      this.item_payload.push(item);
      this.count_cart += 1;
    },
    getAllCartFromDb() {
      axios({
        method: 'get',
        url: `${this.server}/carts`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.item_payload = data[0].itemId;
          this.count_cart = data[0].itemId.length;
        })
        .catch((err) => {
          console.log(err);
        })
    },
    updateQty(val) {
      this.count_cart -= val;
      this.getAllCartFromDb();
    },
    finalOne() {
      this.count_cart += 1;
    },
    finalMinus() {
      this.count_cart -= 1;
    },
    receiveDetail(item) {
      this.detail_product = item;
    },
    resetCount() {
      this.count_cart = 0;
    },
    renewItemPayload(val) {
      this.getAllCartFromDb();
    }
  },
  created() {
    this.checkState();
    this.getAllCartFromDb();
  },
  mounted() {
    this.getAllCartFromDb();
    this.renewItemPayload();
  },
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.box {
  flex-direction: column;
  align-items: center;
}
</style>
