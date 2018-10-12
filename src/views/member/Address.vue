<template>
  <div>
    <div class="uk-card uk-card-default uk-card-small uk-card-body">
      <div uk-grid>
        <div class="uk-width-small@m">
          <ul class="uk-tab-left" uk-switcher="#user-tab" uk-tab>
            <li v-for="warehouse in warehouses" :key="warehouse.id" class="uk-width-1-4">
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
                  :customerId="user.custCode"
                  :customerFirstName="user.fullName"
                  customerLastName=""
                  :zipcode="warehouse.zipcode"/>
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
  methods: {
    fetchWareHouses () {
      this.$authHttp.get('/v1/cfees')
        .then(reponse => {
          this.warehouses = reponse.data
        })
        .catch(() => {
          //
        })
    }
  },
  created () {
    this.fetchWareHouses()
    this.user = this.$auth.getUser()
  }

}
</script>
