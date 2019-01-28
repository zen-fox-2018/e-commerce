<template>
  <div class="container is-fluid" style="margin-top: 25px">
    <div class="card">
      <div class="columns is-touch is-multiline">
        <div class="column is-4">
          <img :src="product.image">
        </div>
        <div class="column is-8">
          <header class="card-header">
          <p class="card-header-title">
          {{product.name}}
          </p>
          </header>
          <div class="card-content">
          <div class="content">
          <p><b>Rp. {{product.price}}</b></p>
          <p>Stock left: {{product.stock}} pcs</p>
          </div>
          </div>
          <footer class="card-footer">
            <a class="button is-primary" style="margin-top: 10px">Add to cart</a>
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
      product: {},
    }
  },
  created() {
    this.getProduct()
  },
  watch: {
    $route() {
      this.getProduct()
    }
  },
  methods: {
    getProduct() {
      axios
        .get(`http://localhost:3000/products/${this.$route.params.productId}`)
        .then(({data}) => {
          data.price = data.price.toLocaleString()
          this.product = data
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
}
</script>