<template>
     <b-card class="text-center mx-auto my-3" style="max-width: 70%;">
        <b-form @submit.prevent="addProduct" >

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
                <input type="file" @change="handleFileUpload" class="mt-3" id="file" ref="file">
            </b-form-group>

            <b-button @click="closeAddProduct" variant="light" class="float-right">Close</b-button>
            <b-button type="submit" variant="dark" class="float-right mr-2">Submit</b-button>
        </b-form>
    </b-card>
</template>

<script>
// var socket = io.connect('http://localhost:3000')

export default {
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
        closeAddProduct () {
            this.$router.push({name: 'home'})
        },
        addProduct () {
            let data = new FormData();

            data.append('image', this.image);
            data.append('name', this.name);
            data.append('price', this.price);
            data.append('qty', this.qty);
            data.append('description', this.description);


            axios({
                method: 'post',
                url: 'http://localhost:3000/products',
                headers: {
                    token: localStorage.token,
                    'Content-Type': 'multipart/form-data'
                },
                data
            })
            .then(resp => {
                let data = resp.data.data
                this.closeAddProduct()
                // socket.emit('new-product', data)
                swal("Yeay!", `you added a product`, "success");
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
    }
}
</script>

<style>

</style>
