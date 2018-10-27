<template>
  <el-dialog
    title="Konfirmasi Pembayaran"
    :visible="visible"
    @open="open"
    @close="close">
    <div>
      <div class="uk-margin">
        <label class="uk-form-label">Kode Order</label>
        <input
        v-model="input.code"
        v-validate="'required'"
        name="code"
        class="uk-input"
        :class="{ 'uk-form-danger': errors.has('code') }"
        readonly>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Tanggal</label>
        <v-dialog
        v-model="dialogDate.visible"
        lazy
        full-width
        ref="dialog"
        width="290px"
        :return-value.sync="input.date">
          <input
          v-model="input.date"
          v-validate="'required'"
          name="date"
          slot="activator"
          class="uk-input"
          :class="{ 'uk-form-danger': errors.has('date') }"
          readonly/>
          <v-date-picker v-model="input.date" @input="$refs.dialog.save(input.date)"/>
        </v-dialog>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Dari Bank</label>
        <input
        v-model="input.bank"
        v-validate="'required'"
        name="bank"
        class="uk-input"
        :class="{ 'uk-form-danger': errors.has('bank') }">
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Jumlah Bayar <b>(Rp. {{ data.totalBayar | currency('', 0, { thousandsSeparator: '.', decimalSeparator: ',' })}})</b></label>
        <input
        v-model="input.amount"
        v-validate="'required|numeric'"
        name="amount"
        class="uk-input"
        :class="{ 'uk-form-danger': errors.has('amount') }">
      </div>
    </div>
    <div slot="footer">
      <button class="uk-button uk-button-primary uk-margin-small-left" @click="confirm">SIMPAN</button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      default: false
    },
    data: {
      required: true
    }
  },
  data () {
    return {
      dialogDate: {
        visible: false
      },
      input: {
        code: '',
        date: new Date().toLocaleString('id-ID').replace(/(\d{2})\/(\d{2})\/(\d{4})(.*)/, '$3-$2-$1'),
        amount: '',
        bank: ''
      }
    }
  },
  methods: {
    async isValidInput () {
      let valid = await this.$validator.validate()

      return new Promise(resolve => {
        resolve(valid)
      })
    },
    open () {
      this.input.code = this.data.orderNo
    },
    close () {
      this.input = this.$options.data().input

      this.$validator.reset()

      this.$emit('close')
    },
    async confirm () {
      if (!(await this.isValidInput())) {
        let message = 'Data tidak valid.'

        this.$notify({
          title: 'ERROR',
          message: message,
          type: 'error'
        })

        return
      }

      this.$authHttp.post('/v1/orders/confirm', {
        orderNo: this.input.code,
        tanggal: this.input.date,
        amount: this.input.amount,
        bank: this.input.bank
      }).then(res => {
        if (res.data.status !== '00') {
          this.$notify({
            title: 'ERROR',
            message: res.data.message,
            type: 'error'
          })

          return
        }

        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.input = this.$options.data().input

        this.$emit('confirm')
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
    }
  }
}
</script>
