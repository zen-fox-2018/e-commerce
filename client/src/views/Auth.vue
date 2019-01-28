<template>
    <div>
      <div class="tengah">
        <!-- Sign In -->
        <div v-if="isSignin" class="card" style="width: 25rem;">
            <div class="card-body">
                <h5 class="card-title text-center">Sign In</h5>
                <a>Email</a>
                    <input v-model="input.email" type="text" class="form-control my-3">
                <a>Password</a>
                    <input v-model="input.password" type="password" class="form-control my-3">
                <p>Don't have an account?<a @click="switchToSignup" href="#"> Sign Up here!</a></p>
                <div class="row justify-content-center">
                    <button @click="signIn" type="button" class="btn btn-outline-dark text-center">Sign In</button>
                </div>
            </div>
        </div>
        <!-- Sign Up -->
        <div v-if="!isSignin" class="card" style="width: 25rem;">
            <div class="card-body">
                <h5 class="card-title text-center">Sign Up</h5>
                <a>Name</a>
                    <input v-model="input.name" type="text" class="form-control my-3">
                <a>Email</a>
                    <input v-model="input.email" type="text" class="form-control my-3">
                <a>Password</a>
                    <input v-model="input.password" type="password" class="form-control my-3">
                <div class="row justify-content-center">
                    <button @click="signUp" type="button" class="btn btn-outline-dark text-center">Sign Up</button>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Auth',
  data() {
    return {
      isSignin: true,
      input: {
        name: '',
        email: '',
        password: ''
      },
      server: 'http://localhost:3000',
    }
  },
  methods: {
    switchToSignup() {
      this.isSignin = false;
    },
    signIn() {
      axios({
        method: 'post',
        url: `${this.server}/users/signin`,
        data: {
          email: this.input.email,
          password: this.input.password,
        },
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
          this.$emit('success_login');
          this.input = {'name':'', 'email':'', 'password':''};
          this.$router.push('/') 
        })
        .catch(({ response }) => {
          swal('Oops',`${response.data.message}`,'error');
        });
    },
    signUp() {
      axios({
        method: 'post',
        url: `${this.server}/users/signup`,
        data: {
          name: this.input.name,
          email: this.input.email,
          password: this.input.password,
        }
      })
        .then(({ data }) => {
          swal('Horray', 'Successfully Signup', 'success');
          this.isSignin = true;
          this.input = {name:'', email:'', password:''};
        })
        .catch(({ response }) => {
          swal('Oops', `${response.data.message}`, 'error');
        })
    },
  },
  mounted() {
    let token = localStorage.getItem('token');
    if (token) {
      this.$router.push('/')
    } 
  }
}
</script>

<style scoped>
.tengah {
display: flex;
justify-content: center;
align-items: center;
height: 100vh; 
}
</style>
