<template>
  <div id="sidebarDashboard" class="list-group sidebar">
    <!-- input text rentang harga-->
    <!-- min price , max price -->
    <div role="group" class="list-group-item list-group-item-action">
      <label for="harga">Harga:</label>
      <b-form-input id="harga" v-model="minimum" type="text" placeholder="Minimum"></b-form-input>
      <b-form-input id="harga2" v-model="maksimum" type="text" placeholder="Maksimum"></b-form-input>
      <br>
      <b-button variant="danger" @click="search">Cari</b-button>
    </div>
    <div role="group" class="list-group-item list-group-item-action">
      <label for="harga">Dukungan Pengiriman:</label>
      <p>JNE</p>
      <p>JNT</p>
      <p>Wahana</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data(){
    return {
      minimum: null,
      maksimum: null
    }
  },
  methods: {
    search(){
      let rangeprice = ''
      if(this.minimum){
        rangeprice += `pmin=${this.minimum}&`
      }
      if(this.maksimum){
        rangeprice += `pmax=${this.maksimum}`
      }
      console.log('rangeprice', rangeprice)
      this.$router.push(`/?${rangeprice}`)
    }
  }
}
</script>

<style>
.sidebar{
  text-align: left;
}
</style>
