<template>
  <v-container grid-list-xs text-xs-center>
    <ProgressBar v-bind:dialog="dialog"></ProgressBar>
    <v-layout column wrap align-center>
      <v-flex xs12>
        <h1>Register</h1>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-xs>
          <v-card style="padding: 5vh; width: 60vh" align-center>
            <SuccessRegister v-bind:alert="success"></SuccessRegister>,
            <FailRegister v-bind:alert="fail"></FailRegister>
            <v-form ref="form" lazy-validation v-on:submit.prevent="register">
              <v-text-field v-model="email" :counter="10" label="Email" required></v-text-field>
              <v-text-field type="password" v-model="password" label="Password" required></v-text-field>
              <v-select
                v-model="provinsiForm"
                :items="provinsi"
                :rules="[v => !!v || 'Item is required']"
                label="Provinsi"
                required
              ></v-select>
              <v-select
                v-model="kotaForm"
                :items="kota"
                :rules="[v => !!v || 'Item is required']"
                label="Kota"
                required
              ></v-select>
              <v-btn type="submit" color="success" @click="validate">Register</v-btn>
            </v-form>
          </v-card>
        </v-container>
      </v-flex>
      <v-flex xs12>
        <h5>Already have account?</h5>
        <router-link to="Login">Login</router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import a from "../helpers/helpers.js";
import kotaJson from "../../public/kota.json";
import provinsiJson from "../../public/provinsi.json";
import ProgressBar from "../components/ProgressBar/Progress";
import SuccessRegister from "../components/Alert/Success/SuccessRegister";
import FailRegister from "../components/Alert/Fail/FailRegister";

export default {
  components: {
    ProgressBar,
    SuccessRegister,
    FailRegister
  },
  data() {
    return {
      provinsiForm: null,
      provinceId: null,
      cityId: null,
      kotaForm: null,
      dialog: false,
      success: false,
      fail: false,
      kota: [],
      provinsi: []
    };
  },
  methods: {
    register() {
      this.dialog = true;
      a.post(`/users`, {
        email: this.email,
        password: this.password,
        provinceId: this.provinceId,
        cityId: this.cityId
      })
        .then(result => {
          this.success = true;
          this.dialog = false;
          this.fail = false;
          console.log(result);
        })
        .catch(err => {
          this.success = false;
          this.dialog = false;
          this.fail = true;
          console.log(err);
        });
    }
  },
  watch: {
    provinsiForm: function() {
      let newKota = [];
      kotaJson.forEach(element => {
        if (element.province == this.provinsiForm) {
          newKota.push(element.city_name)
        }
      });
      this.kota = newKota
    },
    kotaForm: function () {
      kotaJson.forEach((element) => {
        if (element.city_name == this.kotaForm) {
          this.provinceId = element.province_id
          this.cityId = element.city_id
          
        }
      })
    }
  },
  mounted() {
    gapi.signin2.render("google-signin-button", {
      onsuccess: this.onSignIn
    });
  },
  created() {
    this.kota = kotaJson;
    provinsiJson.forEach(element => {
      this.provinsi.push(element.province);
    });
  }
};

//
</script>