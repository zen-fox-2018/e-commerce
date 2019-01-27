<template>
  <v-toolbar style="padding-right: 6%" clipped-right>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="toolbar-title" @click="changeState('home')">V-Commerce</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-badge left>
      <span slot="badge">{{cartcount}}</span>
      <v-icon class="cart" large color="grey lighten-1" @click.native="changeState('cart')">shopping_cart</v-icon>
    </v-badge>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat @click="logout()">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  props: ["cart", "cartcount"],
  data() {
    return {
      navbar: false,
    };
  },
  methods: {
    toggleNavbar() {
      this.navbar = !this.navbar;
      console.log(this.navbar);
      this.$emit("toggle", this.navbar);
    },
    logout() {
      this.$router.replace(`/login`);
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        console.log("User signed out.w");
        localStorage.clear();
      });
    },
    changeState(state) {
      console.log(state);
      
      this.$emit('changestate', state)
    }
  }
};
</script>

<style>
.cart:hover {
  cursor: pointer
}
.toolbar-title:hover {
  cursor: pointer
}
</style>

