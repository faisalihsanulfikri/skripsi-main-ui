<template>
  <div>
    <div class="uk-grid uk-grid-small" uk-grid>
      <div class="uk-width-expand">
        <h3>Alamat</h3>
      </div>
      <div class="uk-width-auto">
        <button class="uk-button uk-button-primary" @click="createAddress">Tambah</button>
      </div>
    </div>
    <div class="uk-grid uk-grid-small uk-child-width-1-2" uk-grid uk-height-match="target: .uk-card-body">
      <div v-for="(address, index) in addresses" :key="address.id">
        <div class="uk-card uk-card-default uk-card-small">
          <div class="uk-card-body">
            <div>
              <h4>{{ address.alias }}</h4>
              <p>{{ `${address.province}, ${address.city}, ${address.sub_district}, ${address.address}, ${address.postal_code}` }}</p>
              <p>{{ `${address.name} - ${address.phone}` }}</p>
            </div>
          </div>
          <div class="uk-card-footer uk-text-right">
            <el-tooltip :content="address.primary ? 'Alamat Utama': 'Set Alamat Utama'" placement="top">
              <a :class="address.primary ? 'primary-address': 'non-primary-address'" href="#" @click.prevent="setPrimaryAddress(index)">
                <font-awesome-icon icon="star"/>
              </a>
            </el-tooltip>
            <el-tooltip content="Ubah" placement="top">
              <a class="uk-margin-left" href="#" @click.prevent="editAddress(index)">
                <font-awesome-icon icon="edit"/>
              </a>
            </el-tooltip>
            <el-tooltip content="Hapus" placement="top">
              <a class="uk-text-danger uk-margin-left" href="#" @click.prevent="showConfirmDelete(index)">
                <font-awesome-icon icon="trash-alt"/>
              </a>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <dialog-input-address
      :title="dialogInput.title"
      :visible.sync="dialogInput.visible"
      :edit="dialogInput.edit"
      :address="dialogInput.address"
      @close="onInputClose"/>
    <dialog-confirm-delete
      :visible.sync="dialogDelete.visible"
      @close="onConfirmDeleteClose"
      @confirm="onConfirmDelete"/>
  </div>
</template>

<script>
import DialogInputAddress from '../../components/DialogInputAddress'
import DialogConfirmDelete from '../../components/DialogConfirmDelete'

export default {
  components: {
    DialogInputAddress,
    DialogConfirmDelete
  },

  data () {
    return {
      dialogInput: {
        title: 'Tambah Alamat',
        visible: false,
        edit: false,
        address: {}
      },
      dialogDelete: {
        visible: false
      },
      addresses: [],
      selectedAddress: {}
    }
  },

  async created () {
    this.__startLoading()

    await this.fetchAddresses()

    this.__stopLoading()
  },

  methods: {
    async onInputClose () {
      this.dialogInput.title = 'Tambah Alamat'
      this.dialogInput.visible = false
      this.dialogInput.edit = false
      this.dialogInput.address = {}

      this.__startLoading()

      await this.fetchAddresses()

      this.__stopLoading()
    },
    showConfirmDelete (index) {
      this.selectedAddress = this.addresses[index]
      this.dialogDelete.visible = true
    },
    onConfirmDeleteClose () {
      this.selectedAddress = {}
      this.dialogDelete.visible = false
    },
    onConfirmDelete () {
      this.deleteAddress()

      this.selectedAddress = {}
      this.dialogDelete.visible = false
    },
    async fetchAddresses () {
      await this.__fetchUserAddresses().then(res => {
        this.addresses = res.data
      })
    },
    createAddress () {
      this.dialogInput.title = 'Tambah Alamat'
      this.dialogInput.visible = true
      this.dialogInput.edit = false
      this.dialogInput.address = {}
    },
    editAddress (index) {
      this.dialogInput.title = 'Ubah Alamat'
      this.dialogInput.visible = true
      this.dialogInput.edit = true
      this.dialogInput.address = this.addresses[index]
    },
    async deleteAddress () {
      this.__startLoading()

      await this.$authHttp.delete(`/user/addresses/${this.selectedAddress.id}`).then(res => {
        this.fetchAddresses()

        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })
      }).catch(err => {
        if (err.response) {
          this.$notify({
            title: 'ERROR',
            message: err.response.data.message,
            type: 'error'
          })
        }
      })

      this.__stopLoading()
    },
    async setPrimaryAddress (index) {
      let address = this.addresses[index]

      if (address.primary) return

      this.__startLoading()

      await this.$authHttp.put(`/user/addresses/${address.id}/primary`).then(res => {
        this.fetchAddresses()

        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })
      }).catch(err => {
        if (err.response) {
          this.$notify({
            title: 'ERROR',
            message: err.response.data.message,
            type: 'error'
          })
        }
      })

      this.__stopLoading()
    }
  }
}
</script>

<style lang="scss" scoped>
.uk-card-default {
  background-color: #ECEFF1;
  box-shadow: none;
}

.primary-address {
  color: #FFC107;
}

.non-primary-address {
  color: #B0BEC5;
}
</style>
