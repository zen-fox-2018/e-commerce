<template>
    <div>
      <br><br><br>
      <h1>Transaction History</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Order</th>
            <th scope="col">Arrival</th>
            <th scope="col">Items</th>
          </tr>
        </thead>
        <tbody v-for="(transaction, index) in transactions" :key="`transaction-${index}`">
          <tr>
            <td>{{ getDate(transaction.transactionCreated) }}</td>
            <td v-if="transaction.transactionSuccess">{{ getDate(transaction.transactionSuccess) }}</td>
            <td v-else><button class="btn btn-outline-success" @click="itemArrive(transaction)">Done</button></td>
            <td>
                <li v-for="(item, index) in transaction.itemId" :key="`item-${index}`">{{ item.name }}</li>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
export default {
    name: 'History', 
    data() {
      return {
        server: 'http://localhost:3000',
        transactions: []
      }
    },
    methods: {
      getMyTransaction() {
        axios({
          method: 'get',
          url: `${this.server}/transactions/me`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.transactions = data;
        })
        .catch((err) => {
          console.log(err);
        })
      },
      getDate(date) {
          let newDate = new Date(date)
          return newDate.toDateString();
      },
      itemArrive(trans) {
        axios({
            method: 'put',
            url: `${this.server}/transactions/done/${trans._id}`,
            headers: {
              token: localStorage.getItem('token')
            }
        })
        .then(({ data }) => {
          this.getMyTransaction();
        })
        .catch((err) => {
          console.log(err);
        })
      }
    },
    created() {
      this.getMyTransaction();
    }
}
</script>

<style>

</style>
