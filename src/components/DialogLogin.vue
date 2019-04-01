<template>
  <div id="dialog-login" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
      <h3>SIGN IN</h3>
      <div v-if="error" class="uk-alert-danger" uk-alert>
        {{ errorMessage }}
      </div>
      <form>
        <div class="uk-margin">
          <input v-model="input.email" class="uk-input" type="text" placeholder="Email"/>
        </div>
        <div class="uk-margin">
          <input v-model="input.password" class="uk-input" type="password" placeholder="Password"/>
        </div>
        <div class="uk-margin">
          <button class="uk-button uk-button-primary uk-width-1-1" type="button" @click="login">SIGN IN</button>
        </div>
        <div class="uk-margin">
          <button class="uk-button uk-button-default uk-width-1-1" type="button" @click="showRegisterDialog">SIGN UP</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: {
        email: '',
        password: ''
      },
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    showRegisterDialog () {
      this.UIkit.modal('#dialog-login').hide()
      this.UIkit.modal('#dialog-register').show()
    },
    clearInput () {
      this.input.email = ''
      this.input.password = ''
    },
    login () {
      this.error = false

      this.$http.post('/v1/login', this.input)
        .then(response => {
          this.$auth.setToken(response.data.token, response.data)

          this.clearInput()

          this.UIkit.modal('#dialog-login').hide()

          this.$router.push({ name: 'member-account' })
        })
        .catch(error => {
          if (error.response) {
            this.error = true
            this.errorMessage = error.response.data.message
          }
        })
    }
  }
}
</script>
