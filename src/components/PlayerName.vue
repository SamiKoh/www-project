<template>
  <div class="root">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <!-- <label for="pname">Nimi</label> -->
          <input id="pname" class="form-control required" type="text" v-model="name">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name"]
};
</script>


<style scoped>
label {
  float: left;
}
input {
  text-align: center;
}
</style>
