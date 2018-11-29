<template>
  <el-dialog
    title="Konfirmasi Pesanan"
    :visible="visible"
    @close="close">
    <div>
      <div class="uk-margin">
        Anda akan melakukan transaksi sebesar Rp. {{ amount | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</div>
      <div class="uk-margin">Silahkan lakukan pilih metode pembayaran.</div>
      <div class="uk-margin">
        <select v-model="input.paymentMethod" class="uk-select">
          <option value="Transfer Bank">Transafer Bank</option>
          <option value="Paypal">Paypal</option>
        </select>
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
      input: {
        paymentMethod: 'Transfer Bank'
      }
    }
  },

  methods: {
    close () {
      this.$emit('close')
    },
    confirm () {
      this.$emit('confirm', this.input.paymentMethod)
    }
  }
}
</script>
