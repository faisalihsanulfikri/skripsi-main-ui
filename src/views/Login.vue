<template>
  <div class="uk-margin-top uk-margin-bottom">
    <div class="uk-card uk-card-default">
      <div class="uk-card-header uk-text-center">
        <h3 class="uk-card-title">Masuk</h3>
      </div>
      <div class="uk-card-body">
        <div v-if="error" class="uk-alert-danger" uk-alert>
          {{ errorMessage }}
        </div>
        <div uk-grid>
          <div class="uk-width-1-2">
            <div>
              <div class="uk-margin">
                <label class="uk-form-label">Email</label>
                <input v-model="input.email" class="uk-input" type="text" placeholder="Email"/>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label">Kata sandi</label>
                <input v-model="input.password" class="uk-input" type="password" placeholder="Password"/>
              </div>
              <div class="uk-margin">
                <button class="uk-button uk-button-primary uk-width-1-1" type="button" @click="login">Masuk</button>
              </div>
              <div class="uk-margin">
                <router-link class="uk-button uk-button-default uk-width-1-1" tag="button" :to="{ name: 'register' }">Daftar</router-link>
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
