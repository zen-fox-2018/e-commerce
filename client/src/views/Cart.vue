<template>
<div class="container is-fluid" style="margin-top: 25px">
  <div class="columns is-touch">
    <div class="column is-8">
      <div class="card">
        <header class="card-header">
            <p class="card-header-title">You're items...</p>
        </header>

        <div v-for="item in items" :key="item.productId._id">
          <div class="columns is-multiline card-content" style="padding-bottom: 0">
              <div class="column is-2 content" style="margin-bottom: 0"><img :src="item.productId.image"></div>
              <div class="column is-10 content">
                  <p>{{item.productId.name}}</p>
                  <p><b>Rp. {{item.productId.price.toLocaleString()}}</b></p>
                  <div class="field is-grouped has-addons">
                    <span class="button" @click="item.quantity -= 1; updateItems(item.productId._id, item.quantity)"><b> - </b></span>
                    <span><b-input type="number" v-model="item.quantity" disabled></b-input></span>
                    <span class="button" @click="item.quantity += 1; updateItems(item.productId._id, item.quantity)"><b> + </b></span>
                  </div>
              </div>
          </div>
          <hr style="margin-bottom: 0">
        </div>

      </div>
    </div>

    <div class="column is-4">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
          Total payment
          </p>
        </header>
        <div class="card-content">
          <div class="content">
              <p><b> Quantity:</b> {{totalQty}} pcs</p>
              <p><b> Total:</b> Rp. {{totalPayment.toLocaleString()}} </p>
          </div>
        </div>
        <footer class="card-footer">
          <a class="button is-fullwidth is-primary" @click="checkout" v-if="totalQty > 0">Checkout</a>
        </footer>
      </div>
    </div>

  </div>
</div>
</template>
<script>

export default {
  data() {
    return {
      items: [],
      totalQty: 0,
      totalPayment: 0
    }
  },
  created() {
    this.getItems()
  },
  watch: {
    items: {
      handler(val) {
        this.totalPayment = 0
        this.totalQty = 0
        this.items.forEach(item => {
          this.totalQty += item.quantity
          this.totalPayment += (item.quantity * item.productId.price)
        });
      },
      deep: true
    }
  },
  methods: {
    getItems() {
      axios
        .get(`http://localhost:3000/carts`, {headers: {token: localStorage.getItem('token')}})
        .then(({data}) => {
          this.items = data.products
        })
        .catch(err => {
          console.log(err);

        })
    },
    updateItems(id, qty) {
      let item = {
        productId: id,
        quantity: qty,
      }
      axios
        .put(`http://localhost:3000/carts/updateProduct`, item, {headers: {token: localStorage.getItem('token')}})
        .then(({data}) => {
          console.log(data);

        })
        .catch(err => {
          console.log(err);

        })
    },
    checkout() {
      let products = []
      axios
        .put(`http://localhost:3000/carts/checkout`, products, {headers: {token: localStorage.getItem('token')}})
        .then(({data}) => {
          swal({
              title: "Successfuly Checkout",
              text: "Let's buy some items again!",
              icon: "success",
              button: "Aww yiss..!",
          });
          this.items = []
          console.log(data);

        })
        .catch(err => {
          console.log(err);

        })
    }
  }
}
</script>