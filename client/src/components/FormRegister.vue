<template>
  <div id="modalRegister" class="modal mt-5 backdrop-black">
    <div class="w3-modal-content w3-card-4 w3-animate-zoom content-backdrop" style="max-width:600px">

      <div class="w3-center"><br>
        <span onclick="document.getElementById('modalRegister').style.display='none'" class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
        <img src="../assets/image/jumbotron.jpeg" alt="Avatar" style="width:30%" class="w3-circle w3-margin-top">
      </div>

      <h5>Create Account</h5>
      <form class="w3-container" action="" @submit.prevent="registerMethod">
        <div class="w3-section">
          <label><b>Full Name</b></label>
          <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter Username" name="usrname" required v-model="register.name">
          <label><b>Email</b></label>
          <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter Email" name="email" required v-model="register.email">
          <label><b>Password</b></label>
          <input class="w3-input w3-border" type="password" placeholder="Enter Password" name="psw" required v-model="register.password">
          <button class="w3-button w3-block w3-green w3-section w3-padding" type="submit">Register</button>
        </div>
      </form>

      <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
        <button onclick="document.getElementById('id01').style.display='none'" type="button" class="w3-button w3-red">Cancel</button>
        <span class="w3-right w3-padding w3-hide-small">Already have an account? <a href="#" @click.prevent="showFormLogin">Sign In</a></span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'FormRegister',
  props: ['showFormRegister'],
  data() {
    return {
      register: {
        name: '',
        email: '',
        password: ''
      },
    }
  },
  methods: {
    registerMethod() {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/users/register',
        data: this.register
      })
        .then(({data}) => {
          swal('Success')
          this.showFormLogin()
        })
        .catch(err => {
          swal(err.response.data)
        })
    },
    showFormLogin() {
      this.$emit('showFormLogin')
      document.getElementById('modalRegister').style.display = "none";
    }
  },
  watch: {
    showFormRegister(v) {
      document.getElementById('modalRegister').style.display = "block";
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

