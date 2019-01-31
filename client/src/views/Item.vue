<template>
  <div class="container">
    <Nav @checkout="checkout"></Nav>
    <div class="row">
      <button class="btn btn-link" @click="navigateBack"> << back</button>
    </div>
    <div class="row container-80">
      <div class="col-8 div-left">
        <h2>{{item.name}}</h2>
        <div class="img-container">
          <img class="product-img" :src="item.imageUrl">
        </div>
        <div class="flex-container item-info">
          <div class="header">
            <span>item information</span>
          </div>
          <div>
            <span>{{item.description}}</span>
          </div>
        </div>
      </div>
      <div class="flex-container col-4 div-right">
        <div class="flex-item logo">
        </div>
        <div class="item-details">
          <div id="price">
            <span>Rp. {{item.price}}</span>
          </div>
          <div>
            <!-- NOSTOCK Tooltip -->

            <!-- CART Modal -->
            <div id="cartModal" class="modal fade" role="dialog">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">Congratulations, your selection was added!</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="product-img col-6">
                        <img :src="item.thumbUrl"/>
                      </div>
                      <div class="col-2">
                        <span>{{item.name}}</span>
                      </div>
                      <div class="col-2">
                        <span>Rp. {{item.price}} </span>
                      </div>
                      <div class="col-2">
                        <span>{{quantity}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                      <p>Subtotal: {{item.price * quantity}}</p>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Continue Shopping</button>
                    <button @click="checkout" type="button" class="btn btn-warning" data-dismiss="modal">Checkout</button>
                  </div>
               </div>
              </div>
              </div>
            </div>
            <div class="center">
              <inputGroup @deltaQty="deltaQty"></inputGroup>                
              <button data-toggle="tooltip" data-trigger="manual" data-placement="bottom" title="failed to add to Cart!" @click="addToCart" class="add-cart" id="addToCartButton" >Add To Cart</button>
           </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import Nav from '@/components/Nav.vue'
import inputGroup from '@/components/inputGroup.vue'
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      item: null,
      quantity: 1
    }
  },
  components: {
    Nav, inputGroup
  },
  mounted: function() {
    $('[data-toggle="tooltip"]').tooltip();
        let options = {
          delay: {
            "hide" : "2000"
          },
          html: true,
          placement: "bottom",
          template: '<h1>HREREER</h1>'
        }
        $('#addToCartButton').tooltip(options);
    let self = this;
    let itemId = this.$route.params.itemId;
    axios({
      method:'GET',
      url:`http://api.zappos-clone.theodarmawan.com:3000/items/${itemId}`
    })
    .then(({data:{item}}) => {
      self.item = item;
    })
    ;
  },
  methods: {
    deltaQty(num) {
      console.log(num);
      this.quantity = num;
      console.log(this.quantity)
    },
    checkout() {
      this.$router.push('/home/cart');
    },
    addToCart() {
      var cart = localStorage.getItem('cart');
      var token = localStorage.getItem('token');
      var item = {
        item: this.item._id,
        quantity: Number(this.quantity)
      }
      let axiosCart = {items:[]};
          // console.log(typeof localStorage.getItem('cart'))
      if( cart !== 'null') {
        axiosCart = JSON.parse(cart);
        let idArray = [];
        axiosCart.items.forEach(item => idArray.push(item.item._id));
        let i = idArray.indexOf(String(this.item._id));
        if(i >= 0) {
          axiosCart.items[i].quantity += this.quantity;
        } else {
          axiosCart.items.push(item);
        }
      } else {
        let newCart = {
          items: [
            item
          ]
        }
        axiosCart = newCart;
      }
      axios({
        method:'PUT',
        url: 'http://api.zappos-clone.theodarmawan.com:3000/cart',
        headers: {
          authorization : token
        },
        data: {
          cart : axiosCart
        }
      })
      .then( res => {
        //toggle success modal
        $('#cartModal').modal();
        let cart = res.data.user.cart;
        console.log('---->')
        console.log(cart)
        localStorage.setItem('cart', JSON.stringify(cart));
      })
      .catch(err => {
        console.log(err)
        $('#addToCartButton').tooltip('show')
        setTimeout(() => {
        $('#addToCartButton').tooltip('hide')
        }, 4000)
      });
    },
    navigateBack() {
      this.$router.push('/home/store');
    }
  }
}
</script>
<style>
  .container {
    min-width: 100vw;
  }

  #price span {
    color: orange;
    font-size: 40px;
    font-family: 'Times New Roman', Times, serif
  }
  .btn-number {
    height: 35px;
    width: 40px;
    background-color:#2c5987;
  }
  #cartModal .modal-content {
    width: 600px;
    background-color: #FFF;
    border: 1px solid #CCC;
    position: fixed;
    z-index: 1000005;
  }
  .modal-header {
    background-color: #2c5987;
    color:#FFF;
  }
  .cartModal-item {
    height:400px;
  }
   .img-container {
    background-color: white;
    height: 60%;
  }
  .modal-body {
    height: 400px;
    overflow-y: scroll
  }
  .center{
    width: 150px;
    margin: 40px auto;
    }
  .flex-container {
    flex-direction: column;
  }
  .flex-container .header{
    height: 50px;
    width: 30%;
  }
   .flex-container .header span{
      display: block;
      font: italic 18px Georgia,serif;
      background: #2c5987;
      color: #fff;
      position: relative;
      margin: 0 10px 16px 0;
      line-height: 38px;
      padding: 0 28px 0 23px;
      overflow: visible;
      float: left;
  }
  .container {
    width: 100vw;
  }
  .container-80 {
    width: 95%;
    float: center;
    border: 0.5px solid gainsboro;
    padding: 10px;
  }
  .product-img {
    width: auto;
    height: 400px;
  }

  .col-4.div-right {
    flex-direction: column;
  }
  .col-4.div-right .logo {
    height: 50px;
    background-color: white;
  }
  .col-4.div-right .item-details {
    height: 300px;
    background-color: rgb(223, 223, 223);
  }
  button.add-cart {
    cursor: pointer;
    position: relative;
    color: #fff;
    background-color: #729331;
    padding: 10px;
    width: 180px;
    font-size: 18px;
    border: 1px solid #557423;
    border-radius: 3px;
    outline: none;
    font-family: Verdana,Arial,sans;
    margin-top: 25px;
    right: 16px;
  }
  /* Tooltip container */
  .tooltip {
    position: relative;
    display: inline-block;
    border: 1px dotted black; /* If you want dots under the hoverable text */
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    background-color: red;
    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
  }
  button:hover {
    background-color: #90b93f;
  } 
</style>

