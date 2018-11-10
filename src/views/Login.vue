<template>
  <div class="uk-margin-top uk-margin-bottom">
    <div class="uk-card uk-card-default">
      <div class="uk-card-header uk-text-center">
        <h3 class="uk-card-title">Masuk</h3>
      </div>
      <div class="uk-card-body">
        <div uk-grid>
          <div class="uk-width-1-2">
            <div>
              <div class="uk-margin">
                <label class="uk-form-label">Email</label>
                <input
                  v-model="input.email"
                  v-validate="rules.email"
                  name="email"
                  class="uk-input"
                  type="text"
                  placeholder="Email"
                  @keypress.enter="login" />
                <p v-if="errors.first('email')" class="uk-margin-small uk-text-danger">
                  {{ errors.first('email') }}
                </p>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label">Kata Sandi</label>
                <input
                  v-model="input.password"
                  v-validate="rules.password"
                  name="password"
                  class="uk-input"
                  type="password"
                  placeholder="Password"
                  @keypress.enter="login" />
                <p v-if="errors.first('password')" class="uk-margin-small uk-text-danger">
                  {{ errors.first('password') }}
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
              <div class="uk-margin">
                <button class="uk-button uk-button-primary uk-width-1-1" type="button" @click="login">
                  Masuk
                </button>
              </div>
              <div class="uk-margin">
                <router-link class="uk-button uk-button-default uk-width-1-1" tag="button" :to="{ name: 'register' }">
                  Daftar
                </router-link>
              </div>
            </div>
          </div>
          <div class="uk-width-1-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Level from '../config/level'

export default {
  data () {
    return {
      input: {
        email: '',
        password: ''
      },
      rules: {
        email: 'required|email',
        password: 'required'
      },
      error: false,
      errorMessage: '',
      validatorErrors: {}
    }
  },
  methods: {
    login () {
      this.error = false
      this.errorMessage = ''
      this.validatorErrors = {}

      this.$validator.errors.clear()

      this.$http.post('/login', this.input)
        .then(async res => {
          this.input = this.$options.data().input

          this.$auth.setAuth(res.data)

          let user = await this.$auth.getUser()

          this.$router.push({
            name: Level.ROUTE_LEVEL[user.level]
          })
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
    }
  }
}
</script>
