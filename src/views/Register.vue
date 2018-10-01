<template>
  <div class="uk-margin-top uk-margin-bottom">
    <div class="uk-card uk-card-default">
      <div class="uk-card-header uk-text-center">
        <h3 class="uk-card-title">Daftar</h3>
      </div>
      <div class="uk-card-body">
        <div v-if="error" class="uk-alert-danger" uk-alert>
          {{ errorMessage }}
        </div>
        <div v-if="success" class="uk-alert-success" uk-alert>
          {{ successMessage }}
        </div>
        <div uk-grid>
          <div class="uk-width-1-2">
            <div>
              <div class="uk-margin">
                <label class="uk-form-label">Nama</label>
                <input v-model="input.fullName" class="uk-input" type="text" placeholder="Name"/>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label">Email</label>
                <input v-model="input.email" class="uk-input" type="text" placeholder="Email"/>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label">Kata sandi</label>
                <input v-model="input.password" class="uk-input" type="password" placeholder="Password"/>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label">Nomor HP</label>
                <input v-model="input.mobile" class="uk-input" type="text" placeholder="Mobile"/>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label">Jenis Kelamin</label>
                <div>
                  <label>
                    <input v-model="input.gender" id="register-gender-male" class="uk-radion" type="radio" value="m"/>
                    <span class="uk-margin-small-left">Laki-laki</span>
                  </label>
                  <label class="uk-margin-small-left">
                    <input v-model="input.gender" id="register-gender-female" class="uk-radion" type="radio" value="f"/>
                    <span class="uk-margin-small-left">Perempuan</span>
                  </label>
                </div>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label">Tanggal Lahir</label>
                <v-dialog
                  v-model="dialog.birthdate"
                  lazy
                  full-width
                  ref="dialog"
                  width="290px"
                  :return-value.sync="input.bod">
                  <input v-model="input.bod" slot="activator" class="uk-input" readonly/>
                  <v-date-picker v-model="input.bod" @input="$refs.dialog.save(input.bod)"/>
                </v-dialog>
              </div>
              <div class="uk-margin">
                <button class="uk-button uk-button-primary uk-width-1-1" type="button" @click="register">Daftar</button>
              </div>
              <div class="uk-margin">
                <router-link class="uk-button uk-button-default uk-width-1-1" tag="button" :to="{ name: 'login' }">Masuk</router-link>
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
        fullName: '',
        email: '',
        password: '',
        mobile: '',
        gender: '',
        bod: '',
        level: 2
      },
      error: false,
      errorMessage: '',
      success: false,
      successMessage: '',
      dialog: {
        birthdate: false
      }
    }
  },
  methods: {
    clearInput () {
      this.input.fullName = ''
      this.input.email = ''
      this.input.password = ''
      this.input.mobile = ''
      this.input.gender = ''
      this.input.bod = ''
    },
    register () {
      this.error = false
      this.success = false

      this.$http.post('/v1/register', this.input)
        .then(response => {
          this.clearInput()

          this.success = true
          this.successMessage = response.data.message
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