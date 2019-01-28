<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <router-link :to="{ name: 'productDetail', params: { productId: product._id }}">
          <img :src="product.image" alt="Placeholder image">
        </router-link>
      </figure>
    </div>

    <div class="card-content">
      <div class="content">
        <router-link :to="{ name: 'productDetail', params: { productId: product._id }}">
          {{product.name}}
        </router-link>
        <br>
        <span>
          <b>Rp. {{product.price.toLocaleString()}}</b>
        </span>
        <br>
        <a class="button is-small is-primary" style="margin-top: 5px;" @click="addToCart(product._id)">Add to cart</a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {

    }
  },
  methods: {
    addToCart(id) {
      let item = {
        productId: id,
        quantity: 1,
      }
      axios
        .put(`http://localhost:3000/carts/addProduct`, item, {headers: {token: localStorage.getItem('token')}})
        .then(({data}) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);

        })
    }
  }
}
</script>