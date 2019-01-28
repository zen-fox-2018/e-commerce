<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
		style="margin: 2vw;"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.user.email }}</td>
			<td class="text-xs-left">{{ props.item.products[0].title }} and {{ props.item.products.length - 1 }} more</td>
      <td class="text-xs-left"><v-btn flat color="orange" @click="delivered(props.item._id, props.item.status)">{{ props.item.status }}</v-btn></td>
      <td class="text-xs-left">{{ props.item.date }}</td>
    </template>
  </v-data-table>
</template>

<script>
import server from '@/server/server'

export default {
  name: 'mypage',
  data () {
    return {
      headers: [
        {
          text: 'Buyer',
          sortable: false,
          value: 'user'
        },
        {
          text: 'Product',
          sortable: false,
          value: 'product'
        },
        {
          text: 'Status',
          sortable: false,
          value: 'status'
        },
        {
          text: 'Date',
          sortable: false,
          value: 'date'
        }
      ],
      items: []
    }
  },
  methods: {
    setTransaction: async function () {
      try {
        let { data } = await server.get('/transaction/me', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        this.items = data
      } catch ({ response }) {
        console.error(response)
      }
    },
    delivered: async function (id, status) {
      try {
        if (status === 'Arrived') {
          swal('Already Arrived')
        } else {
          await server.put(`/transaction/${id}`, {}, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          this.setTransaction()
          swal('Success!', 'this product is now delivered!', 'success')
        }
      } catch ({ response }) {
        console.error(response)
      }
    }
  },
  mounted: function () {
    this.setTransaction()
  }
}
</script>

<style>

</style>
