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
            <tr v-for="(el, i) in products" :key="i">
              <td>{{ el.code }}</td>
              <td>{{ el.name }}</td>
              <td>{{ el.price }}</td>
              <td>{{ el.stock }}</td>
              <td>
                <button @click="update(el.id)">Edit</button>
                <span>&nbsp;</span>
                <button @click="deleteConfirmation(el.id)">Delete</button>
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
      products: [],
      error: false,
      errorMesssage: ""
    };
  },

  created() {
    this.fetchProduct();
  },

  methods: {
    deleteConfirmation(id) {
      this.$confirm("Anda yakin akan menghapus produk ini ?", "Waning", {
        type: "warning",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      })
        .then(() => {
          this.delete(id);
        })
        .catch(() => {});
    },
    async fetchProduct() {
      this.__startLoading();

      let authTenant = JSON.parse(window.localStorage.getItem("authTenant"));

      try {
        let res = await this.$service.product.get({ authTenant });

        this.products = res.data.data;

        return this.__stopLoading();
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },

    async update(id) {
      return this.$router.push({
        name: "websites-edit",
        params: {
          id: id
        }
      });
    },
    async delete(id) {
      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.product.delete(id);

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.fetchProduct();
      } catch (err) {
        this.__handleError(this, err, true);
      }
    }
  }
};
</script>
