<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <router-link :to="{ name: 'websites' }">
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
        <label class="uk-form-label">Nama</label>
        <el-input v-model="input.name"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Harga Jual</label>
        <el-input v-model="input.price"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Harga Beli</label>
        <el-input v-model="input.price_buy"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Stok</label>
        <el-input v-model="input.stock"></el-input>
      </div>
    </div>
    <div class="uk-card-footer uk-text-right">
      <el-button type="primary" @click="save">SAVE</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      edit: false,
      title: "Produk Baru",
      input: {
        name: "",
        price: "",
        price_buy: "",
        stock: ""
      },
      auth: {
        db_name: "skripsi_webhade_tenant",
        db_user: "root_admin_panel",
        db_pass: "qazwsxedc1234567"
      }
    };
  },

  created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.title = "Edit Produk";

      // this.getCategory();
    }

    // console.log(this.$route.params.id);
  },

  methods: {
    async getCategory() {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.category.find(this.$route.params.id);

        this.input.name = res.data.name;
        this.input.description = res.data.description;
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },
    save() {
      if (this.edit) {
        this.update();
      } else {
        this.store();
      }
    },
    async store() {
      this.__startLoading();

      let payload = {
        input: this.input,
        auth: this.auth
      };

      console.log("payload", payload);

      return this.__stopLoading();

      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.product.create(payload);

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.$router.push({ name: "websites" });
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },
    async update() {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.category.update(
          this.$route.params.id,
          this.input
        );

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.$router.push({ name: "websites" });
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    }
  }
};
</script>

<style lang="scss" scoped>
.req-doc {
  padding-top: 10px;
  .btn-r {
    padding-right: 5px;
    padding-left: 5px;
  }
}
</style>
