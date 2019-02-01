<template>
  <div>
    <br><br>
    <h1>All Items</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Items</th>
          <th scope="col">Image</th>
          <th scope="col">Price</th>
          <th scope="col">50% Weekly Discount</th>
          <th scope="col">Discount Price</th>
          <th scope="col">Hours Remaining</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="`item-${index}`">
          <td>{{ item.name }}</td>
          <td><img :src="item.image" height="50px" width="50px"></td>
          <td>{{ item.price }}</td>
          <td v-if="item.dayRemaining !== 0">50% Off</td>
          <td v-else><button @click="setDiscount(item._id)" class="btn btn-outline-dark btn-sm">Discount</button></td>
          <td>{{ item.discountPrice }}</td>
          <td>{{ item.dayRemaining }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Items',
  data() {
    return {
      server: 'http://localhost:3000',
      items: []
    }
  },
  methods: {
    getAlItem() {
      axios({
        method: 'get',
        url: `${this.server}/items`
      })
      .then(({ data }) => {
        console.log('------_>>')
        console.log(data, 'ini data darir items vue');
        this.items = data;
      })
      .catch((err) => {
        console.log(err);
      })
    },
    setDiscount(val) {
      axios({
        method: 'put', 
        url: `${this.server}/items/setdiscount/${val}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        console.log(data);
        this.getAlItem();
        swal('Horrary', 'Success set up discount', 'success')
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
  created() {
    this.getAlItem();
    if (localStorage.getItem('role') == 'false') {
      this.$router.push('/');
    }
  }
}
</script>

<style>

</style>
