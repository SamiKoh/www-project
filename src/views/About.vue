<template>
  <div>
    <NavBar></NavBar>
    <div class="container">
      <div v-html="marked(md)"></div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  components: { NavBar },
  data() {
    return {
      md: ""
    };
  },
  mounted: function() {
    this.axios.get(this.api + "about").then(res => {
      console.log(res);
      this.md = res.data.content;
    });
  }
};
</script>

<style >
.container {
  width: 80vw;
  align-content: flex-start;
  text-align: left;
  margin-bottom: 3em;
}
</style>
