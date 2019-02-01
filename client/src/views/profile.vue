<template>
    <div class="bg-light" style="height: 100vh">
        <div class="row mt-3">
            <b-card class="text-center mx-auto" style="height: 50vh;width: 90%">
                <div class="row">
                    <div class="col-3 mt-3">
                        <b-img class="" thumbnail fluid v-if="user.image" :src="user.image" :alt="user.image" style="max-width: 380px; max-height: 380px" />
                    </div>
                    <div class="col mt-3">
                        <div class="row ">
                            <div class="col-1">
                                <h1 class="text-left">
                                    <i class="fas fa-store"></i>
                                </h1>
                            </div>
                            <div class="col mb-1">
                                <h1 v-if="products.length !== 0" class="text-left">
                                    {{ products[0].userId.name }}
                                </h1>
                                <h1 v-else class="text-left">
                                    {{ user.name }}
                                </h1>
                            </div>
                        </div>
                        <p class="text-left">{{new Date(user.createdAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
                        <hr>
                        <div class="row ml-2">
                            <p>
                                Rating: {{ user.rating}}
                            </p>
                        </div>
                        <div class="row ml-2">
                            <p>
                                Email: {{ user.email}}
                            </p>
                        </div>
                    </div>
                </div>
            </b-card>
        </div>
        <div class="row ml-5">
                <product-list :products="products" />
        </div>
    </div>
</template>

<script>
import productList from '@/components/productList.vue'

export default {
    name: 'profile',
    data () {
        return {
            products: []
        }
    },
    components: {
        productList,
    },
    props: {
        allProducts: Array,
        user: Object
    },
    methods: {
        myProduct () {
            axios({
                method: 'get',
                url: `http://localhost:3000/products/me/${this.$route.params.userId}`
            })
            .then(resp => {
                this.products = []
                this.products = resp.data.data
            })
            .catch(err => {
                console.log(err.response)
            })
        // g bs pake filter krn pas di refresh pageny cartlistny lnsgng hilang
        //    let self = this
        //    let my = this.allProducts.filter(e => {
        //       console.log( String(e.userId._id) + ' ' + String(this.$route.params.userId + 'ini dlm looping'))
        //     })
        //     console.log(my, 'ini produck ny user ini')
        }
    },
    created () {
       this.myProduct()
    }
}
</script>

<style>

</style>
