<template>
    <div>
      <br><br><br>
      <h1>Cart</h1>
      <ul class="list-unstyled">
        <CartList @minus_one="kurangSatu" @plus_one="tambahSatu" @remove_games="removeCertain" v-for="(item, index) in cleanData" :key="`item-${index}`" :item_from_cart="item"></CartList>
      </ul>
      <br><br>
      <h1>TOTAL: {{ total_price }}</h1>
      <h1 @click="checkout">Checkout</h1>
    </div>
</template>

<script>
import CartList from '@/components/CartList.vue';

export default {
  name: 'Cart',
  props: ['itemPayload'],
  components: {
    CartList,
  },
  data() {
    return {
      payload: this.itemPayload,
      cleanData: [],
      total_price: 0,
      server: 'http://localhost:3000'
    };
  },
  methods: {
    organize() {
      let arr = [];
      for (let i = 0; i < this.payload.length; i++) {
        let state = true;
        for(let j = 0; j < arr.length; j++) {
          if (this.payload[i].name == arr[j].name) {
            state = false;
            arr[j]['qty'] += 1;
          }
        }
        if (state) {
          arr.push(this.payload[i]);
          arr[arr.length-1]["qty"] = 1;
        } 
      }
      this.cleanData =  arr;
    },
    removeCertain(item) {
      let newPayload = this.payload.filter((e) => {
        return e._id !== item.itemId
      })
      this.payload = newPayload;
      this.organize();
      this.$emit('new_qty', item.qty);
      this.countTotal();
    },
    tambahSatu(item_id) {
      let temp = null
      for (let i = 0; i < this.payload.length; i++) {
        if (this.payload[i]._id == item_id) {
          temp = this.payload[i];
          break;
        }
      }
      this.payload.push(temp)
      this.$emit('plusOne');
      this.countTotal();
    },
    kurangSatu(item_id) {
      for (let i = 0; i < this.payload.length; i++) {
        if (this.payload[i]._id == item_id) {
          this.payload.splice(i, 1)
          break;
        }
      }
      this.$emit('minusOne');
      this.countTotal();
    },
    countTotal() {
      let total = 0
      for (let i = 0; i < this.payload.length; i++) {
        total += this.payload[i].price;
      }
      this.total_price = total;
    },
    checkout() {
      let mapped = this.payload.map((e) => {
         return e._id
      })
      axios({
        method: 'post',
        url: `${this.server}/transactions`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          itemId: mapped
        }
      })
      .then(() => {
        this.payload = [];
        this.cleanData = [];
        this.total_price = 0; 
        this.$emit('reset_count_cart');
        this.$emit('renew_payload', this.payload);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
  created()  {
    this.organize();
    this.countTotal();
  },
  watch: {
    itemPayload(val) {
      this.payload = val;
    }
  }
}
</script>

<style>

</style>
