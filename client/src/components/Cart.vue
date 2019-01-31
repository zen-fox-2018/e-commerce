<template>
  <div>
    <v-container grid-list-xs>
      <h1>Cart</h1>
      <v-layout row wrap>
        <v-flex xs8>
          <v-card
            row
            wrap
            v-for="(item, index) in cart"
            :key="index"
            style="margin-bottom: 5vh; padding: 2vh"
          >
            <v-layout>
              <v-flex xs3>
                <v-img :src="item.item.imageUrl" aspect-ratio="1" width="100%" height="200px"></v-img>
              </v-flex>
              <v-flex xs6>
                <h2 class="font-weight-regular">{{item.item.name}}</h2>
                <h3 class="font-weight-regular">{{item.item.category}}</h3>
                <h3 class="font-weight-light">Rp. {{(item.item.price * item.qty).toLocaleString()}}</h3>
                <v-layout row wrap text-md-center>
                  <v-flex xs4>
                    <v-btn round small @click="decreaseQty(index)">-</v-btn>
                  </v-flex>
                  <v-flex shrink>
                    <h1>{{item.qty}}</h1>
                  </v-flex>
                  <v-flex xs4>
                    <v-btn round small @click="increaseQty(index)">+</v-btn>
                  </v-flex>
                </v-layout>
                <v-btn round color="error" @click="deleteItem(index)">Delete</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card>
            <v-card-title>
              <h3>Detail</h3>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Total:</v-list-tile-content>
                <v-list-tile-content class="align-end">Rp. {{total.toLocaleString()}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Ongkir:</v-list-tile-content>
                <v-list-tile-content class="align-end">Rp. {{ongkir.toLocaleString()}}</v-list-tile-content>
              </v-list-tile>
              <hr>
              <v-list-tile>
                <v-list-tile-content>Grand Total:</v-list-tile-content>
                <v-list-tile-content class="align-end">Rp. {{grandTotal.toLocaleString()}}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
          <v-btn block color="primary" dark @click="checkout">Checkout</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import a from "../helpers/helpers";

export default {
  props: ["cartitem"],
  data() {
    return {
      cart: this.cartitem,
      total: 0,
      grandTotal: 0,
      ongkir: 0,
      totalWeight: 0
    };
  },
  methods: {
    checkout() {
      a.post(`/transactions`, {
        userId: localStorage.id
      }, {
        headers: {
          token: localStorage.token
        }
      }).then((result) => {
        console.log(result.data);
        
      }).catch((err) => {
        
      });
    },
    increaseQty(index) {
      a.patch(
        `/users/cart/${localStorage.id}/${this.cart[index]._id}`,
        {
          qty: this.cart[index].qty + 1
        },
        {
          headers: {
            token: localStorage.token
          }
        }
      )
        .then(result => {
          this.cart.forEach(element => {
            this.totalWeight += element.item.weight;
          });
          console.log(result);
          this.cart[index].qty += 1;
        })
        .catch(err => {
          console.log(err);
        });
    },
    decreaseQty(index) {
      if (this.cart[index].qty > 1) {
        a.patch(
          `/users/cart/${localStorage.id}/${this.cart[index]._id}`,
          {
            qty: this.cart[index].qty - 1
          },
          {
            headers: {
              token: localStorage.token
            }
          }
        )
          .then(result => {
            this.cart.forEach(element => {
              this.totalWeight += element.item.weight;
            });
            this.calculateOngkir();
            console.log(result);
            this.cart[index].qty -= 1;
            this.grandTotal = this.ongkir + this.total;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.deleteItem(index);
      }
    },
    deleteItem(index) {
      a.delete(`/users/cart/${localStorage.id}/${this.cart[index]._id}`, {
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          if (result.status == 200) {
            let obj = {
              cart: this.cart,
              qty: this.cart[index].qty
            };
            this.cart.splice(index, 1);
            this.$emit("deleteitem", obj);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    calculateOngkir() {
      a.post(
        `/users/ongkir`,
        {
          weight: this.totalWeight,
          origin: 1,
          destination: localStorage.cityId,
          courier: "jne"
        },
        {
          headers: {
            token: localStorage.token
          }
        }
      )
        .then(result => {
          console.log(result.data.rajaongkir.results[0].costs[0].cost[0].value);
          this.ongkir =
            result.data.rajaongkir.results[0].costs[0].cost[0].value;
        })
        .catch(err => {
          console.log(err.data);
        });
    }
  },
  watch: {
    cart: {
      handler(val) {
        this.total = 0;
        this.cart.forEach(element => {
          this.total += element.qty * element.item.price;
        });
        this.total += this.ongkir;
        this.grandTotal = (this.ongkir + this.total);
      },
      deep: true
    }
  },
  created() {
    this.total = 0;
    this.cart.forEach(element => {
      this.total += element.qty * element.item.price;
      this.totalWeight += element.item.weight * element.qty;
    });

    a.post(
      `/users/ongkir`,
      {
        weight: this.totalWeight,
        origin: 1,
        destination: localStorage.cityId,
        courier: "jne"
      },
      {
        headers: {
          token: localStorage.token
        }
      }
    )
      .then(result => {
        console.log(result.data.rajaongkir.results[0].costs[0].cost[0].value);
        this.ongkir = result.data.rajaongkir.results[0].costs[0].cost[0].value;
        this.grandTotal = this.ongkir + this.total;
      })
      .catch(err => {
        console.log(err.data);
      });
  }
};
</script>