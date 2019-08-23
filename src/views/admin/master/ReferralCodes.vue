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
          <div class="form-group" style="display:flex;justify-content:space-between;">
            <!-- Active Input -->
            <div>
              <label for="referral_code">ACTIVE STATUS</label>
              <div style="text-align:right">
                <el-switch v-model="input.active" active-text="YES" inactive-text="NO"></el-switch>
              </div>
            </div>

            <div>
              <!-- Set As Promo Code Radio -->
              <div class="form-group">
                <label>SET AS PROMO REFERRAL?</label>
                <el-radio-group
                  style="display:block;text-align:right;"
                  v-model="setAsPromoCode"
                  size="small"
                >
                  <el-radio-button label="Yes"></el-radio-button>
                  <el-radio-button label="No"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>

          <!-- Addition Input: Promo Code Form -->
          <PromoCodeForm v-if="showAdditionalInput" :input="input"></PromoCodeForm>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogAddReferral = false">Cancel</el-button>
            <el-button type="primary" @click="addNewReferral">Confirm</el-button>
          </span>
        </el-dialog>
      </div>

      <!-- Body -->
      <div class="uk-card-body">
        <!-- Search Referral Code -->
        <el-input
          placeholder="Search and enter referral code here..."
          v-model="searchReferralValue"
          @change="onSearchReferralCodes"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>

        <table class="uk-table uk-table-middle uk-table-divider" v-loading="isLoadReferralTable">
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
              <td style="text-align:left;">
                <!-- Button Edit -->
                <el-button type="primary" size="small" @click="showEditReferralDialog(i)">EDIT</el-button>

                <!-- Dialog Edit Referral Code -->
                <el-dialog
                  title="Edit Referral Code"
                  :visible.sync="dialogEditReferral"
                  width="25%"
                >
                  <!-- User Id Input -->
                  <div class="form-group" style="margin-bottom:0">
                    <label for="user_id">USER</label>
                    <el-input v-model="input.user_name" disabled></el-input>
                    <el-input v-model="input.id_user" placeholder="Please input" disabled hidden></el-input>
                  </div>

                  <!-- Referral Code Input -->
                  <div class="form-group">
                    <label for="referral_code">REFERRAL CODE</label>
                    <el-input v-model="input.referral_code" placeholder="Please input"></el-input>
                  </div>

                  <div class="form-group" style="display:flex;justify-content:space-between;">
                    <!-- Active Input -->
                    <div>
                      <label for="referral_code">ACTIVE STATUS</label>
                      <div style="text-align:right">
                        <el-switch v-model="input.active" active-text="YES" inactive-text="NO"></el-switch>
                      </div>
                    </div>

                    <div>
                      <!-- Set As Promo Code Radio -->
                      <div class="form-group">
                        <label>SET AS PROMO REFERRAL?</label>
                        <el-radio-group
                          style="display:block;text-align:right;"
                          v-model="setAsPromoCode"
                          size="small"
                        >
                          <el-radio-button label="Yes"></el-radio-button>
                          <el-radio-button label="No"></el-radio-button>
                        </el-radio-group>
                      </div>
                    </div>
                  </div>

                  <!-- Addition Input: Promo Code Form -->
                  <PromoCodeForm v-if="showAdditionalInput" :input="input"></PromoCodeForm>

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
import PromoCodeForm from "@/components/referral-codes/PromoCodeForm";

export default {
  name: "ReferralCodes",

  components: { PromoCodeForm },

  data() {
    return {
      searchUser: "",
      value2: true,
      dialogAddReferral: false,
      dialogEditReferral: false,
      referralCodeUsers: [],
      referrals: [
        {
          referral_id: "",
          code: "",
          expire_date: "",
          is_active: "",
          referral_code: "",
          user_id: "",
          user_name: "",
          status: true
        }
      ],
      input: {
        id_user: "",
        referral_code: "",
        referral_id: "",
        active: false,
        promo_referral: "0",
        capacity: null,
        start_date: null,
        end_date: null,
        in_used: null,
        user_name: ""
      },
      user: [],
      searchList: [],
      searchValue: "",
      searchLoading: false,
      searchOptions: [],
      searchReferralValue: "",
      setAsPromoCode: "No",
      showAdditionalInput: false,
      isLoadReferralTable: true
    };
  },
  watch: {
    /**
     * Set nilai untuk data berkut:
     * promo_referral, start_date, end_date, dan capicity
     * jika nilai setAsPromoCode adalah "Yes".
     */
    setAsPromoCode(val) {
      this.showAdditionalInput = val == "Yes";

      if (val == "No") {
        this.input.promo_referral = "0";
        this.input.start_date = null;
        this.input.end_date = null;
        this.input.capacity = null;
      } else {
        this.input.in_used = 0;
        this.input.promo_referral = "1";
      }
    }
  },
  methods: {
    editReferralCode(id) {
      if (this.input.promo_referral == "1") {
        let validates = ["capacity", "start_date", "end_date"];
        for (let i = 0; i < validates.length; i++) {
          if (this.isNull(validates[i])) {
            return this.$notify({
              title: "Warning",
              type: "warning",
              message: `Please input ${validates[i]}`
            });
            break;
          }
        }
      }

      const endpoint = "/referral-code/" + id;
      const payload = {
        id_user: this.input.id_user,
        referral_code: this.input.referral_code,
        active: this.input.active ? "yes" : "no",
        promo_referral: this.input.promo_referral,
        start_date: this.input.start_date,
        end_date: this.input.end_date,
        capacity: this.input.capacity,
        in_used: this.input.in_used
      };

      this.$authHttp
        .put(endpoint, payload)
        .then(res => {
          this.fetchReferralCodeUsers();
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
        .catch(err => this.__handleError(this, err, false));
    },
    showEditReferralDialog(i) {
      this.dialogEditReferral = true;
      this.setAsPromoCode = "No";

      let refCode = this.referrals[i];

      if (refCode.promo_referral == "1") this.setAsPromoCode = "Yes";

      this.input = {
        ...refCode,
        id_user: refCode.user_id,
        active: refCode.status
      };
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
        .catch(err => this.__handleError(this, err, false));
    },
    showAddReferralDialog(i) {
      // Selalu ubah menjadi "No" untuk nilai "setAsPromoCode" ketika method ini dipanggil.
      this.setAsPromoCode = "No";

      // Ketika menampilkan dialog add referral, reset data input seperti dibawah:
      this.input = { promo_referral: "0" };

      // Tampilkan dialogAddReferral
      this.dialogAddReferral = true;
    },
    addNewReferral() {
      if (this.input.promo_referral == "1") {
        let validates = ["capacity", "start_date", "end_date"];
        for (let i = 0; i < validates.length; i++) {
          if (this.isNull(validates[i])) {
            return this.$notify({
              title: "Warning",
              type: "warning",
              message: `Please input ${validates[i]}`
            });
            break;
          }
        }
      }

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
          this.isLoadReferralTable = false;
        })
        .catch(err => this.__handleError(this, err, false));
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
        .catch(err => this.__handleError(this, err, false));
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

    /**
     * Mencari data referral berdasarken kode referral
     * @return {Array}
     */
    onSearchReferralCodes() {
      let searchValue = this.searchReferralValue;
      let endpoint = `/referral-codes?search=${searchValue}`;

      return this.$authHttp
        .get(endpoint)
        .then(res => {
          this.referrals = res.data.data.map(ref => ({
            ...ref,
            status: ref.is_active == "yes"
          }));
        })
        .catch(err => this.__handleError(this, err, false));
    },

    isNull(inputName) {
      switch (inputName) {
        case "capacity":
          return this.input.capacity == null;
          break;
        case "start_date":
          return this.input.start_date == null;
          break;
        case "end_date":
          return this.input.end_date == null;
          break;
        default:
          return true;
          break;
      }
    }
  },
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
  display: inline-block;
  margin-bottom: 0.5rem;
  text-align: left;
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
