<template>
  <div class="main-content-cat">
    <div class="col-md-10">
      <div class="category-container">
        <div class="row">
          <div class="col-md-4"  v-for="(productItem) in products" :key="productItem._id">
            <div class="featured-product">
              <img v-bind:src="productItem.imageUrl">
              <p>
                {{productItem.name}}<br>
                {{productItem.description}}<br>
                <span class="price">${{productItem.price}}</span>
                <a href="#" @click="addCart(productItem)"><span class="cart">+<i class="fa fa-shopping-cart"></i></span></a><br>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProductList',
  props:['products', 'host'],
  data() {
    return {
    }
  },
  methods: {
    addCart(param){
      if(!localStorage.getItem("cartId")){
        axios({
          method: "POST",
          url: `${this.host}/carts`,
          headers: {
            token: localStorage.getItem("token")
          }
        })
          .then(response => {
            localStorage.setItem("cartId", response.data._id)
          })
          .then(() => {
            this.updateInc(param)
          })
          .catch(err => {
            console.log(err.response);
          })
      } else {
        this.updateInc(param)
      }
    },
    updateInc(param) {
      axios({
        method: "PUT",
        url: `${this.host}/carts/inc/${localStorage.getItem("cartId")}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          itemId: param._id,
          increasePrice: param.price
        }
      })
        .then(result => {
          swal("Thank you!", "Added this item to cart", "success");
          this.$emit("getCarts")
        })
        .catch(err => {
          console.log(err.response)
        })
    },
  },
  created() {
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.container {
  width: 98%;
}
.logo {
  border-radius: 50%;
}
.text-muted a {
  color: #989898;
}
.text-muted a:hover {
  color: grey;
}
.fa a:active, a:hover, a:visited {
  text-decoration: none;
}
/* Tool Colors */
.general {
  background-color: #0095af;
}
.general .card-title {
  color: #f3f3f3;
}
.general .card-text {
  color: #f3f3f3;
}
.card-img {
  display: block;
  width: 100%;
  height: auto;
}
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .2s ease;
  background-color: #008CBA;
}
.card-pin:hover .overlay {
  opacity: .5;
  transition: ease .5s;
  background-color: #000000;
  cursor: pointer;
}
.more {
  color: white;
  font-size: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
  text-transform: uppercase;
  transform: translate(-20%, -20%);
  -ms-transform: translate(-50%, -50%);
}
.download {
  color: white;
  font-size: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  margin-left: 20px;
  text-transform: uppercase;
  transform: translate(-20%, -20%);
  -ms-transform: translate(-50%, -50%);
}
.card-pin:hover .card-title {
  color: #ffffff;
  margin-top: 10px;
  text-align: center;
  font-size: 1.2em;
}
.card-pin:hover .more a {
  text-decoration: none;
  color: #ffffff;
}
.card-pin:hover .download a {
  text-decoration: none;
  color: #ffffff;
}
.social {
position: relative;
transform: translateY(-50%);
}
.social .fa {
margin: 0 3px;
}
</style>