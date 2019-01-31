<template>
    <v-container align-content-center>
        <v-card>
            <v-container grid-list-md >
                <v-layout column>
                    <v-flex xs12 >
                        <p class="subheading" v-if="userCart.products.length == 0" >You Need To Buy Item First</p>
                        <v-card v-for="(product, index) in userCart.products"  :key="index">
                            <v-container>
                                <v-layout row>
                                    <v-flex xs4>
                                        <v-img
                                        class="warning--text"
                                        height="200px"
                                        :src="product.productId.img_url"
                                        />
                                    </v-flex>

                                    <v-flex xs8>
                                        <v-card-title>
                                            <div>
                                                <span class="grey--text">{{product.productId.name}}</span><br>
                                                <span>Price : Rp. {{product.productId.price.toLocaleString('id')}}</span><br>
                                                <span>Quantity : {{product.quantity}}</span>
                                                <v-btn flat color="info" @click="addToCart(product.productId._id)">
                                                    <v-icon>add</v-icon>
                                                </v-btn> <br>
                                                <v-btn flat color="info" @click="removeFromCart(product.productId._id)">
                                                    <v-icon>delete</v-icon>
                                                </v-btn>
                                            </div>
                                        </v-card-title>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-flex>

                    <v-flex xs12>
                        <v-container>
                            <v-layout align-end justify-center column fill-height>
                                <p class="subheading"><strong>Total Price </strong><br> <br> Rp. {{totalPrice.toLocaleString('id')}}</p>
                                <v-btn color="success" @click="checkOut">
                                    Checkout
                                </v-btn>
                            </v-layout>
                        </v-container>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            userCart: {}
        }
    },
    computed: {
        totalPrice() {
            let price = 0
            this.userCart.products.forEach(product => {
                price += (product.quantity * product.productId.price)
            });
            return price
        }
    },
    methods: {
        getCart() {
            let token = localStorage.getItem('token')
            this.axios({
                method: 'get',
                url: `http://localhost:3000/cart`,
                headers: {
                    token
                }
            })
            .then(({data}) => {
                this.userCart = data
            })
        },
        checkOut() {
            let token = localStorage.getItem('token')
            this.axios({
                method: 'put',
                url: `http://localhost:3000/cart/checkout`,
                headers: {
                    token,
                    'Content-Type': 'application/json'
                }
            })
            .then(() => {
                this.$swal('Success Purchase Item', '', 'success')
                this.getCart()
            })
        },
        addToCart(productId) {
            let token = localStorage.getItem('token')
            this.axios({
                method: 'put',
                url: `http://localhost:3000/cart/add`,
                data: {productId},
                headers: {
                    token,
                    'Content-Type': 'application/json'
                }
            })
            .then(({data}) => {
                this.getCart()
            })
        },
        removeFromCart(productId) {
            let token = localStorage.getItem('token')
            this.axios({
                method: 'put',
                url: `http://localhost:3000/cart/remove`,
                data: {productId},
                headers: {
                    token,
                    'Content-Type': 'application/json'
                }
            })
            .then(({data}) => {
                this.$swal('Success Remove Item From Cart', '', 'success')
                this.getCart()
            })
        }
    },
    created() {
        this.getCart()
    },
}
</script>

<style>

</style>
