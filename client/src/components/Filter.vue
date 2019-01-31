<template>
  <div>
    <b-container fluid>
      <b-row class="my-1">
        <b-col sm="5"><p class="float-left">Daftar Produk</p> </b-col>
        <b-col sm="3"><label for="type-sort" class="float-right">Urutkan:</label></b-col>
        <b-col sm="4"><b-form-select @input="sort" v-model="selected" :options="options" class="mb-3" /></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'filtering',
  data(){
    return {
      selected: null,
      options: [
        { value: null, text: 'Pilih Berdasarkan'},
        { value: 'priceasc', text: 'Harga Rendah ke Tinggi' },
        { value: 'pricedesc', text: 'Harga Tinggi ke Rendah' },
        { value: 'nameasc', text: 'Nama A-Z' },
        { value: 'namedesc', text: 'Nama Z-A' },
      ]
    }
  },
  methods: {
    sort(){
      console.log(this.selected)
      this.$router.push(`/?sort=${this.selected}`)
    }
  }
};
</script>
