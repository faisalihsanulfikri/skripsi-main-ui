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
            <h3>Exchange Rates</h3>
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
              <th class="uk-text-right">Value</th>
              <th class="uk-text-center" width="100">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rate in rates" :key="rate.id">
              <td class="uk-text-right">{{ rate.id }}</td>
              <td>{{ rate.key }}</td>
              <td class="uk-text-right">{{ rate.value | currency('', 0, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
              <td class="uk-text-center">
                <router-link :to="{ name: 'admin-exchange-rate-edit', params: { id: rate.id } }">
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
  data () {
    return {
      rates: []
    }
  },
  methods: {
    fetchProvinces () {
      this.$authHttp.get('/v1/kurs').then(res => {
        this.rates = res.data
      })
    }
  },
  created () {
    this.fetchProvinces()
  }
}
</script>
