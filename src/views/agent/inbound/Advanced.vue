<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.1/moment.min.js"></script> -->
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
              <span>Advanced Inbound</span>
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
        <div class="uk-width-auto">
          <el-date-picker v-model="filter.time" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            range-separator="To" start-placeholder="Start date" end-placeholder="End date">
          </el-date-picker>
          <el-button slot="append" icon="el-icon-search" @click="fetchOrders">
          </el-button>
        </div>
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
              <th>Code</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Status</th>
              <th class="uk-text-center">Goods Name</th>
              <th class="uk-text-right">Total</th>
              <th class="uk-text-right">Unit</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(order, orderIndex) in orders">
              <tr :key="orderIndex">

                <td>{{ order.code }}</td>
                <td>{{ moment(order.created_at).format('MMM DD YYYY, HH:mm:ss') }}</td>
                <td>{{ order.user.code }}</td>
                <td>{{ order.status }}</td>

                <td>
                  <template v-for="(items, groupIndex) in order.item_groups">
                    <table style="border-left: 1px solid #e5e5e5;">
                      <tbody>
                        <tr v-for="(item, itemIndex) in items" :key="itemIndex">
                          <ul style="list-style: none;">
                            <li>{{ item.name }}</li>
                          </ul>
                        </tr>
                      </tbody>
                    </table>
                  </template>
                </td>

                <td>
                  <template v-for="(items, groupIndex) in order.item_groups">
                    <table>
                      <tbody>
                        <tr v-for="(item, itemIndex) in items" :key="itemIndex">
                          <ul style="list-style: none;">
                            <li>{{ item.stringQuantity }}</li>
                          </ul>
                        </tr>
                      </tbody>
                    </table>
                  </template>
                </td>

                <td>
                  <template v-for="(items, groupIndex) in order.item_groups">
                    <table>
                      <tbody>
                        <tr v-for="(item, itemIndex) in items" :key="itemIndex">
                          <ul style="list-style: none;">
                            <li>{{ item.unit }}</li>
                          </ul>
                        </tr>
                      </tbody>
                    </table>
                  </template>
                </td>

              </tr>
              <br>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <dialog-create-awb :visible="dialogCreateAwb.visible" :order="dialogCreateAwb.data" @close="closeCreateAwbDialog"
      @done="onAwbCreated">
    </dialog-create-awb>
  </div>
</template>

<script>
  import moment from 'moment'
  import CalculatorResult from '../../../components/CalculatorResult'
  import DialogCreateAwb from '../../../components/DialogCreateAwb'

  export default {
    components: {
      CalculatorResult,
      DialogCreateAwb
    },

    data() {
      return {
        dialogCreateAwb: {
          visible: false,
          data: {}
        },
        // datas:[],
        orders: [],
        // order: [],
        awb: [],
        pagination: {
          total: 0,
          current_page: 1
        },
        filter: {
          time: [],
          search: ''
        },
        master: {
          addresses: []
        }
      }

    },

    created() {
      this.filter.time = [
        moment().startOf('month').format('YYYY-MM-DD'),
        moment().endOf('month').format('YYYY-MM-DD')
      ]

      this.fetchOrders()
    },

    methods: {
      openCreateAwbDialog(index) {
        this.dialogCreateAwb.data = this.orders[index]
        this.dialogCreateAwb.visible = true
      },
      closeCreateAwbDialog() {
        this.dialogCreateAwb.data = {}
        this.dialogCreateAwb.visible = false
      },
      async onAwbCreated(res) {
        this.closeCreateAwbDialog()
        // console.log(res.data.data.air_waybills[0].awb)
        this.orders = this.orders.map(order => {
          if (order.id === res.data.data.id) {
            let $order = res.data.data

            $order['collapse'] = false
            $order.item_groups = $order.item_groups.map(items => {
              return this.mappingItems($order, items)
            })
            $order.items = this.mappingItems($order, $order.items)

            return $order
          }

          return order
        })
        var lenght = res.data.data.air_waybills.length
        this.printAwb(res.data.data.air_waybills[lenght - 1].awb)
      },
      collapseToggle(index) {
        this.orders[index].collapse = !this.orders[index].collapse
      },
      countSelectedItems(index) {
        let order = this.orders[index]
        let items = order.item_groups.flat()

        return items.filter(item => item.selected).length
      },
      canCreateAwb(index) {
        let order = this.orders[index]
        let items = order.item_groups.flat()
        let selectedItems = items.filter(item => item.selected)
        let invalidItems = selectedItems.filter(item => {
          let {
            item_status: itemStatus
          } = this.$store.state.kirimin.status

          let isWaiting = item.status === itemStatus.WAITING
          let isRejected = item.status === itemStatus.REJECTED
          let isShipping = item.status === itemStatus.SHIPPING

          return isWaiting || isRejected || isShipping
        })

        if (selectedItems.length > 0 && invalidItems.length === 0) return true

        return false
      },
      receivedItem(orderCode, itemId) {
        this.$confirm('Are you sure to confirm this item?', 'Confirm', {
          type: 'warning'
        }).then(() => {
          this.updateItemStatus(orderCode, itemId, this.$store.state.kirimin.status.item_status.RECEIVED)
        }).catch(() => {})
      },
      // receivedItem (orderCode, itemId, orderIndex) {
      //   this.$confirm('Are you sure to confirm this item?', 'Confirm', {
      //   type: 'warning'
      //   }).then(() => {
      //     this.updateItemStatus(orderCode, itemId, this.$store.state.kirimin.status.item_status.RECEIVED).then(
      //       // console.log('test')
      //       var datas = Object.assign({}, this.orders(orderIndex))
      //
      //       datas['orderCode'] = this.orders(orderIndex).code
      //       datas['items'] = this.orders(orderIndex).item_groups.flat()
      //         .filter(item => item.selected)
      //         .map(item => {
      //           return item.id
      //         })
      //         try {
      //           let res = await this.$service.awb.create(datas)
      //
      //           // this.$notify({
      //           //   title: 'SUCCESS',
      //           //   message: res.data.message,
      //           //   type: 'success'
      //           // })
      //
      //           this.input = this.$options.data().input
      //
      //           this.$emit('done', res)
      //         } catch (err) {
      //           this.__handleError(this, err, true)
      //         }
      //     ).then(
      //       var ref = this
      //       var Awb = ref.getAwb(orderIndex)
      //       printAwb(Awb)
      //     )
      //     )
      //   }).catch(() => {})
      // },
      rejectItem(orderCode, itemId) {
        this.$confirm('Are you sure to reject this payment?', 'Confirm', {
          type: 'warning'
        }).then(() => {
          this.updateItemStatus(orderCode, itemId, this.$store.state.kirimin.status.item_status.REJECTED)
        }).catch(() => {})
      },
      printAwb(code) {
        window.open(
          `#/print-awb/${code}`,
          'Kirimin - Print AWB',
          'directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=0,width=800'
        )
        // console.log(code)
      },
      mappingItems(order, items) {
        let $items = this.$util.orderItem.stringCurrency(items)
          .map(item => {
            let {
              order_status: orderStatus,
              item_status: itemStatus
            } = this.$store.state.kirimin.status

            let isCancelOrder = order.status === orderStatus.CANCEL

            let isWaiting = item.status === itemStatus.WAITING
            let isRejected = item.status === itemStatus.REJECTED
            let isReceived = item.status === itemStatus.RECEIVED

            item['selected'] = false
            item['showReceivedButton'] = (!isCancelOrder) && (isWaiting || isRejected)
            item['showRejectButton'] = (!isCancelOrder) && (isWaiting || isReceived)

            return item
          })

        return $items
      },
      async fetchOrders() {
        this.__startLoading()

        try {
          let res = await this.$service.order.get({
            search: this.filter.search,
            time: this.filter.time
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
      },
      async updateItemStatus(orderCode, itemId, status) {
        this.__startLoading()

        try {
          let res = await this.$service.order.updateItemStatus(orderCode, itemId, {
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
              $order.item_groups = $order.item_groups.map(items => {
                return this.mappingItems($order, items)
              })
              $order.items = this.mappingItems($order, $order.items)

              return $order
            }

            return order
          })
        } catch (err) {
          this.__handleError(this, err, true)
        }

        this.__stopLoading()
      },
      async getAwb(orderCode) {
        this.__startLoading()

        try {
          let res = await this.$service.awb.find_number(orderCode)
          this.orders = res.data.data.map(awb => {
            awb['collapse'] = true
            awb.item_groups = awb.item_groups.map(items => {
              return this.mappingItems(awb, items)
            })
            // awb.items = this.mappingItems(awb, order.items)
            // console.log(awb)
            return awb
          })
        } catch (err) {
          this.__handleError(this, err, true)
        }
        return awb
        this.__stopLoading()
      },
      async createData(data, inputData) {
        this.__startLoading()
        try {
          console.log(data)
          let res = await this.$service.awb.create(data)
          inputData = this.$options.data().input

          this.$emit('onAwbCreated', res)
        } catch (err) {
          this.__handleError(this, err, true)
        }
        this.__stopLoading()
      }
    }
  }
</script>