<template>
  <div>
  <main-content @add-to-cart="addToCart" />
  </div>
</template>

<script>
import MainContent from '../components/MainContent'

export default {
  components: {
    MainContent
  },
  methods: {
    addToCart (status) {
      this.$emit('add-to-cart', status)
    }
  }
}
</script>
