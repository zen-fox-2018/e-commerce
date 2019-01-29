<template>
  <form>
    <div class="form-group">
      <label>Name</label>
      <input type="text" class="form-control" placeholder="Enter email">
    </div>
    <div class="form-group">
      <label>Price</label>
      <input type="number" class="form-control" placeholder="Price">
    </div>
    <div class="form-group">
      <label>Stock</label>
      <input type="number" class="form-control" placeholder="Stock">
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea class="form-control" rows="3"></textarea>
    </div>
    <div class="form-group">
      <label>Example file input</label>
      <input type="file" class="form-control-file">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
export default {
  
}
</script>

