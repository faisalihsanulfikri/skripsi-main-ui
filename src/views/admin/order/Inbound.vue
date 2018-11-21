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
      <div class="uk-margin uk-grid-small" uk-grid>
        <div class="uk-width-1-3 uk-margin-auto-left">
          <el-input v-model="filter.search" placeholder="Search...">
            <el-button slot="append" icon="el-icon-search" @click="fetchOrders">
            </el-button>
          </el-input>
        </div>
      </div>
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
                        <font-awesome-icon icon="globe-asia"></font-awesome-icon>
                        <span class="uk-margin-small-left">{{ order.detail.warehouse.name }}</span>
                      </h5>
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
                                  <span class="uk-text-primary">{{ item.name }} # {{ item.category.name }}</span>
                                </div>
                                <div>{{ item.url }}</div>
                                <div>{{ item.reference }}</div>
                                <div>{{ `${item.stringWeight} ${order.detail.formula.weight_unit} - ${item.stringLength} x ${item.stringWidth} x ${item.stringLength} ${order.detail.formula.volume_unit}` }}</div>
                                <div>
                                  {{ item.stringQuantity }} item's x IDR {{ item.stringPrice }}
                                </div>
                              </td>
                              <td class="uk-text-center" width="100">{{ item.status }}</td>
                              <td class="uk-text-center" width="200">
                                <el-button
                                  v-if="item.showReceivedButton"
                                  type="success"
                                  size="mini"
                                  @click="receivedItem(order.code, item.id)">
                                  Received
                                </el-button>
                                <el-button
                                  v-if="item.showRejectButton"
                                  type="danger"
                                  size="mini"
                                  @click="rejectItem(order.code, item.id)">
                                  Reject
                                </el-button>
                              </td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                    <hr>
                    <div class="uk-grid-small" uk-grid>
                      <div v-if="!order.awb" class="uk-width-auto">
                        <el-button @click="openCreateAwbDialog(order.id)">CREATE AWB | {{ countSelectedItems(order.id) }} item's</el-button>
                      </div>
                      <div v-else class="uk-width-auto">
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
      orders: [],
      filter: {
        search: ''
      }
    }
  },

  created () {
    this.fetchOrders()
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
    async onAwbCreated (res) {
      this.closeCreateAwbDialog()

      this.orders = this.orders.map(order => {
        if (order.id === res.data.data.id) {
          let $order = res.data.data

          $order['collapse'] = false
          $order.items = this.mappedItems($order)

          return $order
        }

        return order
      })
    },
    collapseToggle (index) {
      this.orders[index].collapse = !this.orders[index].collapse
    },
    countSelectedItems (orderId) {
      let order = this.orders.find(order => order.id === orderId)

      return order.items.filter(item => item.selected).length
    },
    receivedItem (orderCode, itemId) {
      this.$confirm('Are you sure to confirm this item?', 'Confirm', {
        type: 'warning'
      }).then(() => {
        this.updateItemStatus(orderCode, itemId, this.$store.state.kirimin.status.item_status.RECEIVED)
      }).catch(() => {})
    },
    rejectItem (orderCode, itemId) {
      this.$confirm('Are you sure to reject this payment?', 'Confirm', {
        type: 'warning'
      }).then(() => {
        this.updateItemStatus(orderCode, itemId, this.$store.state.kirimin.status.item_status.REJECTED)
      }).catch(() => {})
    },
    printAwb (code) {
      window.open(
        `#/print-awb/${code}`,
        'Kirimin - Print AWB',
        'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800'
      )
    },
    mappedItems (order) {
      let items = order.items.map(item => {
        item['selected'] = true
        item['stringPrice'] = this.$options.filters.currency(item.price, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
        item['stringQuantity'] = this.$options.filters.currency(item.quantity, '', 0, { thousandsSeparator: '.', decimalSeparator: ',' })
        item['stringWeight'] = this.$options.filters.currency(item.weight, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
        item['stringLength'] = this.$options.filters.currency(item.length, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
        item['stringWidth'] = this.$options.filters.currency(item.width, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
        item['stringHeight'] = this.$options.filters.currency(item.height, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })

        let { order_status, item_status } = this.$store.state.kirimin.status

        let isNewOrder = order.status === order_status.NEW
        let isCancelOrder = order.status === order_status.CANCEL

        let isWaiting = item.status === item_status.WAITING
        let isReceived = item.status === item_status.RECEIVED
        let isRejected = item.status === item_status.REJECTED

        item['showReceivedButton'] = (!isNewOrder && !isCancelOrder) && (isWaiting || isRejected)
        item['showRejectButton'] = (!isNewOrder && !isCancelOrder) && (isWaiting || isReceived)

        return item
      })

      return items
    },
    async fetchOrders () {
      this.__startLoading()

      try {
        let res = await this.$service.getOrders({
          search: this.filter.search
        })

        this.orders = res.data.data.map(order => {
          order['collapse'] = true
          order.items = this.mappedItems(order)

          return order
        })
      } catch (err) {
        this.__handleError(this, err, true)
      }

      this.__stopLoading()
    },
    async updateItemStatus (orderCode, itemId, status) {
      this.__startLoading()

      try {
        let res = await this.$service.updateItemStatus(orderCode, itemId, {
          status: status
        })

        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.orders = this.orders.map(order => {
          if (order.id === res.data.data.id) {
            let $order = res.data.data

            $order['collapse'] = false
            $order.items = this.mappedItems($order)

            return $order
          }

          return order
        })
      } catch (err) {
        this.__handleError(this, err, true)
      }

      this.__stopLoading()
    }
  }
}
</script>
