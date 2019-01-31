<template>
  <div id="home">
     <v-layout column>
       <v-flex xs12>
        <router-view></router-view>
       </v-flex>
      <homepage />

     </v-layout>
  </div>
</template>

<script>
  import homepage from '../components/HomePage.vue'

  export default {
    data() {
      return {

      }
    },
    components: {
      homepage
    },
    methods: {

    },
    created() {

    },
  }
</script>
