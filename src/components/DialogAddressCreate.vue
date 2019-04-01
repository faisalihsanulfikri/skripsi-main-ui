<template>
  <div :id="id" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
      <h3>Alamat Baru</h3>
      <div v-if="error" class="uk-alert-danger" uk-alert>
        {{ errorMessage }}
      </div>
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
          <input v-model="input.district" class="uk-input"/>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label">Alamat 1</label>
          <input v-model="input.address1" class="uk-input"/>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label">Alamat 2</label>
          <input v-model="input.address2" class="uk-input"/>
        </div>
        <div class="uk-margin uk-text-right">
          <button class="uk-button uk-button-primary" type="button" @click="save">Simpan</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      required: true
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
        code: '',
        district: '',
        address1: '',
        address2: ''
      },
      options: {
        province: [],
        city: []
      },
      provinces: [],
      cities: [],
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    fetchProvinces () {
      this.$http.get('/v1/calculator/province')
        .then(reponse => {
          this.provinces = reponse.data.data

          this.options.province = reponse.data.data.map(item => {
            let $item = {
              value: parseInt(item.id),
              label: item.name
            }

            return $item
          })
        })
        .catch(() => {
          //
        })
    },
    fetchCities () {
      this.$http.get(`/v1/calculator/city/${this.input.provinceId}/province`)
        .then(reponse => {
          this.cities = reponse.data.data

          this.options.city = reponse.data.data.map(item => {
            let $item = {
              value: parseInt(item.id),
              label: (item.type === 'Kabupaten') ? `Kab. ${item.city}` : item.city
            }

            return $item
          })
        })
        .catch(() => {
          //
        })
    },
    onProvinceChanged () {
      this.fetchCities()

      let provinces = this.provinces.filter(province => province.id === this.input.provinceId)

      if (provinces.length > 0) {
        this.input.province = provinces[0].name
      }
    },
    onCityChanged () {
      let cities = this.cities.filter(city => city.id === this.input.cityId)

      if (cities.length > 0) {
        this.input.city = cities[0].city
        this.input.code = cities[0].code
      }
    },
    save () {
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
      }).then(response => {
        this.clearInput()

        this.$emit('on-finish', this.id)
      }).catch(error => {
        if (error.response) {
          this.error = true
          this.errorMessage = error.response.data.message
        }
      })
    },
    clearInput () {
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
  },
  created () {
    this.fetchProvinces()
  }
}
</script>
