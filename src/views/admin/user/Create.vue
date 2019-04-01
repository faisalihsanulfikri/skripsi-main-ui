<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>{{title}}</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="uk-card-body">
      <div uk-grid>
        <div class="uk-width-1-2">
          <div class="uk-margin">
            <label class="uk-form-label">Name</label>
            <input
              v-model="input.name"
              v-validate="rules.name"
              name="name"
              class="uk-input"
              type="text"
              placeholder="Name"
            >
            <small
              v-if="errors.first('name')"
              class="uk-margin-small uk-text-danger"
            >{{ errors.first('name') }}</small>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">Email</label>
            <input
              v-model="input.email"
              v-validate="rules.email"
              name="email"
              class="uk-input"
              type="text"
              placeholder="Email"
            >
            <small
              v-if="errors.first('email')"
              class="uk-margin-small uk-text-danger"
            >{{ errors.first('email') }}</small>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">Kata Sandi</label>
            <input
              v-model="input.password"
              v-validate="rules.password"
              name="password"
              class="uk-input"
              type="password"
              placeholder="Password"
              ref="password"
            >
            <small
              v-if="errors.first('password')"
              class="uk-margin-small uk-text-danger"
            >{{ errors.first('password') }}</small>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">Konfirmasi Kata Sandi</label>
            <input
              v-model="input.passwordConfirmation"
              v-validate="rules.passwordConfirmation"
              name="password_confirmation"
              class="uk-input"
              type="password"
              placeholder="Password Confirmation"
              data-vv-as="password"
            >
            <small
              v-if="errors.first('password_confirmation')"
              class="uk-margin-small uk-text-danger"
            >
              {{
              errors.first('password_confirmation') }}
            </small>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">Nomor Handphone</label>
            <input
              v-model="input.phone"
              v-validate="rules.phone"
              name="phone"
              class="uk-input"
              type="text"
              placeholder="Mobile"
            >
            <small
              v-if="errors.first('phone')"
              class="uk-margin-small uk-text-danger"
            >{{ errors.first('phone') }}</small>
          </div>

          <el-alert v-if="error" title="ERROR" type="error" :description="errorMessage" show-icon></el-alert>

          <div class="uk-card-footer uk-text-right">
            <el-button type="primary" @click="save">SAVE</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelName: "",
      edit: false,
      title: "New User",
      input: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        phone: "",
        active: "1",
        level: "",
        level_name: ""
      },
      rules: {
        name: "required|alpha_spaces",
        email: "required|email",
        password: "required|min:6",
        passwordConfirmation: "required|confirmed:password",
        phone: "required|min:10"
      },
      error: false,
      errorMessage: "",

      master: {
        levels: []
      },

      options: {
        level: []
      }
    };
  },

  created() {
    this.fetchLevels();
    this.onUserCreate();

    if (this.input.level) {
      console.log(this.input.level);
    } else {
      // this.$router.push("/admin/users/regular");
    }

    if (this.$route.params.id) {
      this.edit = true;
      this.title = "Edit User";

      //   this.fetchUsers();
    }
  },

  methods: {
    onUserCreate() {
      this.input.level = this.$route.params.level;

      switch (this.$route.params.level) {
        case "2":
          this.title = "New User Regular";
          this.levelName = "regular";
          break;
        case "3":
          this.title = "New User Premium";
          this.levelName = "premium";
          break;
        case "4":
          this.title = "New User Agent";
          this.levelName = "agent";
          break;
        case "1":
          this.title = "New User Admin";
          this.levelName = "admin";
          break;
      }
    },
    async fetchLevels() {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.level.get();

        this.master.levels = res.data;
        this.options.level = res.data.map(item => {
          let $item = {
            value: item.code,
            label: item.name
          };

          return $item;
        });

        this.input.level = res.data[0].code;
        this.input.level_name = res.data[0].name;

        console.log("res data", res.data);
        console.log("option level", this.options.level);
        console.log("level", this.input.level);
        console.log("level name", this.input.level_name);
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },

    // async fetchUsers(); {
    //   this.__startLoading();

    //   this.error = false;
    //   this.errorMessage = "";

    //   try {
    //     let res = await this.$service.category.find(this.$route.params.id);

    //     this.input.name = res.data.name;
    //     this.input.description = res.data.description;
    //   } catch (err) {
    //     this.__handleError(this, err, true);
    //   }

    //   this.__stopLoading();
    // },
    save() {
      if (this.edit) {
        this.update();
      } else {
        // this.error = false;
        // this.errorMessage = "";
        // console.log(this.input);

        this.store();
      }
    },
    async store() {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      //   console.log(this.input);
      //   return this.__stopLoading();

      try {
        let res = await this.$service.user.userStore(this.input);

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.$router.push("/admin/users/" + this.levelName);
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    }

    // async update() {
    //   this.__startLoading();

    //   this.error = false;
    //   this.errorMessage = "";

    //   try {
    //     let res = await this.$service.category.update(
    //       this.$route.params.id,
    //       this.input
    //     );

    //     this.$notify({
    //       title: "SUCCESS",
    //       message: res.data.message,
    //       type: "success"
    //     });

    //     this.$router.push({
    //       name: "admin-category"
    //     });
    //   } catch (err) {
    //     this.__handleError(this, err, true);
    //   }

    //   this.__stopLoading();
    // }
  }
};
</script>