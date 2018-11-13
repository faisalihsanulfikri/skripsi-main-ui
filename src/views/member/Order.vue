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
                <th width="250">Kode Order</th>
                <th>Tanggal</th>
                <th class="uk-text-right" width="250">Jumlah (IDR)</th>
                <th class="uk-text-center" width="250">Jumlah Barang</th>
                <th class="uk-text-center" width="150">Status</th>
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
                  <td>{{ order.code }}</td>
                  <td>{{ new Date(order.created_at).toLocaleDateString('id-ID') }}</td>
                  <td class="uk-text-right">{{ order.amount | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
                  <td class="uk-text-center">
                    {{ order.item_quantities | currency('', 0, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                    dari
                    {{ order.items.length | currency('', 0, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                  </td>
                  <td class="uk-text-center">{{ order.status }}</td>
                </tr>
                <tr v-if="!order.collapse" :key="`${index}_info`">
                  <td></td>
                  <td colspan="5">
                    <div class="uk-margin-small">
                      <h5 class="uk-margin-remove">Pembayaran</h5>
                      <div class="uk-grid-small uk-margin-small" uk-grid>
                        <div class="uk-width-1-3">
                          <div class="app--list-label">Metode Pembayaran</div>
                          <div class="app--list-text">{{ order.invoice.payment_method }}</div>
                        </div>
                        <div class="uk-width-1-3">
                          <div class="app--list-label">Status</div>
                          <div class="app--list-text">
                            <el-tag v-if="parseInt(order.invoice.paid) === 1" type="success" size="mini">Dibayar</el-tag>
                            <el-tag v-else type="danger" size="mini">Belum dibayar</el-tag>
                          </div>
                        </div>
                        <div class="uk-width-1-3">
                          <div class="app--list-label">Tanggal Bayar</div>
                          <div v-if="parseInt(order.invoice.paid) === 1" class="app--list-text">{{ new Date(order.invoice.paid_date).toLocaleDateString('id-ID') }}</div>
                          <div v-else class="app--list-text">-</div>
                        </div>
                      </div>
                    </div>

                    <hr>

                    <div class="uk-margin-small">
                      <h5 class="uk-margin-remove">Konfirmasi Pembayaran</h5>
                      <table class="uk-table uk-table-small uk-text-small uk-margin-small">
                          <thead>
                            <tr>
                              <th>Tanggal</th>
                              <th>Bank</th>
                              <th class="uk-text-right" width="250">Jumlah</th>
                              <th class="uk-text-center" width="150">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(confirmation, key) in order.payment_confirmations" :key="key">
                              <td>{{ new Date(confirmation.date).toLocaleDateString('id-ID') }}</td>
                              <td>{{ confirmation.bank }}</td>
                              <td class="uk-text-right">{{ confirmation.amount | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
                              <td class="uk-text-center">{{ confirmation.status }}</td>
                            </tr>
                          </tbody>
                      </table>
                    </div>

                    <div class="uk-margin-small">
                      <h5 class="uk-margin-remove">Barang</h5>
                      <table class="uk-table uk-table-small uk-text-small uk-margin-small">
                        <thead>
                          <th>Nama</th>
                          <th width="200">Referensi</th>
                          <th class="uk-text-right" width="200">Harga</th>
                          <th class="uk-text-right" width="100">Jumlah</th>
                          <th class="uk-text-center" width="100">Berat (KG)</th>
                          <th class="uk-text-center" width="200">Volume (CM)</th>
                        </thead>
                        <tbody>
                          <template v-for="item in order.items">
                            <tr :key="`${item.id}_item`">
                              <td>{{ item.name }}</td>
                              <td>{{ item.reference }}</td>
                              <td class="uk-text-right">{{ item.price | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
                              <td class="uk-text-right">{{ item.quantity | currency('', 0, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
                              <td class="uk-text-center">{{ item.weight | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
                              <td class="uk-text-center">
                                {{ item.length | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                                x
                                {{ item.width | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                                x
                                {{ item.height | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                              </td>
                            </tr>
                            <tr v-if="order.type.toUpperCase() === 'BELIIN'" :key="`${item.id}_url`">
                              <td colspan="6">{{ item.url }}</td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>

                    <hr>

                    <div class="uk-grid-small" uk-grid>
                      <div class="uk-width-2-5">
                        <h5 class="uk-margin-remove">Penerima</h5>
                        <ul class="uk-list uk-margin-small">
                          <li>
                            <div class="app--list-label">Nama</div>
                            <div class="app--list-text">{{ order.receiver.name }}</div>
                          </li>
                          <li>
                            <div class="app--list-label">Telepon</div>
                            <div class="app--list-text">{{ order.receiver.phone }}</div>
                          </li>
                          <li>
                            <div class="app--list-label">Provinsi</div>
                            <div class="app--list-text">{{ order.receiver.province }}</div>
                          </li>
                          <li>
                            <div class="app--list-label">Kota / Kab</div>
                            <div class="app--list-text">{{ order.receiver.city }}</div>
                          </li>
                          <li>
                            <div class="app--list-label">Alamat</div>
                            <div class="app--list-text">{{ order.receiver.address }}</div>
                          </li>
                          <li>
                            <div class="app--list-label">Kode POS</div>
                            <div class="app--list-text">{{ order.receiver.postal_code }}</div>
                          </li>
                        </ul>
                      </div>
                      <div class="uk-width-3-5">
                        <h5 class="uk-margin-remove">Biaya</h5>
                        <calculator-result :final="true" :cost="order.detail.cost"></calculator-result>
                      </div>
                    </div>

                    <hr>

                    <div class="uk-margin uk-text-right">
                      <router-link
                        :to="{ name: 'member-order-history', params: { code: order.code } }"
                        tag="button"
                        class="uk-button uk-button-default">
                        Histori order
                      </router-link>
                      <button v-if="parseInt(order.invoice.paid) === 0" class="uk-margin-small-left uk-button uk-button-primary" @click="showPaymentDialog(index)">Konfirmasi Pembayaran</button>
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
