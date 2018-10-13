<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="warehouse"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>Warehouses</h3>
          </div>
        </div>
        <div class="uk-width-auto">
          <div class="app--card-header__link">
            <router-link :to="{ name: 'admin-warehouse-create' }">
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
              <th></th>
              <th width="100">Code</th>
              <th>Name</th>
              <th class="uk-text-right">Price (USD)</th>
              <th class="uk-text-center" width="100">Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(warehouse, index) in warehouses">
              <tr :key="index">
                <td class="app--table-column__collapse-toggle" @click.prevent="collapseToggle(index)">
                  <a href="#">
                    <font-awesome-icon v-if="warehouse.collapse" icon="angle-right"></font-awesome-icon>
                    <font-awesome-icon v-else icon="angle-down"></font-awesome-icon>
                  </a>
                </td>
                <td>{{ warehouse.code }}</td>
                <td>{{ warehouse.name }}</td>
                <td class="uk-text-right">{{ warehouse.price }}</td>
                <td class="uk-text-center">
                  <router-link :to="{ name: 'admin-warehouse-edit', params: { id: warehouse.id } }">
                    <font-awesome-icon icon="edit"></font-awesome-icon>
                  </router-link>
                </td>
              </tr>
              <tr v-show="!warehouse.collapse" :key="`d${index}`">
                <td></td>
                <td colspan="4">
                  <div>
                    <div class="uk-margin-small">Address : {{ warehouse.address }}</div>
                    <div class="uk-margin-small">Zip Code : {{ warehouse.zipcode }}</div>
                  </div>
                </td>
              </tr>
            </template>
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
      warehouses: []
    }
  },
  methods: {
    fetchWareHouses () {
      this.$authHttp.get(`/v1/cfees`).then(res => {
        this.warehouses = res.data.map(warehouse => {
          warehouse['collapse'] = true

          return warehouse
        })
      })
    },
    collapseToggle(index) {
      this.warehouses[index].collapse = !this.warehouses[index].collapse
    }
  },
  created () {
    this.fetchWareHouses()
  }
}
</script>
