<template>
  <div>
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
        <div>
          <el-date-picker
            v-model="input.date"
            type="date"
            format="dd-MM-yyyy"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
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
      <hr>
      <h5 class="uk-margin-small">Daftar Rekening</h5>
      <div class="uk-grid-small uk-child-width-1-2" uk-grid>
        <div v-for="(bank, index) in bankAccounts" :key="index">
          <h5>{{ bank.bank }}</h5>
          <div class="uk-margin-small">{{ bank.name }}</div>
          <div class="uk-margin-small">{{ bank.account_number }}</div>
        </div>
      </div>
      <div class="uk-margin">
        <button class="uk-button uk-button-primary uk-width-1-1" @click="confirm">SIMPAN</button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
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
        date: '',
        amount: '',
        bank: ''
      },
      rules: {
        code: 'required',
        date: 'required',
        bank: 'required',
        amount: 'required|numeric',
        file: 'required'
      },
      bankAccounts: [],
      error: false,
      errorMessage: '',
      validatorErrors: {}
    }
  },

  mounted () {
    this.fetchBankAccounts()

    this.input.code = this.data.code
    this.input.date = moment().format('YYYY-MM-DD')
    this.input.amount = parseInt(this.data.amount)

    console.log(this.input.date)
  },

  methods: {
    async isValidInput () {
      let valid = await this.$validator.validate()

      return new Promise(resolve => {
        resolve(valid)
      })
    },
    async fetchBankAccounts () {
      try {
        let res = await this.$service.config.getBankAccounts()

        this.bankAccounts = res.data.value
      } catch (err) {
        this.__handleError(this, err, true)
      }
    },
    async confirm () {
      if (this.application.loading) return

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

      try {
        let res = await this.$service.invoice.paymentConfirmation(this.data.code, formData)

        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.$router.push({ name: 'member-order' })
      } catch (err) {
        this.__handleError(this, err, true)
      }

      this.__stopLoading()
    }
  }
}
</script>
