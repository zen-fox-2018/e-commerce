<template>
    <div>
        <b-dropdown>
            <template slot="button-content" bg-variant="white">
                <button @click="cartList">Cart<b-badge variant="light" class="ml-2">{{items.length}}</b-badge></button>
            </template>
            <b-dropdown-item v-for="(item, index) in items" :key="index">
                <b-card  bg-variant="dark" text-variant="white" title="Cart">
                    <b-container class="bv-example-row">
                        <div class="container">
                            <b-row style="width:350px;">
                                <b-col>
                                    <b-row>Name: {{item.productId.name}}</b-row>
                                    <b-row>Qty: {{item.qty}}</b-row>
                                    <b-row>Price: {{item.productId.price}}</b-row>
                                    <b-row><button @click="removeItem(item._id)">remove</button></b-row>
                                </b-col>
                                <b-col><b-card :img-src=item.productId.img style="width:50px; height: 50px;"/></b-col>
                            </b-row>
                        </div>
                    </b-container>
                </b-card>
            </b-dropdown-item>
            <h5 v-if="items.length == 0">Cart is empty</h5>
            <h5 v-if="items.length > 0">Total Price: <span><h3>Rp. {{totalPrice}}</h3></span></h5>
            <button @click="checkOut" v-if="items.length > 0">Check Out</button>
        </b-dropdown>
    </div>
</template>

<script>
export default {
    props: ['url', 'userId'],
    data() {
        return {
            items: [],
            totalPrice: 0
        }
    },
    methods: {
        cartList() {
            axios({
                url: `${this.url}/carts`,
                methods: 'get',
                headers: {
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                this.items = data.carts
                this.items.forEach(element => {
                    this.totalPrice += element.totalPrice
                });
            }).catch((err) => {
                console.log(err)
            });
        },
        checkOut() {
            axios
                .delete(`${this.url}/carts`, {
                    data: {
                        userId: this.userId
                    },
                    headers: {
                        token: localStorage.token
                    }
                })
                .then(({data}) => {
                    console.log(data)
                    this.cartList()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        removeItem(cartId) {
            console.log(this.url)
            axios
                .delete(`${this.url}/carts/${cartId}`, {
                    headers: {
                        token: localStorage.token
                    }
                })
                .then(({data}) => {
                    this.cartList()
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    created() {
        this.cartList()
    },
    watch: {
        // totalPrice(val) {
        //     this.cartList()
        // }
    }
}
</script>

<style>
    button {
        background: rgb(84, 206, 255);
        border: none;
        
    }
    #__BVID__8__BV_toggle_{
        background: rgb(84, 206, 255);
        border: none
    }
</style>
