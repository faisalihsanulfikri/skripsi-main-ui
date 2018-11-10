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
            <h3>Invoice Masuk</h3>
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
            </tr>
          </thead>
          <tbody>
            <template v-for="(invoice, index) in invoices">
              <tr :key="index">
                <td class="app--table-column__collapse-toggle" @click.prevent="collapseToggle(index)">
                  <a href="#">
                    <font-awesome-icon v-if="invoice.collapse" icon="angle-right"></font-awesome-icon>
                    <font-awesome-icon v-else icon="angle-down"></font-awesome-icon>
                  </a>
                </td>
                <td>{{ invoice.orderNo }}</td>
                <td>{{ invoice.shipperName }}</td>
                <td>{{ invoice.shipperAddress }}</td>
                <td class="uk-text-right">{{ invoice.serviceCode }}</td>
              </tr>
              <tr v-show="!invoice.collapse" :key="`d${index}`">
                <td></td>
                <td colspan="5">
                  <form class="uk-margin-large">
                    <div uk-grid>
                      <div class="uk-margin">
                        <div class="uk-column-1-4">
                          <div class="uk-margin uk-text-right">
                            <button class="uk-button uk-button-primary uk-width-1-1" type="button" >Konfirmasi</button>
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
      invoices: []
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
    fetchInvoices () {
      this.$authHttp.get('/invoices').then(res => {
        this.invoices = res.data.data.map(invoice => {
          invoice['collapse'] = true
          return invoice
        })
      })
    },
    collapseToggle (index) {
      this.invoices[index].collapse = !this.invoices[index].collapse
    },
    print () {
      this.d.print(document.getElementById('testPrint', this.cssText))
    }
  },
  created () {
    this.fetchInvoices()
  }
}
</script>
