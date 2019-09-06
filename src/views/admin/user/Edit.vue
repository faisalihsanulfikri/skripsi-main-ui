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
        <div class="uk-width-1-2">
          <div class="uk-margin" v-if="user_level.level == 0">
            <label class="uk-form-label">Code</label>
            <input
              v-model="input.code"
              v-validate="rules.code"
              name="code"
              class="uk-input"
              type="text"
              placeholder="Code User"
            />
            <small
              v-if="errors.first('name')"
              class="uk-margin-small uk-text-danger"
            >{{ errors.first('name') }}</small>
          </div>
          <div class="uk-margin" v-else>
            <label class="uk-form-label">Code</label>
            <input
              v-model="input.code"
              v-validate="rules.code"
              name="code"
              class="uk-input"
              type="text"
              placeholder="Code User"
              disabled
            />
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
            />
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
            />
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
            />
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

          <div class="uk-margin" v-if="input.level == '3' && current_level">
            <label class="uk-form-label">Duration (Month)</label>
            <input
              v-model="duration"
              name="duration"
              class="uk-input"
              type="number"
              placeholder="3"
            />
          </div>

          <div class="uk-margin" v-if="input.level == '3' && current_level">
            <label class="uk-form-label">Referral Code</label>
            <input
              v-model="input.referral_code"
              name="ref_code"
              class="uk-input"
              type="text"
              placeholder="Referral Code"
              @blur="onGetReferralCode(input.referral_code)"
            />
          </div>

          <div class="uk-margin">
            <label class="uk-form-label">Base Factor (vip special treatment)</label>
            <input
              v-model="input.base_factor"
              name="base_factor"
              class="uk-input"
              type="text"
              placeholder="Berat per gram"
            />
            <small
              v-if="errors.first('base_factor')"
              class="uk-margin-small uk-text-danger"
            >{{ errors.first('base_factor') }}</small>
          </div>

          <div class="uk-margin" v-if="edit_downline">
            <label class="uk-form-label">Activate Downlines</label>
            <div class="req-doc">
              <label class="btn-r">
                <input
                  v-model="input.downline_active"
                  class="uk-radio"
                  type="radio"
                  value="1"
                  @click="onDownlineActiveChanged"
                />
                <span class="uk-margin-small-left">Yes</span>
              </label>

              <label class="btn-r">
                <input
                  v-model="input.downline_active"
                  class="uk-radio"
                  type="radio"
                  value="0"
                  @click="onDownlineActiveChanged"
                />
                <span class="uk-margin-small-left">No</span>
              </label>
            </div>

            <small
              v-if="errors.first('downline_active')"
              class="uk-margin-small uk-text-danger"
            >{{ errors.first('downline_active') }}</small>
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
                />
                <span class="uk-margin-small-left">Yes</span>
              </label>

              <label class="btn-r">
                <input
                  v-model="input.active"
                  class="uk-radio"
                  type="radio"
                  value="0"
                  @click="onActiveChanged"
                />
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
      edit_downline: false,
      duration: "0",
      title: "New User",
      input: {
        code: "",
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        phone: "",
        base_factor: "",
        gender: "",
        birthdate: "",
        referral_code: null,
        birthdateSplited: {
          year: "",
          month: "",
          day: ""
        },
        duration: "0",
        active: "1",
        downline_active: "0",
        level: "",
        level_name: "",
        current_level: ""
      },
      rules: {
        level: "required",
        name: "required|alpha_spaces",
        email: "required|email",
        password: "required|min:6",
        passwordConfirmation: "required|confirmed:password",
        phone: "required|min:10",
        duration: "required|number"
      },
      user_level: {},
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
    //if edit user
    if (this.$route.params.id) {
      this.edit = true;
      this.title = "Edit User";

      this.fetchUsers();
    }

    this.fetchLevels();
  },

  methods: {
    async onGetReferralCode(code) {
      if (code) {
        let res = await this.$service.user.getReferralCode(code);

        if (res.data.data) {
          this.$notify({
            title: "SUCCESS",
            message: "Referral Code Valid.",
            type: "success"
          });
        } else {
          this.$notify({
            title: "WARNING",
            message: "Referral Code Unvalid.",
            type: "warning"
          });
        }
      }
    },
    onActiveChanged() {
      if (this.input.length > 0) {
        this.input.active = "";
      }
    },
    onDownlineActiveChanged() {
      if (this.input.length > 0) {
        this.input.downline_active = "0";
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

        this.input = res.data;
        this.current_level = this.input.level == 2 ? true : false;
        this.edit_downline = this.input.level == 3 ? true : false;
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
        this.store();
      }
    },
    async update() {
      this.__startLoading();

      if (this.input.level == 3 && this.current_level) {
        if (this.duration < 1) {
          this.$notify({
            title: "WARNING",
            message: "The Duration field is required.",
            type: "warning"
          });
          return this.__stopLoading();
        }
      }

      this.input.duration = parseInt(this.duration);

      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.user.updateUserData(
          this.$route.params.id,
          this.input
        );

        this.$notify({
          title: "SUCCESS",
          message: res.data.url.message,
          type: "success"
        });

        this.$router.push({
          path: res.data.url
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
</style>