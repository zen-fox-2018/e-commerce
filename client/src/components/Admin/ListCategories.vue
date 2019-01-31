<template>
  <div class="container category">
      <h3>Categories</h3>
      <b-button class="mb-5" variant="danger" size="sm" v-b-modal="'addCategory'"> Add Category </b-button>
      <b-table striped hover :items="categories" :fields='fieldsCategory'>
        <template slot="index" slot-scope="row">
          {{row.index + 1}}
        </template>
        <div slot="action" slot-scope="row">
          <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? 'Hide' : 'Edit'}}
          </b-button>
          <b-button size="sm" v-on:click.prevent='deleteCategory(row.index,row.item._id)' class="mr-2">
            Delete
          </b-button>
        </div>
        <div slot="row-details" slot-scope="row">
          <b-card>
            <b-form>
              <div class="form-group float-left">
                <label for="recipient-name" class="col-form-label">Name: </label>
                <input type="text" class="form-control" v-model='name' v-bind:placeholder="row.item.name">
              </div>
              <b-button type="b-button" size="sm" class="btn btn-primary" v-on:click.prevent='editCategory(row.index,row.item._id)'>
                Edit </b-button>
              <br>
            </b-form>
            <!-- <b-button size="sm" @click="row.toggleDetails">Hide</b-button> -->
          </b-card>
        </div>
      </b-table>
    
      <!-- the modal -->
      <b-modal id="addCategory" hide-footer>
        <b-form>
          <div class="form-group">
            <label for="name">Category Name:</label>
            <input id="name" type="text" class="form-control" v-model='name'>
          </div>
          <b-button type="b-button" class="btn btn-primary" v-on:click.prevent='addCategory'> Add Category </b-button>
        </b-form>
      </b-modal>    
    </div>
</template>

<script>
import api from '@/api/api.js'

export default {
  name: 'categories',
  props: ['categories'],
  data(){
    return {
      name: '',
      fieldsCategory: ['index', 'name', 'action'],
    }
  },
  methods: {
    addCategory() {
      api.post('/categories', { name: this.name }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.categories.push(data.category)
          this.name = ''
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },

    editCategory(idx, id) {
      api({
        url: `/categories/${id}`,
        method: "PUT",
        data: {name: this.name},
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.name = ''
          this.categories.splice(idx,1,data.category)
        })
        .catch(error => {
          console.log(error.response.data);
        });
    },

    deleteCategory(idx, id) {
      api({
        url: `/categories/${id}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(category => {
          this.categories.splice(idx, 1);
        })
        .catch(error => {
          console.log(error.response.data);
        });
    },
  }
}
</script>

<style>
.category{
  margin-top: 8%;
}
</style>
