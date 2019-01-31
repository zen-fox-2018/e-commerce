<template>
  <v-footer
    app
    dark
    height="auto"
  >
    <v-card
      class="flex"
      flat
      tile
    >

      <v-card-actions class="grey darken-3 justify-center">
        &copy;{{ new Date().getFullYear() }} — <strong>BliBa</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({

    })
  }
</script>