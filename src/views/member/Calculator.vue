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
              <select v-model="input.country" class="uk-select">
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
              <select v-model="input.cityId" class="uk-select">
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
              <select v-model="input.cityId" class="uk-select">
                <option
                  v-for="item in options.city"
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
              <label class="uk-form-label">Berat ({{ config.weightUnits }})</label>
              <input v-model="input.weight" type="number" min="1" class="uk-input">
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Dimensi ({{ config.volumeUnits }})</label>
              <div class="uk-grid-small" uk-grid>
                <div class="uk-width-1-3">
                  <input v-model="input.length" type="number" class="uk-input" min="1" placeholder="Length">
                </div>
                <div class="uk-width-1-3">
                  <input v-model="input.width" type="number" class="uk-input" min="1" placeholder="Width">
                </div>
                <div class="uk-width-1-3">
                  <input v-model="input.height" type="number" class="uk-input" min="1" placeholder="Height">
                </div>
              </div>
            </div>
            <div class="uk-margin">
              <div class="uk-grid-small" uk-grid>
                <div class="uk-width-1-2">
                  <label class="uk-form-label">Harga Barang</label>
                  <input v-model="input.price" class="uk-input" type="number">
                </div>
                <div class="uk-width-1-2">
                  <label class="uk-form-label">Pakai NPWP ?</label>
                  <select class="uk-select">
                      <option>Ya</option>
                      <option>Tidak</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="uk-margin uk-text-right">
              <button class="uk-button uk-button-primary" type="button" @click="check">Hitung</button>
            </div>
          </div>
          <div class="uk-width-1-2">

            <div class="uk-card uk-card-default uk-card-small">
            <div class="uk-card-header">
              <h4 class="uk-card-title">Perkiraan Biaya Pengiriman</h4>
            </div>
              <div class="uk-overflow-auto">
                <table class="uk-table uk-table-small uk-text-small">
                  <tbody v-for="(item, key) in result.items" :key="key">
                    <tr>
                      <td>Harga Barang</td>
                      <td class="uk-text-right">
                        {{ item.harga | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                      </td>
                    </tr>
                    <tr>
                      <td>Biaya Internasional</td>
                      <td class="uk-text-right">
                        {{ item.biayaInt | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                      </td>
                    </tr>
                    <tr>
                      <td>Biaya Domestik</td>
                      <td class="uk-text-right">
                        {{ item.biayaDom | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                      </td>
                    </tr>
                    <tr>
                      <td>Bea Masuk (7.5%)</td>
                      <td class="uk-text-right">
                        {{ item.beamasuk | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                      </td>
                    </tr>
                    <tr>
                      <td>PPN (10%)</td>
                      <td class="uk-text-right">
                        {{ item.ppn | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                      </td>
                    </tr>
                    <tr>
                      <td>PPH (20%)</td>
                      <td class="uk-text-right">
                        {{ item.pph | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                      </td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td class="uk-text-right">
                        {{ item.total | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                      </td>
                    </tr>
                    <tr>
                      <td>Potongan NPWP</td>
                      <td class="uk-text-right uk-text-danger">
                        {{ item.npwp | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                      </td>
                    </tr>
                    <tr>
                      <td>Estimasi Biaya Pengiriman</td>
                      <td class="uk-text-right">
                        {{ item.totalBayar | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      config: {
        originCity: 151,
        weightUnits: 'kg',
        volumeUnits: 'cm'
      },
      input: {
        country: '',
        provinceId: '',
        cityId: '',
        courier: 'jne',
        weight: '',
        length: '',
        width: '',
        height: '',
        price: '',
        qty: 1
      },
      options: {
        warehouse: [],
        province: [],
        city: [],
        courier: [
          {
            value: 'jne',
            label: 'JNE'
          }
        ]
      },
      result: {
        items: [
          {

          }
        ]
      }
    }
  },
  methods: {
    fetchWarehouses () {
      this.$authHttp.get('/v1/cfees')
        .then(reponse => {
          this.options.warehouse = reponse.data.map(item => {
            let $item = {
              value: item.code,
              label: item.name
            }

            return $item
          })
        })
        .catch(() => {
          //
        })
    },
    fetchProvinces () {
      this.$http.get('/v1/calculator/province')
        .then(reponse => {
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
    check () {
      this.$authHttp.post('/v1/calculator/cost', {
        origin: this.config.originCity,
        wunits: this.config.weightUnits,
        vunits: this.config.volumeUnits,
        country: this.input.country,
        dest: this.input.cityId,
        courier: this.input.courier,
        weight: this.input.weight,
        length: this.input.length,
        width: this.input.width,
        height: this.input.height,
        harga: this.input.price,
        qty: this.input.qty
      }).then(response => {
        this.result = response.data.data
      }).catch(() => {
        //
      })
    }
  },

  created () {
    this.fetchWarehouses()
    this.fetchProvinces()
  }
}
</script>
