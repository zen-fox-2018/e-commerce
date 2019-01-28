<template>
  <div class="container-fluid navbar navbar-expand-md navbar-light bg-light navbar-static-top">
    <div class="flex-container row">
      <div class="flex-item col col-4">
        <h1>FakeZappos</h1>
      </div>
      <div class="flex-item col col-4 div-nav-right">
        <button class="navbar-toggler pointer" type="button" data-toggle="collapse" data-target="#navbarResponsive">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse float-right" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
           
            <li class="nav-item" id="signOutBtn">
              <a class="pointer" href="#" >
                <i class="fa fa-spinner" style="font-size:24px"></i>
                <button @click="signOut" class="btn btn-sm btn-link mr-2 ml-1">sign out</button>
              </a>
            </li>
           
            <li @click="checkout" class="nav-item">
              <div class="btn btn-warning cart" data-toggle="tooltip" data-placement="bottom" title="checkout">
                <i class="fa fa-shopping-bag"></i>
                <span> My Cart </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div> 
</template>
<script>
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      cart: [],
    }
  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip();
    console.log('===========> cart')
    let self = this;
     let cartFromServer = JSON.parse(localStorage.getItem('cart'));
     if(cartFromServer) {
       cartFromServer.items.forEach(item => self.cart.push(item));
     }
  },
  methods: {
    checkout() {
      this.$emit('checkout');
    },
    signOut() {
      $('.fa-spinner').addClass('fa-spin');
      let self = this;
       gapi.load('auth2', function() { 
        var auth2 = gapi.auth2.getAuthInstance();
        setTimeout(() => {
           auth2.signOut();
        }, 500)
        setTimeout(() => { 
          self.$router.push('/');
          console.log('User signed out.');
        }, 1000)
      });
      localStorage.removeItem('token');
      localStorage.removeItem('cart');
    }
  }
}
</script>
<style scoped>
  #signOutBtn {
    margin-right: 20px;
    color: black;
  }
  #signOutBtn:hover {
    color: white;
    background-color: 0,0,0,0.3;
  }
 .row {
   align-items: center;
   justify-content: space-between;
   width: 100%
 }  
 .flex-container {
   display: flex;
   flex-direction: row;
 }
 .flex-item.align-right {
   justify-self: flex-end;
   height: 50px;
 }
</style>
