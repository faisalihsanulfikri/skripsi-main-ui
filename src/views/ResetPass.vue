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
            <div>
              <div class="uk-margin">
                <label class="uk-form-label">New Password</label>
                <input
                  type="password"
                  name="password"
                  class="uk-input"
                  v-validate="rules.password"
                  v-model="input.password"
                  @keypress.enter="send"
                >
                <small
                  v-if="errors.first('password')"
                  class="uk-margin-small uk-text-danger"
                >{{ errors.first('password') }}</small>
              </div>
              <div class="uk-margin">
                <label class="uk-form-label">Confirm New Password</label>
                <input
                  v-model="input.c_password"
                  v-validate="'required|confirmed:password'"
                  name="c_password"
                  class="uk-input"
                  type="password"
                  @keypress.enter="send"
                >
                <small
                  v-if="errors.first('c_password')"
                  class="uk-margin-small uk-text-danger"
                >{{ errors.first('c_password') }}</small>
              </div>
              <div class="uk-margin">
                <button class="uk-button uk-button-primary uk-width-1-1" type="button" @click="send">
                  <span v-if="!application.loading">Change Password</span>
                  <font-awesome-icon v-else icon="spinner" spin></font-awesome-icon>
                </button>
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
  data() {
    return {
      input: {
        password: "",
        c_password: ""
      },
      rules: {
        password: "required",
        c_password: "required|confirmed:password"
      },
      error: false,
      errorMessage: "",
      validatorErrors: {}
    };
  },
  methods: {
    async send() {
      this.__startLoading();

      try {
        this.input.token = this.$route.params.token;
        let res = await this.$service.forgot.changePassword(this.input);

        this.$router.push({
          name: "login"
        });
      } catch (err) {
        this.__handleError(this, err);
      }
      this.__stopLoading();
    }
  }
};
</script>
