<template>
  <tr>
    <td><img :src="cart.product.image" width="50px" height="50px" /> </td>
    <td> {{ cart.product.name }} </td>
    <td>In stock</td>
    <td><input class="form-control" type="text" v-model="amount" /></td>
    <td class="text-right">Rp. {{price}} </td>
    <td class="text-right" @click="deleteCart(cart)"><button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i> </button> </td>
  </tr>
</template>

<script>
export default {
  name: 'DetailCart',
  props: ['cart'],
  data() {
    return {
      price: this.cart.product.price,
      amount: this.cart.amount
    }
  },
  methods: {
    deleteCart({_id}) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/carts/${_id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          swal(data)
          this.$emit('getCarts')
        })
        .catch(err => {
          swal(err)
        })
    },
    updateCart(data) {
      axios({
        method: 'PUT',
        url: `http://localhost:3000/carts/${this.cart._id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: { amount: this.amount }
      })
        .then(({data}) => {
          swal('Successfuly updated cart')
          this.getPrice(this.amount)
          this.$emit('getCarts')
        })
        .catch(err => {
          swal(err)
        })
    },
    getPrice(amount) {
      this.price = this.cart.product.price * amount
    }
  },
  created() {
    this.debouncedGetPrice = _.debounce(this.updateCart, 1000)
    this.getPrice(this.amount)
  },
  watch: {
    amount(v) {
      this.amount = v
      this.getPrice(this.amount)
      this.price = "Computing.."
      this.debouncedGetPrice()
    }
  }
}
</script>

