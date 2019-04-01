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
            <label class="uk-form-label">Code</label>
            <input
              v-model="input.code"
              v-validate="rules.code"
              name="code"
              class="uk-input"
              type="text"
              placeholder="Name"
              disabled
            >
            <small
              v-if="errors.first('name')"
              class="uk-margin-small uk-text-danger"
            >{{ errors.first('name') }}</small>
          </div>
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
            <label class="uk-form-label">Phone Number</label>
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

          <div class="uk-margin">
            <label class="uk-form-label">Level</label>
            <select
              v-model="input.level"
              v-validate="rules.level"
              name="province"
              class="uk-select"
              @change="onLevelChanged"
            >
              <option
                v-for="(item, index) in options.level"
                :key="index"
                :value="item.value"
              >{{ item.label }}</option>
            </select>
            <small
              v-if="errors.first('level')"
              class="uk-margin-small uk-text-danger"
            >{{ errors.first('level') }}</small>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label">Active</label>
            <div class="req-doc">
              <label class="btn-r">
                <input
                  v-model="input.active"
                  class="uk-radio"
                  type="radio"
                  value="1"
                  @click="onActiveChanged"
                >
                <span class="uk-margin-small-left">Yes</span>
              </label>

              <label class="btn-r">
                <input
                  v-model="input.active"
                  class="uk-radio"
                  type="radio"
                  value="0"
                  @click="onActiveChanged"
                >
                <span class="uk-margin-small-left">No</span>
              </label>
            </div>

            <small
              v-if="errors.first('active')"
              class="uk-margin-small uk-text-danger"
            >{{ errors.first('active') }}</small>
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
      index: "",
      route_name: "",
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
        level: "required",
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
    //add from type of user
    // if (this.$route.params.level) {
    //   this.index = this.$route.params.level;
    // } else {
    //   this.index = "2";
    // }

    //if edit user
    if (this.$route.params.id) {
      this.edit = true;
      this.title = "Edit User";

      this.fetchUsers();
    }

    // console.log("input", this.input);

    // this.onUserCreate();
    this.fetchLevels();
  },

  methods: {
    onActiveChanged() {
      if (this.input.length > 0) {
        this.input.active = "";
      }
    },
    onUserCreate() {
      this.input.level = this.$route.params.level;

      switch (this.$route.params.level) {
        case "2":
          this.title = "New User Regular";
          this.route_name = "regular";
          break;
        case "3":
          this.title = "New User Premium";
          this.route_name = "premium";
          break;
        case "4":
          this.title = "New User Agent";
          this.route_name = "agent";
          break;
        case "1":
          this.title = "New User Admin";
          this.route_name = "admin";
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

        // console.log(this.index);

        let i = this.index;

        this.input.level = res.data[i].code;
        this.input.level_name = res.data[i].name;
        this.route_name = res.data[i].name.toLowerCase();
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },

    async fetchUsers() {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.user.getUserData(this.$route.params.id);

        console.log(res.data);

        this.input = res.data;
        console.log("input", this.input);
        // this.input.description = res.data.description;
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },
    onLevelChanged() {
      let level = this.master.levels.filter(
        level => level.code == this.input.level
      );

      if (level.length > 0) {
        this.input.level = level[0].code;
        this.input.level_name = level[0].name;
        this.route_name = level[0].name.toLowerCase();
      }
    },

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

      // console.log("input", this.input);
      // console.log("route name", this.route_name);
      // return this.__stopLoading();

      try {
        let res = await this.$service.user.userStore(this.input);

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.$router.push("/admin/users/" + this.route_name);
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

<style lang="scss" scoped>
.req-doc {
  padding-top: 10px;
  .btn-r {
    padding-right: 5px;
    padding-left: 5px;
  }
}
</style>