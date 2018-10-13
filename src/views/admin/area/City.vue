<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="map"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>Cities of {{ province.name }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body">
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small">
          <thead>
            <tr>
              <th class="uk-text-right" width="50">Id</th>
              <th width="150">Code</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="city in cities" :key="city.id">
              <td class="uk-text-right">{{ city.id }}</td>
              <td>{{ city.code }}</td>
              <td>
                <router-link :to="{ name: 'admin-area-province-city-district', params: { provinceId: city.provinceId, cityId: city.id } }">
                  <span v-if="city.type === 'Kabupaten'">Kab. </span>{{ city.city }}
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
  data () {
    return {
      cities: [],
      province: {}
    }
  },
  methods: {
    fetchCities () {
      this.$authHttp.get(`/v1/calculator/city/${this.$route.params.provinceId}/province`).then(res => {
        this.cities = res.data.data
      })
    },
    getProvince () {
      this.$authHttp.get(`/v1/calculator/province/${this.$route.params.provinceId}`).then(res => {
        this.province = res.data.data
      })
    }
  },
  created () {
    this.fetchCities()
    this.getProvince()
  }
}
</script>
