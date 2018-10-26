<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    this.renderChart({
      labels: ['1-Oct', '2-Oct', '3-Oct', '4-Oct', '5-Oct', '6-Oct', '7-Oct', '8-Oct', '9-Oct', '10-Oct', '11-Oct', '12-Oct'],
      datasets: [
        {
          label: 'Incoming Order',
          backgroundColor: '#f87979',
          data: [10, 12, 15, 12, 10, 20, 29, 15, 22, 20, 12, 11]
        }
      ]
    })
  }
}
</script>
