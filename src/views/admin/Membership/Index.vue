<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="tags"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>Level</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body uk-card-small">
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small">
          <thead>
            <tr>
              <th>Name</th>
              <th>Base Price</th>
              <th>Base Factor</th>
              <th>Membership Days</th>
              <th class="uk-text-center" width="100">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="membership in memberships" :key="membership.id">
              <td>{{ membership.name }}</td>
              <td>{{ membership.base_price }}</td>
              <td>{{ membership.base_factor }}</td>
              <td>{{ membership.membership_days }}</td>
              <td class="uk-text-center">
                <router-link :to="{ name: 'membership-edit', params: { id: membership.id } }">
                  <font-awesome-icon icon="edit"></font-awesome-icon>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      memberships: []
    };
  },

  async created() {
    this.__startLoading();

    this.fetchMemberships();

    this.__stopLoading();
  },
  methods: {
    fetchMemberships() {
      this.__startLoading();
      this.$authHttp.get("/admin/memberships").then(res => {
        this.memberships = res.data;
        this.__stopLoading();
      });
    }
  },
  async fetchMemberships() {
    try {
      let res = await this.$service.memberships.getMemberShipsData(
        this.$route.params
      );

      this.Memberships = res.data.data;
    } catch (err) {
      this.__handleError(this, err, true);
    }
  }
};
</script>
