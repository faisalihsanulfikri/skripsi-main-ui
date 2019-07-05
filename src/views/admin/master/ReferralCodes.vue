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
          <tbody>
            <tr v-for="(item, i) in referralData" :key="i">
              <td>{{ item.userId }}</td>
              <td>{{ item.userName }}</td>
              <td>{{ item.expired }}</td>
              <td>
                <ReferralCodeUserTable :referral-codes="item.referrals" />
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
      referralData: [
        {
          userId: "K004",
          userName: "Willy Nugraha",
          expired: "2019-12-21",
          referrals: [
            { code: "REF01", isActive: true },
            { code: "REF02", isActive: false },
            { code: "-", isActive: false }
          ]
        }
      ]
    };
  },
  methods: {
    // editReferralCode() {
    //   console.log("editReferralCode");
    // },
    // deleteReferralCode() {
    //   console.log("deleteReferralCode");
    // },
    // changeReferralStatus(val) {
    //   console.log("changeReferralStatus", val);
    // }
  }
};
</script>

<style>
</style>
