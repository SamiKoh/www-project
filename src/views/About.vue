<template>
  <div>
    <NavBar></NavBar>
    <div>{{ md }}</div>
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
  }
};
</script>
