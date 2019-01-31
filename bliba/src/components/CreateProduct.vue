<template>
  <v-layout row justify-end>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="primary" dark>Add Product</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Add Product</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Product Name " v-model="name" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Product Price*" v-model="price" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Product Stock" v-model="stock" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                  Input Image Prodict : <input type="file" name="img" @change="onFileChange" id="img">
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="createProduct">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      img: '',
      name: '',
      price: 0,
      stock: 0
    }),
    methods: {
        createProduct() {
            let url = 'http://localhost:3000/products'
            let formData = new FormData();
            formData.append('img', this.img);
            formData.append('name', this.name);
            formData.append('stock', this.stock);
            formData.append('price', this.price);
            console.log(this.img)
            this.axios({
                method: 'post',
                url,
                data: formData
            })
            .then(({data}) => {
                console.log(data)
                this.dialog = false
                this.name = ''
                this.price = ''
                this.stock = ''
            })

        },

        onFileChange(event) {
            this.img = event.target.files[0];
        }
    }
  }
</script>