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
@import "../themes/_variables";

.forgot-password-page {
  display: flex;
  justify-content: center;
  align-items: center;
  background: $blue-color;
  height: 100vh;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background: white;
  width: 400px;
}

.content-wrapper {
  padding: 3rem 2rem;
}

.kirimin-logo {
  text-align: center;
  padding: 0 0 1rem;
  border-bottom: 1px solid rgb(218, 218, 218);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
  &:last-child {
    margin-bottom: 0;
  }
}

.input-label {
  color: $black-color;
}

.el-input {
  margin-top: 0.5rem;
  .el-input__inner {
    border-radius: 4px !important;
  }
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-alert {
  margin-bottom: 1rem;
}

@media screen and (min-width: 300px) and (max-width: 720px) {
  .forgot-password-page {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .grid-content {
    width: 100%;
  }
}
</style>
