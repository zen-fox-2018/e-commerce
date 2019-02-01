<template>
    <div>
      <li class="media my-4">
        <img class="mr-3" :src="item.image" height="120" width="120">
        <h6 class="mr-3 my-5">{{ item.name }}</h6>
        <h6 v-if="item.dayRemaining > 0" class="mr-3 my-5">Price: {{ item_from_cart.discountPrice }}</h6>
        <h6 v-else class="mr-3 my-5">Price: {{ item_from_cart.price }}</h6>
        <h6 class="mr-3 my-5">Qty: {{ qty }}</h6>
        <a class="my-5 mr-2"><i @click="addItem" class="fas fa-chevron-circle-up"></i></a>
        <a class="my-5 mr-3"><i @click="reduceItem" class="fas fa-chevron-circle-down"></i></a>
        <h6 v-if="item.dayRemaining > 0" class="my-5">SubTotal: {{ item.discountPrice * qty }}</h6>
        <h6 v-else class="my-5">SubTotal: {{ item.price * qty }}</h6>
        <a class="ml-5 my-5"><i @click="removeItem" class="fas fa-trash"></i></a>
      </li>
      <hr>
    </div>
</template>

<script>

export default {
  name: 'CartList',
  props: ['item_from_cart'],
  data() {
    return {
      item: this.item_from_cart,
      server: 'http://localhost:3000',
      qty: this.item_from_cart.qty,
    }
  },
  methods: {
    addItem() {
      let item = this.item;
      delete item.qty
      axios({
        method: 'post',
        url: `${this.server}/carts`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          itemId: this.item._id
        }
      })
      .then(({ data }) => {
        this.qty += 1;
        this.$emit('plus_one', this.item._id)
      })
      .catch((err) => {
        console.log(err);
      })
    },
    reduceItem() {
      this.qty -= 1
      if (this.qty < 1) {
        swal('Oops', 'Value Cannot Be Less Than One', 'error');
        this.qty = 1;
      } 
      else {
        axios({
          method: 'put',
          url: `${this.server}/carts/remove_one_item/${this.item._id}`,
          headers: {
            token: localStorage.getItem('token')
          },
        })
          .then(({ data }) => {
            this.$emit('minus_one', this.item._id);
          })
          .catch((err) => {
            console.log(err);
          })
        }
    },
    removeItem() {
      axios({
        method: 'put',
        url: `${this.server}/carts/remove_certain_item/${this.item._id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.$emit('remove_games', { itemId: this.item._id, qty: this.qty});
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
}
</script>

<style>

</style>
