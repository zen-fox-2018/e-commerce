<template>
  <div id="container" class="container">
    <div class="main-row row">
      <div v-for = "item in items" class="item" @click="showItem(item._id)">
        <div class="row item-card">
          <div class="col-12 card-img">
            <div>
              <div v-show="Number(item.discount) >0" id="discount">
                <span >{{item.discount* 100}} %</span>
                </div>
            </div>
            <img :src="item.thumbUrl"/>
          </div>
          <div class="col-12 card-body">

            <strong>
              <p>{{item.name}}</p>
            </strong>
            <p id="item-price">Rp. {{item.price}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>
<style>
  #container {
    max-width: 100vw;
  }
  #discount {
    width: 50px;
    height: 30px;
    background-color: rgb(253, 86, 86);
    color:black;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
  .main-row {
    justify-content: flex-start;
  }
  .item {
   margin: 10px 50px;
  }
  .item:hover {
    cursor: pointer;
    background-color: black;
    border: rgb(255, 244, 244) solid 1px;
    opacity: 0.9;
  }
  .item-card {
    height: 300px;
    width: 190px;
  }
  .card-img {
    background-color: rgb(242, 250, 250);
    height: 60%;
    padding: 0 0;
  }
  .card-body {
    background-color:white;
    height: 40%
  }
</style>
<script>
export default {
  props: ['items'],
  data() {
    return {
    }
  },
  methods: {
    showItem (itemId) {
      this.$router.push({ name: 'item', params: { itemId } })
    }
  }
}
</script>
