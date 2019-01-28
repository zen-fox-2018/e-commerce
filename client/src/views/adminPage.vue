<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <header>Fake Zappos</header>
        <hr>
        <span>{{message}}!</span>
        <button @click="signOut" class="btn btn-link btn-sm">sign out</button>
      </div>
    </div>
    <div class="row border">
      <div class="main-nav col-4">
        <h4 class="mt-2 mb-5 pb-3 border-bottom">Customer List</h4>
        <ul v-for= "c in customers">
          <li>
            <a title="view transaction history" href="#" @click="viewHistory(c.index)">{{c.email}}</a>
          </li>
        </ul>
      </div>
      <div class="main-content col-8">
        <table class="table table-hover">
          <thead class="thead-dark">
            <tr class="row">
              <th class="col-3">cart_id</th>
              <th class="col-2">delivered? </th>
              <th class="col-2">cart_total</th>
              <th class="col-5">cart_items</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="transactionHist == null"> select from customer list to view history.</tr>
            <tr v-else-if="transactionHist =='none'"> customer's transaction history is empty.</tr>
            <tr v-else >
              <div v-for="t in transactionHist">
                <td>{{t._id}}</td>
                <td>{{t.delivered}}</td>
                <td>{{t.subtotal}}</td>
                <td>
                  <table class="container ml-3">
                    <thead class="row">
                      <th class="col col-5"> name </th>
                      <th class="col col-3"> price </th>
                      <th class="col col-2"> quantity </th>
                    </thead>
                    <tbody>
                      <div class="items-row" v-for="i in t.items">
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
  </div>
  

</template>

<script>
export default {
  data() {
    return {
      customers : [],
      transactionHist : null,
      message: 'Welcome, admin!'
    }
  },
  methods: {
    signOut() {
      localStorage.clear();
      this.$router.push('/');
    },
    viewHistory(customerIndex) {
      let data = this.customers[Number(customerIndex)];
      data.history.length > 0 ? this.transactionHist = data.history.filter(el => el !== null): this.transactionHist = 'none'
    }
  },
  mounted() {
    let self = this;
    function verifyAdmin () {
      axios({
        url: 'http://localhost:3000/verifyAdmin',
        method: 'GET',
        headers: {
          Authorization : localStorage.getItem('token')
        }
      })
      .catch(err => self.$router.push('/'))
    }
    function getCustomerData () {
      let counter = 0;
      let data = JSON.parse(localStorage.getItem('customers'));
      data.forEach(customer => {
        let template = {
          fullName : customer.firstName + ' ' + customer.lastName,
          id : customer._id,
          email: customer.email,
          history: customer.history,
          index: counter
        }
        counter++;
        self.customers.push(template);
      })
      console.log(self.customers)
    }
    getCustomerData();
 }  
}
</script>
<style scoped>
  header {
   font-size: 50px; 
  }
  .main-content {
    min-height: 50vh;
    background-color: #f1f1f1
  }
  table {
    max-width: 100%;
  }
  .items-row {
  }
  table tbody{
    max-width: 100%;
  }
</style>
