<template>
  <div clas="container">
    <div class="row">
      <div class="col-5">
        <br><br><br>
        <img :src="detailPayload.image" style="width:400px; height:400px;">
        <br><br>
        <h5 @click="addToCart()">Add To Cart</h5>
        <router-view></router-view>
      </div>
      <div class="col-7">
        <br><br><br>
        <h2 class="text-left">{{ detailPayload.name }}</h2>
        <br>
        <h4 class="text-left">Developer: {{ detailPayload.developer }}</h4>
        <h4 v-if="detailPayload.discountPrice !== 0" class="text-left">Price: 
          <div class="price-wrapper">
            <div class="price-slash"></div>
            <div class="price">IDR {{detailPayload.price}}</div>
          </div>
          {{ detailPayload.discountPrice }}
          <small>{{detailPayload.dayRemaining}} hours remaining</small>
        </h4>
        <h4 v-else class="text-left">Price: IDR {{detailPayload.price}}</h4>
        <h4 class="text-left">Description:</h4>
        <div class="card" style="width: 30rem;">
          <div class="card-body">
            <p class="card-text">
              {{ detailPayload.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  props: ['detailPayload'],
  data() {
    return {
      server: 'http://localhost:3000'
    }
  },
  methods: {
    addToCart() {
      axios({
        method: 'post',
        url: `${this.server}/carts`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          itemId: this.detailPayload._id
        }
      })
      .then(({ data }) => {
        this.$emit('item_from_home', this.detailPayload)
      })
      .catch((err) => {
        console.log(err);
        swal('Oops', 'Have to Signed in First', 'error');
      })
    },

  }
}
</script>

<style>
.price-wrapper{
  position: relative; 
  display: inline-block;
}

.price-slash{
  position: relative;
  width: 100%;
  height: 0;
  border-top: 2px solid red;
  transform: rotate(-16deg);
  top: 17px;
}
</style>
