<template>
  <div>
    <div class="uk-card uk-card-default uk-card-small">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Beliin</h3>
      </div>
      <div class="uk-card-body">
        <div  uk-grid>
          <div class="uk-width-1-2">
            <div class="uk-margin">
              <label class="uk-form-label">Website</label>
              <input v-model="input.website" class="uk-input" placeholder="Kirimin">
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">URL</label>
              <input v-model="input.url" class="uk-input" placeholder="http://kirimin.co.id">
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Jenis Barang</label>
              <select v-model="input.category" class="uk-select">
                <option
                  v-for="item in options.category"
                  :key="item.value"
                  :value="item.value">
                    {{ item.label }}
                  </option>
              </select>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Nama Barang</label>
              <input v-model="input.itemName" class="uk-input">
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Harga Barang (IDR)</label>
              <input v-model="input.itemPrice" class="uk-input" type="text" @input="numericCheck('itemPrice')">
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Jumlah Barang</label>
              <input v-model="input.itemQuantity" class="uk-input" type="text" @input="numericCheck('itemQuantity')">
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Berat ({{ config.weightUnits }})</label>
              <input v-model="input.weight" type="text" class="uk-input" @input="numericCheck('weight')">
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Dimensi ({{ config.volumeUnits }})</label>
              <div class="uk-grid-small" uk-grid>
                <div class="uk-width-1-3">
                  <input v-model="input.length" type="text" class="uk-input" min="1" placeholder="Panjang" @input="numericCheck('length')">
                </div>
                <div class="uk-width-1-3">
                  <input v-model="input.width" type="text" class="uk-input" min="1" placeholder="Lebar" @input="numericCheck('width')">
                </div>
                <div class="uk-width-1-3">
                  <input v-model="input.height" type="text" class="uk-input" min="1" placeholder="Tinggi" @input="numericCheck('height')">
                </div>
              </div>
            </div>
          </div>
          <div class="uk-width-1-2">
            <div class="uk-margin">
              <label class="uk-form-label">NPWP</label>
              <select class="uk-select">
                <option>Ya</option>
                <option>Tidak</option>
              </select>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">Consolidate</label>
              <select class="uk-select">
                <option>Ya</option>
                <option>Tidak</option>
              </select>
            </div>
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
              <label class="uk-form-label">Alamat Penerima</label>
              <select v-model="input.address" class="uk-select">
                <option
                  v-for="(item, key) in options.address"
                  :key="key"
                  :value="item.value">
                    {{ item.label }}
                  </option>
              </select>
            </div>
            <div class="uk-margin">
              <button class="uk-button uk-button-primary uk-width-1-1" @click="check">Hitung</button>
            </div>
            <div class="uk-margin">
              <div v-if="error" class="uk-alert-danger" uk-alert>
                {{ errorMessage }}
              </div>
            </div>
            <template v-if="result.items">
              <hr>
              <calculator-result :result="result"/>
              <div class="uk-margin">
                <button class="uk-button uk-button-primary uk-width-1-1" @click="storeOrder">Lanjut Pengiriman</button>
              </div>
            </template>
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
        website: '',
        url: '',
        catgory: '',
        itemName: '',
        itemPrice: '',
        itemQuantity: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        address: '',
        courier: 'jne'
      },
      options: {
        category: [],
        warehouse: [],
        address: []
      },
      result: {
        items: [
          {
            harga: 0,
            biayaInt: 0,
            biayaDom: 0,
            beamasuk: 0,
            ppn: 0,
            pph: 0,
            total: 0,
            npwp: 0,
            totalBayar: 0
          }
        ]
      },
      error: false,
      errorMessage: ''
    }
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
    fetchCategories () {
      this.$authHttp.get('/v1/categories')
        .then(response => {
          this.options.category = response.data.map(item => {
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
    fetchWarehouses () {
      this.$authHttp.get('/v1/cfees')
        .then(response => {
          this.options.warehouse = response.data.map(item => {
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
    fetchAddresses () {
      this.$authHttp.get('/v1/address')
        .then(response => {
          this.options.address = response.data.data.map(item => {
            let $item = {
              value: item.kabupatenId,
              label: `${item.alias} - ${item.alamat1}`
            }

            return $item
          })
        })
        .catch(() => {
          //
        })
    },
    check () {
      this.error = false
      this.errorMessage = ''

      this.$authHttp.post('/v1/calculator/cost', {
        origin: this.config.originCity,
        wunits: this.config.weightUnits,
        vunits: this.config.volumeUnits,
        country: this.input.country,
        dest: this.input.address,
        courier: this.input.courier,
        weight: this.input.weight,
        length: this.input.length,
        width: this.input.width,
        height: this.input.height,
        harga: this.input.itemPrice,
        qty: this.input.itemQuantity
      }).then(response => {
        if (response.data.status === '05') {
          if (response.data) {
            this.error = true
            this.errorMessage = response.data.message
          }

          return
        }

        if (response.data.data) {
          this.result = response.data.data
        }
      }).catch(error => {
        if (error.response) {
          this.error = true
          this.errorMessage = error.response.data.message
        }
      })
    },
    storeOrder () {
      this.error = false
      this.errorMessage = ''

      this.$authHttp.post('/v1/orders', {
        'origin': 151,
        'dest': this.input.address,
        'weight': this.input.weight,
        'length': this.input.length,
        'width': this.input.width,
        'height': this.input.height,
        'country': this.input.country,
        'vunits': this.config.volumeUnits,
        'wunits': this.input.weightUnits,
        'harga': this.input.itemPrice,
        'qty': this.input.itemQuantity,
        'goodsName': this.input.itemName
      }).then(response => {
        this.clearInput()

        this.$router.push({ name: 'member-order' })
      }).catch(error => {
        if (error.response) {
          this.error = true
          this.errorMessage = error.response.data.message
        }
      })
    },
    clearInput () {
      this.input.website = ''
      this.input.url = ''
      this.input.catgory = ''
      this.input.itemName = ''
      this.input.itemPrice = ''
      this.input.itemQuantity = ''
      this.input.weight = ''
      this.input.length = ''
      this.input.width = ''
      this.input.height = ''
      this.input.address = ''
    }
  },
  created () {
    this.fetchCategories()
    this.fetchWarehouses()
    this.fetchAddresses()
  }
}
</script>
