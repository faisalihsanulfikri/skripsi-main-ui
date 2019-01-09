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
            <h3>
              <span>Inbound</span>
              <el-badge :value="pagination.total"></el-badge>
            </h3>
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
              <th width="150">Date</th>
              <th>Customer</th>
              <th class="uk-text-right" width="200">Amount (IDR)</th>
              <th class="uk-text-center" width="150">Status</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(order, orderIndex) in orders">
              <tr :key="orderIndex">
                <td class="app--table-column__collapse-toggle" @click.prevent="collapseToggle(orderIndex)">
                  <a href="#">
                    <font-awesome-icon v-if="order.collapse" icon="angle-right"></font-awesome-icon>
                    <font-awesome-icon v-else icon="angle-down"></font-awesome-icon>
                  </a>
                </td>
                <td>{{ order.code }}</td>
                <td>{{ moment(order.created_at).format('MMMM Do YYYY, h:mm:ss a') }}</td>
                <td>{{ order.user.name }}</td>
                <td class="uk-text-right">
                  {{ order.amount | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                </td>
                <td class="uk-text-center">{{ order.status }}</td>
              </tr>
              <tr v-show="!order.collapse" :key="`${orderIndex}_info`">
                <td></td>
                <td colspan="5">
                  <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-2-5">
                      <h5 class="uk-margin-small">
                        <font-awesome-icon icon="globe-asia"></font-awesome-icon>
                        <span class="uk-margin-small-left">{{ order.detail.warehouse.name }}</span>
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
                      <span class="uk-margin-small-left">Packets</span>
                      <el-badge :value="order.item_groups.length"></el-badge>
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
                                    <td width="100">{{ item.stringQuantity }} {{ item.unit }}</td>
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

                  <div class="uk-margin">
                    <h5 class="uk-margin-remove">
                      <font-awesome-icon icon="shipping-fast"></font-awesome-icon>
                      <span class="uk-margin-small-left">Air Waybills</span>
                    </h5>
                    <div>
                      <table class="uk-table uk-table-small uk-table-divider uk-text-small">
                        <thead>
                          <tr>
                            <th>AWB Number</th>
                            <th width="150">Created At</th>
                            <th width="150">Created By</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(awb, index) in order.air_waybills" :key="index">
                            <td>
                              <router-link :to="{ name: 'admin-awb-show', params: { code: awb.awb } }">
                                {{ awb.awb }}
                              </router-link>
                            </td>
                            <td>{{ awb.created_at }}</td>
                            <td>{{ awb.created_by }}</td>
                          </tr>
                        </tbody>
                      </table>
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
      orders: [],
      pagination: {
        total: 0,
        current_page: 1
      },
      filter: {
        search: ''
      }
    }
  },

  created () {
    this.fetchOrders()
  },

  methods: {
    collapseToggle (index) {
      this.orders[index].collapse = !this.orders[index].collapse
    },
    printAwb (code) {
      window.open(
        `#/print-awb/${code}`,
        'Kirimin - Print AWB',
        'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800'
      )
    },
    mappingItems (order, items) {
      let $items = this.$util.orderItem.stringCurrency(items)

      return $items
    },
    async fetchOrders () {
      this.__startLoading()

      try {
        let res = await this.$service.order.get({
          search: this.filter.search
        })

        this.orders = res.data.data.map(order => {
          order['collapse'] = true
          order.item_groups = order.item_groups.map(items => {
            return this.mappingItems(order, items)
          })
          order.items = this.mappingItems(order, order.items)

          return order
        })

        this.pagination = res.data

        delete this.pagination.data
      } catch (err) {
        this.__handleError(this, err, true)
      }

      this.__stopLoading()
    }
  }
}
</script>
