<template>
  <section class="referral-codes">
    <div class="uk-card uk-card-default uk-card-small">
      <!-- Header -->
      <div class="uk-card-header app--card-header">
        <div uk-grid>
          <div class="uk-width-auto">
            <div class="app--card-header__icon">
              <font-awesome-icon icon="tags"></font-awesome-icon>
            </div>
          </div>
          <div class="uk-width-expand">
            <div class="app--card-header_title">
              <h3>Referral Codes</h3>
            </div>
          </div>
          <div class="uk-width-auto">
            <div class="app--card-header__link">
              <a @click="showAddReferralDialog">
                <font-awesome-icon icon="plus"></font-awesome-icon>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <el-dialog title="Add Referral Code" :visible.sync="dialogAddReferral" width="25%">
          <div class="form-group">
            <label for="user_id">USER</label>
            <!-- <el-input v-model="input.id_user" placeholder="Please input" disabled></el-input> -->
            <el-select
              v-model="searchUser"
              filterable
              remote
              reserve-keyword
              placeholder="Cari kode atau nama user"
              :remote-method="remoteMethod"
              :loading="searchLoading"
              class="autocomplete"
              @change="changeUser(searchUser)"
            >
              <el-option
                v-for="(item, i) in searchOptions"
                :key="i"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="form-group">
            <label for="referral_code">REFERRAL CODE</label>
            <el-input v-model="input.referral_code" placeholder="Please input"></el-input>
          </div>
          <div class="form-group">
            <label for="referral_code">ACTIVE STATUS</label>
            <el-switch v-model="input.active" active-text="YES" inactive-text="NO"></el-switch>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogAddReferral = false">Cancel</el-button>
            <el-button type="primary" @click="addNewReferral">Confirm</el-button>
          </span>
        </el-dialog>
      </div>

      <!-- Body -->
      <div class="uk-card-body">
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="Please input"
          @select="handleSelect"
        ></el-autocomplete>

        <table class="uk-table uk-table-middle uk-table-divider">
          <thead>
            <tr>
              <th>REFERRAL CODE</th>
              <th>USER CODE</th>
              <th>USER NAME</th>
              <th style="text-align:center;">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in referrals" :key="i">
              <td>{{ item.referral_code }}</td>
              <td>{{ item.user_code }}</td>
              <td>{{ item.user_name }}</td>
              <td style="text-align:center;">
                <!-- Button Edit -->
                <el-button type="primary" size="small" @click="showEditReferralDialog(i)">EDIT</el-button>

                <!-- Tampilkan dialogEditReferral ini ketika menekan tombol EDIT -->
                <el-dialog
                  title="Edit Referral Code"
                  :visible.sync="dialogEditReferral"
                  width="25%"
                >
                  <div class="form-group">
                    <label for="user_id">USER ID</label>
                    <el-input v-model="input.id_user" placeholder="Please input" disabled></el-input>
                  </div>
                  <div class="form-group">
                    <label for="referral_code">REFERRAL CODE</label>
                    <el-input v-model="input.referral_code" placeholder="Please input"></el-input>
                  </div>
                  <div class="form-group">
                    <label for="referral_code">ACTIVE STATUS</label>
                    <el-switch v-model="input.active" active-text="YES" inactive-text="NO"></el-switch>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogEditReferral = false">Cancel</el-button>
                    <el-button type="primary" @click="editReferralCode(input.referral_id)">Confirm</el-button>
                  </span>
                </el-dialog>

                <!-- Button Delete -->
                <el-button
                  style="margin-left:1rem;"
                  type="error"
                  size="small"
                  @click="deleteReferralCode(item.referral_id)"
                >DELETE</el-button>

                <!-- Change Referral Status -->
                <el-switch
                  style="margin-left:1rem"
                  v-model="item.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeReferralStatus(i, item.status)"
                ></el-switch>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "ReferralCodes",

  data() {
    return {
      searchUser: "",
      value2: true,
      dialogAddReferral: false,
      dialogEditReferral: false,
      referralCodeUsers: [],

      referrals: [],

      input: {
        id_user: "",
        referral_code: "",
        referral_id: "",
        active: false
      },

      user: [],

      searchList: [],
      searchValue: "",
      searchLoading: false,
      searchOptions: [],

      links: [],
      state: "",
      timeout: null
    };
  },
  methods: {
    editReferralCode(id) {
      const endpoint = "/referral-code/" + id;
      const payload = {
        id_user: this.input.id_user,
        referral_code: this.input.referral_code,
        active: this.input.active ? "yes" : "no"
      };

      this.$authHttp
        .put(endpoint, payload)
        .then(res => {
          this.fetchReferralCodeUsers();
          this.input = {};
          this.$notify({
            title: "SUCCESS",
            message: res.data.message,
            type: "success"
          });
          this.dialogEditReferral = false;
        })
        .catch(err => {
          this.$notify({
            title: "WARNING",
            message: err.response.data.message,
            type: "warning"
          });
        });
    },
    changeReferralStatus(i, active) {
      let id = this.referrals[i].referral_id;
      let status = active == true ? "yes" : "no";

      const payload = {
        active: status
      };

      const endpoint = `/referral-code/status/${id}`;
      return this.$authHttp
        .put(endpoint, payload)
        .then(res => {
          this.fetchReferralCodeUsers();
          this.$notify({
            title: "SUCCESS",
            message: res.data.message,
            type: "success"
          });
        })
        .catch(err => console.log(err));
    },
    showEditReferralDialog(i) {
      this.dialogEditReferral = true;

      let refCode = this.referrals[i];

      this.input.id_code = refCode.id;
      this.input.id_user = refCode.user_id;
      this.input.referral_code = refCode.referral_code;
      this.input.active = refCode.status;
      this.input.referral_id = refCode.referral_id;
    },
    deleteReferralCode(id) {
      this.$confirm("Are you sure to delete this?", "Warning", {
        type: "warning",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }).then(() => this.onDeleteReferralCode(id));
    },
    onDeleteReferralCode(id) {
      const endpoint = `/referral-code/${id}`;

      return this.$authHttp
        .delete(endpoint)
        .then(res => {
          this.fetchReferralCodeUsers();
          this.$notify({
            title: "SUCCESS",
            message: res.data.message,
            type: "success"
          });
        })
        .catch(err => console.log(err));
    },
    showAddReferralDialog(i) {
      this.dialogAddReferral = true;

      // let refCode = this.referralCodeUsers[i];

      // this.input.id_user = refCode.userId;
    },
    addNewReferral() {
      const endpoint = "/referral-code/";

      this.input.referral_code = this.input.referral_code.toUpperCase();

      let active = this.input.active ? "yes" : "no";
      this.input.active = active;

      let referral_code = this.input.referral_code;
      this.input.referral_code = referral_code.toUpperCase();

      const payload = this.input;

      this.dialogAddReferral = false;

      this.$authHttp
        .post(endpoint, payload)
        .then(res => {
          this.fetchReferralCodeUsers();
          this.$notify({
            title: "SUCCESS",
            message: res.data.message,
            type: "success"
          });
          this.input = {};
          this.searchUser = "";
        })
        .catch(err => {
          if (err.response.data.errorValidation) {
            return this.$notify({
              title: "WARNING",
              message: err.response.data.errors.referral_code[0],
              type: "warning"
            });
          } else {
            this.$notify({
              title: "WARNING",
              message: err.response.data.message,
              type: "warning"
            });
          }
        });
    },
    fetchReferralCodeUsers() {
      const endpoint = `/referral-codes`;
      return this.$authHttp
        .get(endpoint)
        .then(res => {
          const mapRefferals = res.data.data.map(ref => {
            return {
              ...ref,
              status: ref.is_active == "yes"
            };
          });
          this.referrals = mapRefferals;
          this.links = this.referrals.map(el => ({
            value: el.referral_code,
            link: el.referral_code
          }));
        })
        .catch(err => console.log(err));
    },
    fetchUserPremium() {
      const endpoint = `/referral-code/users`;

      return this.$authHttp
        .get(endpoint)
        .then(res => {
          this.user = res.data.data;

          this.searchList = this.user.map(item => {
            return {
              value: item.user_id,
              label: item.code + " " + item.user_name
            };
          });
        })
        .catch(err => console.log(err));
    },
    changeUser(id) {
      this.input.id_user = id;
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.searchLoading = false;
          this.searchOptions = this.searchList.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.searchOptions = [];
      }
    },
    // loadAll() {
    //   // let referrals = this.referrals.map(el => ({
    //   //   value: el.referral_code,
    //   //   link: el.referral_code
    //   // }));
    //   // return referrals;

    //   return [
    //     { value: "vue", link: "https://github.com/vuejs/vue" },
    //     { value: "element", link: "https://github.com/ElemeFE/element" },
    //     { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
    //     { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
    //     { value: "vuex", link: "https://github.com/vuejs/vuex" },
    //     { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
    //     { value: "babel", link: "https://github.com/babel/babel" }
    //   ];
    // },
    querySearchAsync(queryString, cb) {
      var links = this.links;
      var results = queryString
        ? links.filter(this.createFilter(queryString))
        : links;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 2000 * Math.random());
    },
    createFilter(queryString) {
      return link => {
        return (
          link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      let endpoint = `/referral-codes?search=${item.value}`;

      return this.$authHttp
        .get(endpoint)
        .then(res => {
          this.referrals = res.data.data.map(ref => {
            return {
              ...ref,
              status: ref.is_active == "yes"
            };
          });
        })
        .catch(err => console.log(err));
    }
  },
  // mounted() {
  //   // this.links = this.loadAll();
  // },
  created() {
    this.fetchUserPremium();
    this.fetchReferralCodeUsers();
  }
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
.form-group {
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
}
.autocomplete {
  width: 100%;
}
</style>
