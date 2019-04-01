<template>
  <div>
    <h3>Ganti Kata Sandi</h3>
    <form>
      <div class="uk-margin">
        <label class="uk-form-label">Kata sandi sekarang</label>
        <input
          v-model="input.currentPassword"
          v-validate="rules.currentPassword"
          name="currentPassword"
          class="uk-input"
          type="password" />
          <p v-if="errors.first('currentPassword')" class="uk-margin-small uk-text-danger">
            {{ errors.first('currentPassword') }}
          </p>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Kata sandi baru</label>
        <input
          v-model="input.password"
          v-validate="rules.password"
          name="password"
          class="uk-input"
          type="password" />
          <p v-if="errors.first('password')" class="uk-margin-small uk-text-danger">
            {{ errors.first('password') }}
          </p>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Konfirmasi kata sandi baru</label>
        <input
          v-model="input.passwordConfirmation"
          v-validate="rules.passwordConfirmation"
          name="passwordConfirmation"
          class="uk-input"
          type="password" />
      </div>
      <div class="uk-margin">
        <el-alert
          v-if="error"
          :title="errorMessage"
          type="error"
          show-icon>
        </el-alert>
      </div>
      <div class="uk-margin uk-text-right">
        <button class="uk-button uk-button-primary" type="button" @click="changePassword">Simpan</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: {
        currentPassword: '',
        password: '',
        passwordConfirmation: ''
      },
      rules: {
        currentPassword: 'required',
        password: 'required|min:6',
        passwordConfirmation: 'required|confirmed:password'
      },
      error: false,
      errorMessage: '',
      validatorErrors: {}
    }
  },
  methods: {
    clearInput () {
      this.input.oldPassword = ''
      this.input.password = ''
      this.input.confPassword = ''
    },
    async changePassword () {
      this.__startLoading()

      this.error = false
      this.errorMessage = ''
      this.validatorErrors = {}

      this.$validator.errors.clear()

      await this.$authHttp.put('/user/password', this.input)
        .then(res => {
          this.$notify({
            title: 'SUCCESS',
            message: res.data.message,
            type: 'success'
          })

          this.input = this.$options.data().input
        })
        .catch(err => {
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
        })

      this.__stopLoading()
    }
  }
}
</script>
