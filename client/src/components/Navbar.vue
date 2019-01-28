<template>
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="@/assets/o-lapak.png" width="112" height="28">
        </router-link>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <!-- search -->
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
            <div class="navbar-item">
                <b-field>
                    <b-autocomplete
                        rounded
                        v-model="searchInput"
                        placeholder="Search..."
                        icon="magnify"
                        @select="option => selected = option">
                    </b-autocomplete>
                </b-field>
            </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <router-link class="button is-primary" to="/cart">
                <img src="@/assets/shopping-cart.png" alt="" @click="checkLogin">
            </router-link>

            <LoginForm @login="loggedIn = true; checkLogin" v-if="loggedIn === false"/>
            <a class="button is-primary" v-if="loggedIn === true" @click="logout">Logout</a>

            <router-link class="button is-primary" to="/register" v-if="loggedIn === false">
              <strong>Sign up</strong>
            </router-link>

          </div>
        </div>

      </div>
    </nav>
</template>
<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
    data() {
        return {
            searchInput: '',
            loggedIn: false
        }
    },
    created() {
        this.checkLogin()
    },
    components: {
        LoginForm
    },
    methods: {
        search() {
            console.log(this.searchInput);

        },
        checkLogin() {
            if (!localStorage.getItem('token')) {
                this.loggedIn = false
            } else {
                this.loggedIn = true
            }
        },
        logout() {
            localStorage.removeItem('token')
            this.checkLogin()
            swal({
                title: "Bye bye",
                icon: "success",
                button: "Done",
            });
        }
    }
}
</script>
