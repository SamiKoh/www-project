<template>
<div class="row">
    <div class="col-md-5">
        <h2>{{ p1.name }} ({{p1.marker}})<br> {{ p1.score }}</h2>
    </div>
    <div class="col-md-5 offset-md-2">
        <h2>{{ p2.name }} ({{p2.marker}})<br> {{ p2.score }}</h2>
    </div>
</div>
</template>

<script>
export default {
  props: ["p1", "p2"],
  data: function() {
    return {
      player1: {
        name: this.p1.name,
        score: 0
      },
      player2: {
        name: this.p2.name,
        score: 0
      }
    };
  }
};
</script>
