<template>
  <div class="referral-code-user-table">
    <table class="uk-table uk-table-middle uk-table-hover">
      <thead>
        <tr>
          <th class="uk-table-expand">CODE</th>
          <th class="uk-width-large">ACTION</th>
          <th class="uk-table-shrink">STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(el, i) in referralCodes" :key="i">
          <td>{{ el.code || '-' }}</td>
          <td>
            <!-- Button Edit -->
            <el-button
              type="primary"
              size="small"
              @click="showEditReferralDialog(el.id)"
              :disabled="isDisabled(el.code)"
            >EDIT</el-button>

            <!-- Button Delete -->
            <el-button
              type="error"
              size="small"
              @click="deleteReferralCode"
              :disabled="isDisabled(el.code)"
            >DELETE</el-button>

            <!-- Dialog Delete referral code -->
            <el-dialog title="Shipping address" :visible.sync="dialogEditReferral">
              <!-- payload: id_user, referral_code, active[yes/no] -->

              <div class="form-group">
                <label for="user_id">USER ID</label>
                <el-input placeholder="Please input" v-model="el.user_id" disabled></el-input>
              </div>
              <div class="form-group">
                <label for="referral_code">REFERRAL CODE</label>
                <el-input placeholder="Please input" v-model="el.code"></el-input>
              </div>
              <div class="form-group">
                <label for="referral_code">ACTIVE STATUS</label>
                <el-switch v-model="el.isActive" active-text="YES" inactive-text="NO"></el-switch>
              </div>

              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogEditReferral = false">Cancel</el-button>
                <el-button type="primary" @click="editReferralCode(el.id)">Confirm</el-button>
              </span>
            </el-dialog>
          </td>
          <td>
            <el-switch
              v-model="el.isActive"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="isDisabled(el.code)"
              @change="changeReferralStatus"
            ></el-switch>
          </td>
        </tr>
      </tbody>
    </table>
    <el-button v-show="true" type="primary" @click="addNewReferral" size="small">Add New Referral</el-button>
  </div>
</template>

<script>
export default {
  name: "ReferralCodeUserTable",
  props: {
    referralCodes: {
      type: Array,
      default: () => [
        { code: "REF01", isActive: true },
        { code: "REF02", isActive: false }
      ]
    }
  },
  data() {
    return {
      dialogEditReferral: false,
      currentReferralData: {}
    };
  },
  methods: {
    showEditReferralDialog(id) {
      this.dialogEditReferral = true;
      const referralCodes = this.referralCodes;
      const currentData = referralCodes
        .filter(el => el.id == id)
        .map(el => {
          return {
            id_user: el.user_id,
            referral_code: el.code,
            active: el.isActive == true ? "yes" : "no"
          };
        });
      console.log(currentData);

      this.currentReferralData = currentData[0];
    },
    addNewReferral() {
      console.log("addNewReferral");
    },
    editReferralCode(id) {
      console.log("editReferralCode");
      const endpoint = "/referral-code/" + id;
      const payload = this.currentReferralData;

      return console.log({ endpoint, payload });

      this.dialogEditReferral = false;
      this.$authHttp
        .put(endpoint, payload)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err));
    },
    deleteReferralCode() {
      console.log("deleteReferralCode");
    },
    changeReferralStatus(val) {
      console.log("changeReferralStatus", val);
    },
    isDisabled(val) {
      return val == "-" || val == null || val == undefined ? true : false;
    }
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
