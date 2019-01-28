<template>
    <div class="container-fluid">        
        <form method="post" class="form login" onsubmit="return false">                                        
            <div class="form__field">
                <label for="email"><i class="fa fa-envelope" style="color: #fff"></i><span class="hidden">Email</span></label>
                <input type="email" name="email" v-model="inputLogin.email" placeholder="email" class="form__input" required>
            </div>                                        
            <div class="form__field">
                <label for="login__password"><i class="fa fa-lock" style="color: #fff"></i><span class="hidden">Password</span></label>
                <input type="password" name="password" v-model="inputLogin.password" class="form__input" placeholder="password" required>
            </div>                                        
            <div class="form__field">
                <button id="buttonLoginSubmit" data-dismiss="modal" v-on:click.prevent="login()">LOGIN</button>
            </div>                                            
        </form>                                
    </div> 
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
          inputLogin: {
            email: "",
            password: ""
          },
        }
    },
    props: ['host'],
    methods: {
        login(){            
            axios({
              method: "POST",
              url: `${this.host}` +`/users/login`,
              data: {
                email: this.inputLogin.email,
                password: this.inputLogin.password
              }
            })
            .then(({data}) => {
              localStorage.setItem("token", data)
              this.$emit("resettoken", data)
              this.inputLogin.email = ""
              this.inputLogin.password = ""
              this.$router.push('/')
              axios({
                method: "POST",
                url: `${this.host}` +`/carts`,
                headers: {
                    token: localStorage.getItem("token")
                }
              })
                .then(({data}) => {
                    console.log(data)
                    localStorage.setItem("cartId", data._id)
                    window.location.reload()
                })
                .catch((error) => {
                    console.log(error.response);
                });
            })
            .catch(err => {
              console.log("masuk err client")
              console.log(err)
            })
        }
    }

}
</script>

<style>

</style>