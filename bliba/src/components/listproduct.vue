<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          :src="product.img_url"
          aspect-ratio="1.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{product.name}}</h3>
            <div>Price : {{product.price}}  Stock : {{product.stock}}</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Add to cart</v-btn>
          <v-btn flat color="orange">Detail</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
    props : ['product']
}
</script>

<style>

</style>
