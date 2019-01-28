<template>
    <v-layout fill-height>
            <v-btn 
            flat
            @click="dialog = true" 
            color="brown"
            offset-x
            >
            Register</v-btn>

        <v-dialog  hide-overlay v-model="dialog"  max-width="600px" offset-x>
            <v-card>
                <v-card-title>
                <span class="headline">Sign Up To Bliba</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field label="Full Name*" v-model="user.username" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field label="Email*" v-model="user.email" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field label="Password*" type="password" v-model="user.password" required></v-text-field>
                    </v-flex>
                    </v-layout>
                </v-container>
                <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="registerUser">Register</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>


</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      user : {
          username: '',
          password: '',
          email: ''
      }
    }),
    methods : {
        registerUser() {
            let url = "http://localhost:3000/users/register"
            this.axios({
                method : 'post',
                url,
                data : this.user
            })
            .then(({data})=> {
                console.log(`success Register user ${data.username}`)
            }) 
        }
    }
  }
</script>