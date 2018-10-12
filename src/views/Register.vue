1x<template>
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
              <div class="uk-margin uk-hidden">
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
              <div class="uk-margin uk-hidden">
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
                        <input class="uk-radio" type="radio" name="radio1">
                        </td>
                        <td>
                        <input class="uk-radio" type="radio" name="radio1">
                        </td>
                    </tr>
                </thead>
              </table>
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
export default {
  data () {
    return {
      input: {
        fullName: '',
        email: '',
        password: '',
        mobile: '',
        gender: 'm',
        bod: '2000-01-01',
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
      this.input.gender = 'm'
      this.input.bod = '2000-01-01'
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
