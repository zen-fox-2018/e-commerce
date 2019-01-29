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
        <AddProductsForm v-if="!$route.params.id"></AddProductsForm>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AddProductsForm from '@/components/AddProductsForm.vue'
export default {
  components: {
    AddProductsForm
  }
}
</script>
