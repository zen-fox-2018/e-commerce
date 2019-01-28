<template>
  <div class="featured-product">
    <img v-bind:src="productItem.imageUrl">
    <p>
      {{productItem.name}}<br>
      {{productItem.description}}<br>
      <span class="price">${{productItem.price}}</span>
      <a href="#" @click="addCart(productItem)"><span class="cart">+<i class="fa fa-shopping-cart"></i></span></a><br>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  props:['productList'],
  data() {
    return {
    }
  },
  methods: {
    addToCart(item) {
      console.log("add to cart")
      console.log(item)
    },
    itemDetail(item) {
      console.log('item detail');
      console.log(item);
      // this.$router.push(`/detail/${item._id}`) 
    }
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