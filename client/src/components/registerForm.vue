<template>
    <b-card class="text-center mx-auto my-3" style="max-width: 70%;">
        <b-form @submit.prevent="register" >

            <b-form-group class="text-left" label="Your Name:" >
                <b-form-input type="text" v-model="name" required placeholder="Enter name"></b-form-input>
            </b-form-group>

            <b-form-group class="text-left" label="Email address:" description="We'll never share your email with anyone else.">
                <b-form-input type="email" v-model="email" required placeholder="Enter email"></b-form-input>
            </b-form-group>

            <b-form-group class="text-left" label="Password:" >
                <b-form-input type="password" v-model="password" required placeholder="Enter password"></b-form-input>
            </b-form-group>

            <b-form-group class="text-left" label="Address:" >
                <b-form-input type="text" v-model="address" placeholder="Enter your address"></b-form-input>
            </b-form-group>

             <b-form-group class="text-left" label="Image:" >
                <input type="file" @change="handleFileUpload" class="mt-3" ref="file">
            </b-form-group>

            <b-button variant="light" class="float-right"> <router-link :to="{ name: 'home' }"> Close </router-link></b-button>
            <b-button type="submit" variant="dark" class="float-right mr-2">Submit</b-button>
        </b-form>
    </b-card>
</template>

<script>
export default {
  name: 'registerForm',
  methods: {
    register () {
            let data = new FormData();
            data.append('image', this.image);
            data.append('name', this.name);
            data.append('email', this.email);
            data.append('password', this.password);
            data.append('address', this.address);

            console.log(data)
            
        axios({
            method: 'post',
            url:'http://localhost:3000/users',
            data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(resp => {
            let data = resp.data.data
            localStorage.setItem('token', resp.data.token)
            this.$emit('login', data)
            this.$router.push({ name: 'home'})
        })
        .catch(err => {
            console.log(err.response)
        })
    },
    closeRegisterForm () {
        this.$emit('closeRegisterForm')
    },
    handleFileUpload(){
        // console.log('masuk handle file upload', this.$refs.file.files[0])
        this.image = this.$refs.file.files[0]
    },
  },
  data () {
    return {
      name: '',
      email: '',
      password: '',
      address: '',
      image: ''
    }
  }
}
</script>

<style>

</style>
