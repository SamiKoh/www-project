

<script>
import { Doughnut, mixins } from "vue-chartjs";
export default {
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props: ["chartData"],
  data() {
    return {
      options: {}
    };
  },
  mounted: function() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
