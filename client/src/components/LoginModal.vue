<template>
    <b-modal v-model="showModalLogin"
                class="text-center"
                id="loginModal"
                ref="loginModal"
                title="Hi! Login yuk"
                @shown="clearForm"
                @hide="hideModal">
        <form @submit.prevent="handleLogin" id="loginForm">
            <b-form-input class="my-2"
                        type="email"
                        placeholder="Enter your email"
                        v-model="login.email"
                        required></b-form-input>
            <b-form-input class="my-2"
                        type="password"
                        placeholder="Enter your password"
                        v-model="login.password"
                        required></b-form-input>
        </form>
        <p class="mt-4"> Belum punya akun? <a style="cursor: pointer;" @click.prevent="showRegister"> <u> Daftar yuk! </u></a> </p>
        <div slot="modal-footer" class="w-100">
            <b-btn class="float-right" variant="primary" @submit.prevent="handleLogin" type="submit" form="loginForm">
                Login
            </b-btn>
        </div>
    </b-modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    data() {
        return {
            snackbar: false,
            login: {
                email: '',
                password: ''
            },
        }
    },
    computed: {
        ...mapState([
            'registerMessage',
            'showModalLogin',
            'isLogin'
        ])
    }, 
    methods: {
        ...mapActions([
            // `mapActions` also supports payloads:
            'dologin',
            'showRegisterModal'
        ]),
        clearForm () {
            ({...this.login} = '')
        },
        handleLogin () {
            this.dologin(this.login)
            this.$refs.loginModal.hide()
        },
        showRegister () {
            this.$refs.loginModal.hide()
            this.showRegisterModal()
        },
        hideModal () {
            this.$store.commit('mutationShowLogin', false)
        }
    }
}
</script>

<style>

</style>
