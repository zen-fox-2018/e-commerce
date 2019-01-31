<template>
  <div id="checkoutModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Congratulations!</h5>
          <button @click="redirectHome" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Successfully checked out your transaction.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    redirectHome() {
      console.log('xxxxx')
      this.$router.push('/home/store');
    }
  }
}
</script>

