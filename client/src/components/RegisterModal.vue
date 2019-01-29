<template>
    <b-modal  class="text-center"
                v-model="showModalRegister"
                id="registerModal"
                ref="registerModal"
                title="Hi! Daftar yuk"
                @shown="clearForm"
                @hide="hideModal">
        <form @submit.prevent="handleRegister" id="registerForm">
            <b-form-input class="my-2"
                        type="email"
                        placeholder="Enter your email"
                        v-model="register.email"
                        required></b-form-input>
            <b-form-input class="my-2"
                        type="password"
                        placeholder="Enter your password"
                        v-model="register.password"
                        required></b-form-input>
            <b-form-input class="my-2"
                        type="text"
                        placeholder="Enter your first name"
                        v-model="register.firstName"
                        required></b-form-input>
            <b-form-input class="my-2"
                        type="text"
                        placeholder="Enter your last name"
                        v-model="register.lastName"
                        ></b-form-input>
        </form>
        <p class="mt-4"> Sudah daftar? <a style="cursor: pointer;" @click.prevent="showLogin"> <u> Kuy Login! </u></a> </p>
        <div slot="modal-footer" class="w-100">
            <b-btn class="float-right" variant="primary" @submit.prevent="handleRegister" type="submit" form="registerForm">
                Register
            </b-btn>
        </div>
    </b-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            register: {
                email: '',
                password: '',
                firstName: '',
                lastName: ''
            }
        }
    },
    computed: {
        ...mapState([
            'showModalRegister'
        ])
    },
    methods: {
        ...mapActions([
            'doregister',
            'showLoginModal'
        ]),
        clearForm () {
            ({...this.register} = '')
        },
        handleRegister () {
            this.doregister(this.register)
            this.$refs.registerModal.hide()
        },
        showLogin () {
            this.$refs.registerModal.hide()
            this.showLoginModal()
        },
        hideModal () {
            this.$store.commit('mutationShowRegister', false)
        }
    }
}
</script>

<style>

</style>
