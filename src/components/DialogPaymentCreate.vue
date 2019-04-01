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
          <v-dialog
            v-model="dialog.tanggal"
            lazy
            full-width
            ref="dialog"
            width="290px"
            :return-value.sync="input.tanggal">
            <input v-model="input.tanggal" slot="activator" class="uk-input" readonly/>
            <v-date-picker v-model="input.tanggal" @input="$refs.dialog.save(input.tanggal)"/>
          </v-dialog>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label">Kode Order</label>
          <input class="uk-input" :value="orderNo" readonly/>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label">Jumlah Bayar</label>
          <input :value="amountToPay" class="uk-input" @input="numericCheck('amount')"/>
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
    },
    orderNo: '',
    amountToPay: ''
  },
  data () {
    return {
      dialog: {
        tanggal: false
      },
      input: {
        tanggal: '',
        orderNo: this.orderNo,
        amount: this.amountToPay,
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
    numericCheck (key) {
      let val = this.input[key].match(/\d/g)

      if (val !== null) {
        this.input[key] = val.join('')
      } else {
        this.input[key] = ''
      }
    },
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
  created () {
    let date = new Date(Date.parse(this.user.birthDate))
    let birthdate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`

    this.user.birthDate = birthdate
  }
}
</script>
