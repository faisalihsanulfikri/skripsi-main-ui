<template>
  <div>
    <div class="uk-card uk-card-default uk-card-small">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Kalkulator</h3>
      </div>
      <div class="uk-card-body">
        <div class="uk-grid" uk-grid>
          <div class="uk-width-1-2">
            <div class="uk-margin">
              <label class="uk-form-label">Gudang Kirimin</label>
              <select v-model="input.warehouse" class="uk-select">
                <option
                  v-for="item in options.warehouse"
                  :key="item.value"
                  :value="item.value">
                    {{ item.label }}
                  </option>
              </select>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Provinsi</label>
              <select v-model="input.provinceId" class="uk-select" @change="fetchCities">
                <option
                  v-for="item in options.province"
                  :key="item.value"
                  :value="item.value">
                    {{ item.label }}
                  </option>
              </select>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Kabupaten / Kota / Desa</label>
              <select v-model="input.cityId" class="uk-select" @change="fetchDistricts">
                <option
                  v-for="item in options.city"
                  :key="item.value"
                  :value="item.value">
                    {{ item.label }}
                  </option>
              </select>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Kecamatan</label>
              <select v-model="input.destination" class="uk-select">
                <option
                  v-for="item in options.subDistrict"
                  :key="item.value"
                  :value="item.value">
                    {{ item.label }}
                  </option>
              </select>
            </div>
            <div class="uk-margin uk-hidden">
              <label class="uk-form-label">Kurir</label>
              <select v-model="input.courier" class="uk-select">
                <option
                  v-for="item in options.courier"
                  :key="item.value"
                  :value="item.value">
                    {{ item.label }}
                  </option>
              </select>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Asuransi ?</label>
              <select v-model="input.insurance" class="uk-select">
                  <option value="1">Ya</option>
                  <option value="0">Tidak</option>
              </select>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Pakai NPWP ?</label>
              <select v-model="input.npwp" class="uk-select">
                  <option value="1">Ya</option>
                  <option value="0">Tidak</option>
              </select>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Berat ({{ config.weightUnits }})</label>
              <el-input-mask
                v-model="input.items[0].weight"
                :options="markOptions.numeral"
                :error="errors.has('weight')"
                @input="val => input.items[0].weight = val"
                @blur="val => input.items[0].weight = val">
                <input
                  slot="input"
                  v-model="input.items[0].weight"
                  v-validate="rules.item.weight"
                  name="weight"
                  type="hidden">
              </el-input-mask>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Dimensi (P x L x T {{ config.volumeUnits }})</label>
              <div class="uk-grid-small" uk-grid>
                <div class="uk-width-1-3">
                  <el-input-mask
                    v-model="input.items[0].length"
                    :options="markOptions.numeral"
                    :error="errors.has('length')"
                    @input="val => input.items[0].length = val"
                    @blur="val => input.items[0].length = val">
                    <input
                      slot="input"
                      v-model="input.items[0].length"
                      v-validate="rules.item.length"
                      name="length"
                      type="hidden">
                  </el-input-mask>
                </div>
                <div class="uk-width-1-3">
                    <el-input-mask
                      v-model="input.items[0].width"
                      :options="markOptions.numeral"
                      :error="errors.has('width')"
                      @input="val => input.items[0].width = val"
                      @blur="val => input.items[0].width = val">
                      <input
                        slot="input"
                        v-model="input.items[0].width"
                        v-validate="rules.item.width"
                        name="width"
                        type="hidden">
                    </el-input-mask>
                </div>
                <div class="uk-width-1-3">
                  <el-input-mask
                    v-model="input.items[0].height"
                    :options="markOptions.numeral"
                    :error="errors.has('height')"
                    @input="val => input.items[0].height = val"
                    @blur="val => input.items[0].height = val">
                    <input
                      slot="input"
                      v-model="input.items[0].height"
                      v-validate="rules.item.height"
                      name="height"
                      type="hidden">
                  </el-input-mask>
                </div>
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Harga Barang</label>
              <el-input-mask
                v-model="input.items[0].price"
                :options="markOptions.numeral"
                :error="errors.has('price')"
                @input="val => input.items[0].price = val"
                @blur="val => input.items[0].price = val">
                <input
                  slot="input"
                  v-model="input.items[0].price"
                  v-validate="rules.item.price"
                  name="price"
                  type="hidden">
              </el-input-mask>
            </div>
            <div class="uk-margin uk-hidden">
              <label class="uk-form-label">Jumlah Barang</label>
              <input v-model="input.items[0].quantity" type="text" class="uk-input" />
            </div>
            <div class="uk-margin">
              <el-alert
                v-if="error"
                :title="errorMessage"
                type="error"
                show-icon>
              </el-alert>
            </div>
            <div class="uk-margin uk-text-right">
              <button class="uk-button uk-button-primary uk-width-1-1" type="button" @click="check">Hitung</button>
            </div>
          </div>
          <div class="uk-width-1-2">
            <div class="uk-card uk-card-default uk-card-small">
              <div class="uk-card-header">
                <h4 class="uk-card-title">Perkiraan Biaya Pengiriman</h4>
              </div>
              <div class="uk-card-body">
                <calculator-result :cost="cost" @npwp-change="onNpwpChanged"></calculator-result>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CalculatorResult from '../../components/CalculatorResult'
import ElInputMask from '../../components/ElInputMask'

export default {
  components: {
    CalculatorResult,
    ElInputMask
  },
  data () {
    return {
      config: {
        originCity: 151,
        weightUnits: 'kg',
        volumeUnits: 'cm'
      },
      input: {
        warehouse: '',
        destination: '',
        npwp: 0,
        insurance: 0,
        consolidate: 0,
        items: [
          {
            name: '-',
            price: '',
            quantity: 1,
            weight: '',
            length: '',
            width: '',
            height: ''
          }
        ],
        provinceId: '',
        province: '',
        cityId: '',
        city: '',
        subDistrict: ''
      },
      rules: {
        warehouse: 'required',
        destination: 'required',
        item: {
          price: 'required|numeric',
          weight: 'required|decimal:2',
          length: 'required|decimal:2',
          width: 'required|decimal:2',
          height: 'required|decimal:2'
        }
      },
      markOptions: {
        numeral: {
          numeral: true,
          numertalThousandGroupStyle: 'thousand',
          numeralDecimalMark: ',',
          delimiter: '.'
        }
      },
      options: {
        warehouse: [],
        province: [],
        city: [],
        subDistrict: [],
        courier: [
          {
            value: 'jne',
            label: 'JNE'
          }
        ]
      },
      cost: {
        beaMasuk: 0,
        domesticCost: 0,
        estimatedCost: 0,
        estimatedShippingCost: 0,
        estimatedShippingCostFinal: 0,
        insurance: 0,
        internationalCost: 0,
        itemPrice: 0,
        npwp: 0,
        pph: 0,
        ppn: 0,
        packagingCost: 0
      },
      error: false,
      errorMessage: '',
      validatorErrors: {}
    }
  },
  async created () {
    await this.fetchWarehouses()
    await this.fetchProvinces()
    await this.fetchCities()
    await this.fetchDistricts()
  },
  methods: {
    onNpwpChanged (val) {
      this.input.npwp = val ? 1 : 0

      this.check()
    },
    async fetchWarehouses () {
      this.__startLoading()

      await this.__fetchWarehouses().then(res => {
        this.warehouses = res.data
        this.input.warehouse = res.data[1].code

        this.options.warehouse = res.data.map(item => {
          let $item = {
            value: item.code,
            label: item.name
          }

          return $item
        })
      })

      this.__stopLoading()
    },
    async fetchProvinces () {
      this.__startLoading()

      await this.__fetchProvinces().then(res => {
        this.provinces = res.data
        this.input.provinceId = res.data[0].province_id
        this.input.province = res.data[0].province

        this.options.province = res.data.map(item => {
          let $item = {
            value: parseInt(item.province_id),
            label: item.province
          }

          return $item
        })
      })

      this.__stopLoading()
    },
    async fetchCities () {
      this.__startLoading()

      await this.__fetchCitiesByProvince(this.input.provinceId).then(res => {
        this.cities = res.data
        this.input.cityId = res.data[0].city_id
        this.input.city = (res.data[0].type === 'Kabupaten') ? `Kab. ${res.data[0].city_name}` : res.data[0].city_name

        this.options.city = res.data.map(item => {
          let $item = {
            value: parseInt(item.city_id),
            label: (item.type === 'Kabupaten') ? `Kab. ${item.city_name}` : item.city_name
          }

          return $item
        })
      })

      this.__stopLoading()
    },
    async fetchDistricts () {
      this.__startLoading()

      await this.__fetchDistrictsByCity(this.input.cityId).then(res => {
        this.subDistricts = res.data
        this.input.destination = String(res.data[0].subdistrict_id)
        this.input.subDistrict = res.data[0].subdistrict_name

        this.options.subDistrict = res.data.map(item => {
          let $item = {
            value: String(item.subdistrict_id),
            label: item.subdistrict_name
          }

          return $item
        })
      })

      this.__stopLoading()
    },
    async check () {
      if (!(await this.$validator.validate())) return

      this.__startLoading()

      this.error = false
      this.errorMessage = ''
      this.validatorErrors = {}

      this.$validator.errors.clear()

      this.input.items[0].weight = this.__roundHalf(this.input.items[0].weight)
      this.input.items[0].length = this.__roundHalf(this.input.items[0].length)
      this.input.items[0].width = this.__roundHalf(this.input.items[0].width)
      this.input.items[0].height = this.__roundHalf(this.input.items[0].height)

      try {
        let res = await this.$service.calculator.check(this.input)

        this.$notify({
          title: 'SUCCESS',
          message: 'Calculator complete.',
          type: 'success'
        })
      } catch (err) {
        this.__handleError(this, err, true)
      }

      this.__stopLoading()
    }
  }
}
</script>
