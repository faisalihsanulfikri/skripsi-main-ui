<template>
  <div class="uk-margin-top uk-margin-bottom">
    <div class="uk-card uk-card-default">
      <div class="uk-card-header uk-text-center">
        <nav uk-navbar>
          <div class="uk-navbar">
            <router-link to="/">
              <img class="app--navbar-logo" style="width:150px" src="../assets/logo-kirimin.jpg" />
            </router-link>
          </div>
        </nav>
      </div>
      <div class="uk-card-body">
        <div uk-grid>
          <div class="uk-width-1-2">
            <div>
              <div class="uk-margin">
                <label class="uk-form-label">Email</label>
                <input v-model="input.email" v-validate="rules.email" name="email" class="uk-input" type="text"
                  placeholder="Email" @keypress.enter="login" />
                <p v-if="errors.first('email')" class="uk-margin-small uk-text-danger">
                  {{ errors.first('email') }}
                </p>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label">Kata Sandi</label>
                <input v-model="input.password" v-validate="rules.password" name="password" class="uk-input" type="password"
                  placeholder="Password" @keypress.enter="login" />
                <p v-if="errors.first('password')" class="uk-margin-small uk-text-danger">
                  {{ errors.first('password') }}
                </p>
              </div>
              <div class="uk-margin">
                <el-alert v-if="error" :title="errorMessage" type="error" show-icon>
                </el-alert>
              </div>
              <div class="uk-margin">
                <button class="uk-button uk-button-primary uk-width-1-1" type="button" @click="login">
                  <span v-if="!application.loading">Masuk</span>
                  <font-awesome-icon v-else icon="spinner" spin></font-awesome-icon>
                </button>
              </div>
              <div class="uk-margin">
                <button class="uk-button uk-button-default uk-width-1-1" :disabled="application.loading" @click="$router.push({ name: 'forgot-password'})">
                  Forgot Password
                </button>
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
    data() {
      return {
        input: {
          email: '',
          password: '',
          origin: 'cms'
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
      async login() {
        if (this.application.loading) return

        if (!(await this.$validator.validate())) return

        this.__startLoading(false)

        this.error = false
        this.errorMessage = ''
        this.validatorErrors = {}

        this.$validator.errors.clear()

        try {
          let res = await this.$service.auth.login(this.input)

          this.input = this.$options.data().input

          this.$auth.setAuth(res.data)

          let user = await this.$auth.getUser()

          this.$root.user = user

          this.$router.push({
            name: Level.ROUTE_LEVEL[user.level]
          })
        } catch (err) {
          this.__handleError(this, err)
        }

        this.__stopLoading()
      }
    }
  }
</script>
