<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Agent Order',
          backgroundColor: '#f87979',
          data: [10, 12, 15, 12, 10, 20, 29, 15, 22, 20, 12, 11]
        }
      ]
    })
  }
}
</script>
