<template>
  <div class="container">
    <b-card style="width: 40rem;" v-for="(transaction, index) in transactions" :key="index">
      <div class="card-text">
        <div class="row">
          <div class="col-4">
            <img :src="transaction.productId[0].imageUrl" width="80" height="80" alt="">
          </div>
          <div class="col-5">
            <div class="row" v-for="product in transaction.productId" :key="product._id">
              <p>{{product.name}}</p>
            </div>
            <div>
              <div class="row"><small>Total: Rp {{formatPrice(transaction.total)}}</small></div>
              <div class="row"><small>Tanggal: {{transaction.createdAt.slice(0,10)}}</small></div>
            </div>
          </div>
          <div class="col-3">
            <a href="#" class="row mr-auto float-right">
              <div v-if="transaction.status == 'Dikirim'">
                <p>Status: <i class="fas fa-truck" >Dikirim</i></p>
                <b-button @click.prevent="confirm(transaction._id)">Konfirmasi Penerimaan</b-button>
              </div>
              <div v-if="transaction.status == 'Selesai'">
                <i class="fas fa-thumbs-up">Selesai</i>
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
  name: 'usertransaction',
  data(){
    return {
      transactions: []
    }
  },
  methods: {
    formatPrice(price){
      return price.toLocaleString(['ban', 'id']);
    },

    getUserTransaction(){
      api({
        url: `/transactions/me`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then( ({data}) => {
          console.log('my transaction', data)
          this.transactions = data
        })
        .catch( error => {
          console.log(error.response.data)
        })
    },
    confirm(transactionId){
      swal({
        title: "Apakah anda yakin?",
        text: "Setelah transaksi selesai, dana akan langsung diteruskan ke penjual",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.finishTransaction(transactionId)
        } else {
          swal("Segera Konfirmasi penerimaan setelah barang sampai!", {
            icon: "warning",
          });
        }
      });
    },

    finishTransaction(transactionId){
       api({
        url: `/transactions/${transactionId}`,
        method: "PUT",
        data: {status: "Selesai"},
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then( ({data}) => {
          swal("Transaksi berhasil, Terimakasih", {
            icon: "success",
          });
          this.getUserTransaction()
        })
        .catch( error => {
          console.log(error.response.data)
        })
    }
  },
  created(){
    this.getUserTransaction()
  }
}
</script>
