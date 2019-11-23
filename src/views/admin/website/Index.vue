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
            <h3>Produk</h3>
          </div>
        </div>
        <div class="uk-width-auto">
          <div class="app--card-header__link">
            <router-link :to="{ name: 'websites-create' }">
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
              <th>Kode</th>
              <th>Nama</th>
              <th>Harga Jual</th>
              <th>Stok</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>P001</td>
              <td>Macbook Pro MF841</td>
              <td>Rp. 17.000.000</td>
              <td>10</td>
              <td>
                <button>Edit</button>
                <span>&nbsp;</span>
                <button>Delete</button>
              </td>
            </tr>
            <tr>
              <td>P002</td>
              <td>Asus ROG GL503VD</td>
              <td>Rp. 15.000.000</td>
              <td>15</td>
              <td>
                <button>Edit</button>
                <span>&nbsp;</span>
                <button>Delete</button>
              </td>
            </tr>
            <tr>
              <td>P003</td>
              <td>Macbook Pro MF839</td>
              <td>Rp. 10.000.000</td>
              <td>10</td>
              <td>
                <button>Edit</button>
                <span>&nbsp;</span>
                <button>Delete</button>
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
