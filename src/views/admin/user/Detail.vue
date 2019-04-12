<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <!-- <router-link :to="{ name: 'admin-user', params: { level: input.level } }">
              <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </router-link>-->
            <!-- <a href="/admin/users/${input.level}"> -->
            <!-- <a href="/admin/users/" onclick="location.href=this.href+input.level;return false;">
              <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </a>-->
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>{{title}}</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="uk-card-body">
      <div uk-grid>
        <div class="uk-width-1-1">
          <div class="uk-margin">
            <table class="detail">
              <tr>
                <th>Code</th>
                <td>: {{input.code}}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>: {{input.name}}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>: {{input.email}}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>: {{input.phone}}</td>
              </tr>
              <tr>
                <th>Level</th>
                <!-- <td>: {{input.level_name}}</td> -->
                <td>
                  :
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
                </td>
              </tr>
              <tr>
                <th>Active</th>
                <td>: {{input.active}}</td>
              </tr>
            </table>
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
        code: "",
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        phone: "",
        gender: "",
        birthdate: "",
        birthdateSplited: {
          year: "",
          month: "",
          day: ""
        },
        active: "",
        active_name: "",
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

  // computed: {
  //   level_name() {
  //     // console.log(level);
  //     let level = this.input.level;

  //     switch (level) {
  //       case "2":
  //         return "Regular";
  //         break;
  //       case "3":
  //         return "Premium";
  //         break;
  //       case "4":
  //         return "Agent";
  //         break;
  //       case "1":
  //         return "Admin";
  //         break;
  //     }
  //   }
  // },

  created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.title = "Detail User";

      this.fetchUsers();
      this.fetchLevels();
    }

    // console.log("input", this.input);

    // this.onUserCreate();
    // this.fetchLevels();
  },

  methods: {
    onActiveChanged() {
      if (this.input.length > 0) {
        this.input.active = "";
      }
    },
    // onUserCreate() {
    //   this.input.level = this.$route.params.level;

    //   switch (this.$route.params.level) {
    //     case "2":
    //       this.title = "New User Regular";
    //       this.route_name = "regular";
    //       break;
    //     case "3":
    //       this.title = "New User Premium";
    //       this.route_name = "premium";
    //       break;
    //     case "4":
    //       this.title = "New User Agent";
    //       this.route_name = "agent";
    //       break;
    //     case "1":
    //       this.title = "New User Admin";
    //       this.route_name = "admin";
    //       break;
    //   }
    // },

    async fetchLevels() {
      this.__startLoading();

      this.index = this.input.level;

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

        console.log(this.input);
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

        this.input = res.data;

        console.log(this.route_name);
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },
    // onLevelChanged() {
    //   let level = this.master.levels.filter(
    //     level => level.code == this.input.level
    //   );

    //   if (level.length > 0) {
    //     this.input.level = level[0].code;
    //     this.input.level_name = level[0].name;
    //     this.route_name = level[0].name.toLowerCase();
    //   }
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
    async update() {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.user.updateUserData(
          this.$route.params.id,
          this.input
        );

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.$router.push({
          path: "/admin"
        });
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    }
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

.detail {
  th {
    text-align: left;
  }
}
</style>