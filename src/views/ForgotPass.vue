<template>
  <div class="uk-margin-top uk-margin-bottom">
    <div class="uk-card uk-card-default">
      <div class="uk-card-header uk-text-center">
        <nav uk-navbar>
          <div class="uk-navbar">
            <router-link to="/">
              <img class="app--navbar-logo" style="width:150px" src="../assets/logo-kirimin.jpg" />
            </router-link>
          </div>
        </nav>
      </div>
      <div class="uk-card-body">
        <div uk-grid>
          <div class="uk-width-1-2">
            <label class="uk-form-label" style="">Forgot Password</label>
            <div>
              <div class="uk-margin">
                <label class="uk-form-label">Email</label>
                <input v-model="input.email" v-validate="rules.email" name="email" class="uk-input" type="text"
                  placeholder="Email" @keypress.enter="login" />
                <p v-if="errors.first('email')" class="uk-margin-small uk-text-danger">
                  {{ errors.first('email') }}
                </p>
              </div>
              <div class="uk-margin">
                <el-alert v-if="error" :title="errorMessage" type="error" show-icon>
                </el-alert>
              </div>
              <div class="uk-margin">
                <button class="uk-button uk-button-primary uk-width-1-1" type="button" @click="forgot">
                  <span v-if="!application.loading">Confirm</span>
                  <font-awesome-icon v-else icon="spinner" spin></font-awesome-icon>
                </button>
              </div>
              <div class="uk-margin">
                <a @click="$router.push({ name: 'login'})"> < Back</a>
              </div>
            </div>
          </div>
          <div class="uk-width-1-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ForgotPage",
  data() {
    return {
      input: {
        email: ""
      },
      rules: {
        email: "required|email"
      },
      error: false,
      success: false,
      errorMessage: "",
      successMessage: "",
      validatorErrors: {}
    };
  },
  methods: {
    async forgot() {
      this.__startLoading();

      this.error = false;
      this.success = false;
      this.errorMessage = "";
      this.successMessage = "";

      const email = this.input.email;
      const errors = this.errors.items;

      // Check validation input
      // if true send error, else post request (send email)
      if (errors.length > 0) {
        let message = "Email yang Anda masukan tidak valid";
        this.error = true;
        this.errorMessage = message;
        // this.$alert(message, "Perhatian", { showClose: false });
        return this.__stopLoading();
      }

      if (this.input.email === "") {
        let message = "Email harus diisi";
        this.error = true;
        this.errorMessage = message;
        // this.$alert(message, "Perhatian", { showClose: false });
        return this.__stopLoading();
      }

      // Make request forgot password
      // if success send success message, else send error message
      return this.$service.forgot
        .sendEmail(email,'cms')
        .then(res => {
          console.log(res);
          let message = res.data.message;
          this.success = true;
          this.successMessage = message;
          this.input.email = "";
          this.__stopLoading();
        })
        .catch(err => {
          console.log(err.response);
          let message = "Unexpected error, please contact the administrator";
          this.error = true;
          this.errorMessage = message;
          this.__stopLoading();
        });
    }
  }
};
</script>
