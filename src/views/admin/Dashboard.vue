<template>
  <div>
    <h1>Dashboard Admin</h1>
    <div class="uk-grid">
      <base-chart
        :title="'Order Masuk'"
        :labels="['1-Oct', '2-Oct', '3-Oct','4-Oct','5-Oct','6-Oct']"
        :graphdata='[76, 66, 56, 54, 55, 55]'>
      </base-chart>

      <base-chart
        :title="'Order Keluar'"
        :labels="['1-Oct', '2-Oct', '3-Oct','4-Oct','5-Oct','6-Oct','7-Oct','8-Oct','9-Oct','10-Oct']"
        :graphdata='[50, 51, 52, 39, 30, 52,32,34,67,67]'>
      </base-chart>

      <base-chart
        :title="'Payment'"
        :labels="['1-Oct', '2-Oct', '3-Oct','4-Oct','5-Oct','6-Oct']"
        :graphdata='[20, 26, 20, 39, 33, 28]'>
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
      dates: []
    }
  },
  components: {
    BaseChart
  },
  created () {
    this.chart()
  },
  methods:{
    async chart () {
      try {
        let res = await this.$service.chart.get()
        this.data = res.data.data
        var start = new Date (moment().format('YYYY-MM-DD'))
        var end = new Date (moment().subtract(10, 'days').format('YYYY-MM-DD'))
        while (end.getTime() < start.getTime()) {
          this.dates.push(moment(end).format('YYYY-MM-DD'))
          var newDate = moment(end).add(1, 'days')
          end = new Date(newDate)
        }
      } catch (e) {
        this.__handleError(this, err, true)
      }
    },
    sekarang () {
      var date = []
      this.data.map(function (item1,index1){

      })
    }
  }
}
</script>
