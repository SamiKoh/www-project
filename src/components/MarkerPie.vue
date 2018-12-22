

<script>
import { Doughnut, mixins } from "vue-chartjs";
export default {
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props: ["data"],
  data() {
    return {
      options: {}
    };
  },
  mounted: function() {
    this.renderChart(this.data, this.options);
  }
};
</script>
