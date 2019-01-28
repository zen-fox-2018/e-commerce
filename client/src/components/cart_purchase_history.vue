<template>
  <div class="container">
    <div class="row">
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr class="row">
          <th class="col-3">cart_id</th>
          <th class="col-1">delivered? </th>
          <th class="col-2">mark delivered </th>
          <th class="col-2">cart_total</th>
          <th class="col-4">cart_items</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="history == null"> you haven't made any purchases yet.</tr>
        <tr v-else >
          <div class="row" v-for="cart in history">
            <td class="col-3">{{cart._id}}</td>
            <td class="col-2">
              {{cart.delivered}}
            </td>
            <td class="col-1">
              <input @click="markDelivered(cart._id)" v-if="!cart.delivered" type="checkbox"/>
              <span v-else><i class="fa fa-check" aria-hidden="true"></i>
              </span>
            </td>
            <td class="col-1">{{cart.subtotal}}</td>
            <td class="col-5">
              <table class="ml-3">
                <thead class="row">
                  <th class="col col-5"> name </th>
                  <th class="col col-3"> price </th>
                  <th class="col col-2"> quantity </th>
                </thead>
                <tbody>
                  <div class="items-row" v-for="i in cart.items">
                    <tr class="row">
                      <td class="col-4">{{i.item.name}}</td>
                      <td class="col-4">{{i.item.price}}</td>
                      <td class="col-4">{{i.quantity}}</td>
                    </tr>
                  </div>
                </tbody>
              </table>
            </td>
          </div>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>
<style scoped>

</style>

<script>
export default {
  data() {
    return {
      history :[]
    }
  },
  mounted() {
    let self = this;
    //get transaction history
    let options = {
      url: 'http://localhost:3000/users/find',
      method:'GET',
      headers: {
        authorization : localStorage.getItem('token')
      }
    }
    axios(options)
    .then(({data}) => {
      self.history = data.history 
    })
    .catch(err => console.warn(err));
  },
  methods: {
    setChecked() {
     $(event.target).attr('checked', true); 
    },
    markDelivered(cartid) {
      let self = this;
      let options = {
        url: 'http://localhost:3000/users/history/delivered',
        method:'PUT',
        headers: {
          cartid,
          authorization: localStorage.getItem('token')
        }
      }
      axios(options)
      .then(({data}) => {
        console.log(data.history)
        self.history = data.history
      }) 
    }
  }

}
</script>
