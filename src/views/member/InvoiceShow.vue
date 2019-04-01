<template>
  <div>
    <div class="uk-card uk-card-default uk-card-small">
      <div class="uk-card-header">
        <h3>Tagihan # {{ invoice.code }}</h3>
      </div>
      <div class="uk-card-body">
        <div class="uk-grid-small" uk-grid>
          <div class="uk-width-1-2">
            <div class="uk-flex uk-flex-center uk-flex-middle uk-height-1-1">
              <div class="uk-text-center">
                <div class="uk-margin">
                  <div class="app--list-label">Jumlah</div>
                  <div class="app--list-text">{{ invoice.stringAmount }}</div>
                </div>
                <div class="uk-margin">
                  <div class="app--list-label">Status</div>
                  <div class="app--list-text">{{ invoice.stringStatus }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="uk-width-1-2">
            <div
              v-if="invoice.payment_method === 'Paypal'"
              class="uk-flex uk-flex-center uk-flex-middle uk-height-1-1">
              <paypal :code="invoice.code" :amount="invoice.amount"></paypal>
            </div>
            <div v-else>
              <transfer-bank v-if="invoice.order" :data="invoice.order"></transfer-bank>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paypal from '../../components/payment/Paypal'
import TransferBank from '../../components/payment/TransferBank'

export default {
  components: {
    Paypal,
    TransferBank
  },

  data () {
    return {
      invoice: {}
    }
  },

  created () {
    this.getInvoice()
  },

  methods: {
    async getInvoice () {
      this.__startLoading()

      try {
        let res = await this.$service.invoice.find(this.$route.params.code)

        this.invoice = res.data
        this.invoice['stringAmount'] = this.$options.filters.currency(this.invoice.amount, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
        this.invoice['stringStatus'] = this.invoice.paid === 1 ? 'Lunas' : 'Belum Lunas'
      } catch (err) {
        this.__handleError(this, err, true)
      }

      this.__stopLoading()
    }
  }
}
</script>
