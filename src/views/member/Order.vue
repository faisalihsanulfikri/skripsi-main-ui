<template>
  <div>
    <div class="uk-card uk-card-default">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Pesanan</h3>
      </div>
      <div class="uk-card-body">
        <div class="uk-overflow-auto">
          <table class="uk-table uk-table-divider">
            <thead>
              <tr>
                <th width="50"></th>
                <th width="150">Kode Order</th>
                <th width="150">Tanggal</th>
                <th class="uk-text-right" width="150">Jumlah (IDR)</th>
                <th class="uk-text-right" width="150">Jumlah Barang</th>
                <th class="uk-text-center" width="100">Status</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(order, index) in orders">
                <tr :key="index">
                  <td class="app--table-column__collapse-toggle" @click.prevent="collapseToggle(index)">
                    <a href="#">
                      <font-awesome-icon v-if="order.collapse" icon="angle-right"></font-awesome-icon>
                      <font-awesome-icon v-else icon="angle-down"></font-awesome-icon>
                    </a>
                  </td>
                  <td>{{ order.orderNo }}</td>
                  <td>{{ new Date(order.dateCreated).toLocaleDateString('id-ID') }}</td>
                  <td class="uk-text-right">{{ order.amount | currency('', 0, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
                  <td class="uk-text-right">{{ order.items.length }}</td>
                  <td class="uk-text-center">{{ order.shipStatus }}</td>
                </tr>
                <tr v-if="!order.collapse" :key="`${index}_info`">
                  <td></td>
                  <td colspan="5">
                    <div class="uk-grid-small" uk-grid>
                      <div class="uk-width-1-4">
                        <h5 class="uk-margin-remove">Pengirim</h5>
                        <ul class="uk-list uk-margin-small">
                          <li>
                            <div class="app--list-label">Nama</div>
                            <div class="app--list-text">{{ order.shipperName }}</div>
                          </li>
                          <li>
                            <div class="app--list-label">Telepon</div>
                            <div class="app--list-text">{{ order.shipperPhone }}</div>
                          </li>
                          <li>
                            <div class="app--list-label">Provinsi</div>
                            <div class="app--list-text">{{ order.shipperRegion }}</div>
                          </li>
                          <li>
                            <div class="app--list-label">Kota / Kab</div>
                            <div class="app--list-text">{{ order.shipperCity }}</div>
                          </li>
                          <li>
                            <div class="app--list-label">Alamat</div>
                            <div class="app--list-text">{{ order.shipperAddress }}</div>
                          </li>
                          <li>
                            <div class="app--list-label">Kode POS</div>
                            <div class="app--list-text">{{ order.shipperZipCode }}</div>
                          </li>
                        </ul>
                      </div>
                      <div class="uk-width-1-4">
                        <h5 class="uk-margin-remove">Penerima</h5>
                        <ul class="uk-list uk-margin-small">
                          <li>
                            <div class="app--list-label">Nama</div>
                            <div class="app--list-text">{{ order.receiverName }}</div>
                          </li>
                          <li>
                            <div class="app--list-label">Telepon</div>
                            <div class="app--list-text">{{ order.receiverPhone }}</div>
                          </li>
                          <li>
                            <div class="app--list-label">Provinsi</div>
                            <div class="app--list-text">{{ order.receiverRegion }}</div>
                          </li>
                          <li>
                            <div class="app--list-label">Kota / Kab</div>
                            <div class="app--list-text">{{ order.receiverCity }}</div>
                          </li>
                          <li>
                            <div class="app--list-label">Alamat</div>
                            <div class="app--list-text">{{ order.receiverAddress }}</div>
                          </li>
                          <li>
                            <div class="app--list-label">Kode POS</div>
                            <div class="app--list-text">{{ order.receiverZipCode }}</div>
                          </li>
                        </ul>
                      </div>
                      <div class="uk-width-1-2">
                        <h5 class="uk-margin-remove">Biaya</h5>
                        <calculator-result :result="order.result"></calculator-result>
                      </div>
                    </div>
                    <hr>
                    <div class="uk-margin uk-text-right">
                      <button class="uk-button uk-button-primary" @click="showPaymentDialog(index)">Konfirmasi Pembayaran</button>
                    </div>
                  </td>
                </tr>
                <tr v-if="!order.collapse" :key="`${index}_tracking_info`">
                  <td colspan="5">
                    <div class="uk-margin uk-text-right">
                      Tracking Section...... (Status 1 - 2 - 3 - 4 - 5 )
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <dialog-payment-confirm
    :visible="dialogPayment.visible"
    :data="dialogPayment.data"
    @close="closePaymentDialog"
    @confirm="confirmPaymentDialog">
    </dialog-payment-confirm>
  </div>
</template>

<script>
import CalculatorResult from '../../components/CalculatorResult'
import DialogPaymentConfirm from '../../components/DialogPaymentConfirm'

export default {
  components: {
    CalculatorResult,
    DialogPaymentConfirm
  },
  data () {
    return {
      dialogPaymentCreate: {
        id: 'dialog-payment-create'
      },
      dialogPayment: {
        visible: false,
        data: {}
      },
      orders: [],
      selected: '',
      amount: ''
    }
  },
  methods: {
    fetchOrders () {
      this.$authHttp.get('/orders')
        .then(response => {
          this.orders = response.data.data.map(item => {
            item.collapse = true
            item.result = {
              items: [
                {
                  harga: item.harga,
                  biayaInt: item.biayaInt,
                  biayaDom: item.biayaDom,
                  beamasuk: item.beamasuk,
                  ppn: item.ppn,
                  pph: item.pph,
                  total: item.total,
                  npwp: item.npwp,
                  totalBayar: item.totalBayar
                }
              ]
            }

            return item
          })
        })
        .catch(() => {})
    },
    collapseToggle (index) {
      this.orders[index].collapse = !this.orders[index].collapse
    },
    showPaymentDialog (index) {
      this.dialogPayment.visible = true
      this.dialogPayment.data = this.orders[index]
    },
    closePaymentDialog () {
      this.dialogPayment.visible = false
      this.dialogPayment.data = {}
    },
    confirmPaymentDialog () {
      this.closePaymentDialog()

      this.fetchOrders()
    }
  },
  created () {
    this.fetchOrders()
  }
}
</script>
