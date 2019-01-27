<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.jwt_token) {
      next();
    } else {
      next(`/login`);
    }
  }
};
</script>

