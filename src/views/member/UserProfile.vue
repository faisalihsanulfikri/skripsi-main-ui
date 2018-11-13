<template>
  <div>
    <div class="uk-grid" uk-grid>
      <div class="uk-width-expand">
        <h3>Data Personal</h3>
        <form>
          <div class="uk-margin">
            <label class="uk-form-label">Code</label>
            <input class="uk-input" :value="user.code" readonly />
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">Nama</label>
            <input
              v-model="user.name"
              v-validate="rules.name"
              name="name"
              class="uk-input" />
              <p v-if="errors.first('name')" class="uk-margin-small uk-text-danger">
                {{ errors.first('name') }}
              </p>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">Email</label>
            <input
              v-model="user.email"
              v-validate="rules.email"
              name="email"
              class="uk-input" />
            <p v-if="errors.first('email')" class="uk-margin-small uk-text-danger">
              {{ errors.first('email') }}
            </p>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">No Handphone</label>
            <input
              v-model="user.phone"
              v-validate="rules.phone"
              name="phone"
              class="uk-input" />
            <p v-if="errors.first('phone')" class="uk-margin-small uk-text-danger">
              {{ errors.first('phone') }}
            </p>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">Jenis Kelamin</label>
            <div>
              <label>
                <input v-model="user.gender" id="profile-gender-male" class="uk-radion" type="radio" value="m" /> Male
              </label>
              <label class="uk-margin-small-left">
                <input v-model="user.gender" id="profile-gender-female" class="uk-radion" type="radio" value="f" /> Female
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
              :return-value.sync="user.birthdate">
              <input
                v-model="user.birthdate"
                v-validate="rules.birthdate"
                name="birthdate"
                slot="activator"
                class="uk-input"
                readonly />
              <v-date-picker v-model="user.birthdate" @input="$refs.dialog.save(user.birthdate)" />
            </v-dialog>
          </div>
          <div class="uk-margin">
            <el-alert
                v-if="error"
                :title="errorMessage"
                type="error"
                show-icon>
              </el-alert>
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
      rules: {
        name: 'required',
        email: 'required|email',
        phone: 'required|min:10',
        gender: 'required|in:m,f',
        birthdate: 'required|date_format:YYYY-MM-DD'
      },
      dialog: {
        birthdate: false
      },
      error: false,
      errorMessage: '',
      validationErrors: {}
    }
  },

  async created () {
    this.__startLoading()

    this.user = await this.$auth.getUser()

    this.__stopLoading()
  },

  methods: {
    async updateProfile () {
      this.__startLoading()

      this.error = false
      this.errorMessage = ''
      this.validationErrors = {}

      await this.$authHttp.put('/user', {
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        gender: this.user.gender,
        birthdate: this.user.birthdate
      }).then(res => {
        this.$notify({
          title: 'Success',
          message: res.data.message,
          type: 'success'
        })
      }).catch(err => {
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

      this.__stopLoading()
    }
  }
}
</script>
