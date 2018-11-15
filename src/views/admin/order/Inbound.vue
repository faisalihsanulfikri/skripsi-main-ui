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
                      <h5>
                        <font-awesome-icon icon="truck"></font-awesome-icon>
                        <span class="uk-margin-small-left">Destination Address</span>
                      </h5>
                      <div>
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
                    <table class="uk-table uk-table-small uk-table-divider uk-table-middle uk-text-small">
                      <tbody>
                        <template v-for="item in order.items">
                          <tr :key="`${item.id}_item`">
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
                    <hr>
                    <div class="uk-grid-small" uk-grid>
                      <div class="uk-width-auto">
                        <el-button>CREATE AWB</el-button>
                      </div>
                      <div class="uk-width-auto">
                        <el-button>PRINT AWB</el-button>
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
  </div>
</template>

<script>
import CalculatorResult from '../../../components/CalculatorResult'

export default {
  components: {
    CalculatorResult
  },

  data () {
    return {
      orders: {}
    }
  },

  async created () {
    this.__startLoading()

    await this.fetchOrders()  

    this.__stopLoading()
  },

  methods: {
    collapseToggle (index) {
      this.orders[index].collapse = !this.orders[index].collapse
    },
    async fetchOrders () {
      await this.$authHttp.get('/orders').then(res => {
        this.orders = res.data.data.map(order => {
          order['collapse'] = true

          order.items.map(item => {
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
    }
  }
}
</script>
