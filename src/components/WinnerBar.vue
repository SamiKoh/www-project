<script>
import { HorizontalBar, mixins } from "vue-chartjs";
export default {
  extends: HorizontalBar,
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
