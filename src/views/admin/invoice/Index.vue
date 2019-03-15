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
                    <!-- 25 -->
                    <table v-else class="uk-table uk-table-small uk-text-small uk-margin-small">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Bank</th>
                            <th class="uk-text-right" width="200">Amount (IDR)</th>
                            <th class="uk-text-center" width="150">Status</th>
                            <th>Payment Receipt</th>
                            <th class="uk-text-center" width="200">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(payment, index) in invoice.payments" :key="index">
                            <td>{{ payment.date }}</td>
                            <td>{{ payment.channel }}</td>
                            <td class="uk-text-right">{{ payment.amount | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
                            <td class="uk-text-center">{{ payment.status }}</td>
                            <td>
                              <a
                                :href="linkdownload+'/receipt/'+payment.id+'/'+payment.filename+'/download'"
                                class="link"
                                :data-id="payment.id"
                                :data-filename="payment.filename"
                              >
                              {{ payment.filename }}
                              </a>
                            </td>
                            <td class="uk-text-center">
                              <el-button
                                v-if="payment.status === 'new' || payment.status === 'reject'"
                                type="primary"
                                size="mini"
                                @click="confirmPayment(payment.id)">
                                Confirm
                              </el-button>
                              <el-button
                                v-if="payment.status === 'new' || payment.status === 'confirmed'"
                                type="danger"
                                size="mini"
                                @click="rejectPayment(payment.id)">
                                Reject
                              </el-button>
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
export default {
  data () {
    return {
      invoices: [],
      linkdownload: ''
    }
  },

  async created () {
    await this.fetchInvoices()
    this.linkdownload = process.env.VUE_APP_ROOT_API
  },

  methods: {
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
        this.updatePaymentStatus(paymentId, 'reject')
      }).catch(() => {})
    },
    async fetchInvoices () {
      this.__startLoading()

      try {
        let res = await this.$service.invoice.get()

        this.invoices = res.data.data.map(invoice => {
          invoice['collapse'] = true

          return invoice
        })
      } catch (err) {
        this.__handleError(this, err, true)
      }

      this.__stopLoading()
    },
    async updatePaymentStatus (paymentId, status) {
      this.__startLoading()

      try {
        let res = await this.$service.payment.updateStatus(paymentId, {
          status: status
        })

        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.invoices = this.invoices.map(invoice => {
          if (invoice.id === res.data.data.id) {
            return res.data.data
          }

          return invoice
        })
      } catch (err) {
        this.__handleError(this, err, true)
      }

      this.__stopLoading()
    }
  }
}
</script>
<style lang="scss" scoped>
.link {
  white-space: nowrap;
  width: 136px;
  overflow: hidden;
  text-overflow: ellipsis;
  display:block;
}
</style>
