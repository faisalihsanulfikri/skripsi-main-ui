<template>
  <div>
    <div class="uk-card uk-card-default">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Pesanan</h3>
      </div>
      <div class="uk-card-body">
        <div class="uk-overflow-auto">
          <table class="uk-table uk-table-divier">
            <thead>
              <tr>
                <th>Kode Order</th>
                <th>Negara</th>
                <th>Nama Barang</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, key) in orders" :key="key">
                <td></td>
                <td>{{ order.country }}</td>
                <td>{{ order.goodsName }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orders: []
    }
  },
  methods: {
    fetchOrders () {
      this.$authHttp.get('/v1/summary/orders')
        .then(response => {
          this.orders = response.data.data
        })
        .catch(() => {
          //
        })
    }
  },
  created () {
    this.fetchOrders()
  }
}
</script>
