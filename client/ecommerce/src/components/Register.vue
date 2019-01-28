<template>
    <div class="modal fade" id="registermodal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="registerModalLabel">Register</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body"> 
                    <div class="grid">    
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
    data() {
        return {
            inputRegister: {
            name: "",
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
              this.inputRegister.email = ""
              this.inputRegister.password = ""
              window.location.reload()
            })
            .catch(err => {
              console.log(err)
            })
        }

    }
}
</script>

<style>

</style>

})