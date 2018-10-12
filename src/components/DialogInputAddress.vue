<template>
  <el-dialog
    :title="title"
    :visible="visible"
    @open="onDialogOpen"
    @close="onDialogClose">
      <form>
        <div class="uk-margin">
          <label class="uk-form-label">Alias</label>
          <input v-model="input.alias" class="uk-input"/>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label">Penerima</label>
          <input v-model="input.name" class="uk-input"/>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label">Telepon</label>
          <input v-model="input.phone" class="uk-input"/>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label">Provinsi</label>
          <select v-model="input.provinceId" class="uk-select" @change="onProvinceChanged">
            <option
              v-for="item in options.province"
              :key="item.value"
              :value="item.value">
                {{ item.label }}
              </option>
          </select>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label">Kota</label>
          <select v-model="input.cityId" class="uk-select" @change="onCityChanged">
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
          <select v-model="input.code" class="uk-select" @change="onDistrictChange">
            <option
              v-for="item in options.district"
              :key="item.value"
              :value="item.value">
                {{ item.label }}
              </option>
          </select>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label">Alamat 1</label>
          <input v-model="input.address1" class="uk-input"/>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label">Alamat 2</label>
          <input v-model="input.address2" class="uk-input"/>
        </div>
        <el-alert
          v-if="error"
          title="ERROR"
          type="error"
          :description="errorMessage"
          show-icon>
        </el-alert>
      </form>
      <div slot="footer">
        <button class="uk-button uk-button-primary" type="button" @click="save">Simpan</button>
      </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      default: 'New Address'
    },
    visible: {
      default: false
    },
    edit: {
      default: false
    },
    address: {
      default: {}
    }
  },
  data () {
    return {
      input: {
        alias: '',
        name: '',
        phone: '',
        province: '',
        provinceId: '',
        city: '',
        cityId: '',
        district: '',
        code: '',
        address1: '',
        address2: ''
      },
      provinces: [],
      cities: [],
      districts: [],
      options: {
        province: [],
        city: [],
        district: []
      },
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    onDialogOpen () {
      if (this.edit) {
        this.input.alias = this.address.alias
        this.input.name = this.address.name
        this.input.phone = this.address.phone
        this.input.province = this.address.province
        this.input.provinceId = this.address.provinceId
        this.input.city = this.address.kabupaten
        this.input.cityId = this.address.kabupatenId
        this.input.code = this.address.code
        this.input.district = this.address.district
        this.input.address1 = this.address.alamat1
        this.input.address2 = this.address.alamat2

        this.fetchCities()
        this.fetchDistricts()
      }

      this.fetchProvinces()
    },
    onDialogClose () {
      this.error = false
      this.errorMessage = ''

      this.cleanInput()
      this.$emit('close')
    },
    fetchProvinces () {
      this.__fetchProvinces().then(res => {
        this.provinces = res.data.data

        this.options.province = res.data.data.map(item => {
          let $item = {
            value: parseInt(item.id),
            label: item.name
          }

          return $item
        })
      })
    },
    fetchCities () {
      this.__fetchCitiesByProvince(this.input.provinceId).then(res => {
        this.cities = res.data.data

        this.options.city = res.data.data.map(item => {
          let $item = {
            value: parseInt(item.id),
            label: (item.type === 'Kabupaten') ? `Kab. ${item.city}` : item.city
          }

          return $item
        })
      })
    },
    fetchDistricts () {
      this.__fetchDistrictsByCity(this.input.cityId).then(res => {
        this.districts = res.data.data

        this.options.district = res.data.data.map(item => {
          let $item = {
            value: item.code,
            label: item.kecamatan
          }

          return $item
        })
      })
    },
    onProvinceChanged () {
      let provinces = this.provinces.filter(province => province.id === this.input.provinceId)

      if (provinces.length > 0) {
        this.input.province = provinces[0].name
      }

      this.fetchCities()
    },
    onCityChanged () {
      let cities = this.cities.filter(city => city.id === this.input.cityId)

      if (cities.length > 0) {
        this.input.city = cities[0].city
      }

      this.fetchDistricts()
    },
    onDistrictChange () {
      let districts = this.districts.filter(district => district.code === this.input.code)

      if (districts.length > 0) {
        this.input.district = districts[0].kecamatan
      }
    },
    save () {
      if (!this.edit) {
        this.store()
      } else {
        this.update()
      }
    },
    store () {
      this.error = false
      this.errorMessage = ''

      this.$authHttp.post(`/v1/address`, {
        alias: this.input.alias,
        province: this.input.province,
        provinceId: this.input.provinceId,
        kabupaten: this.input.city,
        kabupatenId: this.input.cityId,
        code: this.input.code,
        kecamatan: this.input.district,
        alamat1: this.input.address1,
        alamat2: this.input.address2
      }).then(res => {
        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.onDialogClose()
      }).catch(err => {
        if (err.response) {
          this.error = true
          this.errorMessage = err.response.data.message
        }
      })
    },
    update () {
      this.error = false
      this.errorMessage = ''

      this.$authHttp.put(`/v1/address/${this.address.id}`, {
        alias: this.input.alias,
        province: this.input.province,
        provinceId: this.input.provinceId,
        kabupaten: this.input.city,
        kabupatenId: this.input.cityId,
        code: this.input.code,
        kecamatan: this.input.district,
        alamat1: this.input.address1,
        alamat2: this.input.address2
      }).then(res => {
        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.onDialogClose()
      }).catch(err => {
        if (err.response) {
          this.error = true
          this.errorMessage = err.response.data.message
        }
      })
    },
    cleanInput () {
      this.input.alias = ''
      this.input.name = ''
      this.input.phone = ''
      this.input.province = ''
      this.input.provinceId = ''
      this.input.city = ''
      this.input.cityId = ''
      this.input.code = ''
      this.input.district = ''
      this.input.address1 = ''
      this.input.address2 = ''
    }
  }
}
</script>
