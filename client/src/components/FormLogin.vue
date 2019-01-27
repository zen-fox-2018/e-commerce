<template>
  <div id="modalLogin" class="modal mt-5 backdrop-black">
    <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">

      <div class="w3-center"><br>
        <span onclick="document.getElementById('modalLogin').style.display='none'" class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
        <img src="../assets/image/jumbotron.jpeg" alt="Avatar" style="width:30%" class="w3-circle w3-margin-top">
      </div>

      <h5>Sign In</h5>
      <form class="w3-container" action="" @submit.prevent="loginMethod">
        <div class="w3-section">
          <label><b>Email</b></label>
          <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter Email" name="email" required v-model="login.email">
          <label><b>Password</b></label>
          <input class="w3-input w3-border" type="password" placeholder="Enter Password" name="psw" required v-model="login.password">
          <button class="w3-button w3-block w3-green w3-section w3-padding" type="submit">Login</button>
        </div>
      </form>

      <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
        <button onclick="document.getElementById('id01').style.display='none'" type="button" class="w3-button w3-red">Cancel</button>
        <span class="w3-right w3-padding w3-hide-small">No account? <a href="#" @click.prevent="showFormRegister">Create one</a></span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'FormLogin',
  props: ['showFormLogin'],
  data() {
    return {
      login: {
        email: '',
        password: ''
      },
    }
  },
  methods: {
    loginMethod() {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/users/login',
        data: this.login
      })
        .then(({data}) => {
          swal('success')
          this.login = {
            email: '',
            password: ''
          }
          if (data.user.role === 'admin') {
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('user', JSON.stringify(data.user))
          } else {
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('user', JSON.stringify(data.user))
          }
          this.$emit('cekLogin')
          document.getElementById('modalLogin').style.display = "none"
          this.$router.push({path: '/'})
        })
        .catch(err => {
          swal(err.response.data)
        })
    },
    showFormRegister() {
      console.log('masuk')
      this.$emit('showFormRegister')
      document.getElementById('modalLogin').style.display = "none";
    }
  },
  watch: {
    showFormLogin(v) {
      document.getElementById('modalLogin').style.display = "block";
    } 
  }
}
</script>

<style>
.backdrop-black {
  background-color: black;
  opacity: 0.9;
}
</style>