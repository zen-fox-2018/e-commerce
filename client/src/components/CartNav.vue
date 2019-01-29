<template>
    <div style="overflow:auto; max-height: 18em;">
        <div v-if="isLogin">
            <md-card v-for="cart in carts" :key="cart.id">
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-subhead">
                            {{cart.product.name}} <br>
                            Price : {{cart.product.price}} <br>
                            Qty : {{cart.quantity}} <br>
                            Sub : {{cart.totalPrice}} <br>
                        </div>
                    </md-card-header-text>

                    <md-card-media style="height: 100%;">
                        <img :src="cart.product.images" style="max-height: 100%;">
                        <span class="d-flex mt-2" style="cursor : pointer; float: right;" @click.prevent="handleRemoveCart(cart._id)"> remove <md-icon>remove_shopping_cart</md-icon></span>
                    </md-card-media>
                </md-card-header>
            </md-card>
        </div>
        <div v-else>   
            <md-card>
                <md-card-content class="text-center">
                    Kamu harus login dahulu untuk memasukkan item ke cart bray
                    <v-btn @click.prevent="showLoginModal" fab dark small color="indigo">
                        <v-icon dark>assignment_ind</v-icon>
                    </v-btn>
                </md-card-content>
            </md-card>
            
        </div>
    </div>
</template>

<script>
import { mapState, mapActions} from 'vuex'
import axios from '@/scripts/axios.js'
export default {
    mounted() {
        this.fetchCart()
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState([
            'isLogin',
            'user',
            'carts'
        ])
    },
    methods: {
        ...mapActions([
            'showLoginModal',
            'fetchCart',
            'removeCart'
        ]),
        handleRemoveCart(params) {
            this.removeCart(params)
        }
    },
}
</script>

<style>

</style>
