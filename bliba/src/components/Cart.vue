<template>
    <v-container align-content-center>
        <v-card>
            <v-container grid-list-md v-for="(product, index) in userCart.products"  :key="index">
                <v-layout row>
                    <v-flex xs6>
                        <v-card >
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
                                            </div>
                                        </v-card-title>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-flex>

                    <v-flex xs6>

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
                console.log(this.userCart.products)
            })
        }
    },
    created() {
        this.getCart()
        console.log(userCart)
    },
}
</script>

<style>

</style>
