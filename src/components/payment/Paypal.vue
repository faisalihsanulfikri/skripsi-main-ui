<template>
  <div id="paypal-button-container"></div>
</template>

<script>
import paypal from 'paypal-checkout'

export default {
  props: {
    code: {
      required: true
    },
    amount: {
      required: true,
      default: 0
    },
    currency: {
      default: 'USD'
    }
  },

  async mounted () {
    let amountUSD = await this.amount / this.$store.state.kirimin.formula.dollar_rate
    let total = this.$options.filters.currency(amountUSD, '', 2, { thousandsSeparator: ',', decimalSeparator: '.' })

    paypal.Button.render({
      client: {
        sandbox: 'AdCdEIGHqdKjNOJHdHrwRlPZTi9z23jMfHvUmUC-9YFhKg6Syf3z3Y_Wgpdsgqr4cYWH3jR8ZL67hrtv',
        production: ''
      },
      env: 'sandbox',
      commit: true,
      payment: (data, actions) => {
        return actions.payment.create({
          transactions: [{
            amount: {
              total: total,
              currency: this.currency
            },
            invoice_number: this.code
          }]
        })
      },
      onAuthorize: (data, actions) => {
        return actions.payment.execute().then(payload => {
          let transaction = payload.transactions[0]
          this.createPayment({
            date: new Date(payload.create_time).toLocaleString('id-ID').replace(/(\d{2})\/(\d{2})\/(\d{4})(.*)/, '$3-$2-$1'),
            gateaway: 'Paypal',
            channel: payload.payer.payment_method,
            trx: payload.id,
            amount: transaction.amount.total,
            currency: transaction.amount.currency,
            status: payload.state
          })
        }).catch(() => {
          this.$notify({
            title: 'ERROR',
            message: 'Payment failed.',
            type: 'error'
          })
        })
      }
    }, '#paypal-button-container')
  },

  methods: {
    createPayment (data) {
      this.__startLoading()

      try {
        let res = this.$service.invoice.createPayment(this.code, data)

        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.$router.push({ name: 'member-order' })
      } catch (err) {
        this.__handleERror(this, err, true)
      }

      this.__stopLoading()
    }
  }
}
</script>
