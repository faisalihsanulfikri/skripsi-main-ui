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
              <input v-model="input.items[0].weight" type="text" class="uk-input" @input="numericCheck('weight')">
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Dimensi ({{ config.volumeUnits }})</label>
              <div class="uk-grid-small" uk-grid>
                <div class="uk-width-1-3">
                  <input v-model="input.items[0].length" type="text" class="uk-input" min="1" placeholder="Panjang" @input="numericCheck('length')">
                </div>
                <div class="uk-width-1-3">
                  <input v-model="input.items[0].width" type="text" class="uk-input" min="1" placeholder="Lebar" @input="numericCheck('width')">
                </div>
                <div class="uk-width-1-3">
                  <input v-model="input.items[0].height" type="text" class="uk-input" min="1" placeholder="Tinggi" @input="numericCheck('height')">
                </div>
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Harga Barang</label>
              <input
                v-model="input.items[0].price"
                class="uk-input"
                type="text"
                @input="numericCheck('price')">
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Jumlah Barang</label>
              <input v-model="input.items[0].quantity" type="text" class="uk-input" @input="numericCheck('weight')">
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
                <calculator-result :cost="cost"/>
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

export default {
  components: {
    CalculatorResult
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
        items: [
          {
            name: '-',
            price: 0,
            quantity: 1,
            weight: 1,
            length: 0,
            width: 0,
            height: 0
          }
        ],
        provinceId: '',
        province: '',
        cityId: '',
        city: '',
        subDistrict: ''
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
    numericCheck (key) {
      let val = this.input[key].match(/\d/g)

      if (val !== null) {
        this.input[key] = val.join('')
      } else {
        this.input[key] = ''
      }
    },
    async fetchWarehouses () {
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
    },
    async fetchProvinces () {
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
    },
    async fetchCities () {
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
    },
    async fetchDistricts () {
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
    },
    check () {
      this.error = false
      this.errorMessage = ''
      this.validatorErrors = {}

      this.$validator.errors.clear()

      this.$authHttp.post('/calculator', this.input).then(res => {
        this.cost = res.data.result.cost

        this.$notify({
          title: 'SUCCESS',
          message: 'Calculator complete.',
          type: 'success'
        })
      }).catch(err => {
        if (err.response) {
          this.error = true
          this.errorMessage = err.response.data.message ? err.response.data.message : err.response.statusText

          this.$validator.errors.clear()

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
    }
  }
}
</script>
