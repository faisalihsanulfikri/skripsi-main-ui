<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="file-invoice"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>Invoices</h3>
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
              <th class="uk-text-center" width="100">Status</th>
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
                <td>{{ invoice.code }}</td>
                <td>{{ invoice.user.name }}</td>
                <td class="uk-text-right">
                  {{ invoice.amount | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                </td>
                <td class="uk-text-center">
                  <el-tag v-if="invoice.paid === 1" type="success" size="mini">Paid</el-tag>
                  <el-tag v-else type="danger" size="mini">Unpaid</el-tag>
                </td>
              </tr>
              <tr v-show="!invoice.collapse" :key="`${index}_info`">
                <td></td>
                <td colspan="5">
                  <div class="uk-margin-small">
                    <h5 class="uk-margin-remove">Konfirmasi Pembayaran</h5>
                    <div v-if="invoice.payments.length < 1" class="app--no-content-container">
                      <div>
                        <font-awesome-icon icon="file-invoice-dollar" size="3x"></font-awesome-icon>
                        <p>No payment confirmed.</p>
                      </div>
                    </div>
                    <table v-else class="uk-table uk-table-small uk-text-small uk-margin-small">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Bank</th>
                            <th class="uk-text-right" width="200">Amount (IDR)</th>
                            <th class="uk-text-center" width="150">Status</th>
                            <th class="uk-text-center" width="200">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(payment, index) in invoice.payments" :key="index">
                            <td>{{ payment.date }}</td>
                            <td>{{ payment.bank }}</td>
                            <td class="uk-text-right">{{ payment.amount | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
                            <td class="uk-text-center">{{ payment.status }}</td>
                            <td class="uk-text-center">
                              <el-button type="primary" size="mini" @click="confirmPayment(payment.id)">Confirm</el-button>
                              <el-button type="danger" size="mini" @click="rejectPayment(payment.id)">Reject</el-button>
                            </td>
                          </tr>
                        </tbody>
                    </table>
                  </div>
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

  async created () {
    await this.fetchInvoices()
  },

  mounted () {
    this.d = new Printd()
    // Print dialog events (v0.0.9+)
    const { contentWindow } = this.d.getIFrame()
    contentWindow.addEventListener('beforeprint', () => console.log('before print event!'))
    contentWindow.addEventListener('afterprint', () => console.log('after print event!'))
  },
  methods: {
    async fetchInvoices () {
      this.__startLoading()

      await this.$authHttp.get('/invoices').then(res => {
        this.invoices = res.data.data.map(invoice => {
          invoice['collapse'] = true

          return invoice
        })
      })

      this.__stopLoading()
    },
    collapseToggle (index) {
      this.invoices[index].collapse = !this.invoices[index].collapse
    },
    confirmPayment (paymentId) {
      this.$confirm('Are you sure to confirm this payment?', 'Confirm', {
        type: 'warning'
      }).then(() => {
        this.updatePaymentStatus(paymentId, 'confirmed')
      }).catch(() => {})
    },
    rejectPayment (paymentId) {
      this.$confirm('Are you sure to confirm this payment?', 'Confirm', {
        type: 'warning'
      }).then(() => {
        this.updatePaymentStatus(paymentId, 'cancel')
      }).catch(() => {})
    },
    async updatePaymentStatus (paymentId, status) {
      this.__startLoading()

      await this.$authHttp.put(`/payments/${paymentId}/status`, {
        status: status
      }).then(res => {
        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.fetchInvoices()
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
    print () {
      this.d.print(document.getElementById('testPrint', this.cssText))
    }
  }
}
</script>
