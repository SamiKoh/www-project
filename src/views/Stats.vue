<template>
  <div class="root">
    <NavBar></NavBar>
    <div class="container">
      <h3>Voittaja</h3>
      <br>
      <MarkerPie :chartData="byMarker"></MarkerPie>
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
      console.log("total", res);
      this.total = res.data[0].total;
    });

    this.axios.get(this.api + "gameresults/bymarker").then(res => {
      let arr = res.data;
      this.byMarker.datasets[0].data = [];
      this.byMarker.labels = [];
      arr.forEach(element => {
        console.log(element);
        this.byMarker.datasets[0].data.push(element.total_games);
        if (element._id == "X") {
          this.byMarker.labels.push("Aloittaja");
        } else this.byMarker.labels.push("Toinen pelaaja");
      });
      let resolved =
        this.byMarker.datasets[0].data[0] + this.byMarker.datasets[0].data[1];
      this.byMarker.datasets[0].data.push(this.total - resolved);
      this.byMarker.labels.push("Tasapeli");
    });

    this.axios.get(this.api + "gameresults/byplayer").then(res => {
      console.log(res);
    });
  }
};
</script>
