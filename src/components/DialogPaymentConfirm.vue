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
        v-validate="rules.code"
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
          v-validate="rules.date"
          name="date"
          slot="activator"
          class="uk-input"
          readonly />
          <v-date-picker v-model="input.date" @input="$refs.dialog.save(input.date)"/>
        </v-dialog>
        <p v-if="errors.first('date')" class="uk-margin-small uk-text-danger">
          {{ errors.first('date') }}
        </p>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Dari Bank</label>
        <input
        v-model="input.bank"
        v-validate="rules.bank"
        name="bank"
        class="uk-input" />
        <p v-if="errors.first('bank')" class="uk-margin-small uk-text-danger">
          {{ errors.first('bank') }}
        </p>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Jumlah Bayar <b>(Rp. {{ data.amount | currency('', 0, { thousandsSeparator: '.', decimalSeparator: ',' })}})</b></label>
        <input
          v-model="input.amount"
          v-validate="rules.amount"
          name="amount"
          class="uk-input" />
        <p v-if="errors.first('amount')" class="uk-margin-small uk-text-danger">
          {{ errors.first('amount') }}
        </p>
      </div>
      <div class="uk-margin">
        <input type="file" v-validate="rules.file" name="file" />
        <p v-if="errors.first('file')" class="uk-margin-small uk-text-danger">
          {{ errors.first('file') }}
        </p>
      </div>
      <div class="uk-margin">
        <el-alert
          v-if="error"
          :title="errorMessage"
          type="error"
          show-icon>
        </el-alert>
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
      },
      rules: {
        code: 'required',
        date: 'required|date_format:YYYY-MM-DD',
        bank: 'required',
        amount: 'required|numeric',
        file: 'required'
      },
      error: false,
      errorMessage: '',
      validatorErrors: {}
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
      this.input.code = this.data.code
      this.input.amount = this.data.amount
    },
    close () {
      this.input = this.$options.data().input

      this.$validator.reset()

      this.$emit('close')
    },
    confirm () {
      this.__startLoading()

      this.error = false
      this.errorMessage = ''
      this.validatorErrors = {}

      let formData = new FormData()
      let keys = Object.keys(this.input)

      keys.forEach(key => {
        formData.append(key, this.input[key])
      })

      formData.append('file', document.getElementsByName('file')[0].files[0])

      this.$authHttp.post(`/orders/${this.data.code}/confirm`, formData).then(res => {
        this.error = false
        this.errorMessage = ''
        this.validatorErrors = {}

        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.input = this.$options.data().input

        this.$emit('confirm')

        this.__stopLoading()
      }).catch(err => {
        if (err.response) {
          this.error = true
          this.errorMessage = err.response.data.message ? err.response.data.message : err.response.statusText

          this.$validator.errors.clear()

          if (err.response.data.errorValidation) {
            this.validationErrors = err.response.data.errors

            Object.keys(this.validationErrors).forEach(key => {
              this.$validator.errors.add({
                field: key,
                msg: this.validationErrors[key][0]
              })
            })
          }
        }

        this.__stopLoading()
      })
    }
  }
}
</script>
