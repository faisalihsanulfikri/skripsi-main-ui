<template>
  <el-dialog
    :title="`Create AWB - ${order.code}`"
    :visible="visible"
    @open="onDialogOpen"
    @close="onDialogClose">
    <div>
      <div class="uk-margin">
        <label class="uk-form-label">Saved Addresses</label>
        <el-select v-model="input.savedAddress" class="uk-width-1-1" @change="onSavedAddressChange">
          <el-option
            v-for="(address, index) in master.addresses"
            :key="index"
            :label="address.alias"
            :value="address.id">
          </el-option>
        </el-select>
      </div>
      <hr>
      <h5>Shipper Data</h5>
      <div class="uk-margin">
        <label class="uk-form-label">Name</label>
        <el-input v-model="input.name"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Phone</label>
        <el-input v-model="input.phone"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Province</label>
        <el-input v-model="input.province"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">City</label>
        <el-input v-model="input.city"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Sub District</label>
        <el-input v-model="input.subDistrict"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Address</label>
        <el-input v-model="input.address"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Zip Code</label>
        <el-input v-model="input.zipCode"></el-input>
      </div>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="createAwb">CREATE AWB</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      required: true,
      default: false
    },
    order: {
      required: true,
      default: {}
    }
  },

  data () {
    return {
      input: {
        savedAddress: '',
        code: '',
        name: '',
        phone: '',
        country: '',
        province: '',
        city: '',
        subDistrict: '',
        address: '',
        zipCode: ''
      },
      master: {
        addresses: []
      },
      error: false,
      errorMessage: '',
      validationErrors: {}
    }
  },

  methods: {
    async onDialogOpen () {
      await this.fetchAddress()
    },
    onDialogClose () {
      this.input = this.$options.data().input

      this.$emit('close')
    },
    onSavedAddressChange () {
      let address = this.master.addresses.find(item => item.id === this.input.savedAddress)

      this.input.code = address.code
      this.input.name = address.name
      this.input.phone = address.phone
      this.input.country = address.country
      this.input.province = address.province
      this.input.city = address.city
      this.input.subDistrict = address.sub_district
      this.input.address = address.address
      this.input.zipCode = address.zip_code
    },
    async fetchAddress () {
      await this.__fetchAgentAddresses().then(res => {
        this.master.addresses = res.data
      }).catch(() => {})
    },
    async createAwb () {
      this.__startLoading()

      this.error = false
      this.errorMessage = ''
      this.validationErrors = {}

      let data = Object.assign({}, this.input)

      data['orderCode'] = this.order.code
      data['items'] = this.order.items.filter(item => item.selected)
        .map(item => {
          return item.id
        })

      await this.$authHttp.post('/awb', data).then(res => {
        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.input = this.$options.data().input

        this.$emit('done', res)
      }).catch(err => {
        if (err.response) {
          this.error = true
          this.errorMessage = err.response.data.message ? err.response.data.message : err.response.statusText

          this.$validator.errors.clear()

          this.$notify({
            title: 'ERROR',
            message: this.errorMessage,
            type: 'error'
          })

          if (err.response.data.errorValidation) {
            this.validationErrors = err.response.data.errors

            Object.keys(this.validationErrors).forEach(key => {
              this.$validator.errors.add({
                field: key,
                msg: this.validationErrors[key][0]
              })
            })
          }
        }
      })

      this.__stopLoading()
    }
  }
}
</script>
