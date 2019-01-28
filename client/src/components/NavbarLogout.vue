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
    round:true
    to="/login"
    flat:true
    >
      <v-icon>
        input
      </v-icon>
    Login
    </v-btn>

    <v-btn 
    to="/register"
    round:true
    flat:true
    >
      <v-icon>
        assignment_ind
      </v-icon>
    Register
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'NavbarLogout'
}
</script>

<style>

</style>
