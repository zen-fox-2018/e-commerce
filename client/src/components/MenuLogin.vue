<template>
  <v-menu flat
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="175"
    offset-y
  >
    <v-btn
      slot="activator"
      color="#B43244">
      Login
    </v-btn>

    <v-card>
      <v-container>
        <LoginForm @login="login"></LoginForm>
      </v-container>
    </v-card>
  </v-menu>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
export default {
  data: () => ({
    menu: false
  }),
  components: {
    LoginForm
  },
  methods: {
    login (data) {
      this.menu = false
      if (data) {
        this.$emit('login-success')
      }
    }
  }
}
</script>
