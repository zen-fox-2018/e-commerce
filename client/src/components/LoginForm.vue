<template>
    <b-dropdown position="is-bottom-left">
        <button class="button is-primary is-normal navbar-item" slot="trigger">
            <span>Login</span>
            <b-icon icon="menu-down"></b-icon>
        </button>
        <b-dropdown-item custom paddingless>
            <form @submit.prevent="submit">
                <div class="modal-card" style="width:300px;">
                    <section class="modal-card-body">
                        <b-field label="Email">
                            <b-input
                                type="email"
                                placeholder="Your email"
                                v-model="email"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Password">
                            <b-input
                                type="password"
                                password-reveal
                                placeholder="Your password"
                                v-model="password"
                                required>
                            </b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-primary" type="submit">Login</button>
                    </footer>
                </div>
            </form>
        </b-dropdown-item>
    </b-dropdown>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        submit() {
            let user = {
                email: this.email,
                password: this.password
            }
            axios
                .post('http://localhost:3000/users/login', user)
                .then(({data}) => {
                    localStorage.setItem('token', data.token)
                    swal({
                        title: "Successfuly Logged-in!",
                        text: "Let's buy some items!",
                        icon: "success",
                        button: "Aww yiss..!",
                    });
                    this.$emit('login')
                })
                .catch(err => {
                    console.log(err);

                })

        },
        clear() {
            this.email = ''
            this.password = ''
        }
    }
}
</script>
