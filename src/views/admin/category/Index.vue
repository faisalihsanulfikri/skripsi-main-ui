<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="tags"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>Categories</h3>
          </div>
        </div>
        <div class="uk-width-auto">
          <div class="app--card-header__link">
            <router-link :to="{ name: 'admin-category-create' }">
              <font-awesome-icon icon="plus"></font-awesome-icon>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body uk-card-small">
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th class="uk-text-center" width="100">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id">
              <td>{{ category.name }}</td>
              <td>{{ category.description }}</td>
              <td class="uk-text-center">
                <router-link :to="{ name: 'admin-category-edit', params: { id: category.id } }">
                  <font-awesome-icon icon="edit"></font-awesome-icon>
                </router-link>
                <a class="uk-margin-small-left uk-text-danger" href="#" @click.prevent="deleteConfirmation(category.id)">
                  <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categories: [],
      error: false,
      errorMesssage: ''
    }
  },
  methods: {
    fetchCategories () {
      this.$authHttp.get(`/categories`).then(res => {
        this.categories = res.data.data
      })
    },
    delete (id) {
      this.error = false
      this.errorMessage = ''

      this.$authHttp.delete(`/v1/categories/${id}`).then(res => {
        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.fetchCategories()
      }).catch(err => {
        if (err.response) {
          this.error = true
          this.errorMessage = err.response.data.message ? err.response.data.message : err.response.statusText

          this.$notify({
            title: 'ERROR',
            message: this.errorMessage,
            type: 'error'
          })
        }
      })
    },
    deleteConfirmation (id) {
      this.$confirm('Are you sure to delete this?', 'Waning', {
        type: 'warning',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(() => {
        this.delete(id)
      }).catch(() => {})
    }
  },
  created () {
    this.fetchCategories()
  }
}
</script>
