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
            <h3>Order Masuk</h3>
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
              <th>Rincian</th>
              <th width="100">Order No</th>
              <th>Nama Customer</th>
              <th class="uk-text-right">Status</th>
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
                <td>{{ order.shipperName }}</td>
                <td class="uk-text-right">{{ order.shipStatus }}</td>
              </tr>
              <tr v-show="!order.collapse" :key="`d${index}`">
                <td colspan="4">
                  <form class="uk-margin-large">
                    <div uk-grid>
                        <div class="uk-margin">
                          <table>
                            <thead>
                            <tr>
                              <th>No</th>
                              <th>Nama</th>
                              <th>Berat</th>
                              <th>Harga</th>
                              <th>Panjang</th>
                              <th>Lebar</th>
                              <th>Tinggi</th>
                              <th></th>
                              <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <template v-for="(item, initem) in order.items">
                                <tr :key="item.id">
                                <td>{{initem + 1}}</td>
                                <td> {{ item.goodsName }}</td>
                                <td>{{ item.weight }} {{ item.wunits }}</td>
                                <td>{{ item.harga }} </td>
                                <td>{{ item.length }} {{ item.vunits }}</td>
                                <td>{{ item.width }} {{ item.vunits }}</td>
                                <td>{{ item.height }} {{ item.vunits }}</td>
                                <td>
                                  <button class="uk-button uk-button-primary" type="button" >Confirm</button>
                                </td>
                                <td>
                                  <button class="uk-button uk-button-danger" type="button" @click="print">Print AWB</button>
                                </td>
                                </tr>
                              </template>
                            </tbody>
                          </table>
                        </div>
                    </div>
                  </form>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div id="testPrint" class="uk-hidden">
        <h1>Test Print AWB</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { Printd } from 'printd'

export default {
  data () {
    return {
      orders: []
    }
  },
  mounted () {
    this.d = new Printd()
    // Print dialog events (v0.0.9+)
    const { contentWindow } = this.d.getIFrame()
    contentWindow.addEventListener('beforeprint', () => console.log('before print event!'))
    contentWindow.addEventListener('afterprint', () => console.log('after print event!'))
  },
  methods: {
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
