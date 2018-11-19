<template>
  <el-dialog
    title="Konfirmasi Pesanan"
    :visible="visible"
    @open="open"
    @close="close">
    <div>
      <div class="uk-margin">
        Anda akan melakukan transaksi sebesar Rp. {{ amount | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</div>
      <div class="uk-margin">Silahkan lakukan pembayaran ke nomor rekening berikut:</div>
      <div class="uk-grid-small uk-child-width-1-2" uk-grid>
        <div v-for="(bank, index) in bankAccounts" :key="index">
          <h5>{{ bank.bank }}</h5>
          <div class="uk-margin-small">{{ bank.name }}</div>
          <div class="uk-margin-small">{{ bank.account_number }}</div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <button class="uk-button uk-button-danger" @click="close">Batal</button>
      <button class="uk-button uk-button-primary uk-margin-small-left" @click="confirm">Pesan Sekarang</button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      default: false
    },
    amount: {
      required: true
    }
  },

  data () {
    return {
      bankAccounts: []
    }
  },

  created () {
    this.fetchBankAccounts()
  },

  methods: {
    open () {
      this.fetchBankAccounts()
    },
    close () {
      this.$emit('close')
    },
    confirm () {
      this.$emit('confirm')
    },
    async fetchBankAccounts () {
      try {
        let res = await this.$authHttp('/configs/bank_accounts')

        this.bankAccounts = res.data.value
      } catch (err) {
        if (err.response) {
          let msg = err.response.data.message ? err.response.data.message : err.response.statusText

          this.$notify({
            title: 'ERROR',
            message: msg,
            type: 'error'
          })
        }
      }
    }
  }
}
</script>
