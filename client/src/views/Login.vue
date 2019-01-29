<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs10 md5 lg4>
        <div class="display-3 font-weight-black red--text text--darken-4">
          PakMan
        </div>
        <div class="title font-weight-bold">
          Sign In Now!
        </div>

        <LoginForm @login="loginSuccess"></LoginForm>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
export default {
  props: ['token'],
  components: {
    LoginForm
  },
  methods: {
    loginSuccess (action) {
      if (action) {
        this.$emit('action-login')
      }
    }
  },
  mounted () {
    if (this.token) {
      this.$router.replace('/products')
    }
  }
}
</script>
