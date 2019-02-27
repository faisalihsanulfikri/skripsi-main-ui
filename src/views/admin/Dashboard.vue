<template>
  <div>
    <h1>Dashboard Admin{{dates2['total']}}</h1>
    <div class="uk-grid">
      <base-chart
        :title="'Order masuk'"
        :labels="dates['date']"
        :graphdata="dates['total']">
      </base-chart>
      <base-chart
        :title="'Order Keluar'"
        :labels="['1-Oct', '2-Oct', '3-Oct','4-Oct','5-Oct','6-Oct','7-Oct','8-Oct','9-Oct','10-Oct']"
        :graphdata="dates2['total']">
      </base-chart>
      <base-chart
        :title="'Payment'"
        :labels="['1-Oct', '2-Oct', '3-Oct','4-Oct','5-Oct','6-Oct']"
        :graphdata='[30, 32, 30, 39, 33, 38]'>
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
      start: '',
      end: '',
      dates: [],
      dates2: []
    }
  },
  components: {
    BaseChart
  },
  mounted () {
    this.chart().then(() => {
      console.log(this.dates)
    })
    this.dates2['total']=[50, 51, 52, 39, 30, 52,32,34,67,67]
    // this.dates1['total']=[50, 51, 52, 39, 30, 52,32,34,67,67]
  },
  methods:{
    async chart () {
      try {
        let res = await this.$service.chart.get()
        this.data = res.data.data
        this.dates['date'] = this.data.map(function (item1,index1){
          return moment(item1['date']).format('DD-MMM')
        })
        this.dates['total'] = this.data.map(function (item2,index2){
          return (item2['total'])
        })
      } catch (e) {
        this.__handleError(this, err, true)
      }
    },
    sekarang () {
      // console.log(test)
    }
  }
}
</script>
