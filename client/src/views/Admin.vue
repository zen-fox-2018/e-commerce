<template>
    <div>
        <br><br>
        <h1>Admin Page</h1>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">User</th>
                <th scope="col">Transaction Id</th>
                <th scope="col">Transaction Created</th>
                <th scope="col">Transaction Done</th>
            </tr>
            </thead>
            <tbody v-for="(transaction, index) in transactions" :key="`transaction-${index}`">
            <tr>
                <td>{{ transaction.userId.email }}</td>
                <td>{{ transaction._id }}</td>
                <td>{{ getDate(transaction.transactionCreated) }}</td>
                <td v-if="transaction.transactionSuccess"> {{ getDate(transaction.transactionCreated) }} </td>
                <td v-else>On Progress</td>
            </tr>
            </tbody>
      </table>
    </div>
</template>

<script>
export default {
    name: 'Admin',
    data() {
      return {
        server: 'http://localhost:3000',
        transactions: []
      }
    },
    methods: {
      getAllTransaction() {
        axios({
          method: 'get',
          url: `${this.server}/transactions`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.transactions = data;
        })
        .catch((err) => {
          this.$router.push('/');
        })
      },
      getDate(date) {
        let newDate = new Date(date)
        return newDate.toDateString();
      },
    },
    created() {
      this.getAllTransaction();
    }
}
</script>

<style>

</style>
