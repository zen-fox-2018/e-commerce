<template>
  <div class="adminnavbar">
    <b-navbar toggleable="md" type="dark" variant="danger" class="fixed-top">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <router-link to="/">
        <b-navbar-brand >BukaWarung</b-navbar-brand>
      </router-link>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item>
            <router-link active-class="active" class="router-link" to="/admin/products">Show Product</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link active-class="active" class="router-link" to="/admin/categories">Show Category</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link active-class="active" class="router-link" to="/admin/list-transactions">Transaction</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-form class="mr-5" @submit.prevent>
            <b-form-input v-model="productname" size="sm" class="mr-sm-2 searchbar" type="text" placeholder="Search Produk"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <i @click.prevent="logout" class="fas fa-sign-out-alt">Logout</i>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'navbar-admin',
  data(){
    return {
      productname: ''
    }
  },
  methods:{
    logout(){
      this.$emit('logout')
      this.$router.push('/')
    }
  }
}
</script>
<style>
.adminnavbar{
  margin-bottom: 8%;
}
</style>
