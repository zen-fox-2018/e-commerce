<template>
    <div class="container-fluid">    
        <form method="post" class="form login" onsubmit="return false">             
            <div class="form__field">
                <label for="email"><i class="fa fa-envelope" style="color: #fff"></i><span class="hidden">Email</span></label>
                <input type="email" name="email" v-model="inputRegister.email" placeholder="email" class="form__input" required>
            </div>                
            <div class="form__field">
                <label for="password"><i class="fa fa-lock" style="color: #fff"></i><span class="hidden">Password</span></label>
                <input type="password" name="password" v-model="inputRegister.password" class="form__input" placeholder="password" required>
            </div>                
            <div class="form__field">
                <button id="buttonRegisterSubmit" data-dismiss="modal" v-on:click.prevent="register()">REGISTER</button>
            </div>                    
        </form>        
    </div>                
</template>

<script>
import axios from 'axios'

export default {    
    data() {
        return {
            inputRegister: {
                email: "",
                password: ""
            },
        }
    },
    props: ['token', 'host'],
    methods: {
        register() {
            axios({
              method: "POST",
              url: `${this.host}/users/register`,
              data: {
                email: this.inputRegister.email,
                password: this.inputRegister.password
              }
            })
            .then(response => {
              swal("Welcome! You have successfully registering");
              this.inputRegister.email = ""
              this.inputRegister.password = ""
              this.$router.push('/')
              window.location.reload()
            })
            .catch(err => {
              swal("Oops!", `${err.response.data.message}`, "error");
            })
        }

    }
}
</script>

<style>

</style>

})