<template>
  <div id="warningModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button @click="back" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <span> {{message}}</span>
          <br> 
          <hr>
          <button class='btn btn-primary btn-sm mr-3' data-dismiss="modal" aria-label="Close">take me back</button>
          <button class='btn btn-danger btn-sm mr-3' @click="deleteCart"> delete cart</button>
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
      message: 'are you sure?'
    }
  },
  methods: {
    back() {
      this.$router.push('/home/cart');
    },
    deleteCart() {
      let self = this;
      axios({
        method:'delete',
        url: 'http://localhost:3000/cart',
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then(( {data: { user: {cart} }}) => {
        localStorage.setItem('cart', cart);
        self.cart = localStorage.getItem('cart');
        $('#warningModal').modal('hide');
        self.$router.push('/home/store');
      })
    }
  }
}
</script>

