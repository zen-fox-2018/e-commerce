<template>
  <div>
    <v-alert v-model="alert" type="error">Email/Password already exist</v-alert>
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