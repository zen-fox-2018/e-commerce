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
            src: 'https://ksr-ugc.imgix.net/assets/022/585/600/8bc73e9f6183c9162aef0ea633c0fdaa_original.jpg?ixlib=rb-1.1.0&crop=faces&w=1552&h=873&fit=crop&v=1537226383&auto=format&frame=1&q=92&s=88259b42428028284bd7df67d06c29ef'
          },
          {
            src: 'https://cdn.shopify.com/s/files/1/0013/7332/products/NPH-11_1024x1024.jpg?v=1479262308'
          }
        ]
      }
    },
  }
</script>
