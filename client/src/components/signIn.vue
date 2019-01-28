<template>
    <b-card class="text-center mx-auto my-3" style="max-width: 70%;">
        <b-form @submit.prevent="signIn" >
            <b-form-group class="text-left" label="Email address:">
                <b-form-input type="email" v-model="email" required placeholder="Enter email"></b-form-input>
            </b-form-group>

            <b-form-group class="text-left" label="Password:" >
                <b-form-input type="password" v-model="password" required placeholder="Enter password"></b-form-input>
            </b-form-group>

            <b-button @click="closeSignInForm" variant="light" class="float-right">Close</b-button>
            <b-button type="submit" variant="dark" class="float-right mr-2">Sign In</b-button>
        </b-form>
    </b-card>
</template>

<script>
export default {
  name: 'signInForm',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      axios({
        method: 'post',
        url: `http://localhost:3000/users/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(resp => {
          let data = resp.data.data
          localStorage.setItem('token', resp.data.token)
          let user = {
            id: data._id,
            name: data.name,
            email: data.email,
            address: data.address,
            image: data.image
          }
          swal('Yeay!', 'You sign in!', 'success')
          this.$emit('login', user)
          this.$router.push({ name: 'home' })
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    closeSignInForm () {
      this.$router.push({ name: 'home'})
    }
  }
}
</script>

<style>

</style>
