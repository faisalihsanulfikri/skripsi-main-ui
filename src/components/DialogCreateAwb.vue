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
          <!-- <div class="uk-margin">
            <label class="uk-form-label">Saved Addresses</label>
            <el-select v-model="input.savedAddress" class="uk-width-1-1" @change="onSavedAddressChange">
              <el-option
                v-for="(address, index) in master.addresses"
                :key="index"
                :label="address.alias"
                :value="address.id">
              </el-option>
            </el-select>
          </div> -->
          <h4>Shipper Data</h4>
          <hr>
                <table class="uk-table uk-table-small uk-table-responsive uk-table-divider uk-table-hover uk-text-emphasis">
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>:</td>
                      <td class="uk-text-right" width="150">
                        {{ this.input.name }}
                      </td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>:</td>
                      <td class="uk-text-right">
                        {{ this.input.phone }}
                      </td>
                    </tr>
                    <tr>
                      <td>Province</td>
                      <td>:</td>
                      <td class="uk-text-right">
                        {{ this.input.province }}
                      </td>
                    </tr>
                    <tr>
                      <td>City</td>
                      <td>:</td>
                      <td class="uk-text-right">
                        {{ this.input.city }}
                      </td>
                    </tr>
                    <tr>
                      <td>Sub District</td>
                      <td>:</td>
                      <td class="uk-text-right">
                        {{ this.input.subDistrict }}
                      </td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>:</td>
                      <td class="uk-text-right">
                        {{ this.input.address }}
                      </td>
                    </tr>
                    <tr>
                      <td>Zip Code</td>
                      <td>:</td>
                      <td class="uk-text-right">
                        {{ this.input.zipCode }}
                      </td>
                    </tr>
                  </tbody>
                </table>
        </div>
        <div>
          <div class="uk-margin">
            <label class="uk-form-label">Packet Price</label>
            <el-input-mask
              v-model="input.packet.price"
              :options="markOptions.numeral"
              :error="errors.has('price')"
              @input="val => input.packet.price = val"
              @blur="val => input.packet.price = val">
              <input
                slot="input"
                v-model="input.packet.price"
                v-validate="rules.price"
                name="price"
                type="hidden">
            </el-input-mask>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">
              Packet Weight
              <template v-if="order.detail">({{ order.detail.formula.weight_unit }})</template>
            </label>
            <el-input-mask
              v-model="input.packet.weight"
              :options="markOptions.numeral"
              :error="errors.has('weight')"
              @input="val => input.packet.weight = val"
              @blur="val => input.packet.weight = val">
              <input
                slot="input"
                v-model="input.packet.weight"
                v-validate="rules.weight"
                name="weight"
                type="hidden">
            </el-input-mask>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">
              Packet Length
              <template v-if="order.detail">({{ order.detail.formula.volume_unit }})</template>
            </label>
            <el-input-mask
              v-model="input.packet.length"
              :options="markOptions.numeral"
              :error="errors.has('length')"
              @input="val => input.packet.length = val"
              @blur="val => input.packet.length = val">
              <input
                slot="input"
                v-model="input.packet.length"
                v-validate="rules.length"
                name="length"
                type="hidden">
            </el-input-mask>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">
              Packet Width
              <template v-if="order.detail">({{ order.detail.formula.volume_unit }})</template>
            </label>
            <el-input-mask
              v-model="input.packet.width"
              :options="markOptions.numeral"
              :error="errors.has('width')"
              @input="val => input.packet.width = val"
              @blur="val => input.packet.width = val">
              <input
                slot="input"
                v-model="input.packet.width"
                v-validate="rules.width"
                name="width"
                type="hidden">
            </el-input-mask>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label">
              Packet Height
              <template v-if="order.detail">({{ order.detail.formula.volume_unit }})</template>
            </label>
            <el-input-mask
              v-model="input.packet.height"
              :options="markOptions.numeral"
              :error="errors.has('height')"
              @input="val => input.packet.height = val"
              @blur="val => input.packet.height = val">
              <input
                slot="input"
                v-model="input.packet.height"
                v-validate="rules.height"
                name="height"
                type="hidden">
            </el-input-mask>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <el-button
        type="primary"
        :disabled="$store.state.app.loading"
        @click="createAwb">
        CREATE AWB
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import ElInputMask from './ElInputMask'

export default {
  components: {
    ElInputMask
  },

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
      rules: {
        price: 'required|decimal:2',
        weight: 'required|decimal:2',
        length: 'required|decimal:2',
        width: 'required|decimal:2',
        height: 'required|decimal:2'
      },
      markOptions: {
        numeral: {
          numeral: true,
          numertalThousandGroupStyle: 'thousand',
          numeralDecimalMark: ',',
          delimiter: '.'
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

      this.input.savedAddress = this.master.addresses[0].id

      this.onSavedAddressChange()
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
      if (!(await this.$validator.validate())) return

      this.__startLoading()

      this.error = false
      this.errorMessage = ''
      this.validationErrors = {}

      this.input.packet.price = this.__roundHalf(this.input.packet.price)
      this.input.packet.weight = this.__roundHalf(this.input.packet.weight)
      this.input.packet.length = this.__roundHalf(this.input.packet.length)
      this.input.packet.width = this.__roundHalf(this.input.packet.width)
      this.input.packet.height = this.__roundHalf(this.input.packet.height)

      let data = Object.assign({}, this.input)

      data['orderCode'] = this.order.code
      data['items'] = this.order.item_groups.flat()
        .filter(item => item.selected)
        .map(item => {
          return item.id
        })

      try {
        let res = await this.$service.awb.create(data)

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
