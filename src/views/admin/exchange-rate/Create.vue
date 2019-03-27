<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <router-link :to="{ name: 'admin-exchange-rate' }">
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
        <label class="uk-form-label">Rates</label>
        <el-input v-model="input.rates"></el-input>
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
      title: "New Exchange Rate",
      input: {
        code: "",
        rates: ""
      },
      error: false,
      errorMessage: ""
    };
  },

  created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.title = "Edit Exhange Rate";
    }

    this.fetchExchangeRates();
  },

  methods: {
    async fetchExchangeRates() {
      this.__startLoading();

      try {
        let res = await this.$service.exchangerates.find(this.$route.params.id);

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

      this.$authHttp
        .put(`/exchangerate/${this.$route.params.id}`, this.input)
        .then(res => {
          this.$notify({
            title: "SUCCESS",
            message: res.data.message,
            type: "success"
          });

          this.$router.push({ name: "admin-exchange-rate" });
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
