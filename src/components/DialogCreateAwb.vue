<template>
  <el-dialog
    width="75%"
    :title="`Create AWB - ${order.code}`"
    :visible="visible"
    @open="onDialogOpen"
    @close="onDialogClose">
    <div>
      <div class="uk-child-width-1-2" uk-grid>
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
        <div>
          <div class="uk-margin">
            <label class="uk-form-label">Packet Price</label>
            <el-input v-model="input.packet.price"></el-input>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">
              Packet Weight
              <template v-if="order.detail">({{ order.detail.formula.weight_unit }})</template>
            </label>
            <el-input v-model="input.packet.weight"></el-input>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">
              Packet Length
              <template v-if="order.detail">({{ order.detail.formula.volume_unit }})</template>
            </label>
            <el-input v-model="input.packet.length"></el-input>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">
              Packet Width
              <template v-if="order.detail">({{ order.detail.formula.volume_unit }})</template>
            </label>
            <el-input v-model="input.packet.width"></el-input>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">
              Packet Height
              <template v-if="order.detail">({{ order.detail.formula.volume_unit }})</template>
            </label>
            <el-input v-model="input.packet.height"></el-input>
          </div>
        </div>
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
        zipCode: '',
        packet: {
          price: '',
          weight: '',
          length: '',
          width: '',
          height: ''
        }
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

      this.input.packet.price = this.order.detail.metaInfo.price
      this.input.packet.weight = this.order.detail.metaInfo.weight
      this.input.packet.length = this.order.detail.metaInfo.length
      this.input.packet.width = this.order.detail.metaInfo.width
      this.input.packet.height = this.order.detail.metaInfo.height
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
      data['items'] = this.order.item_groups.flat()
        .filter(item => item.selected)
        .map(item => {
          return item.id
        })

      try {
        let res = await this.$service.createAwb(data)

        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.input = this.$options.data().input

        this.$emit('done', res)
      } catch (err) {
        this.__handleError(this, err, true)
      }

      this.__stopLoading()
    }
  }
}
</script>
