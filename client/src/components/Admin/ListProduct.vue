<template>
  <div class="listproduct">
    <h3>List Products</h3>
    <router-link to="/admin/addproduct">
      <b-button variant="danger" size="sm" class="mb-4"> Add Product </b-button>
    </router-link>
    <b-table striped hover :items="products" :fields='fieldsProducts'>
      <template slot="index" slot-scope="row">
        {{row.index + 1}}
      </template>

      <div slot="action" slot-scope="row">
        <router-link :to="`/admin/${row.item._id}`">
          <b-button size="sm" class="mr-2"> Edit </b-button>
        </router-link>
        <b-button size="sm" @click.prevent='deleteProduct(row.index,row.item._id)' class="mr-2">
          Delete
        </b-button>
      </div>
    </b-table>
  </div>
</template>

<script>
import api from '@/api/api.js'

export default {
  name: 'adminlistproduct',
  props: ['products'],
  data(){
    return {
      product: {
          name: '',
          price: 0,
          stock: 0,
          description: '',
          link: '',
          category: null,
          file: ''
        },
      fieldsProducts: [
        'index',
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'price',
          sortable: true
        },
        {
          key: 'category.name'
        },
        "stock",
        "action"
      ],
    }
  },
  methods: {
    deleteProduct(idx, id) {
      api({
        url: `/products/${id}`,
        method: "delete",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then( data => {
          this.products.splice(idx, 1);
        })
        .catch(error => {
          console.log(error.response);
        });
    },
  },
  created(){
    // this.showProduct()
  },
  
}
</script>

<style>
.listproduct{
  margin-top: 8%;
}
</style>
