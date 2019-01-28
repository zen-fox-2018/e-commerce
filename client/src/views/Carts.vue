<template>
  <v-container>
    <v-layout wrap class="mt-3" justify-space-between fill-height>
      <v-flex lg8 sm7 xs12>
        <v-card light>
          <v-card-title primary-title>
            <span class="font-weight-bold headline">Shopping Cart</span>
          </v-card-title>
          <v-list two-line>
            <template v-for="(product, index) in cart.products">
              <v-divider :inset="true" :key="'a'+index"></v-divider>

              <v-list-tile avatar :key="'b'+index">
                <v-list-tile-avatar>
                  <img :src="product.productId.image_url">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{ product.productId.name }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-content style="width: 20px; padding-right:10px">
                  <v-text-field
                    flat
                    v-model="product.quantity"
                    :prepend-icon="product.quantity == 1 ? '' : 'remove'"
                    append-outer-icon="add"
                    @click:prepend="decrement(product.productId._id)"
                    @click:append-outer="increment(product.productId._id)"
                  ></v-text-field>
                </v-list-tile-content>
                <v-list-tile-content>
                  <span>Rp. {{ total(product.quantity, product.productId.price).toLocaleString('id') }},00</span>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon @click="deleteItem(product.productId._id)">close</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
          <v-flex v-if="cart.products && cart.products.length">
            <span
              class="ml-3 title font-weight-bold"
            >Total: Rp. {{ totalTransaction().toLocaleString('id') }},00</span>
            <v-btn block color="red" @click="checkoutCart">Checkout Cart</v-btn>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'Cart',
  props: ['cart', 'token'],
  data () {
    return {};
  },
  methods: {
    increment (productId) {
      this.$http
        .put (
          '/cart/add',
          {
            productId: productId
          },
          {
            headers: {
              token: localStorage.token
            }
          }
        )
        .then (({ data }) => {
          let index = this.cart.products
            .map (product => product.productId._id.toString())
            .indexOf (productId.toString())
          this.cart.products[index].quantity++;
        })
        .catch (({ response }) => {
          console.log (response)
        })
    },
    decrement (productId) {
      this.$http
        .put (
          '/cart/minus',
          {
            productId: productId
          },
          {
            headers: {
              token: localStorage.token
            }
          }
        )
        .then (({ data }) => {
          let index = this.cart.products
            .map(product => product.productId._id.toString())
            .indexOf(productId.toString())
          this.cart.products[index].quantity--;
        })
        .catch (({ response }) => {
          console.log(response)
        })
    },
    total (qty, price) {
      return qty * price;
    },
    deleteItem (productId) {
      Swal.fire ({
        title: 'Are you sure?',
        text: 'You wont be able to revert this!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then (result => {
        if (result.value) {
          this.$http
            .put (
              '/cart/remove',
              {
                productId: productId
              },
              {
                headers: {
                  token: localStorage.token
                }
              }
            )
            .then (({ data }) => {
              this.cart.products = this.cart.products.filter(product => {
                return product.productId._id.toString() != productId.toString()
              })
              Swal.fire ('Deleted!', 'Your item has been deleted.', 'success')
            })
            .catch (({ response }) => {
              Swal.fire ('Error!', 'Something Wrong', 'Error')
            })
        }
      })
    },
    checkoutCart () {
      Swal.fire ({
        title: 'Are you sure?',
        text: '',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then (result => {
        if (result.value) {
          this.$http
            .put (
              '/cart/checkout',
              {
                cart: this.cart
              },
              {
                headers: {
                  token: this.token
                }
              }
            )
            .then (({ data }) => {
              this.$emit ('checkout')
              Swal.fire (
                'Thanks!',
                'Successfully checkout your cart',
                'success'
              )
            })
            .catch (({ response }) => {
              console.log (response)
            })
        }
      })
    },
    totalTransaction () {
      let total = this.cart.products.map (product => {
        return product.quantity * product.productId.price
      })
      return total.reduce ((a, b) => a + b)
    }
  },
  watch: {
    token () {
      if (!this.token) {
        this.$router.replace('/login')
      }
    }
  },
  mounted() {
    if (!this.token) {
      this.$router.replace('/login')
    }
  },
  computed: {}
}
</script>
