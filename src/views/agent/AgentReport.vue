<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="order"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>Agent Report</h3>
          </div>
        </div>
        <div class="uk-width-auto">
        </div>
      </div>
    </div>
    <div class="uk-card-body uk-card-small">
      <div class="uk-margin">
        <div class="uk-grid-small" uk-grid>
          <div class="uk-width-1-3">
            <el-input v-model="filter.keyword" placeholder="Search..."></el-input>
          </div>
        </div>
      </div>
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small">
          <thead>
            <tr>
              <th>No</th>
              <th>
                <column-sort
                  title="Order No"
                  field="goodsName"
                  :active-field="filter.sort.field"
                  @change="onSortChange">
                </column-sort>
              </th>
              <th>
                <column-sort
                  title="Customer Name"
                  field="goodsName"
                  :active-field="filter.sort.field"
                  @change="onSortChange">
                </column-sort>
              </th>
              <th>
                <column-sort
                  title="Qty"
                  field="goodsName"
                  :active-field="filter.sort.field"
                  @change="onSortChange">
                </column-sort>
              </th>
              <th class="uk-text-right">
                <column-sort
                  title="Status"
                  field="status"
                  :active-field="filter.sort.field"
                  @change="onSortChange">
                </column-sort>
              </th>
              <th class="uk-text-right">
                <column-sort
                  title="Weight"
                  field="weight"
                  :active-field="filter.sort.field"
                  @change="onSortChange">
                </column-sort>
              </th>
              <th class="uk-text-right">
                <column-sort
                  title="Dimension"
                  field="length"
                  :active-field="filter.sort.field"
                  @change="onSortChange">
                </column-sort>
              </th>
            </tr>
            <tr>

            </tr>
          </thead>
          <tbody>
            <template v-for="(order, index) in orders">
              <tr :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ order.orderNo }}</td>
                <td>{{ order.shipperName }}</td>
                <td>{{ order.items.length }}</td>
                <td>{{ order.shipStatus }}</td>
                <td>{{ order.weightAg }} {{ order.wunitsAg }}</td>
                <td>{{ order.lengthAg }} x {{ order.widthAg }} x {{ order.heightAg }} {{ order.vunitsAg }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import * as Level from '../../config/level'
import ColumnSort from '../../components/ColumnSort'
import { Printd } from 'printd'

export default {
  components: {
    ColumnSort
  },
  data () {
    return {
      orders: [],
      filter: {
        keyword: '',
        verified: [true, false],
        sort: {
          field: 'goosName',
          order: 'asc'
        }
      },
      options: {
        verified: [
          {
            value: true,
            label: 'Yes'
          },
          {
            value: false,
            label: 'No'
          }
        ]
      },
      sortField: 'fullName'
    }
  },
  mounted () {
    this.d = new Printd()
    const { contentWindow } = this.d.getIFrame()
    contentWindow.addEventListener('beforeprint', () => console.log('before print event!'))
    contentWindow.addEventListener('afterprint', () => console.log('after print event!'))
  },
  computed: {
    filteredOrders () {
      let orders = this.orders.filter(order => {
        let likeGoodsName = order.goodsName.toLowerCase().includes(this.filter.keyword.toLowerCase())

        return likeGoodsName
      })

      orders = _.sortBy(orders, order => {
        return order[this.filter.sort.field]
      })

      if (this.filter.sort.order === 'desc') {
        orders = orders.reverse()
      }

      return orders
    },
    level () {
      return Level[this.$route.params.level.toUpperCase()]
    }
  },
  watch: {
    $route: {
      handler: 'fetchOrders'
    }
  },
  methods: {
    onSortChange (payload) {
      this.filter.sort.field = payload.field
      this.filter.sort.order = payload.order
    },
    fetchOrders () {
      this.$authHttp.get('/orders').then(res => {
        this.orders = res.data.data.map(order => {
          order['collapse'] = true

          return order
        })
      })
    },
    collapseToggle (index) {
      this.orders[index].collapse = !this.orders[index].collapse
    },
    print () {
      this.d.print(document.getElementById('testPrint', this.cssText))
    }
  },
  created () {
    this.fetchOrders()
  }
}
</script>
