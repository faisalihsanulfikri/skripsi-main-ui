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
        :labels="['1-Oct', '2-Oct', '3-Oct','4-Oct','5-Oct','6-Oct']"
        :graphdata='[50, 51, 52, 39, 30, 52]'>
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

export default {
  components: {
    BaseChart
  }
}
</script>
