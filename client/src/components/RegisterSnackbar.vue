<template>
     <v-snackbar
        v-model="registerMessage.snackbar"
        :color="registerMessage.color"
        :timeout="6000"
        >
        {{ registerMessage.message }}
        <v-btn
            dark
            flat
            @click="registerMessage.snackbar = false"
        >
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {
            snackbar: false,
        }
    },
    computed: {
        ...mapState([
            'registerMessage'
        ])
    }
}
</script>

<style>

</style>
