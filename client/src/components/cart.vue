<template>
    <div>
        <div v-if="cartList.length == 0">
            <h5>
                <strong> There is nothing on your cart</strong>
            </h5>
        </div>
        <!-- ROW TEMPAT NAMPUNG DUA CARD -->
        <div class="row" v-else>

            <!-- LISTING CARTNYA APA AJA -->
            <div class="col-8 ml-3 " v-if="cartList" >
                <h2 class="text-left mb-2"> {{cartList[0].userId.name }} Carts </h2>
                <b-card class="mt-2 " v-for="cart in cartList" :key="cart._id">
                    <h5 slot="header" class="text-left mt-1">
                        <b-form-checkbox v-model="listCheckout" :value="cart" unchecked-value=""></b-form-checkbox>
                        <i class="fas fa-store"></i> <strong> {{ cart.productId.userId.name }} </strong>
                        <i style="cursor: pointer;" @click="deleteCart(cart._id)" class="fas fa-times float-right"></i>
                    </h5>
                    <div class="row">
                        <div class="col-2 float-left">
                            <img v-if="cart.productId.image" :src="cart.productId.image" :alt="cart.productId.image" style="width: 120px; height:150px">
                            <img v-else src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAACtra0wMDDz8/Oenp60tLQQEBDs7Oy7u7u/v7/Y2Nj6+vqEhIQWFhbPz8+Li4ttbW08PDzi4uLHx8dXV1empqZBQUFISEiAgIBycnJdXV2RkZE5OTkeHh4LCwsrKytPT08kJCRubm4bukFuAAADuklEQVR4nO3cbXOiMBQFYFG0KFCxWm2tVu3+//+4Qx1bt+XcBMiS3Mx5vjNzzyB5uQRHIyIiIiIiIiIiIiIiIiIiIiIiIiKKTpovZtOqLPdleZjO5sss9V2RQ9m83D0kv3xcqvnad20OLMv33+HurMaZ7xL7yKqTGO9qMtUaMn+ziHd1WfgutoP1s3W+2mnsu+C2ylb59GVcNoydZuel77qtHbrkq+19V26p3RP4Lw23sZj0CJgkU9/1G6XyDG/2x3cCk353sPbsO4Ls0jtg4BHbT4NNAh5SN04CBjzcFI4CJknuOwqwd5bww3eUZrmzgEly8B2m0YvDhEmIXY6ly4DJq+84DUzL0Uk1z7OiKNL1Zrs3bz7Cu4lrueDqR9cpfzUkDG/GECf7fcMdSVdiwvfhIxhI1c6aL5mJEUNrNUrLmQ26aCElDO1nKsz2W3yV9NN+Ga54K4+wUnGrgC9LkmKo2q0II6nY75V+3GEtTrewzkq+cIcTgvHJEzzyG2buOU5YDlO6JfiCwrj6wgmD6tiksEzjrIbv/m6Iym3BjdOT8VI87T8OULg1WKZ52hZG4QEKtzZFRZpHfPwDDyohXNFYzNo6EqK94dniWtwk/89Ft4Lm7ZXFtToSoiptJm0YMKix9Dh5uPdVpEW3JYMJg5oPe8ANrICb+63AiSbQnml7R5hw7rs0N4QlTWiNmo7wwvvkuzQ3hFtoM5cq8IQThrXF7woPpKE1ojqSXuZE8SMVX3WE1WnrRnyjGlo/uAuhyxbHLZQPpuh/ClNhmqipH0hNb8Th2yotpGmwpn1XUZiOuGt/CNfSG7Va0Cf3LMiTRAQBjWfA33xX2JN8/iLR35wxfkajfRQVXvhead8TGj9T0L4YNT2Du/COsrVjWsiEeBqxFdP5Wu2P4Gh0FvN96G+OjsWA2leiNfFjIeHkmxrihlD7JPFJOBG8U7+f/4THmRiaaiPpSMnRd2mO4EOW2tcxN/BwpvqW0w06UaR9u/vtAhLqX8ncgIDaWzJ3QEL9q+0bdCooloEU7pwiOYtQA9NhPCMp2jqp39V/Aw2M0L5s6gE0uuMZSkdVc8JIDq7VwKItmkUpbAVr+DMaS8vFzWz8bav1X8yIiIiI4lRkX9J7cbySqcGvhIP6/q4PeJTtwXdlrsCE8d9DJlSDCfWDs8XEd2WuMKF+TKgfE+rHhPoxoX5MqB/80sL8f3VKMKF+8KvKaJ7DfPv17n567xDDdxZERERERERERERERERERERERERERERERD/8BaxwJRZqIHjRAAAAAElFTkSuQmCC" alt="no image" class="mr-2" style="width: 50px; height: 60px">
                        </div>
                        <div class="col text-left ml-3">
                            <router-link :to="{name: 'product', params: {id: cart.productId._id}}" style="color: black">
                            <h4 class="card-text"> {{ cart.productId.name}} </h4>
                            </router-link>
                            <p> {{ cart.productId.description}} </p>
                        </div>
                        <div class="col-2">
                            <p class="text-right">
                                IDR {{ cart.productId.price.toLocaleString() }} 
                            </p>
                        </div>
                    </div>
                    <div slot="footer" class="text-left">
                        <div class="row">
                            <div class="col">
                                Subtotal: <strong>IDR {{ cart.total.toLocaleString() }} </strong>
                            </div>
                            <div class="col-3 text-right">
                                <b-button variant="dark" > Checkout </b-button>
                            </div>
                        </div>
                    </div>
                </b-card>
            </div>
        
            <!-- CARD SEBELAH KANAN YG BUAT TOTALAN CHECKOUT SMUA -->
            <div class="col mr-3">

                <div class="row mt-2 " v-if="user">
                    <div class="col"></div>
                    <div class="col-6 mb-2">
                        <b-button @click="deleteAllCarts" style="background-color: lightgrey; color: black; border-color: lightgrey" class="float-right ml-5"> <strong> Clear my cart</strong>  </b-button>
                    </div>
                </div>
                
                <b-card class="sticky-top">
                    <div slot="header">
                        <h5 class="text-left mt-1">
                            Checkout All
                        </h5>
                    </div>
                    <div class="card-text text-left">
                        <div class="row"  v-for="item in listCheckout" :key="item._id">
                            <h6 class="col">
                                {{ item.productId.name }} :
                            </h6> 
                            <h6 class="text-right col">
                                {{ item.qty}}
                            </h6>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col">
                                <h5>
                                Total
                                </h5>
                            </div>
                            <div class="col">
                                <h5 class="text-right">
                                    IDR {{ totalPrice.toLocaleString() }}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div slot="footer">
                        <b-button variant="dark" class="float-right"> Checkout </b-button>
                    </div>
                </b-card>
            </div>

        </div>
    </div>
</template>

<script>
var socket = io.connect('http://localhost:3000')

export default {
    name: 'cartPage',
    data () {
        return {
            listCheckout: [],
            totalPrice: 0,
        }
    },
    props: {
        cartList: Array,
        user: Object
    },
    methods: {
        addCheckout (value) {
            // console.log(value)
            this.listCheckout.push(value)
        },
        deleteCart (id) {
            swal({
                title: "Are you sure?",
                text: "You wan to delete this cart?",
                icon: "warning",
                buttons: true,
                warningMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    axios({
                        method: 'delete',
                        url: `http://localhost:3000/carts/${id}`,
                        headers: {
                            token: localStorage.token
                        }
                    })
                    .then(resp => {
                        // socket.emit('cart-change')
                        swal("Poof! Your cart have been deleted!", {
                            icon: "success",
                        });
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
                }
            })

        },
        getTotal() {
            let temp = 0
            this.listCheckout.forEach(e => {
                temp += e.total
            })
            this.totalPrice = temp
        },
        deleteAllCarts () {
            swal({
                title: "Are you sure?",
                text: "You want to clear your cart?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    axios({
                        method: 'delete',
                        url: 'http://localhost:3000/carts',
                        headers: {
                            token: localStorage.token
                        }
                    })
                    .then(resp => {
                        socket.emit('cart-change')
                        swal("Your carts has been deleted!", {
                            icon: "success",
                        });
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
                } 
            })
        }
    },
    watch: {
        listCheckout () {
            this.getTotal()
        }
    },
   
}
</script>

<style>

</style>
