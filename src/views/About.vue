<template>
  <div>
    <NavBar></NavBar>
    <div v-html="marked(md)"></div>
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
      this.md = res.body.content;
    });
  }
};
</script>
