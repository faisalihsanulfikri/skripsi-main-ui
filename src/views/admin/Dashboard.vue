<template>
  <div>
    <h1>Dashboard Admin</h1>
    <div class="uk-grid">
      <base-chart
        :title="'Order masuk'"
        :labels="dates"
        :graphdata="total">
      </base-chart>
      <base-chart
        :title="'Payment'"
        :labels="dates"
        :graphdata="amount">
      </base-chart>
    </div>
  </div>
</template>

<script>
import BaseChart from '../../components/BaseChart'
import moment from 'moment'
export default {
  data () {
    return {
      data: [],
      amount: [],
      dates: [],
      total: []
    }
  },
  components: {
    BaseChart
  },
  beforeMount () {
    this.chart().then((res) => {
      this.dates = res.map(function (item1,index1){
        return moment(item1['date']).format('DD-MMM')
      })
      this.total = res.map(function (item2,index2){
        return (item2['total'])
      })
      this.amount = res.map(function (item2,index2){
        return (item2['amount'])
      })
    })
  },
  methods:{
    async chart () {
      this.__startLoading()
      try {
        let res = await this.$service.chart.get()
        this.data = res.data.data
      } catch (e) {
        this.__handleError(this, err, true)
      }
      this.__stopLoading()
      return this.data
    }
  }
}
</script>
