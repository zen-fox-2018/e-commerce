<template>
  <v-container style="padding-top: 100px;">
    <v-layout row>
      <v-flex xs12 sm12 md12 lg12>
        <v-card height="30rem" dark style="margin-left:20px;">
          <v-card-title primary-title>
              <div>
                  <h3 class="headline mb-0">Login</h3>
              </div>
          </v-card-title>
          <v-container dark>
            <v-form>
              <v-text-field
              v-model="email"
              label="E-mail"
              required
              ></v-text-field>

              <v-text-field
              v-model="password"
              label="Password"
              type="password"
              >
              </v-text-field>
              <v-btn 
              @click.prevent="login"
              v-on:click.prevent="loader = 'loading'"
              :loading="loading"
              :disabled="loading"
              color="secondary">
              Login
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      email: '',
      password: '',
      snackbar: false,
      y: 'top',
      timeout: 10000,
      color: '',
      message: '',
      icon: '',
      loader: null,
      loading: false
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 5000)
      this.loader = null
    }
  },
  created () {
    if (localStorage.getItem('token') && (this.$route.name === 'login')) {
      this.$router.replace('/')
    }
  },
  methods: {
    login () {
      this.$axios({
        method: `POST`,
        url: `/users/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        this.snackbar = true
        this.color = 'green'
        this.message = `Welcome back, ${data.name}!`
        this.icon = 'check_circle'
        this.$emit('check-login', {
          status: true,
          snackbar: this.snackbar,
          color: this.color,
          message: this.message,
          icon: this.icon
        })
        this.$emit('is-login')
        if (this.loader === null) {
          this.$router.replace('/')
        }
        if (localStorage.getItem('token') && this.$route.name === 'login') {
          this.$router.replace('/')
        }
      })
      .catch(err => {
        this.snackbar = true
        this.color = 'red'
        this.message = err.response.data.msg
        this.icon = 'error'
        this.$emit('check-login', {
          status: false,
          snackbar: this.snackbar,
          color: this.color,
          message: this.message,
          icon: this.icon
        })
      })
    }
  }
}
</script>

<style>

</style>
