<template>
  <section class="referral-codes">
    <div class="uk-card uk-card-default uk-card-small">
      <!-- Header -->
      <div class="uk-card-header app--card-header">
        <div uk-grid>
          <div class="uk-width-auto">
            <div class="app--card-header__icon">
              <font-awesome-icon icon="map"></font-awesome-icon>
            </div>
          </div>
          <div class="uk-width-expand">
            <div class="app--card-header_title">
              <h3>Referral Codes</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="uk-card-body">
        <table class="uk-table uk-table-middle uk-table-divider">
          <thead>
            <tr>
              <th class="uk-width-small">USER CODE</th>
              <th class="uk-width-small">NAME</th>
              <th class="uk-width-small">EXPIRED</th>
              <th>REFERRAL CODES</th>
            </tr>
          </thead>
          <tbody v-for="(item, i) in referralCodeUsers" :key="i">
            <tr>
              <td rowspan="2">{{ item.userCode }}</td>
              <td rowspan="2">{{ item.userName }}</td>
              <td rowspan="2">{{ item.expired }}</td>
              <td>
                <ReferralCodeUserTable
                  :referral-codes="item.referrals"
                  @fetchReferralCodeUsers="fetchReferralCodeUsers"
                />
              </td>
              <!-- <td>
                <el-button v-show="true" type="primary" @click="addNewReferral" size="small">Add</el-button>
              </td> !-->
            </tr>
            <tr>
              <td>
                <el-button
                  v-show="true"
                  type="primary"
                  @click="showAddReferralDialog(i)"
                  size="small"
                >Add New Referral</el-button>

                <!-- Dialog Add referral code -->
                <el-dialog title="Add Referral Code" :visible.sync="dialogAddReferral">
                  <!-- payload: id_user, referral_code, active[yes/no] -->

                  <div class="form-group">
                    <label for="user_id">USER ID</label>
                    <el-input placeholder="Please input" v-model="input.id_user" disabled></el-input>
                  </div>
                  <div class="form-group">
                    <label for="referral_code">REFERRAL CODE</label>
                    <el-input placeholder="Please input" v-model="input.referral_code"></el-input>
                  </div>
                  <div class="form-group">
                    <label for="referral_code">ACTIVE STATUS</label>
                    <el-switch v-model="input.active" active-text="YES" inactive-text="NO"></el-switch>
                  </div>

                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogAddReferral = false">Cancel</el-button>
                    <el-button type="primary" @click="addNewReferral(i)">Confirm</el-button>
                  </span>
                </el-dialog>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import ReferralCodeUserTable from "@/components/ReferralCodeUserTable";
export default {
  name: "ReferralCodes",
  components: { ReferralCodeUserTable },
  data() {
    return {
      value2: true,
      dialogAddReferral: false,
      referralCodeUsers: [],

      // Dummy
      referralData: [
        {
          userCode: "K004",
          userName: "Willy Nugraha",
          expired: "2019-12-21",
          referrals: [
            { code: "REF01", isActive: true },
            { code: "REF02", isActive: false },
            { code: "-", isActive: false }
          ]
        }
      ],

      input: {
        id_user: "",
        referral_code: "",
        active: false
      }
    };
  },
  methods: {
    showAddReferralDialog(i) {
      this.dialogAddReferral = true;

      let refCode = this.referralCodeUsers[i];

      this.input.id_user = refCode.userId;
    },
    addNewReferral(i) {
      const endpoint = "/referral-code/";

      let active = this.input.active ? "yes" : "no";
      this.input.active = active;

      let referral_code = this.input.referral_code;
      this.input.referral_code = referral_code.toUpperCase();

      const payload = this.input;

      this.dialogAddReferral = false;

      this.$authHttp
        .post(endpoint, payload)
        .then(res => {
          console.log(res.data);
          this.fetchReferralCodeUsers();
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
          const users = res.data.user;
          const refCodeUsers = res.data.referral_code;
          // console.log(refCodeUsers);

          const referralCodeUsers = users.map(el => {
            let referrals = refCodeUsers
              .filter(ref => ref.user_id == el.user_id)
              .map(el => {
                return {
                  id: el.id,
                  code: el.referral_code,
                  user_id: el.user_id,
                  isActive: el.is_active == "yes" ? true : false
                };
              });

            return {
              userId: el.user_id,
              userCode: el.code,
              userName: el.user_name,
              expired: el.expire_date,
              referrals
            };
          });

          this.referralCodeUsers = referralCodeUsers;
        })
        .catch(err => console.log(err));
    }
  },
  created() {
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
</style>
