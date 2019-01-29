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
      <td class="text-xs-left">{{ props.item.status }}</td>
      <td class="text-xs-left">{{ props.item.date }}</td>
    </template>
  </v-data-table>
</template>

<script>
import server from '@/server/server'

export default {
	name: 'admin',
	data () {
		return {
			transactions: [],
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
				let { data } = await server.get('/transaction', {
					headers: {
						token: localStorage.getItem('token')
					}
				})
				this.items = data
			} catch ({ response }) {
				console.error(response)
			}
		}
	},
	mounted () {
		this.setTransaction()
	}
}
</script>

<style>

</style>
