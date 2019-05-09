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
            <h3>Memberships</h3>
          </div>
        </div>
        <div class="uk-width-auto">
          <div class="app--card-header__link">
            <router-link :to="{ name: 'membership-create' }">
              <font-awesome-icon icon="plus"></font-awesome-icon>
            </router-link>
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
              <th>Price</th>
              <th class="uk-text-center" width="100">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="membership in memberships" :key="membership.id">
              <td>{{ membership.nama_paket }}</td>
              <td>{{ membership.harga_paket }}</td>
              <td class="uk-text-center">
                <router-link :to="{ name: 'membership-edit', params: { id: membership.id } }">
                  <font-awesome-icon icon="edit"></font-awesome-icon>
                </router-link>
                <a
                  class="uk-margin-small-left uk-text-danger"
                  href="#"
                  @click.prevent="deleteConfirmation(membership.id)"
                >
                  <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                </a>
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
      memberships: [],
    };
  },

  async created() {
    // const memberships = await this. __fetchMemberships()
    // const data = membserships.data.data
    // this.memberships = data
    // console.log(memberships.data.data)
    this.__startLoading();
    // const res = await this.$autHttp.get('/admin/memberships')
    // const memberships = await this.__fetchMemberships()
    // let res = await this.memberships.get
    // // console.log(memberships.data.data)
    // this.memberships =memberships.data.data
    this.fetchMemberships()
    this.__stopLoading();
  },
    methods: {
    fetchMemberships () {
    this.__startLoading();
      this.$authHttp.get('/admin/memberships').then(res => {
        this.memberships = res.data
    this.__stopLoading();
      })
    },
     deleteConfirmation(id) {
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
       async delete(id) {
      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.memberships.delete(id);

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.fetchMemberships();
      } catch (err) {
        this.__handleError(this, err, true);
      }
    },
  },
  async fetchMemberships() {
      try {
        let res = await this.$service.memberships.getMemberShipsData(
          this.$route.params,
        );

        this.Memberships = res.data.data;
      } catch (err) {
        this.__handleError(this, err, true);
      }
    }
};
</script>
