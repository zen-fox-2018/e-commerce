<template>
  <form>
    <v-btn color="blue-grey" class="white--text">
      <v-icon right dark>cloud_upload</v-icon>Upload
    </v-btn>
      <input type="file" class="white--text v-btn theme--light blue-grey">

    <v-text-field
      v-model="fullname"
      :error-messages="fullnameErrors"
      :counter="50"
      label="Fullname"
      required
      @input="$v.fullname.$touch()"
      @blur="$v.fullname.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="password"
      type="password"
      :error-messages="passwordErrors"
      label="Password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="repeatPassword"
      type="password"
      :error-messages="repeatPasswordErrors"
      label="Repeat Password"
      required
      @input="$v.repeatPassword.$touch()"
      @blur="$v.repeatPassword.$touch()"
    ></v-text-field>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>

    <v-btn color="#B43244" block @click="submit">register</v-btn>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  minLength,
  sameAs
} from "vuelidate/lib/validators";

export default {
  components: {},
  mixins: [validationMixin],

  validations: {
    fullname: { required, maxLength: maxLength(50) },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    checkbox: {
      checked(val) {
        return val;
      }
    },
    repeatPassword: { required, sameAsPassword: sameAs("password") }
  },

  data: () => ({
    fullname: "",
    email: "",
    password: "",
    repeatPassword: "",
    checkbox: false
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    fullnameErrors() {
      const errors = [];
      if (!this.$v.fullname.$dirty) return errors;
      !this.$v.fullname.maxLength &&
        errors.push("Fullname must be at most 50 characters long");
      !this.$v.fullname.required && errors.push("Fullname is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be at least 8 characters long");
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
    repeatPasswordErrors() {
      const errors = [];
      if (!this.$v.repeatPassword.$dirty) return errors;
      !this.$v.repeatPassword.sameAsPassword &&
        errors.push("Repeat Password must be the same as password");
      !this.$v.repeatPassword.required &&
        errors.push("Repeat Password is required");
      return errors;
    }
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const newUser = {
          fullname: this.fullname,
          email: this.email,
          password: this.password
        };
        this.$http
          .post("/register", newUser)
          .then(({ data }) => {
            (this.fullname = ""),
              (this.email = ""),
              (this.password = ""),
              (this.repeatPassword = "");
            this.$router.push("login");
          })
          .catch(({ response }) => {
            console.log(response);
          });
      }
    }
  }
};
</script>