<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs10 md5 lg4>
        <div class="display-3 font-weight-black red--text text--darken-4">
          PakMan
        </div>
        <div class="title font-weight-bold">
          Register New Account Now!
        </div>

        <RegisterForm></RegisterForm>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue'
export default {
  props: ['token'],
  components: {
    RegisterForm
  },
  mounted () {
    if (this.token) {
      this.$router.replace('/products')
    }
  }
}
</script>
