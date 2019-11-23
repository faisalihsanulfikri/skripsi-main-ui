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
              <th class="uk-text-center" width="100">Default Selected</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="category in categories" :key="category.id">
              <td>{{ category.name }}</td>
              <td>{{ category.description }}</td>
              <td class="uk-text-center">
                <router-link :to="{ name: 'admin-category-edit', params: { id: category.id } }">
                  <font-awesome-icon icon="edit"></font-awesome-icon>
                </router-link>
                <a
                  class="uk-margin-small-left uk-text-danger"
                  href="#"
                  @click.prevent="deleteConfirmation(category.id)"
                >
                  <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                </a>
              </td>
              <td class="uk-text-center">
                <el-switch
                  v-model="category.isTrue"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="updateDefaultSelected(category)"
                ></el-switch>
              </td>
            </tr> -->
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="this.totalPages.length < 2"></div>

    <div v-else class="uk-card-footer uk-text-center">
      <ul class="uk-pagination" uk-margin>
        <li>
          <a href="#">
            <span uk-pagination-previous></span>
          </a>
        </li>
        <li v-for="(page, i) in totalPages" :key="i">
          <div v-if="current_page - 1 == i">
            <a
              href="#"
              style="color:red"
              @click.prevent="onChangePagination(i)"
              >{{ i + 1 }}</a
            >
          </div>
          <div v-else>
            <a href="#" @click.prevent="onChangePagination(i)">{{ i + 1 }}</a>
          </div>
        </li>
        <li>
          <a href="#">
            <span uk-pagination-next></span>
          </a>
        </li>
      </ul>
    </div>
    <!-- end pagination -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      totalPages: ["1"],
      pagination: {
        total: 0,
        current_page: 1,
        last_page: 0,
        page: 1
      },
      error: false,
      errorMesssage: ""
    };
  },

  created() {
    // this.fetchCategories(this.pagination.page);
  },

  methods: {
    onChangePagination(i) {
      this.fetchCategories(i + 1);
    },
    deleteConfirmation(id) {
      this.$confirm("Are you sure to delete this?", "Waning", {
        type: "warning",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      })
        .then(() => {
          this.delete(id);
        })
        .catch(() => {});
    },
    async fetchCategories(page = 1) {
      this.__startLoading();

      this.pagination.page = page;
      console.log("page", page);

      try {
        let res = await this.$service.category.get({}, page);

        this.pagination.last_page = res.data.last_page;

        this.categories = res.data.data.map(category => {
          category["isTrue"] =
            category.default_selected == "true" ? true : false;

          return category;
        });

        this.totalPages = res.data.pages;
        this.current_page = page;

        this.categories = res.data.data;
        this.pagination = res.data;

        delete this.pagination.data;
        delete this.pagination.filter;
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },
    async delete(id) {
      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.category.delete(id);

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.fetchCategories();
      } catch (err) {
        this.__handleError(this, err, true);
      }
    },
    async updateDefaultSelected(category) {
      const Cdata = category;
      const Cid = Cdata.id;
      const default_selected = Cdata.isTrue ? "true" : "false";

      let res = this.$service.category
        .updateDefault(Cid, { default_selected: default_selected })
        .then(res => {
          this.$notify({
            type: "success",
            title: "Success",
            message: res.data.message
          });
          this.fetchCategories(this.pagination.page);
        })
        .catch(err => {
          this.$notify({
            type: "warning",
            title: "Peringatan",
            message: err.response.data.message
          });
          this.fetchCategories(this.pagination.page);
        });
    }
  }
};
</script>
