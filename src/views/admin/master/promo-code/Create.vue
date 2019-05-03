<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <router-link :to="{ name: 'admin-promo-codes' }">
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
        <el-input v-model="input.code"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Status</label>
        <el-input v-model="input.status"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Status</label>
        <el-input v-model="input.status"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Description</label>
        <el-input v-model="input.description" type="textarea" rows="4"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Required Document</label>

        <div class="req-doc">
          <label class="btn-r">
            <input
              v-model="input.document"
              class="uk-radio"
              type="radio"
              value="yes"
              @click="onDocumentChanged"
            >
            <span class="uk-margin-small-left">Yes</span>
          </label>

          <label class="btn-r">
            <input
              v-model="input.document"
              class="uk-radio"
              type="radio"
              value="No"
              @click="onDocumentChanged"
            >
            <span class="uk-margin-small-left">No</span>
          </label>
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
      edit: false,
      title: "New Promo Code",
      input: {
        name: "",
        description: "",
        document: ""
      },
      options: {
        status: [],
        promoType: [],
        unlimited: []
      },
      error: false,
      errorMessage: ""
    };
  },

  created() {
    this.setOptions();
    if (this.$route.params.id) {
      this.edit = true;
      this.title = "Edit Promo Code";

      this.getCategory();
    }

    console.log(this.$route.params.id);
  },

  methods: {
    setOptions() {
      this.options.status = [
        { value: "active", lable: "Active" },
        { value: "suspend", lable: "Suspend" },
        { value: "inactive", lable: "Inactive" }
      ];
      this.options.promoType = [
        { value: "fixed", lable: "Fixed" },
        { value: "percentage", lable: "Percentage" },
        { value: "point", lable: "Point" }
      ];
      this.options.unlimited = [
        { value: true, lable: "True" },
        { value: false, lable: "False" }
      ];
    },
    onDocumentChanged() {
      if (this.input.length > 0) {
        this.input.document = "";
      }
    },
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

      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.category.create(this.input);

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.$router.push({ name: "admin-category" });
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

        this.$router.push({ name: "admin-category" });
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

