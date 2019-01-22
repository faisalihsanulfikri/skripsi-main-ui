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
            <h3>Agent Order Entry</h3>
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
        <inbound-order :orders=orders />
      </div>
      <div id="PrintAWB" class="printpage">
        <h4>PT. Kirimin (AWB)</h4>
        <table class="print-awb">
          <tr>
            <td>AWB NO : </td>
            <td>{{ awbno }}</td>
          </tr>
          <tr>
            <td>No Order: </td>
            <td>{{ orderno }}</td>
          </tr>
          <tr>
            <td>From : </td>
            <td>{{ from }}</td>
          </tr>
          <tr>
            <td>To : </td>
            <td>{{ to }}</td>
          </tr>
        </table>
        <table class="print-awb">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Weight</th>
              <th>Price</th>
              <th>Length</th>
              <th>Width</th>
              <th>Height</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
            </tr>
            <template v-for="(item, initem) in selectedItems">
              <tr :key="item.initem">
                <td>1{{ initem + 1 }}</td>
                <td>2{{ item.goodsName }}</td>
                <td>3{{ item.weight }} {{ item.wunits }}</td>
                <td>4{{ item.harga }}</td>
                <td>5{{ item.length }} {{ item.vunits }}</td>
                <td>6{{ item.width }} {{ item.vunits }}</td>
                <td>7{{ item.height }} {{ item.vunits }}</td>
              </tr>
            </template>
          </tbody>
          <tfoot>
          </tfoot>
        </table>
      </div>
      <div id="PrintLabel" class="uk-hidden printpage">
        <h4>PT. Kirimin (Label)</h4>
        <table class="print-awb">
          <tr>
            <td>AWB NO : </td>
            <td>{{ awbno }}</td>
          </tr>
          <tr>
            <td>No Order: </td>
            <td>{{ orderno }}</td>
          </tr>
          <tr>
            <td>From : </td>
            <td>{{ from }}</td>
          </tr>
          <tr>
            <td>To : </td>
            <td>{{ to }}</td>
          </tr>
        </table>
        <table class="print-awb">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Height</th>
              <th>Price</th>
              <th>Length</th>
              <th>Width</th>
              <th>Height</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, initem) in selectedItems">
              <tr :key="item.lineid">
                <td>{{ initem + 1 }}</td>
                <td>{{ item.goodsName }}</td>
                <td>{{ item.weight }} {{ item.wunits }}</td>
                <td>{{ item.harga }} </td>
                <td>{{ item.length }} {{ item.vunits }}</td>
                <td>{{ item.width }} {{ item.vunits }}</td>
                <td>{{ item.height }} {{ item.vunits }}</td>
              </tr>
            </template>
          </tbody>
          <tfoot>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="uk-card-footer uk-text-center">
      <el-pagination layout="prev, pager, next" :page-size="pagination.per_page" :total="pagination.total"
        @current-change="onChangePage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import * as Level from '../../config/level'
  import ColumnSort from '../../components/ColumnSort'
  import Printd from 'printd'
  import InboundOrder from '../../components/InboundOrder'

  export default {
    components: {
      ColumnSort,
      InboundOrder
    },
    data() {
      return {
        selectedItems: {
          lineid: '',
          goodsName: 'empty',
          weight: '',
          harga: '',
          wunits: '',
          length: '',
          width: '',
          height: '',
          vunits: ''
        },
        input: {
          savedAddress: '',
          code: '',
          name: '',
          phone: '',
          country: '',
          province: '',
          city: '',
          subDistrict: '',
          address: '',
          zipCode: '',
          packet: {
            price: '',
            weight: '',
            length: '',
            width: '',
            height: ''
          }
        },
        orders: [],
        pagination: {
          current_page: 1,
          per_page: 10,
          total: 0
        },
        filter: {
          keyword: '',
          verified: [true, false],
          sort: {
            field: 'goodsName',
            order: 'asc'
          }
        },
        options: {
          verified: [{
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
    mounted() {
      this.cssText =
        `
        body {
          height: 29cm;
          width: 14cm;
          color: crimson;
        }
        h4, h3, h2, h1 {
          text-align: center;
          width: 100%;
        }
        label.underline {
          border-bottom: solid black 1px;
          height: 0.3cm;
          width: 100%;
        }
        table {
          width: 10cm;
        }`
      this.d = new Printd()
      // Print dialog events (v0.0.9+)
      const {
        contentWindow
      } = this.d.getIFrame()
      contentWindow.addEventListener('beforeprint', () => console.log('before print event!'))
      contentWindow.addEventListener('afterprint', () => console.log('after print event!'))
    },
    computed: {
      filteredOrders() {
        let orders = this.orders.filter(order => {
          let likeOrderNo = order.orderNo.toLowerCase().includes(this.filter.keyword.toLowerCase())

          return likeOrderNo
        })

        orders = _.sortBy(orders, order => {
          return order[this.filter.sort.field]
        })

        if (this.filter.sort.order === 'desc') {
          orders = orders.reverse()
        }

        this.$set(this.pagination, 'total', orders.length)
        this.$set(this.pagination, 'total_pages', Math.ceil(this.pagination.total / this.pagination.per_page))

        let start = this.pagination.current_page > 1 ? (this.pagination.current_page * this.pagination.per_page) - this
          .pagination.per_page : 0

        return orders.slice(start, this.pagination.current_page * this.pagination.per_page)
      },
      level() {
        return Level[this.$route.params.level.toUpperCase()]
      }
    },
    watch: {
      $route: {
        handler: 'fetchOrders'
      }
    },
    methods: {
      onChangePage(page) {
        this.pagination.current_page = page

        this.fetchOrders()
      },
      onSortChange(payload) {
        this.filter.sort.field = payload.field
        this.filter.sort.order = payload.order
      },
      fetchOrders() {
        this.$authHttp.get('/orders').then(res => {
          this.orders = res.data.data.map(order => {
            order['collapse'] = true

            return order
          })
        })
      },
      printLabel(id) {
        this.$confirm('Are you sure want to print Label ?', 'Warning', {
          type: 'warning',
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then(() => {
          this.d.print(document.getElementById('PrintLabel'), this.cssText)
        }).catch(() => {})
      },
      printConfirmation(id) {
        this.$confirm('Are you sure you have received this item ?', 'Warning', {
          type: 'warning',
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then(() => {
          this.delete(id)
        }).catch(() => {})
      },
      printAWB(id) {
        this.$confirm('Are you sure want to print Airway bill ?', 'Warning', {
          type: 'warning',
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then(() => {
          this.d.print(document.getElementById('PrintAWB'), this.cssText)
        }).catch(() => {})
      }
    },
    created() {
      this.fetchOrders()
    }
  }
</script>
