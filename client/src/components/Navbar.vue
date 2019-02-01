<template>
  <v-toolbar dark color="primary" fixed app>
    <v-toolbar-side-icon>
      <router-link to="/" class="white--text"><v-icon>home</v-icon></router-link>
    </v-toolbar-side-icon>

    <v-toolbar-title>
      <img src="../assets/mainlogo.png" style="max-width: 20%; margin-right: 30rem;">
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <div class="text-xs-center">
      <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      flat
      offset-x
      dark
      bottom: true
      >
        <v-card>
          <v-list>
            <v-list-tile>
              <v-list-tile-content>
              <v-list-tile-title>Shopping Cart</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <v-list v-for="(val, i) in carts" :key="i" three-line>
            <v-list-tile avatar>
              <v-list-tile-avatar>
              <img :src="val.products.image">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{val.products.name}}</v-list-tile-title>
                <v-list-tile-sub-title>Quantity: {{val.qty}}<v-btn small fab @click.prevent="removeItem(val.products._id)"><v-icon>delete</v-icon></v-btn></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <v-card-actions>
          <v-btn :to="'/'+user._id">Details</v-btn>
          </v-card-actions>
        </v-card>
         <v-btn
            slot="activator"
            dark
            flat:true
            small
            round:true
            @click.prevent="triggerCart"
        >
        <v-badge right>
            <span slot="badge" color="white">{{total || 0}}</span>
        <v-icon right>shopping_cart</v-icon>
        </v-badge>
        </v-btn>
      </v-menu>
    </div> 

    <div class="text-xs-center">
      <v-menu offset-y dark>
        <v-btn
            slot="activator"
            color="primary"
            dark
            flat:true
            small
            right
            round:true
        >
            <v-icon>account_circle</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile>
              <v-btn flat:true to="/wishlist">
                  <v-list-tile-title icon>
                      <v-icon>
                          favorite
                      </v-icon>
                      My Wishlist
                  </v-list-tile-title>
              </v-btn>
          </v-list-tile>
          <v-list-tile>
              <v-btn flat:true to="/transaction">
                  <v-list-tile-title icon>
                      <v-icon>
                          history
                      </v-icon>
                      Transaction History
                  </v-list-tile-title>
              </v-btn>
          </v-list-tile>
          <v-list-tile>
            <v-btn flat:true @click.prevent="logout">
                <v-list-tile-title icon>
                    <v-icon>
                        exit_to_app
                    </v-icon>
                    Logout
                </v-list-tile-title>
            </v-btn>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
        menu: '',
        status: false,
        listCart: this.carts
    }
  },
  props: ['carts', 'total', 'user'],
  methods: {
    logout () {
      localStorage.clear()
      this.$router.replace('/')
      this.$emit('check-logout')
    },
    removeItem: function (product) {
      this.$axios({
        method: `PUT`,
        url: `/carts/${product}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.$emit('remove-item', data)
        this.$emit('trigger-remove')
      })
      .catch(err => {
        console.log(err)
      })
    },
    triggerCart: function () {
      this.$emit('trigger-cart')
    }
  }
}
</script>

<style>

</style>
