<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <router-link :to="{ name: 'member-order' }">
              <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </router-link>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>{{ order.code }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body">
      <table class="uk-table uk-table-small uk-text-small">
        <tbody>
          <tr v-for="history in order.histories" :key="history.id">
            <td width="200">{{ history.type.toUpperCase() }}</td>
            <td>{{ history.description }}</td>
            <td class="uk-text-center" width="100">{{ new Date(history.date).toLocaleDateString('id-ID') }}</td>
            <td class="uk-text-center" width="100">{{ history.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: {}
    }
  },

  created () {
    this.getOrderHistories()
  },

  methods: {
    getOrderHistories () {
      this.__startLoading()

      this.$authHttp.get(`/orders/${this.$route.params.code}/histories`).then(res => {
        this.order = res.data

        this.__stopLoading()
      }).catch(err => {
        if (err.response) {
          let message = err.response.data.message ? err.response.data.message : err.response.statusText

          this.$notify({
            title: 'ERROR',
            message: message,
            type: 'error'
          })

          this.$router.push({ name: 'member-order' })
        }
      })

      this.__stopLoading()
    }
  }
}
</script>
