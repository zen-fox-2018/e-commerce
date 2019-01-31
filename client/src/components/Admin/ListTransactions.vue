<template>
  <div class="container">
    <b-card style="width: 50rem;" v-for="(transaction, index) in transactions" :key="index">
      <div class="card-text">
        <div class="row">
          <div class="col-4">
            <p>Customer: {{transaction.userId.name}}</p>
            <img :src="transaction.productId[0].imageUrl" width="80" height="80" alt="">
          </div>
          <div class="col-5">
            <div class="row" v-for="(product,idx) in transaction.productId" :key="idx">
              <p>{{idx+1}}. {{product.name}}</p>
            </div>
            <div>
              <div class="row"><small>Total: Rp {{formatPrice(transaction.total)}}</small></div>
              <div class="row"><small>Tanggal: {{transaction.createdAt.slice(0,10)}}</small></div>
            </div>
          </div>
          <div class="col-3">
            <a href="#" class="row mr-auto float-right">
              <div v-if="transaction.status == 'Dikirim'">
                <p>Status: <i class="fas fa-truck"> Proses Pengiriman </i></p>
              </div>
              <div v-if="transaction.status == 'Selesai'">
                <p>Status: <i class="fas fa-thumbs-up">Selesai</i></p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import api from '@/api/api.js'

export default {
  name: 'listtransaction',
  data(){
    return {
      transactions: []
    }
  },
  methods: {
    formatPrice(price){
      return price.toLocaleString(['ban', 'id']);
    },

    getAllTransactions(){
      api({
        url: `/transactions`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then( ({data}) => {
          console.log('all transaction', data)
          this.transactions = data
        })
        .catch( error => {
          console.log(error.response.data)
        })
    },
  },
  created(){
    this.getAllTransactions()
  }
}
</script>
