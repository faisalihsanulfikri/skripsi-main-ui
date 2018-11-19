<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="file-alt"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>Inbound</h3>
          </div>
        </div>
        <div class="uk-width-auto">
        </div>
      </div>
    </div>
    <div class="uk-card-body uk-card-small">
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small">
          <thead>
            <tr>
              <th></th>
              <th width="150">Code</th>
              <th>Customer</th>
              <th class="uk-text-right" width="200">Amount (IDR)</th>
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
                <td>{{ order.user.name }}</td>
                <td class="uk-text-right">
                  {{ order.amount | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                </td>
                <td class="uk-text-center">{{ order.status }}</td>
              </tr>
              <tr v-show="!order.collapse" :key="`${index}_info`">
                <td></td>
                <td colspan="4">
                  <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-2-5">
                      <h5 class="uk-margin-small">
                        <font-awesome-icon icon="shipping-fast"></font-awesome-icon>
                        <span class="uk-text-primary uk-margin-small-left">{{ order.awb }}</span>
                      </h5>
                      <h5 class="uk-margin-remove">
                        <font-awesome-icon icon="truck"></font-awesome-icon>
                        <span class="uk-margin-small-left">Destination Address</span>
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
                        <font-awesome-icon icon="globe-asia"></font-awesome-icon>
                        <span class="uk-margin-small-left">{{ order.detail.warehouse.name }}</span>
                      </h5>
                    </div>
                    <div class="uk-width-3-5">
                      <h5 class="uk-margin-remove">
                        <font-awesome-icon icon="dollar-sign"></font-awesome-icon>
                        <span class="uk-margin-small-left">Cost</span>
                      </h5>
                      <calculator-result :final="true" :cost="order.detail.cost"></calculator-result>
                    </div>
                  </div>

                  <hr>

                  <div class="uk-margin-small uk-overflow-auto">
                    <h5 class="uk-margin-remove">
                      <font-awesome-icon icon="cubes"></font-awesome-icon>
                      <span class="uk-margin-small-left">Items</span>
                    </h5>
                    <div>
                      <table class="uk-table uk-table-small uk-table-divider uk-table-middle uk-text-small">
                        <tbody>
                          <template v-for="item in order.items">
                            <tr :key="`${item.id}_item`">
                              <td class="uk-text-center" width="20">
                                <el-checkbox v-model="item.selected"></el-checkbox>
                              </td>
                              <td>
                                <div>
                                  <span class="uk-text-primary">{{ item.name }} # {{ item.reference }}</span>
                                </div>
                                <div>{{ item.url }}</div>
                                <div>{{ `${item.stringWeight} ${order.detail.formula.weight_unit} - ${item.stringLength} x ${item.stringWidth} x ${item.stringLength} ${order.detail.formula.volume_unit}` }}</div>
                                <div>
                                  {{ item.stringQuantity }} item's x IDR {{ item.stringPrice }}
                                </div>
                              </td>
                              <td class="uk-text-center" width="100">{{ item.status }}</td>
                              <td class="uk-text-center" width="200">
                                <el-button type="success" size="mini" @click="receivedItem(order.code, item.id)">Received</el-button>
                                <el-button type="danger" size="mini" @click="rejectItem(order.code, item.id)">Reject</el-button>
                              </td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                    <hr>
                    <div class="uk-grid-small" uk-grid>
                      <div class="uk-width-auto">
                        <el-button @click="openCreateAwbDialog(order.id)">CREATE AWB | {{ countSelectedItems(order.id) }} item's</el-button>
                      </div>
                      <div class="uk-width-auto">
                        <el-button @click="printAwb(order.code)">PRINT AWB | {{ countSelectedItems(order.id) }} item's</el-button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <dialog-create-awb
      :visible="dialogCreateAwb.visible"
      :order="dialogCreateAwb.data"
      @close="closeCreateAwbDialog"
      @done="onAwbCreated">
    </dialog-create-awb>
  </div>
</template>

<script>
import CalculatorResult from '../../../components/CalculatorResult'
import DialogCreateAwb from '../../../components/DialogCreateAwb'

export default {
  components: {
    CalculatorResult,
    DialogCreateAwb
  },

  data () {
    return {
      dialogCreateAwb: {
        visible: false,
        data: {}
      },
      orders: {},
      printWindow: null
    }
  },

  async created () {
    this.__startLoading()

    await this.fetchOrders()

    this.__stopLoading()
  },

  methods: {
    openCreateAwbDialog (orderId) {
      this.dialogCreateAwb.data = this.orders.find(order => order.id === orderId)
      this.dialogCreateAwb.visible = true
    },
    closeCreateAwbDialog () {
      this.dialogCreateAwb.data = {}
      this.dialogCreateAwb.visible = false
    },
    async onAwbCreated () {
      this.closeCreateAwbDialog()

      this.__startLoading()

      await this.fetchOrders()

      this.__stopLoading()
    },
    collapseToggle (index) {
      this.orders[index].collapse = !this.orders[index].collapse
    },
    countSelectedItems (orderId) {
      let order = this.orders.find(order => order.id === orderId)

      return order.items.filter(item => item.selected).length
    },
    async fetchOrders () {
      await this.$authHttp.get('/orders').then(res => {
        this.orders = res.data.data.map(order => {
          order['collapse'] = true

          order.items.map(item => {
            item['selected'] = true
            item['stringPrice'] = this.$options.filters.currency(item.price, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
            item['stringQuantity'] = this.$options.filters.currency(item.quantity, '', 0, { thousandsSeparator: '.', decimalSeparator: ',' })
            item['stringWeight'] = this.$options.filters.currency(item.weight, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
            item['stringLength'] = this.$options.filters.currency(item.length, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
            item['stringWidth'] = this.$options.filters.currency(item.width, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
            item['stringHeight'] = this.$options.filters.currency(item.height, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
          })

          return order
        })
      }).catch(err => {
        if (err.response) {
          let message = err.response.data.message ? err.response.data.message : err.response.statusText

          this.$notify({
            title: 'ERROR',
            message: message,
            type: 'error'
          })
        }
      })
    },
    async updateItemStatus (orderCode, itemId, status) {
      this.__startLoading()

      await this.$authHttp.put(`/orders/${orderCode}/items/${itemId}/status`, {
        status: status
      }).then(async res => {
        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        await this.fetchOrders()
      }).catch(err => {
        if (err.response) {
          let message = err.response.data.message ? err.response.data.message : err.response.statusText

          this.$notify({
            title: 'ERROR',
            message: message,
            type: 'error'
          })
        }
      })

      this.__stopLoading()
    },
    receivedItem (orderCode, itemId) {
      this.$confirm('Are you sure to confirm this item?', 'Confirm', {
        type: 'warning'
      }).then(() => {
        this.updateItemStatus(orderCode, itemId, 'received')
      }).catch(() => {})
    },
    rejectItem (orderCode, itemId) {
      this.$confirm('Are you sure to reject this payment?', 'Confirm', {
        type: 'warning'
      }).then(() => {
        this.updateItemStatus(orderCode, itemId, 'reject')
      }).catch(() => {})
    },
    printAwb (code) {
      this.printWindow = window.open(
        `#/print-awb/${code}`,
        'Kirimin - Print AWB',
        'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800'
      )
    }
  }
}
</script>
