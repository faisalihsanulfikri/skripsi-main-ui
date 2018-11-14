<template>
  <div>
    <h1>Dashboard Admin</h1>
    <div class="uk-grid">
      <dashboard-order
      :title="'Order Masuk'"
      :labels="['1-Oct', '2-Oct', '3-Oct','4-Oct','5-Oct','6-Oct']"
      :graphdata='[76, 66, 56, 54, 55, 55]'
      />
      <dashboard-process
      :title="'Order Keluar'"
      :labels="['1-Oct', '2-Oct', '3-Oct','4-Oct','5-Oct','6-Oct']"
      :graphdata='[50, 51, 52, 39, 30, 52]'
      />
      <dashboard-payment
      :title="'Payment'"
      :labels="['1-Oct', '2-Oct', '3-Oct','4-Oct','5-Oct','6-Oct']"
      :graphdata='[20, 26, 20, 39, 33, 28]'
      />
    </div>
  </div>
</template>

<script>
import DashboardOrder from '../../components/BaseChart'
import DashboardProcess from '../../components/BaseChart'
import DashboardPayment from '../../components/BaseChart'

export default {
  components: {
    DashboardOrder,
    DashboardProcess,
    DashboardPayment
  }
}
</script>
