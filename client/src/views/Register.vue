<template>
  <div class="">
    <br>
    <center><h1>Register Account</h1></center>
    <v-container grid-list-md text-xs-center>
      <center>
        <v-flex xs6>
          <v-form
          ref="form"
          >

          <v-text-field
          v-model="name"
          label="Name"
          required
          ></v-text-field>

          <v-text-field
          v-model="username"
          label="username"
          required
          ></v-text-field>

          <v-text-field
          v-model="email"
          label="E-mail"
          required
          ></v-text-field>

          <v-text-field
          v-model="password"
          type="password"
          name="input-10-1"
          label="Password"
          ></v-text-field>

          <v-btn
          color="black" dark
          @click="registerAccount"
          >
          Register Account
          </v-btn>

          </v-form>
        </v-flex>
      </center>
    </v-container>
  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    components: {
      // HelloWorld
    },
    data: () => {
      return {
        name: "",
        username: "",
        email: "",
        password: "",
      }
    },
    props: ['url'],
    methods: {
      registerAccount() {
        let obj = {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password,
        }

        axios.post(`${this.url}/users`, obj)
          .then((user) => {
            console.log('Berhasil tambah user');
            this.name = ""
            this.username = ""
            this.email = ""
            this.password = ""
            this.$router.push('/login')
          })
          .catch((error) => {
            console.log(error.message);
          })
      }
    }
  }
</script>
