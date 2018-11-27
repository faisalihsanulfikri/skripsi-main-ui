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
    <div class="uk-card-footer uk-text-center">
      <el-pagination
        layout="prev, pager, next"
        :page-size="pagination.per_page"
        :page-count="pagination.last_page"
        :total="pagination.total"
        @current-change="onChangePage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categories: [],
      pagination: {
        current_page: 1,
        per_page: 25,
        total: 0
      },
      error: false,
      errorMesssage: ''
    }
  },

  created () {
    this.fetchCategories()
  },

  methods: {
    async onChangePage (page) {
      this.pagination.current_page = page

      this.fetchCategories()
    },
    deleteConfirmation (id) {
      this.$confirm('Are you sure to delete this?', 'Waning', {
        type: 'warning',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(() => {
        this.delete(id)
      }).catch(() => {})
    },
    async fetchCategories () {
      this.__startLoading()

      try {
        let res = await this.$service.getCategories()

        this.categories = res.data.data
        this.pagination = res.data

        delete this.pagination.data
        delete this.pagination.filter
      } catch (err) {
        this.__handleError(this, err, true)
      }

      this.__stopLoading()
    },
    async delete (id) {
      this.error = false
      this.errorMessage = ''

      try {
        let res = await this.$service.deleteCategory(id)

        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.fetchCategories()
      } catch (err) {
        this.__handleError(this, err, true)
      }
    }
  }
}
</script>
