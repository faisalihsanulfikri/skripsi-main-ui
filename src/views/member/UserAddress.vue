<template>
  <div>
    <div class="uk-grid uk-grid-small" uk-grid>
      <div class="uk-width-expand">
        <h3>Alamat</h3>
      </div>
      <div class="uk-width-auto">
        <button class="uk-button uk-button-primary" @click="showDialog(dialogAddressCreate.id)">Tambah</button>
      </div>
    </div>
    <div class="uk-grid uk-grid-small uk-grid-match uk-child-width-1-2" uk-grid>
      <div v-for="address in addresses" :key="address.id">
        <div class="uk-card uk-card-default uk-card-small">
          <div class="uk-card-body">
            <h4>{{ address.alias }}</h4>
            <p>{{ `${address.province}, ${address.kabupaten}, ${address.alamat1}, ${address.alamat2}` }}</p>
          </div>
          <div class="uk-card-footer uk-text-right">
            <a href="#" @click="edit">EDIT</a>
          </div>
        </div>
      </div>
    </div>
    <dialog-address-create :id="dialogAddressCreate.id" @on-finish="onFinishCreateAddress"/>
  </div>
</template>

<script>
import DialogAddressCreate from '../../components/DialogAddressCreate'

export default {
  components: {
    DialogAddressCreate
  },
  data () {
    return {
      dialogAddressCreate: {
        id: 'dialog-address-create'
      },
      addresses: []
    }
  },
  methods: {
    fetchAddresses () {
      this.$authHttp.get(`/v1/address`)
        .then(reponse => {
          this.addresses = reponse.data.data
        })
        .catch(() => {
          //
        })
    },
    showDialog (id) {
      this.UIkit.modal(`#${id}`).show()
    },
    onFinishCreateAddress (id) {
      this.fetchAddresses()

      this.UIkit.modal(`#${id}`).hide()
    }
  },
  created () {
    this.fetchAddresses()
  }
}
</script>

<style lang="scss" scoped>
.uk-card-default {
  background-color: #ECEFF1;
  box-shadow: none;

  .uk-card-body {
    min-height: calc(100% - 51px);
  }
}
</style>
