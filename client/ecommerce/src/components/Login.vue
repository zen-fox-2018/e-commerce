<template>
    <div class="modal fade" id="loginmodal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginModalLabel">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body"> 
                    <div class="grid">        
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
              url: `${this.host}/users/login`,
              data: {
                email: this.inputLogin.email,
                password: this.inputLogin.password
              }
            })
            .then(response => {
              localStorage.setItem("token", response.data)
              this.$emit("resettoken", response.data)
              this.inputLogin.email = ""
              this.inputLogin.password = ""
              window.location.reload()
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