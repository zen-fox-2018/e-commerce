<template>
    <div class="ml-3 mt-3 row">
        <editProduct :product="product" />
        <div class="col-9">
            <b-card class="text-center" style="height: 80vh;">
                <div class="row">

                    <div class="col-4">
                        <img v-if="product.image" :src="product.image" :alt="product.image" style="max-width: 310px; max-height: 400px" >
                    </div>

                    <div class="col">
                        <div class="row">
                            <h2 class="text-left col-7">{{ product.name }}</h2>
                            <h5 style="cursor: pointer; color: black" class="text-right col" v-b-modal.editProduct v-if="product.userId && String(product.userId._id) == String(user._id)" > Edit <i class="fas fa-edit"></i> </h5>
                        </div>

                        <small class="float-left"> {{ new Date(product.createdAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' })}}</small>
                        <br>
                        <hr>
                        <p class="text-left"> 
                            {{ product.description }}
                        </p>
                        <br>
                        <br>
                        <h5 class="text-right">Qty: {{ product.qty }} </h5>
                        <hr>

                        <div class="row">
                            <div v-if="product.price" class="col text-left">
                               <strong> Now only: IDR {{ product.price.toLocaleString() }}</strong>
                            </div>
                            <div class="col">
                                <div class="row">
                                <b-form  v-if="user && String(product.userId._id) != String(user._id)" class="ml-5" @submit.prevent="addToCart">
                                    <b-button class="float-right ml-5" type="submit"> Add to Cart </b-button>
                                    <b-form-input type="number" style="width: 80px" v-model="amount" class="text-left" />
                                </b-form>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </b-card>
        </div>
        <div class="col">
            <router-link style="color: black" :to="{ name: 'profile', params: {userId: product.userId._id}}" >
                <b-card class="mr-3">
                    <div class="row">
                        <img :src="product.userId.image" :alt="product.userId.image" style="border-radius: 50%" border="2" class="m-auto">
                    </div>
                    <p>
                        Rating: {{ product.userId.rating }}
                    </p>
                    <div class="row">
                        <h4 class="m-auto">
                            {{ product.userId.name }}
                        </h4>
                    </div>
                    <h5>
                        {{ product.userId.email }}
                    </h5>
                    <p>
                        {{ product.userId.address}}
                    </p>
                </b-card>
            </router-link>
        </div>
    </div>
</template>

<script>
var socket = io.connect('http://localhost:3000')
import jwt from 'jsonwebtoken'
import editProduct from './editProduct'
export default {
    name: 'product',
    data () {
        return {
            product: {},
            amount: '',
        }
    },
    components: {
        editProduct
    },
    props: {
        user: Object
    },
    methods: {
        addToCart () {
            if (isNaN(this.amount) || this.amount <= 0) {
                swal("Sorry!", "product amount must be a valid", "error");
            } else if (this.amount > this.product.qty) {
                swal("Sorry!", "product quantity exceeded", "info");
            } else {
                axios({
                    method: 'get',
                    url: `http://localhost:3000/carts/${this.user._id}`
                })
                .then(resp => {
                    // console.log(resp.data.data)
                    let pos = resp.data.data.filter(e => e.productId._id == this.product._id)
                    // console.log(pos, 'ini pos')

                    if (pos.length != 0  ) {
                        let hasil = Number(this.amount) + Number(pos[0].qty)
                        // console.log(pos[0].qty, 'ini qty cart', pos[0].productId.qty, 'quantity product di cart',hasil, 'hasil', )
                        if (pos[0].qty < pos[0].productId.qty && hasil <= pos[0].productId.qty ) {
                            axios({
                                method: 'put',
                                url: `http://localhost:3000/carts/${pos[0]._id}`,
                                headers: {
                                    token: localStorage.token
                                },
                                data: {
                                    qty: hasil
                                }
                            })
                            .then(resp => {
                                 swal({
                                    title: "Yeay you added item to cart",
                                    text: "Do you want to see your cart?",
                                    icon: "success",
                                    buttons: true,
                                })
                                .then((yes) => {
                                    if (yes) {
                                        this.$router.push({ name: 'cart', params: { userId: this.user._id}})
                                    }
                                });
                                // socket.emit('cart-change')
                                // console.log('success update cart', resp.data.data)
                            })
                            .catch(err => {
                                console.log(err.response.data)
                            })
                        } else {
                            swal('Sorry', 'You already added this item to cart', 'info')
                        }
                    } else {
                        axios({
                            method: 'post',
                            url: 'http://localhost:3000/carts',
                            headers: {
                                token: localStorage.token
                            },
                            data: {
                                productId: this.product._id
                            }
                        })
                        .then(resp => {
                            swal({
                                title: "Yeay you added item to cart",
                                text: "Do you want to see your cart?",
                                icon: "success",
                                buttons: true,
                            })
                            .then((yes) => {
                                if (yes) {
                                    this.$router.push({ name: 'cart', params: { userId: this.user._id}})
                                }
                            });
                            // socket.emit('cart-change')
                            // console.log(resp.data, 'berhasil add to cart')
                        })
                        .catch(err => {
                            swal("Sorry!", `${err.response}`, "error");
                            console.log(err.response, 'ini error')
                        })
                    }
                })
                .catch(err => {
                    console.log(err.response)
                })
          
            }
        },
        getProduct () {
            axios({
                mehod: 'get',
                url: `http://localhost:3000/products/${this.$route.params.id}`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(resp => {
                this.product = resp.data.data
                // console.log(resp.data, 'ini data produt yg dicari!')
            })
            .catch(err => {
                console.log(err.response, 'ini error pas get one product')
            })
        }
    },
    created () {
        // if (localStorage.token) {
        //     // console.log('mausk', jwt.decode(localStorage.token).id)
        //     this.user = jwt.decode(localStorage.token).id
        // }
        socket.on('edit-product', data => {
            this.product = data
        })
        this.getProduct()
    },
    watch: {
        '$route' (val) {
            this.getProduct()
        }
    }
}
</script>

<style>

</style>
