<template>
  <div>
    <div class="uk-card uk-card-default uk-card-small uk-card-body">
      <div uk-grid>
        <div class="uk-width-medium@m">
          <ul class="uk-tab-left" uk-switcher="#user-tab" uk-tab>
            <li v-for="warehouse in warehouses" :key="warehouse.id">
              <a href="">{{ warehouse.name }}</a>
            </li>
          </ul>
        </div>
        <div class="uk-width-expand">
          <ul id="user-tab" class="uk-switcher">
            <li v-for="warehouse in warehouses" :key="warehouse.id" class="uk-width-expand">
                <address-box
                  :title="warehouse.name"
                  :price="`$${warehouse.price}`"
                  meta-price="Per Kilogram"
                  :address="warehouse.address"
                  :customer-code="user.code"
                  :customer-name="user.name"
                  :zipcode="warehouse.zip_code" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddressBox from '../../components/AddressBox'

export default {
  components: {
    AddressBox
  },
  data () {
    return {
      warehouses: []
    }
  },
  async created () {
    this.fetchWarehouses()
    this.user = await this.$auth.getUser()
  },
  methods: {
    async fetchWarehouses () {
      this.__startLoading()

      try {
        let res = await this.$service.getAllWarehouses()

        this.warehouses = res.data
      } catch (err) {
        this.__handleError(this, err, true)
      }

      this.__stopLoading()
    }
  }
}
</script>
