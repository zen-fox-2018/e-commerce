<template>
  <div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th scope="col">Product</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody v-for="transaction in detailTransactions" :key="transaction._id">
          <tr>
            <td> {{transaction.id}} </td>
            <div v-for="product in transaction.products" :key="product._id">
              <td> {{product.product.name}} </td>
            </div>
            <td :class="transaction.status.color"> {{transaction.status.msg}} </td>
          </tr>
        </tbody><br>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transaction',
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
              // console.log(elCart.product)
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
            if (transaction.status == 'Sending') {
              color = 'text-warning'
            } else {
              color = 'text-success'
            }
            this.detailTransactions.push({
              id: transaction._id,
              products: tmpProducts,
              status: {
                msg: transaction.status,
                color: color
              },
              user: transaction.user
            })
          });
          this.updateStock()
        })
        .catch(err => {
          swal(err.response.data.msg)
        })
    },
    updateStock() {
      let dataAxios = []
      let dataProduct = this.detailTransactions.filter(transaction => transaction.status.msg == 'Sent')
      dataProduct.forEach(datum => {
        datum.products.forEach(product => {
          let newStock = product.product.stock - product.amount
          product.product.stock = newStock
          dataAxios.push(axios({
            method: 'PUT',
            url: `http://localhost:3000/products/${product.product._id}`,
            headers: {
              access_token: localStorage.getItem('access_token')
            },
            data: product.product
          }))
        })
      })
      Promise.all(dataAxios)
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getTransaction()
  }
}
</script>

