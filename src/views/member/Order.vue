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
                <th>Asuransi</th>
                <th>Nama Barang</th>
                <th>Status</th>
                <th>Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, key) in orders" :key="key">
                <td>{{ order.orderNo }}</td>
                <td>{{ order.isInsured }}</td>
                <td>
                  <ul v-for="(item, key) in order.items" :key="key" >
                    <li>{{ item.goodsName }}</li>
                  </ul>
                </td>
                <td>{{ order.shipStatus }}</td>
                <td>
                  <button class="uk-button uk-button-primary" @click="showDialog(dialogPaymentCreate.id, order.orderNo, order.price)" >Konfirmasi Pembayaran</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <dialog-payment-create :id="dialogPaymentCreate.id" :orderNo="selected" :amountToPay="amount" @on-finish="onFinishCreatePayment"/>
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
      orders: [],
      selected: '',
      amount: ''
    }
  },
  methods: {
    fetchOrders () {
      this.$authHttp.get('/v1/summary/invoice')
        .then(response => {
          this.orders = response.data.data
        })
        .catch(() => {
          //
        })
    },
    showDialog (id, lorderNo, lamount) {
      this.selected = lorderNo
      this.amount = lamount
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
