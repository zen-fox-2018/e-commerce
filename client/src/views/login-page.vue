<template>
  <div>
    <v-container style="margin:4vw; min-height:64vh">
      <v-layout>
        <div style="max-width:40vw; margin-right:6vw">
          <h1>Why us?</h1>
          <br>
          <hr>
          <br>
          <p>Literacy skills are all the skills needed for reading and writing.
            They include such things as awareness of the sounds of language, awareness of print,
            and the relationship between letters and sounds. Other literacy skills include vocabulary,
            spelling, and comprehension.</p>
          <hr>
          <br>
          <p>already have account? <a class="orange--text" @click="dialog = true">click here.</a></p>
        </div>
        <div style="width:40vw">
          <form @submit.prevent="signupMethod">
            <h2>Join with us now!</h2>
            <br>
            <v-flex xs12>
              <v-text-field label="Email" v-model="signup.email" required>
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Password" type="password" v-model="signup.password" required>
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <small>
                By clicking "Sign up", you acknowledge that you have read our updated <strong>terms of service</strong>
              </small>
            </v-flex>
            <v-btn type="submit" color="orange" class="white--text">Sign Up</v-btn>
          </form>
        </div>
      </v-layout>
    </v-container>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Signin</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <form @submit.prevent="loginMethod">
                  <v-flex xs12>
                    <v-text-field label="Email" v-model="login.email" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Password" type="password" v-model="login.password" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn type="submit" color="orange" class="white--text">Sign Up</v-btn>
                  </v-flex>
                </form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import server from '@/server/server.js'

export default {
  name: 'login-page',
  data () {
    return {
      signup: {
        email: '',
        password: ''
      },
      login: {
        email: '',
        password: ''
      },
      dialog: false
    }
  },
  methods: {
    signupMethod: async function () {
      try {
        let { data } = await server.post('/users', {
          email: this.signup.email,
          password: this.signup.password
        })
        swal('Success!', 'now you can login', 'success')
      } catch ({ response }) {
        swal('Invalid!', 'email field cant duplicated and all field is required!', 'error')
      }
    },
    loginMethod: async function () {
      try {
        let { data } = await server.post('/users/login', {
          email: this.login.email,
          password: this.login.password
        })
        localStorage.setItem('token', data.token)
        swal('Success Login', 'redirect to homepage', 'success')
        this.$router.push('/')
        this.$emit('loggedin')
      } catch ({ response }) {
        swal('Invalid!', 'wrong email / password', 'error')
      }
    }
  },
  mounted () {
    const token = localStorage.getItem('token')
    if (token) {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
