1x<template>
  <div class="uk-margin-top uk-margin-bottom">
    <div class="uk-card uk-card-default">
      <div class="uk-card-header uk-text-center">
        <h3 class="uk-card-title">Daftar</h3>
      </div>
      <div class="uk-card-body">
        <div uk-grid>
          <div class="uk-width-1-2">
            <div>
              <div class="uk-margin">
                <label class="uk-form-label">Nama</label>
                <input v-model="input.name" v-validate="rules.name" name="name" class="uk-input" type="text" placeholder="Name"/>
                <p v-if="errors.first('name')" class="uk-margin-small uk-text-danger">{{ errors.first('name') }}</p>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label">Email</label>
                <input v-model="input.email" v-validate="rules.email" name="email" class="uk-input" type="text" placeholder="Email"/>
                <p v-if="errors.first('email')" class="uk-margin-small uk-text-danger">{{ errors.first('email') }}</p>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label">Kata Sandi</label>
                <input v-model="input.password" v-validate="rules.password" name="password" class="uk-input" type="password" placeholder="Password"/>
                <p v-if="errors.first('password')" class="uk-margin-small uk-text-danger">{{ errors.first('password') }}</p>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label">Konfirmasi Kata Sandi</label>
                <input v-model="input.passwordConfirmation" v-validate="rules.passwordConfirmation" class="uk-input" name="password_confirmation" type="password" placeholder="Password Confirmation"/>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label">Nomor Handphone</label>
                <input v-model="input.phone" v-validate="rules.phone" name="phone" class="uk-input" type="text" placeholder="Mobile"/>
                <p v-if="errors.first('phone')" class="uk-margin-small uk-text-danger">{{ errors.first('phone') }}</p>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label">Pilih Layanan</label>
                <table class="uk-table">
                  <thead>
                      <tr>
                          <th>Fitur</th>
                          <th>Standard</th>
                          <th>VIP</th>
                      </tr>
                      <tr class="uk-form-controls uk-form-controls-text">
                          <td>Pilihan</td>
                          <td>
                            <input v-model="input.level" class="uk-radio" type="radio" value="2">
                          </td>
                          <td>
                            <input v-model="input.level" class="uk-radio" type="radio" value="3">
                          </td>
                      </tr>
                  </thead>
                </table>
              </div>
              <div class="uk-margin">
                <el-alert
                  v-if="error"
                  :title="errorMessage"
                  type="error"
                  show-icon>
                </el-alert>
                <el-alert
                  v-if="success"
                  :title="successMessage"
                  type="success"
                  show-icon>
                </el-alert>
              </div>
              <div class="uk-margin">
                <button class="uk-button uk-button-primary uk-width-1-1" type="button" @click="register">Daftar</button>
              </div>
              <div class="uk-margin">
                <router-link class="uk-button uk-button-default uk-width-1-1" tag="button" :to="{ name: 'login' }">Masuk</router-link>
              </div>
            </div>
          </div>
          <div class="uk-width-1-2">
            <div>
              <div class="uk-margin">
                <button href="#toggle-animation" class="uk-button uk-button-default" type="button" uk-toggle="target: #toggle-animation; animation: uk-animation-fade">Perbandingan Layanan</button>
                <div id="toggle-animation" class="uk-card uk-card-default uk-card-body uk-margin-small">
                <table class="uk-table">
                  <tbody>
                    <thead>
                      <th>&nbsp;</th>
                      <th>Standard</th>
                      <th>VIP</th>
                    </thead>
                    <tr>
                        <td>Your own U.S. AND SOME OTHERS COUNTRIES</td>
                        <td><font-awesome-icon icon="check" size="1x"/></td>
                        <td><font-awesome-icon icon="check" size="1x"/></td>
                    </tr>
                    <tr>
                        <td>Save up to 70 percent on shipping</td>
                        <td><font-awesome-icon icon="check" size="1x"/></td>
                        <td><font-awesome-icon icon="check" size="1x"/></td>
                    </tr>
                    <tr>
                        <td>Multiple shipping options for each country</td>
                        <td><font-awesome-icon icon="check" size="1x"/></td>
                        <td><font-awesome-icon icon="check" size="1x"/></td>
                    </tr>
                    <tr>
                        <td>Purchase Special Services when shipping packages</td>
                        <td><font-awesome-icon icon="check" size="1x"/></td>
                        <td><font-awesome-icon icon="check" size="1x"/></td>
                    </tr>
                    <tr>
                        <td>Access to assisted purchase</td>
                        <td><font-awesome-icon icon="check" size="1x"/></td>
                        <td><font-awesome-icon icon="check" size="1x"/></td>
                    </tr>
                    <tr>
                        <td>Combine your packages for more savings</td>
                        <td><font-awesome-icon icon="times" size="1x"/></td>
                        <td><font-awesome-icon icon="check" size="1x"/></td>
                    </tr>
                    <tr>
                        <td>Multi-package shipments</td>
                        <td><font-awesome-icon icon="times" size="1x"/></td>
                        <td><font-awesome-icon icon="check" size="1x"/></td>
                    </tr>
                    <tr>
                        <td>Free storage for up to 30 days</td>
                        <td><font-awesome-icon icon="times" size="1x"/></td>
                        <td><font-awesome-icon icon="check" size="1x"/></td>
                    </tr>
                    <tr>
                        <td>SPECIAL PRICE FOR QTY ABOVE 10 KG UP</td>
                        <td><font-awesome-icon icon="times" size="1x"/></td>
                        <td><font-awesome-icon icon="check" size="1x"/></td>
                    </tr>
                    <tr>
                        <td>FOR KIRIMIN CAN BE COD</td>
                        <td><font-awesome-icon icon="times" size="1x"/></td>
                        <td><font-awesome-icon icon="check" size="1x"/></td>
                    </tr>
                    <tr>
                        <td>Biaya Bulanan</td>
                        <td>Gratis</td>
                        <td>IDR 100K</td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
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
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        phone: '',
        level: 2
      },
      rules: {
        name: 'required|alpha_spaces',
        email: 'required|email',
        password: 'required|min:6',
        passwordConfirmation: 'required|confirmed:password',
        phone: 'required|min:10'
      },
      error: false,
      errorMessage: '',
      success: false,
      successMessage: '',
      validationErrors: {}
    }
  },
  methods: {
    register () {
      this.error = false
      this.success = false
      this.validationErrors = {}

      this.$validator.errors.clear()

      this.$http.post('/register', this.input)
        .then(async res => {
          this.input = this.$options.data().input

          if (res.data.success) {
            this.success = true
            this.successMessage = res.data.message

            return
          }

          this.$auth.setAuth(res.data)

          let user = await this.$auth.getUser()

          this.$root.user = user

          this.$router.push({
            name: Level.ROUTE_LEVEL[user.level],
            force: true
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
