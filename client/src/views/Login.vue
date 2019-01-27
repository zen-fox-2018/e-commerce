<template>
  <v-container grid-list-xs text-xs-center justify-center="true">
    <v-layout column wrap align-center>
      <v-flex xs12>
        <h1>Login</h1>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-xs>
          <v-card style="padding: 5vh; width: 50vh">
            <FailLogin v-bind:alert="fail"></FailLogin>
            <v-form ref="form" v-on:submit.prevent="login" lazy-validation>
              <v-text-field v-model="email" :counter="10" label="Email" required></v-text-field>
              <v-text-field type="password" v-model="password" label="Password" required></v-text-field>
              <v-btn type="submit" color="success">Login</v-btn>
              <v-layout column wrap align-center>
                <div
                  id="google-signin-button"
                  style="margin: 2vh"
                  class="g-signin2"
                  data-onsuccess="onSignIn"
                ></div>
              </v-layout>
            </v-form>
          </v-card>
        </v-container>
      </v-flex>
      <v-flex xs12>
        <v-layout column wrap align-center>
          <router-link to="Register">Register</router-link>
        </v-layout>
        <h5>Dont have account?</h5>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import a from "../helpers/helpers.js";
import FailLogin from "../components/Alert/Fail/FailLogin";
import ProgressBar from "../components/ProgressBar/Progress";

export default {
  components: {
    ProgressBar,
    FailLogin
  },
  data() {
    return {
      fail: false
    };
  },
  methods: {
    login() {
      a.post(`/users/login`, {
        email: this.email,
        password: this.password
      })
        .then(result => {
          this.fail = false;
          for (const key in result.data) {
            localStorage[key] = result.data[key];
          }
          this.$router.replace("/shop");
        })
        .catch(err => {
          this.fail = true;
          console.log(err.data);
        });
    },
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log(`login`);
      console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log("Name: " + profile.getName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());
      var id_token = googleUser.getAuthResponse().id_token;
      a.post("/users/google", {
        token: id_token
      })
        .then(result => {
          for (const key in result.data) {
            localStorage[key] = result.data[key];
          }
          console.log(true);

          this.$router.replace("/");
        })
        .catch(err => {
          console.log(err.data);
        });
    },
    mounted() {
      gapi.signin2.render("google-signin-button", {
        onsuccess: this.onSignIn
      });
    }
  }
};
</script>