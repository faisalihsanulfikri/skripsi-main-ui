<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <router-link :to="{ name: 'admin-area' }">
              <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </router-link>
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
            <tr v-for="city in cities" :key="city.city_id">
              <td class="uk-text-right">{{ city.id }}</td>
              <td>{{ city.city_name + ' ' + city.postal_code }}</td>
              <td>
                <router-link :to="{ name: 'admin-area-province-city-district', params: { provinceId: city.provinceId, cityId: city.id } }">
                  <span v-if="city.type === 'Kabupaten'">Kab. </span>{{ city.city_name }}
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
      this.$authHttp.get(`/provinces/${this.$route.params.provinceId}/cities`).then(res => {
        this.cities = res.data
      })
    },
    getProvince () {
      this.$authHttp.get(`/provinces/${this.$route.params.provinceId}`).then(res => {
        this.province = res.data
      })
    }
  },
  created () {
    this.fetchCities()
    this.getProvince()
  }
}
</script>
