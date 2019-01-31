<template>
    <div class="container detailcart">
      <div class="row">
        <div class="col-8">
          <b-card style="width: 40rem; " class="mb-5">
              <div class="card-text text-left">
                <p>Alamat Pengiriman</p>
                <textarea name="address" id="address" cols="70" rows="4"></textarea>
                <div class="container">
                  <div class="row">
                    <div class="col-5">
                      <b-form-select v-model="selected" :options="options" class="mb-3" />
                    </div>
                    <div class="col-4">
                      <b-form-select v-model="selectedkurir" :options="optionskurir" class="mb-3" />
                    </div>
                    <div class="col-3">
                      <p>Berat: {{totalWeight}} gr</p>
                      <b-button variant="success">Submit</b-button>
                    </div>
                  </div>
                  <div class="row mt-2 mb-4">
                    <b-row class="my-1">
                      <b-col sm="5"><label for="input-default">Ongkos Kirim:</label></b-col>
                      <b-col sm="7">
                        <b-form-input id="input-default" type="text" value="0"></b-form-input>
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </div>
            </b-card>

            <b-card style="width: 40rem; height: 10rem;" v-for="(item, index) in cart" :key="index">
              <div class="card-text">
                <div class="row">
                  <div class="col-4">
                    <img src="https://static.myfigurecollection.net/pics/figure/big/706583.jpg" width="80" height="80" alt="">
                  </div>
                  <div class="col-5">
                    <router-link :to="`/details/${item.productId._id}`">
                      <div class="row"><p>{{item.productId.name}}</p></div>
                    </router-link>
                    <div class="row"><p>Rp {{formatPrice(item.productId.price)}}</p></div>
                    <div class="row"><small>Berat: {{subTotalWeight(item.quantity, item.productId.weight)}} gr</small></div>
                  </div>
                  <div class="col-3">
                    <p>Jumlah Barang: {{item.quantity}}</p>
                    <p>Subtotal: Rp {{subtotal(item.quantity, item.productId.price)}}</p>
                  </div>
                </div>
              </div>
            </b-card>
        </div>
        <div class="col-4">
          <b-card title="Ringkasan Belanja" style="width: 20rem">
            <hr>
            <div class="float-left text-left">
              <p class="card-text"> Total Harga ( {{totalItem}} barang ) </p>
              <small>Total Berat: {{formatPrice(totalWeight)}} gr</small>
            </div>
            <div class="float-right">
              <p>Rp {{formatPrice(totalPrice)}} </p>
              <p>Rp {{formatPrice(totalOngkir)}} </p>
            </div>
            <br><br>
            <hr>
            <p>Total Tagihan: Rp {{formatPrice(totalPrice + totalOngkir)}}</p>
            <b-button variant="warning" @click.prevent="payNow(totalPrice + totalOngkir)">Bayar</b-button>
          </b-card>
        </div>
      </div>    
    </div>
</template>

<script>
import api from '@/api/api.js'

export default {
  name: 'detailpayment',
  data(){
    return {
      cart: [{
        productId: {
          price: 0,
          quantity: 1
        }
      }],
      quantity: 1,
      selected: null,
      selectedkurir: null,
      options: [
        { value: null, text: 'Pilih Kecamatan'},
        { value: 'a', text: 'Kebayoran Lama' },
        { value: 'b', text: 'Coblong' },
        { value: 'c', text: 'Banjarsari' },
        { value: 'd', text: 'Colomadu' }
      ],
      optionskurir: [
        { value: null, text: 'Pilih Pengiriman'},
        { value: 'Wahana', text: 'Wahana' },
        { value: 'JNE', text: 'JNE' },
        { value: 'TIKI', text: 'TIKI' },
      ]
    }
  },
  methods: {
    getDetailsCart(){
      api({
        url: `/cart`,
        method: "GET",
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then( ({data}) => {
        console.log(data)
        this.cart = data
      })
      .catch( error => {
        console.log(error.response)
      })
    },

    formatPrice(price){
      return price.toLocaleString(['ban', 'id']);
    },

    subtotal(quantity, price){
      return this.formatPrice(quantity*price)
    },

    subTotalWeight(quantity, weight){
      return this.formatPrice(quantity*weight)
    },
    
    payNow(total){
      console.log('payNow gan', total)
      let productId = this.cart.map(function(e){
        return e.productId._id
      })
      api({
        url: `/transactions`,
        method: "POST",
        data: {productId, total},
        headers: {
          token: localStorage.getItem('token')   
        }
      })
      .then(({data}) => {
        swal({
          title: data.message,
          text: "the products will be sent soon",
          icon: "success"
        })
        .then((willDelete) => {
          this.$router.push('/')
        });
      })
      .catch( error => {
        console.log(error.response)
      })
    }
  },
  created() {
    this.getDetailsCart()
  },
  computed:{
    totalPrice(){
      let sum = 0
      this.cart.forEach(e => {
        sum += (e.quantity * e.productId.price)
      });
      return sum
    },
    totalItem(){
      let sum = 0
      this.cart.forEach(e => {
        sum += e.quantity
      });
      return sum
    },
    totalWeight(){
      let sum = 0
      this.cart.forEach(e => {
        sum += (e.quantity * e.productId.weight)
      });
      return sum
    },
    totalOngkir(){
      let sum = 0
      this.cart.forEach(e => {
        sum += (e.quantity * e.productId.weight)
      });
      return sum / 1000 * 15000
    }
  }
}
</script>

<style>

.detailcart{
  margin-top: 8%;
}
.text-left{
  text-align: left;
}
</style>
