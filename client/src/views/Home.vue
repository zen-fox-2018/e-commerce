<template>
  <div class="home">
    <v-carousel
      height="600"
      delimiter-icon="stop"
      prev-icon="mdi-arrow-left"
      next-icon="mdi-arrow-right"
    >
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
    <router-link to="/products"> <v-img to="products" class="mx-auto" style="margin: 50px 0" src="https://dopemail.com/wp-content/uploads/2017/05/shopnowbutton-2.png" max-width="200"></v-img> </router-link>
    <v-container fluid grid-list-sm>
      <v-layout>
        <v-flex xs6 sm4>
          <v-img
            src="https://res.cloudinary.com/dbhtpfdxc/image/upload/v1522123148/banner5_ijccjl.jpg"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          ></v-img>
        </v-flex>

        <v-flex xs6 sm4>
          <v-img src="https://res.cloudinary.com/dbhtpfdxc/image/upload/v1522123151/banner4_mfeq5n.jpg">
            <div class="fill-height bottom-gradient"></div>
          </v-img>
        </v-flex>

        <v-flex xs6 sm4>
          <v-img src="https://res.cloudinary.com/dbhtpfdxc/image/upload/v1522123095/banner6_hyuqiz.jpg">
            <div class="fill-height repeating-gradient"></div>
          </v-img>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
   
  },
  data() {
    return {
      items: [
          {
            src: 'https://res.cloudinary.com/dbhtpfdxc/image/upload/v1525965630/sl5-min-1_hua4x1.jpg'
          },
          {
            src: 'https://res.cloudinary.com/dbhtpfdxc/image/upload/v1525966123/sl71-min_kdbf5s.jpg'
          },
          {
            src: 'https://res.cloudinary.com/dbhtpfdxc/image/upload/v1525965626/sl6-min_nf39oq.jpg'
          },
          {
            src: 'https://res.cloudinary.com/dbhtpfdxc/image/upload/v1525965641/sl4-min_npgsmv.jpg'
          }
        ]
    }
  },
}
</script>

<style lang="stylus">
  #example-custom-transition
    .fade
      &-enter-active, &-leave-active, &-leave-to
        transition: .3s ease-out
        position: absolute
        top: 0
        left: 0

      &-enter, &-leave, &-leave-to
        opacity: 0
</style>

