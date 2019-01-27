<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-img :src="item.imageUrl" aspect-ratio="1" width="100%" height="200px"></v-img>

        <v-card-title primary-title>
          <div>
            <span class="grey--text">Stock: {{item.stock}}</span>
            <br>
            <h3>{{item.name}}</h3>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Rp. {{item.price.toLocaleString()}}</v-btn>
          <v-btn color="orange" @click="addCart()">Buy</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import a from "../helpers/helpers.js";

export default {
  props: ["item"],
  data() {
    return {
      card_text:
        "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat."
    };
  },
  methods: {
    addCart() {
      a.post(
        `/users/cart/${localStorage.id}`,
        {
          userId: localStorage.id,
          itemId: this.item._id
        },
        {
          headers: {
            token: localStorage.token
          }
        }
      )
        .then(result => {
          console.log(result);
          this.$emit("addcart", result.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>