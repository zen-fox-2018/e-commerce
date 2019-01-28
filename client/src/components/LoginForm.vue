<template>
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
      type="password"
      :error-messages="passwordErrors"
      label="Password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>

    <v-btn color="#B43244" block @click="submit">login</v-btn>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) }
  },

  data: () => ({
    email: '',
    password: ''
  }),

  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be at least 8 characters long')
      !this.$v.password.required && errors.push('Password is required')
      return errors
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        let dataUser = {
          email: this.email,
          password: this.password
        }
        this.$http
          .post('/login', dataUser)
          .then(({data}) => {
            localStorage.setItem('token', data.token)
            this.$router.replace('/')
            Swal.fire('Welcome', 'Login Success', 'success')
            this.$emit('login', 'success')
          })
          .catch(({response}) => {
            Swal.fire(response.data.message, response.data.error, 'error')
            this.$emit('login')
            this.$router.replace('/login')
          })
      }
    }
  }
}
</script>
