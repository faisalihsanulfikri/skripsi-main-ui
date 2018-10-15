<template>
  <div :id="id" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
      <h3>Konfirmasi Pembayaran</h3>
      <div v-if="error" class="uk-alert-danger" uk-alert>
        {{ errorMessage }}
      </div>
      <form>
        <div class="uk-margin">
          <label class="uk-form-label">Tanggal</label>
          <input v-model="input.tanggal" class="uk-input"/>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label">Kode Order</label>
          <input v-model="input.orderNo" class="uk-input"/>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label">Jumlah Bayar</label>
          <input v-model="input.amount" class="uk-input"/>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label">Dari Bank</label>
          <input v-model="input.bank" class="uk-input"/>
        </div>
        <div class="uk-margin uk-text-right">
          <button class="uk-button uk-button-primary" type="button" @click="save">Simpan</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      required: true
    }
  },
  data () {
    return {
      input: {
        tanggal: '',
        orderNo: '',
        amount: '',
        bank: ''
      },
      options: {
        banks: []
      },
      banks: [],
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    save () {
      this.error = false
      this.errorMessage = ''

      this.$authHttp.post(`/v1/orders/confirm`, {
        tanggal: this.input.tanggal,
        orderNo: this.input.orderNo,
        amount: this.input.amount,
        bank: this.input.bank
      }).then(response => {
        this.clearInput()

        this.$emit('on-finish', this.id)
      }).catch(error => {
        if (error.response) {
          this.error = true
          this.errorMessage = error.response.data.message
        }
      })
    },
    clearInput () {
      this.input.tanggal = ''
      this.input.orderNo = ''
      this.input.amount = ''
      this.input.bank = ''
    }
  },
  created () {}
}
</script>
