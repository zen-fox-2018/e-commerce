<template>
  <div class="input-group">
      <span class="input-group-btn">
        <button id="decrementBtn" @click.prevent="decrement" type="button" class="btn btn-default btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
          <i class="fa fa-minus"></i>
        </button>
      </span>
      <input v-model="quantity" type="text" name="quant[1]" class="form-control input-number" value="1" min="1" max="10">
      <span class="input-group-btn">
        <button id="incrementBtn" @click.prevent="increment" type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">
          <i class="fa fa-plus"></i>
        </button>
      </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      quantity: 1
    }
  },
  watch: {
    quantity: function() {
      this.$emit('deltaQty', this.quantity); 
    }
  },
  methods: {
    decrement() {
      if(this.quantity == 1) {
        $('#decrementBtn').attr('disabled','disabled');
      } else {
        $('#incrementBtn').removeAttr('disabled');
        this.quantity --;
      }
    },
    increment() {
      if(this.quantity == 10) {
        $('#incrementBtn').attr('disabled','disabled');
      } else {
        this.quantity ++;
        $('#decrementBtn').removeAttr('disabled');
      }
    }
  }
}
</script>
