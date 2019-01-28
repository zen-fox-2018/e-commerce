<template>
    <b-card-group columns style="column-count: 4;" class="mt-2 mx-2">
        <div v-for="product in products" :key="product.id">

            <router-link :to="{ name: 'product', params: { id: product._id }}" style="color: black;">
                <b-card style="cursor:pointer;" :img-src='product.image' :img-alt="product.img" img-top>
                    <h4 class="text-left " style="cursor: pointer;">{{ product.name }}</h4>
                    <hr>
                    <div class="card-text">
                        <p v-if="product.description" class=" text-left"> {{product.description}}</p>
                        <p class="text-right">IDR {{ product.price.toLocaleString() }} </p>
                    </div>
                </b-card>
            </router-link>
        </div>
    </b-card-group>
</template>

<script>

export default {
  name: 'ProductList',
  props: {
    products: Array,
  },
  methods: {
  }
}
</script>

<style>

</style>
