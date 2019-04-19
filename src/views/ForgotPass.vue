<template>
  <section class="forgot-password-page">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <div class="content-wrapper">
            <div class="kirimin-logo">
              <img style="width:150px" src="../assets/logo-kirimin.jpg">
            </div>

            <!-- Error message on Request to server -->
            <el-alert v-if="showAlert" :title="alertMsg" :type="alertType"></el-alert>

            <!-- Input Email -->
            <div class="form-group">
              <label class="input-label" for="email">Forgot Password</label>
              <el-input
                placeholder="Masukan email..."
                name="email"
                type="email"
                v-model="input.email"
                v-validate="rules.email"
                @keypress.enter="forgot"
              ></el-input>
              <small class="color-danger" v-if="errors.first('email')">{{ errors.first('email') }}</small>
            </div>

            <!-- Button Group -->
            <div class="form-group">
              <el-button type="primary" :loading="loadingBtn" @click="forgot">Reset Password</el-button>
              <el-button
                style="margin-left:1rem;"
                type="text"
                @click="$router.push({ name: 'login' })"
              >Login</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: "ForgotPasswordPage",
  data() {
    return {
      input: {
        email: ""
      },
      rules: {
        email: "required|email"
      },
      showAlert: false,
      alertMsg: "",
      alertType: "error",
      loadingBtn: false
    };
  },
  methods: {
    async forgot() {
      const input = this.input;
      const isValidated = await this.$validator.validate();
      const errors = this.$validator.errors;

      this.loadingBtn = true;
      this.showAlert = false;

      if (!isValidated) return (this.loadingBtn = false);

      try {
        const email = input.email;
        const origin = "cms";
        const res = await this.$service.forgot.sendEmail(email, origin);
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
