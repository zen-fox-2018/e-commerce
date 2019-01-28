<template>
  <div class="container">
    <h3>Register</h3>
    <form v-on:submit.prevent="loginUser">
      <div class="form-group">
        <input v-model="name" type="text" class="form-control" id="exampleInputName1" placeholder="Enter Name">
      </div>
      <div class="form-group">
        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <div class="form-group">
        <input v-model="address" type="text" class="form-control" id="exampleInputAddress1" placeholder="Enter Address">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      address: ''
    }
  },
  methods: {
    loginUser () {
      axios
        .post(`http://localhost:3000/users`, {
          data: {
            name: this.name,
            email: this.email,
            password: this.password,
            address: this.address
          }
        })
        .then(({data}) => {
          console.log(data)
        }).catch((err) => {
          console.log(err)
        });
    }
  }
}
</script>

<style>
    .container {
        margin-top: 40px;
        width: 500px;
    }
</style>
