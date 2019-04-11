<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <router-link :to="{ name: 'admin-warehouse' }">
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
        <label class="uk-form-label">Code</label>
        <el-input v-model="input.code" :disabled="this.$route.params.id"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Name</label>
        <el-input v-model="input.name"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Price</label>
        <el-input v-model="input.price"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Address</label>
        <el-input v-model="input.address" type="textarea" rows="5"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Zip Code</label>
        <el-input v-model="input.zip_code"></el-input>
      </div>
      <el-alert v-if="error" title="ERROR" type="error" :description="errorMessage" show-icon></el-alert>
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
      title: "New Warehouse",
      input: {
        code: "",
        name: "",
        price: "",
        address: "",
        zip_code: ""
      },
      error: false,
      errorMessage: ""
    };
  },
  created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.title = "Edit Warehouse";

      this.getWareHouse();
    }
  },
  methods: {
    async getWareHouse() {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.warehouse.find(this.$route.params.id);

        console.log(res.data);

        this.input = res.data;
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
      this.error = false;
      this.errorMessage = "";

      console.log(this.input);
      // return this.__stopLoading();

      try {
        let res = await this.$service.warehouse.create(this.input);

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.$router.push({ name: "admin-warehouse" });
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
        let res = await this.$service.warehouse.update(
          this.$route.params.id,
          this.input
        );

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.$router.push({ name: "admin-warehouse" });
      } catch (err) {
        this.__handleError(this, err, true);
      }
      this.__stopLoading();
    }
  }
};
</script>
