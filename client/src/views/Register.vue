<template>
    <form class="column is-half is-offset-one-quarter" @submit.prevent="submit">
        <b-field label="Name">
            <b-input placeholder="Name" v-model="name" required></b-input>
        </b-field>

        <b-field label="Email">
            <b-input type="email" placeholder="Email" v-model="email" required></b-input>
        </b-field>

        <b-field label="Password">
            <b-input type="password" placeholder="Password" v-model="password" required></b-input>
        </b-field>

        <b-field>
            <button type="submit" class="button is-primary">Register</button>
        </b-field>
    </form>
</template>
<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        submit() {
            let newUser = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            axios
                .post('http://localhost:3000/users/register', newUser)
                .then(({data})=> {
                    console.log(data);
                    swal({
                        title: "Success register!",
                        text: "Please login!",
                        icon: "success",
                        button: "Done!",
                    });
                    this.clear()
                })
                .catch(err => {
                    console.log(err);
                    this.clear()
                })

        },
        clear() {
            this.name = ''
            this.email = ''
            this.password = ''
        }
    }
}
</script>