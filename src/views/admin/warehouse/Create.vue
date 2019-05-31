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
        <el-input v-model="input.code" :disabled="this.$route.params.id ? true : false"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Name</label>
        <el-input v-model="input.name"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Address</label>
        <el-input v-model="input.address" type="textarea" rows="5"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Native Address</label>
        <el-input v-model="input.native_address" type="textarea" rows="5"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">City</label>
        <el-input v-model="input.city"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">State</label>
        <el-input v-model="input.state"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Country</label>
        <el-input v-model="input.country"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Zip Code</label>
        <el-input v-model="input.zip_code"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Phone</label>
        <el-input v-model="input.phone" type="tel"></el-input>
      </div>
    <div>
      <div class="uk-margin">
        <label class="uk-form-label">Price VIP</label>
        <el-input v-model="input.vip" ></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Price Regular</label>
        <el-input v-model="input.regular" ></el-input>
      </div>
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
      price_config: {},
      edit: false,
      title: "New Warehouse",
      input: {
        code: "",
        name: "",
        price: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        phone: "",
        country: "",
        vip:"",
        regular: ""
      },
      warehouses: [],
      error: false,
      errorMessage: ""
    };
  },
  created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.title = "Edit Warehouse";
    console.log(this.warehouses);

      this.getWareHouse();
    }
  },
  methods: {
    collapseToggle(index) {
      this.warehouses[index].collapse = !this.warehouses[index].collapse;
    },
    async getWareHouse(i) {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      try {
        let id = this.$route.params.id
        let res = await this.$service.warehouse.find(id);
        let warehouse = res.data 
        let priceConfig = JSON.parse(warehouse.price_config);

        warehouse.regular = priceConfig.regular
        warehouse.vip = priceConfig.vip

        this.input = warehouse
        this.warehouses = res.data.data.map(wh => {
          wh["collapse"] = true;
        });
        this.input.vip = this.warehouses[i].warehouse.vip;
        this.input.regular =this.warehouses[i].warehouse.regular;
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
          this.price_config.vip = this.input.vip;
          this.price_config.regular = this.input.regular;

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
