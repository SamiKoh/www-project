<template>
  <div class="root">
    <NavBar></NavBar>
    <div class="container">
      <h3>Voittaja</h3>
      <br>
      <MarkerPie :data="byMarker"></MarkerPie>
    </div>

    <div class="container">
      <h3>Parhaat pelaajat</h3>
      <br>
      <WinnerBar :data="byWinner"></WinnerBar>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import MarkerPie from "@/components/MarkerPie";
import WinnerBar from "@/components/WinnerBar";
export default {
  components: {
    NavBar,
    MarkerPie,
    WinnerBar
  },
  data() {
    return {
      total: 0,
      byMarker: {
        datasets: [
          {
            data: [10, 34, 15],
            backgroundColor: ["#2ff37a", "#ff0040", "#1d2e36"]
          }
        ],
        labels: ["Aloittaja", "Toinen pelaaja", "Tasapeli"]
      },
      byWinner: {
        datasets: [{ data: [10, 8, 6, 5], label: "Voittojen määrä" }],
        labels: ["p1", "p3", "p3", "p4"]
      }
    };
  },
  mounted: function() {
    this.axios.get(this.api + "gameresults/total").then(res => {
      console.log(res);
    });

    this.axios.get(this.api + "gameresults/bymarker").then(res => {
      let arr = res.body;
      arr.forEach(element => {});
    });
  }
};
</script>
