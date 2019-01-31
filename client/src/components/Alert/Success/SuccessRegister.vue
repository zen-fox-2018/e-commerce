<template>
  <div>
    <v-alert v-model="alert" type="success">Register Success, You Can Login Now</v-alert>
  </div>
</template>

<script>
export default {
  props: ['alert'],
  data() {
    return {
      alert: alert
    }
  },
}
</script>