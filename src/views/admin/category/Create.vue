<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <router-link :to="{ name: 'admin-category' }">
              <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </router-link>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>{{ title }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body">
      <div class="uk-margin">
        <label class="uk-form-label">Name</label>
        <el-input v-model="input.name"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Description</label>
        <el-input v-model="input.description" type="textarea" rows="10"></el-input>
      </div>
      <el-alert
          v-if="error"
          title="ERROR"
          type="error"
          :description="errorMessage"
          show-icon>
        </el-alert>
    </div>
    <div class="uk-card-footer uk-text-right">
      <el-button type="primary" @click="save">SAVE</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      edit: false,
      title: 'New Category',
      input: {
        name: '',
        description: ''
      },
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    getCategory () {
      this.error = false
      this.errorMessage = ''

      this.$authHttp.get(`/v1/categories/${this.$route.params.id}`).then(res => {
        this.input.name = res.data[0].name
        this.input.description = res.data[0].description
      }).catch(err => {
        if (err.response) {
          this.error = true
          this.errorMessage = err.response.data.message ? err.response.data.message : err.response.statusText

          this.$notify({
            title: 'ERROR',
            message: this.errorMessage,
            type: 'error'
          })

          this.$router.push({ name: 'admin-category' })
        }
      })
    },
    save () {
      if (this.edit) {
        this.update()
      } else {
        this.store()
      }
    },
    store () {
      this.error = false
      this.errorMessage = ''

      this.$authHttp.post('/v1/categories', this.input).then(res => {
        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.$router.push({ name: 'admin-category' })
      }).catch(err => {
        if (err.response) {
          this.error = true
          this.errorMessage = err.response.data.message ? err.response.data.message : err.response.statusText
        }
      })
    },
    update () {
      this.error = false
      this.errorMessage = ''

      this.$authHttp.put(`/v1/categories/${this.$route.params.id}`, this.input).then(res => {
        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.$router.push({ name: 'admin-category' })
      }).catch(err => {
        if (err.response) {
          this.error = true
          this.errorMessage = err.response.data.message ? err.response.data.message : err.response.statusText
        }
      })
    }
  },
  created () {
    if (this.$route.params.id) {
      this.edit = true
      this.title = 'Edit Category'

      this.getCategory()
    }
  }
}
</script>
