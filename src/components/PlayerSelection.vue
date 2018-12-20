<template>
    <div>
        <div class="container">
            <h2>Valitse pelitapa</h2>
            <div class="row">
                <div id="my-div" @click="single" class="col-md-4 offset-md-2">
                    Yksi pelaaja
                </div>                  
                <div id="my-div" @click="multi" class="col-md-4 offset-md-1">
                    Moninpeli
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
#my-div {
  background-color: #f00;
  width: 200px;
  height: 200px;
}
a.fill-div {
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
}
</style>
