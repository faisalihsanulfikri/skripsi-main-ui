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
              @click="showEditReferralDialog(i)"
              :disabled="isDisabled(el.code)"
            >EDIT</el-button>

            <!-- Button Delete -->
            <el-button
              type="error"
              size="small"
              @click="deleteReferralCode(el.id)"
              :disabled="isDisabled(el.code)"
            >DELETE</el-button>

            <!-- Dialog Edit referral code -->
            <el-dialog title="Edit Referral Code" :visible.sync="dialogEditReferral">
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
              @change="changeReferralStatus(i,el.id)"
            ></el-switch>
          </td>
        </tr>
      </tbody>
    </table>
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
      input: {
        id_code: "",
        id_user: "",
        referral_code: "",
        active: ""
      }
    };
  },
  methods: {
    showEditReferralDialog(i) {
      this.dialogEditReferral = true;

      let refCode = this.referralCodes[i];

      this.input.id_code = refCode.id;
      this.input.id_user = refCode.user_id;
      this.input.referral_code = refCode.code;
      this.input.active = refCode.isActive;

      console.log(this.input);
    },
    editReferralCode(id) {
      const endpoint = "/referral-code/" + id;

      let active = this.input.active ? "yes" : "no";
      this.input.active = active;

      let referral_code = this.input.referral_code;
      this.input.referral_code = referral_code.toUpperCase();

      const payload = this.input;

      this.dialogEditReferral = false;

      this.$authHttp
        .put(endpoint, payload)
        .then(res => {
          this.$emit("fetchReferralCodeUsers");
          this.$notify({
            title: "SUCCESS",
            message: res.data.message,
            type: "success"
          });
        })
        .catch(err => {
          this.$notify({
            title: "WARNING",
            message: err.response.data.message,
            type: "warning"
          });
        });
    },
    deleteReferralCode(id) {
      this.$confirm("Are you sure to delete this?", "Waning", {
        type: "warning",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      })
        .then(() => {
          this.delete(id);
        })
        .catch(() => {});
    },
    delete(id) {
      const endpoint = `/referral-code/${id}`;
      return this.$authHttp
        .delete(endpoint)
        .then(res => {
          this.$emit("fetchReferralCodeUsers");
          this.$notify({
            title: "SUCCESS",
            message: res.data.message,
            type: "success"
          });
        })
        .catch(err => console.log(err));
    },
    changeReferralStatus(i, id) {
      let isActive = this.referralCodes[i].isActive;
      console.log("val", isActive);
      console.log("id", id);

      let status = isActive == true ? "yes" : "no";
      const payload = {
        active: status
      };
      console.log("status", status);
      const endpoint = `/referral-code/status/${id}`;
      return this.$authHttp
        .put(endpoint, payload)
        .then(res => {
          this.$emit("fetchReferralCodeUsers");
          this.$notify({
            title: "SUCCESS",
            message: res.data.message,
            type: "success"
          });
        })
        .catch(err => console.log(err));
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
