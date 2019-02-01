<template>
  <v-layout row>
    <v-flex xs12 sm12 md12 lg12>
      <v-carousel dark>
        <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        >
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      items: [
        {
          src: 'https://storage.seikowatches.com/production/images/2018/03/premier_16-9_21081509799008.jpg'
        },
        {
          src: 'https://www.baume-et-mercier.com/content/dam/ric-import/bem/826d/7164/1818288.png.transform.bemfw.jpeg'
        },
        {
          src: 'https://static2.fashionbeans.com/wp-content/uploads/2018/03/watches-afford-6t.jpg'
        }
      ]
    }
  }
}
</script>

<style>

</style>
