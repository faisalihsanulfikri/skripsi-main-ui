<template>
  <div>
    <h3>Ganti Kata Sandi</h3>
    <form>
      <div class="uk-margin">
        <label class="uk-form-label">Kata sandi sekarang</label>
        <input v-model="input.oldPassword" class="uk-input" type="password">
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Kata sandi baru</label>
        <input v-model="input.password" class="uk-input" type="password">
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Konfirmasi kata sandi baru</label>
        <input v-model="input.confPassword" class="uk-input" type="password">
      </div>
      <div v-if="error" class="uk-margin">
        <div class="uk-alert-danger" uk-alert>
          {{ errorMessage }}
        </div>
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
        oldPassword: '',
        password: '',
        confPassword: ''
      },
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    clearInput () {
      this.input.oldPassword = ''
      this.input.password = ''
      this.input.confPassword = ''
    },
    changePassword () {
      this.error = false
      this.errorMessage = ''

      this.$authHttp.put('/v1/users/password', this.input)
        .then(res => {

        })
        .catch(err => {
          if (err.response) {
            this.error = 1
            this.errorMessage = err.response.data.message
          }
        })
    }
  }
}
</script>
