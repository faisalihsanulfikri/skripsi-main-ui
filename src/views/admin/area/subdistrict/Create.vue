<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <router-link :to="{ name: 'admin-area-subdistrict' }">
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
        <label class="uk-form-label">Province</label>
        <el-input v-model="input.province"></el-input>
        <!-- <input type="text"> -->
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">City</label>
        <el-input v-model="input.city"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Sub District</label>
        <el-input v-model="input.subdistrict_name"></el-input>
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
      title: "New Subdistrict",
      input: {
        city: "",
        province: "",
        subdistrict_name: ""
      },
      error: false,
      errorMessage: ""
    };
  },

  created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.title = "Edit Subdistrict";
    }

    this.fetchSubDistricts();

    console.log(this.$route.params.id);
  },

  methods: {
    async fetchSubDistricts() {
      this.__startLoading();
      try {
        let res = await this.$service.area.findSubdistrict(
          this.$route.params.id
        );
        this.input = res.data;
        console.log(this.input);
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
    // store() {
    //   this.error = false;
    //   this.errorMessage = "";
    //   this.$authHttp
    //     .post("/v1/kurs", this.input)
    //     .then(res => {
    //       this.$notify({
    //         title: "SUCCESS",
    //         message: res.data.message,
    //         type: "success"
    //       });
    //       this.$router.push({ name: "admin-exchange-rate" });
    //     })
    //     .catch(err => {
    //       if (err.response) {
    //         this.error = true;
    //         this.errorMessage = err.response.data.message
    //           ? err.response.data.message
    //           : err.response.statusText;
    //       }
    //     });
    //   console.log("test");
    // },
    update() {
      this.error = false;
      this.errorMessage = "";

      // console.log("1", this.$route.params.id);
      // return console.log("2", this.input);
      this.$authHttp
        .put(`/sub-districts/${this.$route.params.id}`, this.input)
        .then(res => {
          this.$notify({
            title: "SUCCESS",
            message: res.data.message,
            type: "success"
          });
          this.$router.push({ name: "admin-area-subdistrict" });
        })
        .catch(err => {
          if (err.response) {
            this.error = true;
            this.errorMessage = err.response.data.message
              ? err.response.data.message
              : err.response.statusText;
          }
        });
    }
  }
};
</script>
