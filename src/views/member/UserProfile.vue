<template>
  <div>
    <div class="uk-grid" uk-grid>
      <div class="uk-width-expand">
        <h3>Data Personal</h3>
        <form>
          <div class="uk-margin">
            <label class="uk-form-label">Name</label>
            <input v-model="user.fullName" class="uk-input"/>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">Email</label>
            <input v-model="user.email" class="uk-input"/>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">Mobile</label>
            <input v-model="user.mobile" class="uk-input"/>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">Gender</label>
            <div>
              <label>
                <input v-model="user.gender" id="profile-gender-male" class="uk-radion" type="radio" value="m"/> Male
              </label>
              <label class="uk-margin-small-left">
                <input v-model="user.gender" id="profile-gender-female" class="uk-radion" type="radio" value="f"/> Female
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
              :return-value.sync="user.birthDate">
              <input v-model="user.birthDate" slot="activator" class="uk-input" readonly/>
              <v-date-picker v-model="user.birthDate" @input="$refs.dialog.save(user.birthDate)"/>
            </v-dialog>
          </div>
          <div v-if="error" class="uk-margin">
            <div class="uk-alert-danger" uk-alert>
              {{ errorMessage }}
            </div>
          </div>
          <div class="uk-margin uk-text-right">
            <button class="uk-button uk-button-primary" type="button" @click="updateProfile">SAVE</button>
          </div>
        </form>
      </div>
      <div class="uk-width-medium@m"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      dialog: {
        birthdate: false
      },
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    updateProfile () {
      this.error = false
      this.errorMessage = ''

      this.$authHttp.put('/v1/users', {
        fullName: this.user.fullName,
        mobile: this.user.mobile,
        email: this.user.email,
        bod: this.user.birthDate,
        gender: this.user.gender
      }).then(res => {

      }).catch(err => {
        if (err.response) {
          this.error = true
          this.errorMessage = err.response.data.message
        }
      })
    }
  },
  created () {
    this.user = this.$auth.getUser()

    let date = new Date(Date.parse(this.user.birthDate))
    let birthdate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`

    this.user.birthDate = birthdate
  }
}
</script>
