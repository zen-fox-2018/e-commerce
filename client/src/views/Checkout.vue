<template>
  <div>
    <a href="#" @click.prevent="showCart">Cart</a><br><br>
    <h3>Checkout</h3>
    <form @submit.prevent="checkout">
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" aria-describedby="emailHelp">
      </div>
      <div class="form-group">
        <label>Address</label>
        <textarea type="text" class="form-control"></textarea>
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input type="text" class="form-control">
      </div>
      <button type="submit" class="btn btn-success">Confirm Order</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
  props: ['carts'],
  data() {
    return {
      
    }
  },
  methods: {
    checkout() {
      let tmp = []
      let updateCart = []
      this.carts.forEach(cart => {
        tmp.push(cart._id)
        updateCart.push(axios({
          method: 'PUT',
          url: `http://localhost:3000/carts/${cart._id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            user: '5c4d782d1a722c1ceaa7c4a4'
          }
        }))
      });
      axios({
        method: 'POST',
        url: `http://localhost:3000/transactions`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          cart: tmp
        }
      })
        .then(({data}) => {
          return Promise.all(updateCart)
        })
        .then(data => {
          console.log(data)
          this.$emit('getCarts')
        }) 
        .catch(err => {
          console.log(err)
        })
    },
    showCart() {
      this.$emit('showCart')
    }
  }
}
</script>

