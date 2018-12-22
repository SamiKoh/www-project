<template>
  <div class="home">
    <h1>Tervetuloa</h1>
    <br>
    <fb></fb>
    <br>
    <br>
    <button @click="redirect" class="btn btn-dark">Jatka kirjautumatta</button>
  </div>
</template>

<script>
import fb from "@/components/FB.vue";
export default {
  components: {
    fb
  },
  methods: {
    redirect: function() {
      this.$router.push("/play");
    }
  }
};
</script>
