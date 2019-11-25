<template>
  <section class="login-page">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <div class="content-wrapper">
            <div class="kirimin-logo">
              <!-- <img style="width:150px" src="../assets/logo-kirimin.jpg"> -->
              <span>Client Area Login</span>
            </div>

            <!-- Error message on Request to server -->
            <el-alert v-if="showAlert" :title="alertMsg" :type="alertType"></el-alert>

            <!-- Input Email -->
            <div class="form-group">
              <label class="input-label" for="email">Email</label>
              <el-input
                placeholder="Masukan email..."
                name="email"
                id="email"
                type="email"
                v-model="input.email"
                v-validate="rules.email"
                @keypress.enter="login"
              ></el-input>
              <small class="color-danger" v-if="errors.first('email')">
                {{
                errors.first("email")
                }}
              </small>
            </div>

            <!-- Input Password -->
            <div class="form-group">
              <label class="input-label" for="password">Password</label>
              <el-input
                placeholder="Masukan password..."
                name="password"
                id="password"
                type="password"
                v-model="input.password"
                v-validate="rules.password"
                @keypress.enter="login"
              ></el-input>
              <small class="color-danger" v-if="errors.first('password')">
                {{
                errors.first("password")
                }}
              </small>
            </div>

            <!-- Button Group -->
            <div class="form-group">
              <el-button type="primary" :loading="loadingBtn" @click="login">Login</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import * as Level from "../config/level";

export default {
  data() {
    return {
      input: {
        email: "faisalihsanulfikri@gmail.com",
        password: "qwerty",
        origin: "cms"
      },
      rules: {
        email: "required|email",
        password: "required"
      },
      showAlert: false,
      alertMsg: "",
      alertType: "error",
      loadingBtn: false
    };
  },
  methods: {
    async login() {
      const input = this.input;
      const isValidated = await this.$validator.validate();
      const errors = this.$validator.errors;

      this.loadingBtn = true;
      this.showAlert = false;

      if (!isValidated) return (this.loadingBtn = false);

      errors.clear();

      try {
        let res = await this.$service.auth.login(input);
        this.$auth.setAuth(res.data);

        let user = await this.$auth.getUser();
        this.$root.user = user;

        window.localStorage.setItem("user_name", user.name);

        let authTenant = await this.$service.auth.tenant(user.id);

        this.$auth.setAuthTenant(authTenant.data.data);

        this.$router.push({
          name: Level.ROUTE_LEVEL[0]
        });
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
