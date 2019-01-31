<template>
    <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="300"
    offset-x
    >
        <v-btn
        flat
        slot="activator"
        color="brown"
        dark
        >
            Login
        </v-btn>

        <v-card>
             <v-container>

            <form>
                <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                ></v-text-field>
                <v-text-field
                v-model="password"
                :append-icon="show1 ? 'visibility_off' : 'visibility'"
                :type="show1 ? 'text' : 'password'"
                :error-messages="passwordError"
                name="input-10-1"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
                @change="$v.password.$touch()"
                @blur="$v.password.$touch()"
                ></v-text-field>

                <v-btn @click="submit">submit</v-btn>
                <v-btn @click="clear">clear</v-btn>
            </form>
            </v-container>


        </v-card>
    </v-menu>

</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email , minLength } from 'vuelidate/lib/validators'

export default {
    name: 'Login',
    mixins: [validationMixin],

    validations: {
        email: { required, email },
        password: { required, minLength : minLength(8)}
    },

    data: () => ({
        show1: false,
        password: '',
        email: '',
        menu: false,
    }),

    computed: {
        emailErrors () {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },
        passwordError() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('Password is required')
            !this.$v.password.minLength && errors.push('Password Must Have 8 characters')
            return errors
        }
    },

    methods: {
        submit () {
            let url = "http://localhost:3000/users/login"
            this.$v.$touch()
            this.axios({
                method: 'post',
                url,
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                localStorage.setItem('token', data.token)
                this.$swal('Success Login', '', 'success')
                this.$emit('checkLogin')
                this.menu = false
            })
        },
        clear () {
            this.$v.$reset()
            this.password= ''
            this.email = ''
        }
    }
}
</script>
