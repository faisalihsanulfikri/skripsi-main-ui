<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>Add User</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="uk-card-body">
      <div uk-grid>
        <div class="uk-width-1-2">
          <div class="uk-margin">
            <label class="uk-form-label">Name</label>
            <input v-model="input.name" name="name" class="uk-input" type="text" placeholder="Name" />
            <p v-if="errors.first('name')" class="uk-margin-small uk-text-danger">{{ errors.first('name') }}</p>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">Email</label>
            <input v-model="input.email" name="email" class="uk-input" type="text" placeholder="Email" />
            <p v-if="errors.first('email')" class="uk-margin-small uk-text-danger">{{ errors.first('email') }}</p>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">Kata Sandi</label>
            <input v-model="input.password" name="password" class="uk-input" type="password" placeholder="Password" ref="password" />
            <p v-if="errors.first('password')" class="uk-margin-small uk-text-danger">{{ errors.first('password') }}</p>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">Konfirmasi Kata Sandi</label>
            <input v-model="input.passwordConfirmation" name="password_confirmation" class="uk-input" type="password"
              placeholder="Password Confirmation" data-vv-as="password" />
            <p v-if="errors.first('password_confirmation')" class="uk-margin-small uk-text-danger">{{
              errors.first('password_confirmation') }}</p>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">Nomor Handphone</label>
            <input v-model="input.phone" name="phone" class="uk-input" type="text" placeholder="Mobile" />
            <p v-if="errors.first('phone')" class="uk-margin-small uk-text-danger">{{ errors.first('phone') }}</p>
          </div>

          <el-alert v-if="error" title="ERROR" type="error" :description="errorMessage" show-icon>
          </el-alert>

          <div class="uk-card-footer uk-text-right">
            <el-button type="primary" @click="save">SAVE</el-button>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        edit: false,
        title: 'New Category',
        input: {
          name: '',
          description: '',
          document: ''
        },
        error: false,
        errorMessage: ''
      }
    },

    created() {
      if (this.$route.params.id) {
        this.edit = true
        this.title = 'Edit Category'

        this.getCategory()
      }
    },

    methods: {
      async getCategory() {
        this.__startLoading()

        this.error = false
        this.errorMessage = ''

        try {
          let res = await this.$service.category.find(this.$route.params.id)

          this.input.name = res.data.name
          this.input.description = res.data.description
        } catch (err) {
          this.__handleError(this, err, true)
        }

        this.__stopLoading()
      },
      save() {
        if (this.edit) {
          this.update()
        } else {
          this.store()
        }
      },
      async store() {
        this.__startLoading()

        this.error = false
        this.errorMessage = ''

        try {
          let res = await this.$service.category.create(this.input)

          this.$notify({
            title: 'SUCCESS',
            message: res.data.message,
            type: 'success'
          })

          this.$router.push({
            name: 'admin-category'
          })
        } catch (err) {
          this.__handleError(this, err, true)
        }

        this.__stopLoading()
      },
      async update() {
        this.__startLoading()

        this.error = false
        this.errorMessage = ''

        try {
          let res = await this.$service.category.update(this.$route.params.id, this.input)

          this.$notify({
            title: 'SUCCESS',
            message: res.data.message,
            type: 'success'
          })

          this.$router.push({
            name: 'admin-category'
          })
        } catch (err) {
          this.__handleError(this, err, true)
        }

        this.__stopLoading()
      }
    }
  }
</script>