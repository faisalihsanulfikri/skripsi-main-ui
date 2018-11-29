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
                <th class="uk-text-center" width="250">Jumlah Paket</th>
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
                    {{ order.item_groups.length | currency('', 0, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
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
                      <h5 class="uk-margin-remove">
                        <font-awesome-icon icon="credit-card"></font-awesome-icon>
                        <span class="uk-margin-small-left">Pembayaran</span>
                      </h5>
                      <table class="uk-table uk-table-small uk-text-small uk-margin-small">
                          <thead>
                            <tr>
                              <th>Tanggal</th>
                              <th>Channel</th>
                              <th class="uk-text-right" width="250">Jumlah</th>
                              <th class="uk-text-center" width="150">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(payment, key) in order.payment_confirmations" :key="key">
                              <td>{{ new Date(payment.date).toLocaleDateString('id-ID') }}</td>
                              <td>{{ payment.channel }}</td>
                              <td class="uk-text-right">
                                {{ payment.amount | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }} {{ payment.currency }}
                              </td>
                              <td class="uk-text-center">{{ payment.status }}</td>
                            </tr>
                          </tbody>
                      </table>
                    </div>

                    <hr>

                    <div class="uk-grid-small" uk-grid>
                      <div class="uk-width-2-5">
                        <h5 class="uk-margin-remove">
                          <font-awesome-icon icon="globe-asia"></font-awesome-icon>
                          <span class="uk-margin-small-left">{{ order.detail.warehouse.name }}</span>
                        </h5>
                        <h5 class="uk-margin-small">
                          <font-awesome-icon icon="shipping-fast"></font-awesome-icon>
                          <span class="uk-text-primary uk-margin-small-left">{{ order.awb }}</span>
                        </h5>
                        <h5 class="uk-margin-remove">
                          <font-awesome-icon icon="truck"></font-awesome-icon>
                          <span class="uk-margin-small-left">Tujuan</span>
                        </h5>
                        <div class="uk-padding-small">
                          <div class="app--list-text">{{ order.receiver.name }}</div>
                          <div class="app--list-text">{{ order.receiver.address }}</div>
                          <div class="app--list-text">
                            {{ order.receiver.sub_district }}, {{ order.receiver.city }} {{ order.receiver.postal_code }}
                          </div>
                          <div class="app--list-text">{{ order.receiver.province }}</div>
                          <div class="app--list-text">{{ order.receiver.phone }}</div>
                        </div>
                        <h5 class="uk-margin-remove">
                          <font-awesome-icon icon="pen-alt"></font-awesome-icon>
                          <span class="uk-margin-small-left">Catatan</span>
                        </h5>
                        <p class="uk-margin-small">{{ order.note }}</p>
                      </div>
                      <div class="uk-width-3-5">
                        <h5 class="uk-margin-remove">
                          <font-awesome-icon icon="dollar-sign"></font-awesome-icon>
                          <span class="uk-margin-small-left">Biaya</span>
                        </h5>
                        <calculator-result :final="true" :cost="order.detail.cost"></calculator-result>
                      </div>
                    </div>

                    <hr>

                    <div class="uk-margin-small uk-overflow-auto">
                      <h5 class="uk-margin-remove">
                        <font-awesome-icon icon="cubes"></font-awesome-icon>
                        <span class="uk-margin-small-left">Paket</span>
                      </h5>
                      <div>
                        <table class="uk-table uk-table-small uk-table-divider uk-table-middle uk-text-small">
                          <tbody>
                            <template v-for="(items, groupIndex) in order.item_groups">
                              <tr :key="groupIndex">
                                <td>
                                  <a href="#">{{ items[0].category.name }}</a>
                                </td>
                                <td class="uk-text-center" width="300">{{ `${items[0].stringWeight} ${order.detail.formula.weight_unit} - ${items[0].stringLength} x ${items[0].stringWidth} x ${items[0].stringLength} ${order.detail.formula.volume_unit}` }}</td>
                                <td class="uk-text-right" width="200">Rp. {{ items[0].stringPrice }}</td>
                              </tr>
                              <tr :key="`${groupIndex}_goods`">
                                <td colspan="3">
                                  <table class="uk-table uk-table-small">
                                    <tr>
                                      <td colspan="3">
                                        <div class="app--list-label">Reference</div>
                                        <div class="app--list-text">{{ items[0].reference }}</div>
                                      </td>
                                    </tr>
                                    <tr v-for="(item, itemIndex) in items" :key="itemIndex">
                                      <td>{{ item.name }}</td>
                                      <td width="100">{{ item.quantity }} {{ item.unit }}</td>
                                      <td class="uk-text-center" width="100">{{ item.status }}</td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </template>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <hr>

                    <div class="uk-margin uk-text-right">
                      <router-link
                        :to="{ name: 'member-order-history', params: { code: order.code } }"
                        tag="button"
                        class="uk-button uk-button-default">
                        Histori Pesanan
                      </router-link>
                      <router-link
                        v-if="parseInt(order.invoice.paid) === 0"
                        class="uk-margin-small-left uk-button uk-button-primary"
                        :to="{ name: 'member-invoice-show', params: { code: order.code } }">
                        Pembayaran
                      </router-link>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CalculatorResult from '../../components/CalculatorResult'

export default {
  components: {
    CalculatorResult
  },
  data () {
    return {
      orders: [],
      selected: '',
      amount: ''
    }
  },
  methods: {
    async fetchOrders () {
      this.__startLoading()

      try {
        let res = await this.$service.order.get({

        })

        this.orders = res.data.data.map(item => {
          item.collapse = true
          item.item_groups = item.item_groups.map(items => {
            return this.$util.orderItem.stringCurrency(items)
          })

          return item
        })
      } catch (err) {
        this.__handleError(this, err, true)
      }

      this.__stopLoading()
    },
    collapseToggle (index) {
      this.orders[index].collapse = !this.orders[index].collapse
    }
  },
  created () {
    this.fetchOrders()
  }
}
</script>
