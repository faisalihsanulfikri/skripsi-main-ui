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
            <el-button
              type="primary"
              size="small"
              @click="editReferralCode"
              :disabled="isDisabled(el.code)"
            >EDIT</el-button>
            <el-button
              type="error"
              size="small"
              @click="deleteReferralCode"
              :disabled="isDisabled(el.code)"
            >DELETE</el-button>
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
  methods: {
    addNewReferral() {
      console.log("addNewReferral");
    },
    editReferralCode() {
      console.log("editReferralCode");
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
