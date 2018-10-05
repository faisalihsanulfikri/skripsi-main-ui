<template>
  <div>
    <div class="uk-card uk-card-default">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Pesanan</h3>
        <button class="uk-button uk-button-primary uk-width-1-4" @click="showDialog(dialogPaymentCreate.id)">Konfirmasi Pembayaran</button>
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
      <dialog-payment-create :id="dialogPaymentCreate.id" @on-finish="onFinishCreatePayment"/>
    </div>
  </div>
</template>

<script>
import DialogPaymentCreate from '../../components/DialogPaymentCreate'

export default {
  components: {
    DialogPaymentCreate
  },
  data () {
    return {
      dialogPaymentCreate: {
        id: 'dialog-payment-create'
      },
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
    },
    showDialog (id) {
      this.UIkit.modal(`#${id}`).show()
    },
    onFinishCreatePayment (id) {
      this.UIkit.modal(`#${id}`).hide()
    }
  },
  created () {
    this.fetchOrders()
  }
}
</script>
