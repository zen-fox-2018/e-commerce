<template>
    <div class="container" style="margin-top: 5em;">
        <div class="row mx-auto" style="max-width:90vw;">
            <div class="col-md-6">
                <img :src="product.images[0] || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'">
            </div>
            <div class="col-md-6">
                <div class="mt-4">
                    <h2 class="mt-4"> {{product.name}} </h2>
                    <h2 class="mt-4"> <b> Rp. {{product.price.toLocaleString()}}</b></h2>
                    <div class="d-flex mt-4">
                        <b-form-input v-model="quantity" class="col-md-2 mr-2"  min=1 type="number"></b-form-input>
                        <b-button v-if="isLogin" @click.prevent="handleAddToCart" class="col-md-4"  size="sm" variant="danger">
                            Masukkan ke keranjang
                        </b-button>
                        <b-button v-else @click.prevent="showLoginModal" class="col-md-4"  size="sm" variant="danger">
                            Masukkan ke keranjang
                        </b-button>
                    </div>
                    <div class="mt-4">
                         <p> Kategori : {{product.category.name}} </p>
                    </div>
                    <div class="mt-4">
                        {{product.createdAt | formatDate}}
                    </div>
                    <div class="mt-4">
                         <p> Tags : 
                            <span> 
                                <ul style="list-style-type: none; display: inline;">
                                    <li style="display: inline;">Tag 1 </li>
                                    <li style="display: inline;"> Tag 2 </li>
                                    <li style="display: inline;">Tag 3 </li>
                                </ul> 
                            </span>
                        </p>
                    </div>
                    <b-tabs class="mt-4">
                        <b-tab title="Description" active>
                            <br> {{product.description || "no description"}}
                        </b-tab>
                        <b-tab title="Additional Information" >
                            <br>Additional feature soon
                        </b-tab>
                        <b-tab title="Ulasan" >
                            <br>Additional feature soon
                        </b-tab>
                    </b-tabs>
                   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/scripts/axios.js'
import { mapState, mapActions } from 'vuex' 
export default {
    name: 'Product-Detail',
    data() {
        return {
            product : {
                name: '',
                price: '',
                category: '',
                tags: '',
                description: '',
                images: '',
                _id: ''

            },
            quantity : 1
        }
    },
    computed: {
        ...mapState([
            'isLogin'
        ])
    },
    created() {
        this.fetchProduct()
    },
    methods: {
        ...mapActions([
            'showLoginModal',
            'addToCart'
        ]),
        fetchProduct() {
            axios.get(`/products/${this.$route.params.id}`)
            .then(({data}) => {
                this.product = data.product
                console.log(data,"xxxxx")
            })
            .catch((error) => {
                console.log(error,"xxxxx")
            })
        },
        handleAddToCart () {
            // console.log("action diterima")
            var payload =  {
                product: this.product._id, 
                quantity: this.quantity, 
                price: this.product.price
            }
            this.addToCart(payload)
        }
    },
    watch: {
        $route () {
            this.fetchProduct()
        }
    },
}
</script>

<style>
.product-title {
    display: table; 
    text-align: center; 
    margin: auto; 
    border-bottom: 2px solid #ff6600;
}
.card-expansion {
    height: 480px;
}
.md-card {
    margin: 4px;
}
</style>
