<template>
  <div class="home">
    <MainPage @detail_item="itemToDetail" @item_from_mainpage="itemToCart"></MainPage>
  </div>
</template>

<script>
// @ is an alias to /src
import MainPage from '@/components/MainPage.vue';

export default {
  name: 'home',
  components: {
    MainPage,
  },
  methods: {
    itemToCart(item) {
      console.log('masuk item to carttt siap ngeemit ke app', item)
      this.$emit('item_from_home', item)
    },
    itemToDetail(item) {
      this.$emit('detailitem_from_home', item)
    },
  }
};
</script>
