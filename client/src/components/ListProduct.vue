<template>
  <div>
    <div class="container">
      <div class="row">
        <div v-for="product in products" :key="product._id" class="col-3 mt-3">
          <a href="#" @click.prevent="detailProduct(product._id)">
            <div class="card photo shadow p-3">
              <div class="glow-wrap">
                <i class="glow"></i>
              </div>
              <div class="card-header">
                <img :src="product.image" alt="" height="200px" width="200px" class="img-responsive">
              </div>
              <div class="card-body">
                <h5 class="title"> {{ product.name }} </h5>
                <p class="description">Rp.{{ product.price }} </p>
              </div>
            </div>
          </a>
        </div>
        <detail-product :product="product" @getCarts="getCarts" />
      </div>
    </div>
  </div>
</template>

<script>
import DetailProduct from '@/components/DetailProduct.vue'

export default {
  name: 'ListProduct',
  components: {
    DetailProduct
  },
  props: ['dataUser'],
  data() {
    return {
      products: [],
      product: {}
    }
  },
  methods: {
    getProducts() {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          this.products = data
          this.$emit('dataProducts', this.products)
        })
        .catch(err => {
          console.log(err)
        })
    },
    detailProduct(id) {
      let dataFilter = this.products.filter(product => product._id == id)
      this.product = dataFilter[0]
    },
    getCarts() {
      this.$emit('getCarts')
    }
  },
  mounted() {
    if (this.dataUser) {
      this.getProducts()
    }
  },
  watch: {
    dataUser(v) {
      if (v) this.getProducts()
    }
  }
}
</script>

<style scoped>
  .title {
    font-weight: 1000;
    text-align: center;
  }
  .description {
    font-weight: 500;
    text-align: center;
  }

  a{
    color: #111;
  }

  .photo{
    display: block;
  }

  .photo img{
    object-fit: cover;
    box-shadow: 10px 15px 25px 0 rgba(0,0,0,.2);
    display: block;
    transition: all .5s cubic-bezier(0.645, 0.045, 0.355, 1);
    border: 1px solid #E1E1E1;
    border-radius: 5px;
    background: #FFF;
    margin: 0 auto;
    width: 100%;
    /* margin-top: -10px; */
  }

  .photo:hover img{
    box-shadow: 1px 1px 10px 0 rgba(0,0,0,.1);
  }

  .photo .glow-wrap{
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    margin-top: -10px;
  }

  .photo .glow{
    display: block;
    position:absolute;
    width: 40%;
    height: 200%;
    background: rgba(255,255,255,.2);
    top: 0;
    filter: blur(5px);
    transform: rotate(45deg) translate(-450%, 0);
    transition: all .5s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .photo:hover .glow{
    transform: rotate(45deg) translate(450%, 0);
    transition: all 1s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .photo:hover img,
  .photo:hover .glow-wrap{
    margin-top: 0;
  }

  h1{
    position: absolute;
    z-index: 1;
    transform: translate(-25%, -65%);
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    line-height: 1.2;
  }


  /* Ends */

  #author{
    font-family: Helvetica, Arial;
    text-transform: uppercase;
    font-size: 14px;
    text-decoration: none;
    position: fixed;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    color: #888;
  }

  #author:hover{
    color: #111;
  }

</style>
