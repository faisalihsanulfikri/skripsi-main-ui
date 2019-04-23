<script>
import { Doughnut } from "vue-chartjs";
import defaultVal from "./default-chart-values";

export default {
  name: "ChartDoughnut",
  extends: Doughnut,
  props: {
    label: {
      type: String,
      default: defaultVal.label
    },
    labels: {
      type: Array,
      default: () => defaultVal.labels
    },
    data: {
      type: Array,
      default: () => defaultVal.data
    }
  },
  mounted() {
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: this.label,
          data: this.data,
          backgroundColor: defaultVal.backgroundColor,
          borderColor: defaultVal.borderColor,
          borderWidth: defaultVal.borderWidth
        }
      ],
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    });
  }
};
</script>
