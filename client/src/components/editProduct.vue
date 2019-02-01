<template>
    <b-modal ref="modal" size="lg" id="editProduct" title="Edit Product" hide-footer no-close-on-backdrop>
     <b-form @submit.prevent="updateProduct">
            <b-form-group class="text-left" label="Product Name:" >
                <b-form-input type="text" v-model="name" required placeholder="Enter product name"></b-form-input>
            </b-form-group>

            <b-form-group class="text-left" label="Description:" >
                <b-form-input type="text" v-model="description" placeholder="Enter product description"></b-form-input>
            </b-form-group>

            <b-form-group class="text-left" label="Price:" >
                <b-form-input type="number" min="0" v-model="price" required placeholder="Enter price"></b-form-input>
            </b-form-group>

            <b-form-group class="text-left" label="Quantity:" >
                <b-form-input type="number" min="1" v-model="qty" placeholder="Enter product quantity"></b-form-input>
            </b-form-group>

             <b-form-group class="text-left" label="Image:" >
                <input type="file" @change="handleFileUpload" class="mt-3" id="img" ref="file">
            </b-form-group>

            <b-button type="submit" variant="dark" class="float-right mr-2">Submit</b-button>
        </b-form>
  </b-modal>
</template>

<script>
export default {
    name: 'modalEditProduct',
    props: {
        product: Object
    },
    data () {
        return {
            name: '',
            description: '',
            price: '',
            qty: '',
            image: ''
        }
    },
    methods: {
        updateProduct () {
            let data = new FormData();

            data.append('image', this.image);
            data.append('name', this.name);
            data.append('price', this.price);
            data.append('qty', this.qty);
            data.append('description', this.description);

            axios({
                method: 'put',
                url: `http://localhost:3000/products/${this.$route.params.id}`,
                headers: {
                    token: localStorage.token,
                    'Content-Type': 'multipart/form-data'
                },
                data
            })
            .then(resp => {
                let data = resp.data.data
                this.$refs.modal.hide()
                swal("Yeay!", `you edited a product`, "success");
            })
            .catch(err => {
                let msg = err.response.data.msg
                if (!msg) {
                    msg = `something went wrong`
                } 
                console.log(err.response)
                swal("Sorry!", `${msg}`, "error");
            })
        },
         handleFileUpload(){
            //  console.log(this.$refs.file.files[0], 'ini kaefkcninviuen')
            this.image = this.$refs.file.files[0];
        },
    },
    created () {
        this.name = this.product.name
        this.description = this.product.description
        this.price = this.product.price
        this.qty = this.product.qty
        this.image = this.product.image
    }
}
</script>

<style>

</style>
