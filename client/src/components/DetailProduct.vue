<template>
  <div class="modal fade" id="modalProduct" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel"> {{ product.name }} </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-6">
                <img :src="product.image" width="300px" height="300px" alt="">
              </div>
              <div class="col-6">
                <p><strong>Description:</strong> {{product.description}} </p><br>
                <p><strong>Price:</strong> Rp.{{product.price}} </p><br>
                <p><strong>Stock:</strong> {{product.stock}} </p><br>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-warning"><i class="fa fa-shopping-cart"></i><a @click.prevent="addCart(product._id)" href="#" class="hidden-sm">Add to cart</a></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailProduct',
  props: ['product'],
  watch: {
    product(v) {
      $('#modalProduct').modal('toggle')
    }
  },
  methods: {
    addCart(productId) {
      axios({
        method: 'POST',
        url: `http://localhost:3000/carts`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          product: productId
        }
      })
        .then(cart => {
          swal('Successfully add to carts')
          this.$emit('getCarts')
        })
        .catch(err => {
          if (err.response.data.msg) swal(err.response.data.msg)

          else swal(err.response)
        })
    }
  }
}
</script>

