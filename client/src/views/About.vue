<template>
  <div class="container detailproduct">
    <div class="row">
      <div class="col-4">
        <img width="300" src="https://images-na.ssl-images-amazon.com/images/I/71qkFRbp-FL._SX425_.jpg" alt="product">
      </div>
      <div class="col-8">
        <div class="row name"><h2>High Quality Action Base Display Stand For 1/144 HG/RG Gundam/Figure</h2></div>
        <div class="row"><p>100%  Transaksi Sukses Dari 100 Transaksi</p></div>
        <div class="row mb-3"><h3>Rp.{{formatPrice(135900)}}</h3></div>
        <div class="row mb-3">
          <a href="#"><i class="fas fa-minus-circle fa-2x"></i></a>
          <h3 class="mr-3 ml-3"> {{quantity}} </h3>
          <a href="#"><i class="fas fa-plus-circle fa-2x"></i></a>
        </div>
        <div class="row">
          <b-button class="mr-3" size="md" variant="outline-warning">Wishlist</b-button>
          <b-button size="md" variant="success">Add to Cart</b-button>
        </div>
        <div class="row mt-4">
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
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api.js'

export default {
  name: '',
  data(){
    return{
      product: {},
      quantity: 1
    }
  },
  methods: {
    formatPrice(price){
      return price.toLocaleString(['ban', 'id']);
    },
  },
  watch: {
    
  }
}
</script>

<style>
.name{
  text-align: left;
}

.detailproduct{
  margin-top: 5%;
}
</style>
