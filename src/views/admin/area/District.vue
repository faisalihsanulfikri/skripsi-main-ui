<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <router-link :to="{ name: 'admin-area-province-city', params: { provinceId: $route.params.provinceId } }">
              <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </router-link>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>Districts of {{ city.city }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body">
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small">
          <thead>
            <tr>
              <th width="150">Code</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="district in districts" :key="district.id">
              <td>{{ district.code }}</td>
              <td>{{ district.kecamatan }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      districts: [],
      city: {}
    }
  },
  methods: {
    fetchDistricts () {
      this.$authHttp.get(`/cities/${this.$route.params.cityId}/sub-districts`).then(res => {
        this.districts = res.data.data
      })
    },
    getCity () {
      this.$authHttp.get(`/cities/${this.$route.params.cityId}`).then(res => {
        this.city = res.data.data
      })
    }
  },
  created () {
    this.fetchDistricts()
    this.getCity()
  }
}
</script>
