<template>
  <div class="container detailproduct">
    <div class="row">
      <div class="col-lg-4 col-sm-12">
        <img width="300" :src="product.imageUrl">
      </div>
      <div class="col-lg-8 col-sm-12">
        <div class="row name"><h2>{{product.name}}</h2></div>
        <div class="row"><p>100% Transaksi Sukses Dari 100 Transaksi</p></div>
        <div class="row mb-3"><h3>Rp.{{formatPrice(product.price)}}</h3></div>
        <div class="row mb-3">
          <a href="#" @click.prevent="decrease"><i class="fas fa-minus-circle fa-2x"></i></a>
          <h3 class="mr-3 ml-3"> {{quantity}} </h3>
          <a href="#" @click.prevent="increase"><i class="fas fa-plus-circle fa-2x"></i></a>
        </div>
        <div class="row">
          <b-button class="mr-3" size="md" variant="outline-warning">Wishlist</b-button>
          <b-button size="md" variant="success" @click="addToCart(product._id)">Add to Cart</b-button>
        </div>
        <div class="row mt-4">
          <div class="col-2">
            <div class="row">
              <div class="col-5"><i class="fas fa-boxes"></i></div>
              <div class="col-7">
                <div class="row"><small>Stock</small></div>
                <div class="row"><small>{{product.stock}}</small></div>
              </div>
            </div>
          </div>
          <div class="col-2">
            <div class="row">
              <div class="col-5"><i class="fas fa-box-open fa-1x"></i></div>
              <div class="col-7">
                <div class="row"><small>Kondisi</small></div>
                <div class="row"><small>Baru</small></div>
              </div>
            </div>
          </div>
          <div class="col-2">
            <div class="row">
              <div class="col-5"><i class="fas fa-tag fa-1x"></i></div>
              <div class="col-7">
                <div class="row"><small>Min.Beli</small></div>
                <div class="row"><small>1</small></div>
              </div>
            </div>
          </div>
          <div class="col-2">
            <div class="row">
              <div class="col-5"><i class="fas fa-shield-alt fa-1x"></i></div>
              <div class="col-7">
                <div class="row"><small>Asuransi</small></div>
                <div class="row"><small>Opsional</small></div>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row mt-5 mb-4">
            <b-row class="my-1">
              <b-col sm="5"><label for="input-default">Ongkos Kirim:</label></b-col>
              <b-col sm="7">
                <b-form-input id="input-default" type="text" value="0"></b-form-input>
              </b-col>
            </b-row>
          </div>
          <div class="row">
            <div class="col-5">
              <b-form-select v-model="selected" :options="options" class="mb-3" />
            </div>
            <div class="col-4">
              <p>Berat</p>
              <p>1 kg</p>
            </div>
            <div class="col-3">
              <b-button size='sm' variant="secondary">Hitung</b-button>              
            </div>
          </div>
        </div>
        
      </div>
    </div>

    <div>
      <p class="row">Informasi Produk</p>
      <p class="row">{{product.description}}</p>
    </div>
  </div>
</template>

<script>
import api from '@/api/api.js'

export default {
  name: 'detailproduct',
  components: {
  },
  data(){
    return{
      cart: [],
      product: {
        name: '',
        price: 0,
        description: ''
      },
      quantity: 1,
      selected: null,
      options: [
        { value: null, text: 'Pilih Kecamatan'},
        { value: 'a', text: 'Kebayoran Lama' },
        { value: 'b', text: 'Coblong' },
        { value: 'c', text: 'Banjarsari' },
        { value: 'd', text: 'Colomadu' }
      ]
    }
  },
  methods: {
    formatPrice(price){
      return price.toLocaleString(['ban', 'id']);
    },
    increase(){
      if(this.quantity < this.product.stock){
        this.quantity += 1
      }
    },
    decrease(){
      if(this.quantity > 0 ){
        this.quantity -= 1
      }
    },
    getDetails(){
      api({
        url: `/products/${this.$route.params.productId}`,
        method: "GET"
      })
      .then( ({data}) => {
        this.product = data
      })
      .catch( error => {
        console.log(error.response)
      })
    },
    addToCart(productId) {
      console.log("add", productId);
      api({
        url: '/cart',
        method: "POST",
        data: { productId, quantity: this.quantity },
        headers: {
          token:
            localStorage.getItem('token')
        }
      })
      .then( ({data}) => {
        console.log(data)
        swal({
          title: data.message,
            icon: "success",
            timer: 2000,
          });
        this.$emit('addcart', data.cart)
      })
      .catch( error => {
        console.log(error.response.data.message)
        swal({
            title: error.response.data.message,
            icon: "warning",
            timer: 2000
          });
      })
    }
  },
  watch: {
    $route(){
      console.log('get details product', this.$route.params.productId)
      this.getDetails()
    }
  },
  created(){
    this.getDetails()
  }
}
</script>

<style>
.name{
  text-align: left;
}

.detailproduct{
  margin-top: 8%;
}
</style>
