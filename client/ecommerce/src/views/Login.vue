<template>
  <div class="container">
    <h3>Sign In</h3>
    <form v-on:submit.prevent="loginUser">
      <div class="form-group">
        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <div class="form-group form-check">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import swal from 'sweetalert'

export default {
  data () {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    loginUser () {
      axios
        .post(`http://localhost:3000/login`, {
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(({data}) => {
          swal("Success!", "Thank You!", "success");
          this.$router.replace('/')
          localStorage.setItem('token', data.token)
        }).catch((err) => {
          swal("Ooppss!", "Make sure you input email / password correctly!", "warning")
        });
    }
  }
}
</script>

<style>
    .container {
        margin-top: 40px;
        width: 400px;
    }
</style>
