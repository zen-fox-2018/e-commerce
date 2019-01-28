<template>
  <v-toolbar dark color="primary" fixed app>
    <v-toolbar-side-icon>
      <router-link to="/" class="white--text"><v-icon>home</v-icon></router-link>
    </v-toolbar-side-icon>

    <v-toolbar-title>
      <img src="../assets/mainlogo.png" style="max-width: 20%; margin-right: 30rem;">
    </v-toolbar-title>
    <v-spacer></v-spacer>
        <v-btn
            color="primary"
            dark
            flat:true
            small
            right
            round:true
            to="/admin"
        >
            <v-icon>supervisor_account</v-icon>
            Admin
        </v-btn>
        <v-btn
            color="primary"
            dark
            flat:true
            small
            right
            round:true
            @click.prevent="logout">
          Logout
        </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      menu: false
    }
  },
  props: ['newCart'],
  methods: {
    logout () {
      localStorage.clear()
      this.$router.replace('/')
      this.$emit('check-logout-admin')
    },
  }
}
</script>

<style>

</style>
