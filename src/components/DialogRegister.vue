<template>
  <div id="dialog-register" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
      <h3>SIGN UP</h3>
      <div v-if="error" class="uk-alert-danger" uk-alert>
        {{ errorMessage }}
      </div>
      <div v-if="success" class="uk-alert-success" uk-alert>
        {{ successMessage }}
      </div>
      <form>
        <div class="uk-margin">
          <input v-model="input.fullName" class="uk-input" type="text" placeholder="Name"/>
        </div>
        <div class="uk-margin">
          <input v-model="input.email" class="uk-input" type="text" placeholder="Email"/>
        </div>
        <div class="uk-margin">
          <input v-model="input.password" class="uk-input" type="password" placeholder="Password"/>
        </div>
        <div class="uk-margin">
          <input v-model="input.mobile" class="uk-input" type="text" placeholder="Mobile"/>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label">Gender</label>
          <div>
            <label>
              <input v-model="input.gender" id="register-gender-male" class="uk-radion" type="radio" value="m"/> Male
            </label>
            <label class="uk-margin-small-left">
              <input v-model="input.gender" id="register-gender-female" class="uk-radion" type="radio" value="f"/> Female
            </label>
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label">Birthday Date</label>
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
          <button class="uk-button uk-button-primary uk-width-1-1" type="button" @click="register">SIGN UP</button>
        </div>
        <div class="uk-margin">
          <button class="uk-button uk-button-default uk-width-1-1" type="button" @click="showLoginDialog">SIGN IN</button>
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
    showLoginDialog () {
      this.UIkit.modal('#dialog-register').hide()
      this.UIkit.modal('#dialog-login').show()
    },
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
