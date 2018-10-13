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
            <h3>Provinces</h3>
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
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="province in provinces" :key="province.id">
              <td class="uk-text-right">{{ province.id }}</td>
              <td>
                <router-link :to="{ name: 'admin-area-province-city', params: { provinceId: province.id } }">
                  {{ province.name }}
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
      provinces: []
    }
  },
  methods: {
    fetchProvinces () {
      this.$authHttp.get('/v1/calculator/province').then(res => {
        this.provinces = res.data.data
      })
    }
  },
  created () {
    this.fetchProvinces()
  }
}
</script>
