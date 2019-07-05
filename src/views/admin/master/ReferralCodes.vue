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
            <tr v-for="(item, i) in referralCodeUsers" :key="i">
              <td>{{ item.userCode }}</td>
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
      ]
    };
  },
  methods: {
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
                  isActive: el.is_active
                };
              });

            return {
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

<style>
</style>
