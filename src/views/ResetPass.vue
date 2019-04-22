<template>
  <section class="reset-password-page">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <div class="content-wrapper">
            <div class="kirimin-logo">
              <img style="width:150px" src="../assets/logo-kirimin.jpg">
            </div>

            <!-- Error message on Request to server -->
            <el-alert v-if="showAlert" :title="alertMsg" :type="alertType"></el-alert>

            <!-- Input Password -->
            <div class="form-group">
              <label class="input-label" for="password">Password</label>
              <el-input
                placeholder="Masukan password baru..."
                id="password"
                name="password"
                type="password"
                v-model="input.password"
                v-validate="rules.password"
                @keypress.enter="sendNewPassword"
              ></el-input>
              <small
                class="color-danger"
                v-if="errors.first('password')"
              >{{ errors.first('password') }}</small>
            </div>

            <!-- Input Confirm Password -->
            <div class="form-group">
              <label class="input-label" for="c_password">Confirm Password</label>
              <el-input
                placeholder="Konfirmasi password baru..."
                id="c_password"
                name="c_password"
                type="password"
                v-model="input.c_password"
                v-validate="rules.c_password"
                @keypress.enter="sendNewPassword"
              ></el-input>
              <small
                class="color-danger"
                v-if="errors.first('c_password')"
              >{{ errors.first('c_password') }}</small>
            </div>

            <!-- Button Group -->
            <div class="form-group">
              <el-button
                type="primary"
                :loading="loadingBtn"
                @click="sendNewPassword"
              >Reset Password</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: "ResetPasswordPage",
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
      showAlert: false,
      alertMsg: "",
      alertType: "error",
      loadingBtn: false
    };
  },
  methods: {
    async sendNewPassword() {
      const input = this.input;
      const isValidated = await this.$validator.validate();
      const errors = this.$validator.errors;
      const token = this.$route.params.token;
      const payload = { ...input, token };

      this.loadingBtn = true;
      this.showAlert = false;

      if (!isValidated) return (this.loadingBtn = false);

      try {
        const res = await this.$service.forgot.changePassword(payload);
        this.$router.push({ name: "login" });
      } catch (err) {
        const errData = err.response.data;
        const errMsg = errData.message;

        this.showAlert = true;
        this.alertMsg = errMsg;
      }

      this.loadingBtn = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../themes/app/style-login";
</style>
