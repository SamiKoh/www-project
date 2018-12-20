<template>
  <div>
    <div class="container">
      <h2>Valitse pelitapa</h2>
      <br>
      <div class="row">
        <div @click="single" class="mode-selection col-md-3 offset-md-2">
          <h3 class="centered">Yksi pelaaja</h3>
        </div>
        <div @click="multi" class="mode-selection col-md-3 offset-md-2">
          <h3 class="centered">Moninpeli</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    single: function() {
      this.$emit("single", true);
    },
    multi: function() {
      this.$emit("single", false);
    }
  }
};
</script>


<style lang="scss">
.mode-selection {
  background-color: aquamarine;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
