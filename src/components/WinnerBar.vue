<script>
import { HorizontalBar, mixins } from "vue-chartjs";
export default {
  extends: HorizontalBar,
  mixins: mixins.reactiveProp,
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
