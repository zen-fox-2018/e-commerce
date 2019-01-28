<template>
  <div class="">
    <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    >
    <v-jumbotron dark>
          <v-container fill-height>
            <v-layout align-center>
              <v-flex>
                <h3 class="display-4">51Kards</h3>
                <span class="display-1">"A place to learn magic tricks</span>
                <h5 class="display-1">and buy incredible playing cards"</h5>
              </v-flex>
            </v-layout>
          </v-container>
    </v-jumbotron>
    </v-carousel-item>
  </v-carousel>
  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    components: {
      // HelloWorld
    },
    data () {
      return {
        items: [
          {
            src: 'https://i.ytimg.com/vi/fcP8rqxvx0E/maxresdefault.jpg'
          },
          {
            src: 'https://cdn.shopify.com/s/files/1/0661/4305/products/Spread_Update.jpg?v=1500663350'
          },
          {
            src: 'https://www.ellusionist.com/media/catalog/product/cache/1/trailer_thumbnail_image/9df78eab33525d08d6e5fb8d27136e95/b/t/bt7_1.jpg'
          },
          {
            src: 'https://cdn.shopify.com/s/files/1/0013/7332/products/NPH-11_1024x1024.jpg?v=1479262308'
          }
        ]
      }
    },
  }
</script>
