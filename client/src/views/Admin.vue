<template>
  <div>
    <router-link to="/admin/transaction">History Transaction</router-link>
    <router-view :products="products"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  props: ['products'],
  data() {
    return {
      isAdmin: false
    }
  },
  created() {
    let dataUser = JSON.parse(localStorage.getItem('user'))
    if (dataUser.role !== 'admin') {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style scoped>
  /* #admin {
    margin-top: 300px;
  }
  h3 {
    margin-top: 200px;
  } */
</style>


