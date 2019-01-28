<template>
    <div class="container" style="margin-top: 5em;">
        <h3 class="product-title"> BEING GEEK IS COOL! FIND YOUR STUFF </h3>
        <div class="row mt-4">
            <div v-for="product in products" :key="product._id" class="col-md-3 my-4">
                <v-card :to="'/products/'+product._id" style="text-decoration: none;">
                    <v-img
                    :src="product.images[0] || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'" alt="People"
                    aspect-ratio="1"
                    ></v-img>
                    <v-card-title primary-title>
                    <div class="text-center" style="width: 100%; display: inline-block;">
                        <h5 class="mb-0">{{product.name}}</h5>
                        <hr>
                        <div> Rp.{{product.price.toLocaleString()}} <br></div>
                    </div>
                    </v-card-title>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/scripts/axios'
export default {
    data() {
        return {
            products : []
        }
    },
    mounted() {
        this.fetchProducts()
    },
    methods: {
        fetchProducts () {
            axios.get('/products')
            .then(({data}) => {
                this.products = data.products
                console.log(data.products,"=======")
            })
            .catch((err) => {
                console.log(err,"======")
            })
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
