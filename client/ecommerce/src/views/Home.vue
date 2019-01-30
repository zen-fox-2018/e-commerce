<template>
  <div class="container">
    <b-container class="bv-example-row">
      <div>
        <b-row>
            <b-col>
              <div v-for="(product, index) in allProduct" :key="index" class="card">
                    <b-card :title=product.name
                            :img-src=product.img
                            img-alt="Image"
                            img-top
                            tag="article"
                            style="max-width: 20rem;"
                            class="mb-2">
                      <p class="card-text">
                        {{product.description}}
                      </p>
                      <p class="card-text">
                        Rp.{{product.price}}
                      </p>
                      <p class="card-text">
                        Stock {{product.stock}} left!
                      </p>
                      <router-link :to="`/details/${product._id}`">
                      <button @click="nested = true"> Details </button> </router-link>
                      <b-button @click="addCart(product._id)" variant="primary">Add To Cart<span class="ml-2"><i style='font-size:18px' class='fas'>&#xf217;</i></span></b-button>
                    </b-card>
                  </div>
            </b-col>
            <b-col><router-view/></b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'

export default {
  name: 'home',
  components: {
  },
  props: ['url', 'userId', 'keyword'],
  data() {
    return {
      allProduct : [],
      cart: [],
      nested: false,
      searchKeyword: this.keyword
    }
  },
  methods: {
    getAllProducts () {
      axios
        .get(`${this.url}/products`)
        .then((response) => {
          this.allProduct = response.data
        }).catch((err) => {
          console.log(err)
        });
    },
    addCart (id) {
      console.log(this.searchKeyword, '======== serach keyword')
      axios({
        method: 'post',
        url: `${this.url}/carts`,
        data: {
            userId: this.userId,
            productId: id
          },
        headers: {
          token: localStorage.token
        }
      })
        .then(({data}) => {
          console.log(data, '====AWW YIISS!!')
        })
        .catch(err => {
          console.log(err)
        })
    },
    showDetails () {
      this.nested = true
    },
  },
  created() {
    this.getAllProducts()
  },
  watch: {
    keyword (newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    }
  }
}
</script>

<style>
  .card {
    margin-top: 20px;
  }
</style>
