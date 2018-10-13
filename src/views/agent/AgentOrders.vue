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
            <h3>Agent Order Masuk</h3>
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
              <th>Nama Barang</th>
              <th class="uk-text-right">Status</th>
              <th class="uk-text-right">Country</th>

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
                <td>{{ order.goodsName }}</td>
                <td>{{ order.goodsName }}</td>
                <td>{{ order.goodsName }}</td>
                <td class="uk-text-right">{{ order.status }}</td>
                <td>{{ order.country }}</td>
              </tr>
              <tr v-show="!order.collapse" :key="`d${index}`">
                <td></td>
                <td colspan="5">
                  <form class="uk-margin-large">
                    <div uk-grid>
                      <div class="uk-column-1-5 ">
                        <div class="uk-margin">
                          <label class="uk-form-label">Berat ({{ order.wunits }})</label>
                          <div>
                            <input type="text" class="uk-input" min="1" placeholder="Tinggi" :value="order.weight">
                          </div>
                        </div>
                        <div class="uk-margin">
                          <label class="uk-form-label">Harga</label>
                          <div>
                            <input type="text" class="uk-input" min="1" placeholder="Harga" :value="order.harga">
                          </div>
                        </div>
                        <div class="uk-margin">
                          <label class="uk-form-label">Panjang {{ order.wunits }}</label>
                          <input type="text" class="uk-input" min="1" placeholder="Panjang" :value="order.length">
                        </div>
                        <div class="uk-margin">
                          <label class="uk-form-label">Lebar {{ order.wunits }}</label>
                          <input type="text" class="uk-input" min="1" placeholder="Lebar" :value="order.width">
                        </div>
                        <div class="uk-margin">
                          <label class="uk-form-label">Tinggi {{ order.wunits }}</label>
                          <input type="text" class="uk-input" min="1" placeholder="Tinggi" :value="order.height">
                        </div>
                      </div>
<div class="uk-margin">
  <div class="uk-column-1-4">
    <div class="uk-margin uk-text-right">
      <button class="uk-button uk-button-primary uk-width-1-1" type="button" >Konfirmasi</button>
    </div>
    <div class="uk-margin uk-text-right">
      <button class="uk-button uk-button-danger uk-width-1-1" type="button" @click="print">Print AWB</button>
    </div>
  </div>
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
      this.$authHttp.get('/v1/summary/orders').then(res => {
      //  this.$authHttp.get(`/v1/cfees`).then(res => {
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
