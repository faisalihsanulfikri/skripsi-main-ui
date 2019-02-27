<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    labels: {
      default: ()=>(['1-Oct', '2-Oct', '3-Oct'])
    },
    title: {
      default: 'Order'
    },
    graphdata: {
      default: ()=>([10, 10, 10])
    }
  },
  mounted () {
    console.log("test"+this.labels)
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: this.title,
          backgroundColor: '#f87979',
          data: this.graphdata
        }
      ]
    })
  }
}
</script>
