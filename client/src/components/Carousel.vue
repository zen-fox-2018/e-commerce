<template>
  <div>
    <b-carousel id="carousel1" controls indicators :interval="3000" v-model="slide" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
      <b-carousel-slide>
          <img slot="img" class="d-block img-fluid center" width="1024" height="768" src="http://www.gunjap.net/site/wp-content/uploads/2011/08/1226.jpg" alt="image slot">
      </b-carousel-slide>
      <b-carousel-slide>
          <img slot="img" class="d-block img-fluid center" width="1024" height="768" src="https://cdn-ak.f.st-hatena.com/images/fotolife/c/candywrite/20181002/20181002105933.jpg" alt="image slot">
      </b-carousel-slide>
      <b-carousel-slide>
          <img slot="img" class="d-block img-fluid center" width="1024" height="768" src="http://www.bandai.co.jp/candy/gundam/converge/sharp13/bannerLL.1810.jpg" alt="image slot">
      </b-carousel-slide>
      <b-carousel-slide>
          <img slot="img" class="d-block img-fluid center" width="1024" height="768" src="http://www.gunjap.net/site/wp-content/uploads/2011/08/1226.jpg" alt="image slot">
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: 'carousel',
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>