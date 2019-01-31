<template>
  <div>
    <v-alert v-model="alert" type="error">Email/Password Salah</v-alert>
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