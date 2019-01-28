<template>
  <v-container>
      <v-layout row>
        <v-flex>  
          <v-card height="35rem" dark>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Register</h3>
                <div></div>
                </div>
            </v-card-title>
            <v-container dark>
                <v-form>
                    <v-text-field
                    v-model="name"
                    :counter="20"
                    label="Name"
                    required
                    ></v-text-field>

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
                    <input type="file" @change="uploadAvatar">

                    <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree?"
                    required
                    ></v-checkbox>

                    <v-btn 
                    @click.prevent="register"
                    v-on:click.prevent="loader = 'loading'"
                    :loading="loading"
                    :disabled="loading"
                    color="secondary"
                    >
                    Register
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
  name: 'RegisterPage',
  data() {
    return {
      checkbox: false,
      name: '',
      email: '',
      password: '',
      avatar: '',
      snackbar: false,
      y: 'top',
      timeout: 10000,
      message: '',
      loader: null,
      loading: false,
      color: '',
      icon: ''
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 2000)
      this.loader = null
    }
  },
  methods: {
    register () {
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('email', this.email)
      formData.append('password', this.password)
      formData.append('avatar', this.avatar)
      this.$axios({
        method: `POST`,
        url: `${url}/users`,
        data: formData
      })    
      .then(({ data }) => {
          this.snackbar = true
          this.message = `Thank you for join our website ${data.name}, please login`
          this.color = 'green'
          this.icon = 'check_circle'
          this.$emit('is-register', {
            snackbar: this.snackbar,
            color: this.color,
            message: this.message,
            icon: this.icon
          })
          this.name = ''
          this.email = ''
          this.password = ''
          this.avatar = ''
      })
      .catch(err => {
        this.snackbar = true
        this.color = 'red'
        this.message = err.response.data
        this.icon = 'error'
        this.$emit('is-register', {
          snackbar: this.snackbar,
          color: this.color,
          message: this.message,
          icon: this.icon
        })
      })
    },
    uploadAvatar: function (img) {
      this.avatar = img.target.files[0]
    }
  }
}
</script>

<style>

</style>
