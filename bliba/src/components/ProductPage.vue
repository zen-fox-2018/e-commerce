<template>
    <v-card>
        <v-container>
            <v-layout row>
                <v-flex xs4>
                    <v-img
                    class="warning--text"
                    height="200px"
                    :src="product.img_url"
                    />
                </v-flex>

                <v-flex xs8>
                    <v-card-title>
                        <div>
                            <span class="grey--text">{{product.name}}</span><br>
                            <span>Price : Rp. {{product.price.toLocaleString('id')}}</span><br>
                            <span>Stock : {{product.stock}}</span>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat color="orange" @click.prevent="addToCart">Add to cart</v-btn>
                    </v-card-actions>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            product: {}
        }
    },
    methods: {
        getProduct() {
            this.axios.get(`http://localhost:3000/products/${this.$route.params.id}`)
            .then(({data}) => {
                this.product = data
            })
        },
        addToCart() {
            let token = localStorage.getItem('token')
            this.axios({
            method: 'put',
            url: `http://localhost:3000/cart/add`,
            data: {productId: this.product._id},
            headers: {
                token,
                'Content-Type': 'application/json'
            }
            })
            .then(({data}) => {
            this.$swal('Success Add to Cart', '', 'success')
            })
        }
    },
    watch: {
        $route (newVal) {
            console.log('masuk')
            this.getProduct()
        }
    },
    created() {
        this.getProduct()
    },
}
</script>

<style>

</style>
