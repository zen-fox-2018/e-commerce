<template>
  <div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th scope="col">Product</th>
            <th scope="col">Status</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody v-for="transaction in detailTransactions" :key="transaction._id">
          <tr>
            <td> {{transaction.id}} </td>
            <div v-for="product in transaction.products" :key="product._id">
              <td> {{product.product.name}} </td>
            </div>
            <td :class="transaction.status.color"> {{transaction.status.msg}} </td>
            <td><button class="btn-success" v-if="transaction.status.msg == 'On Delivering'" @click="productDelivered(transaction.id)">Confirm Product Delivered</button></td>
          </tr>
        </tbody><br>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyTransaction',
  props: ['products'],
  data() {
    return {
      transactions: [],
      detailTransactions: []
    }
  },
  methods: {
    getTransaction() {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/transactions',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          this.detailTransactions = []
          this.transactions = data
          data.forEach(transaction => {
            let tmpProducts = []
            transaction.cart.forEach(elCart => {
              this.products.forEach(elProduct => {
                if (elCart.product === elProduct._id) {
                  tmpProducts.push({
                    amount: elCart.amount,
                    product: elProduct
                  })
                }
              })
            })
            // console.log(tmpProducts)
            let color = ''
            let msg = ''
            if (transaction.status == 'Sending') {
              color = 'text-warning'
              msg = 'On Delivering'
            } else {
              color = 'text-success'
              msg = 'Delivered'
            }
            this.detailTransactions.push({
              id: transaction._id,
              products: tmpProducts,
              status: {
                msg: msg,
                color: color
              },
              user: transaction.user
            })
          });
        })
        .catch(err => {
          swal(err.response.data.msg)
        })
    },
    productDelivered(transactionId) {
      axios({
        method: 'PUT',
        url: `http://localhost:3000/transactions/${transactionId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          status: 'Sent'
        }
      })
        .then(({data}) => {
          console.log(data)
          this.getTransaction()
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getTransaction()
  }
}
</script>

