<template>
  <div>
    <div class="uk-card uk-card-default uk-card-small">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Kirimin</h3>
      </div>
      <div class="uk-card-body">
        <div uk-grid>
          <div class="uk-width-1-3">
            <div class="uk-margin-small">
              <label class="uk-form-label">Jenis Barang</label>
              <select v-model="input.category" class="uk-select" @change="onCategoryChange">
                <option
                  v-for="(item, key) in options.category"
                  :key="key"
                  :value="item.value">
                    {{ item.label }}
                  </option>
              </select>
            </div>
            <div class="uk-margin-small">
              <label class="uk-form-label">Nama Barang</label>
              <input v-model="input.itemName" class="uk-input">
            </div>
            <div class="uk-margin-small">
              <label class="uk-form-label">Harga Barang (IDR)</label>
              <input v-model="input.itemPrice" class="uk-input" @input="numericCheck('itemPrice')">
            </div>
            <div class="uk-margin-small">
              <label class="uk-form-label">Berat ({{ config.weightUnits }})</label>
              <input v-model="input.weight" class="uk-input" @input="numericCheck('weight')">
            </div>
            <div class="uk-margin-small">
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
          <div class="uk-width-1-3">
            <div class="uk-margin-small">
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
            <div class="uk-margin-small">
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
            <div class="uk-margin-small">
              <label class="uk-form-label">Asuransi</label>
              <div class="uk-child-width-auto" uk-grid>
                <label>
                  <input v-model="input.insurance" type="radio" value="Y">
                  <span class="uk-margin-small-left">Ya</span>
                </label>
                <label>
                  <input v-model="input.insurance" type="radio" value="N">
                  <span class="uk-margin-small-left">Tidak</span>
                </label>
              </div>
            </div>
            <div class="uk-margin-small">
              <label class="uk-form-label">Consolidate</label>
              <div class="uk-child-width-auto" uk-grid>
                <label>
                  <input v-model="input.consolidate" type="radio" value="Y">
                  <span class="uk-margin-small-left">Ya</span>
                </label>
                <label>
                  <input v-model="input.consolidate" type="radio" value="N">
                  <span class="uk-margin-small-left">Tidak</span>
                </label>
              </div>
            </div>
          </div>
          <div class="uk-width-1-3">
            <div class="uk-alert-success uk-padding-small">
              <p>Mau potongan pembayaran dengan NPWP?</p>
              <div>
                <label>
                  <input v-model="input.npwp" type="checkbox">
                  <span class="uk-margin-small-left uk-text-small" style="color: #333;">Ya, saya mau.</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="uk-card-footer">
        <div v-if="error && input.consolidate === 'N'" class="uk-alert-danger" uk-alert>
          {{ errorMessage }}
        </div>
        <div class="uk-text-right">
          <button v-if="input.consolidate === 'Y'" class="uk-button uk-button-default" @click="addItem">Tambah</button>
          <template v-else>
            <button class="uk-button uk-button-default" @click="singleCheck">Hitung</button>
            <button class="uk-button uk-button-primary uk-margin-small-left">Lanjut Pengiriman</button>
          </template>
        </div>
      </div>
    </div>

    <div v-if="this.input.consolidate === 'Y'" id="card-consolidate" class="uk-card uk-card-default uk-card-small uk-margin">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Consolidate Items</h3>
      </div>
      <div class="uk-card-body">
        <div class="uk-overflow-auto">
          <table class="uk-table uk-table-divider uk-table-small uk-text-small">
            <thead>
              <th>Jenis Barang</th>
              <th>Nama Barang</th>
              <th class="uk-text-right">Harga Barang (IDR)</th>
              <th class="uk-text-center">Berat ({{ config.weightUnits }})</th>
              <th class="uk-text-center">Dimensi ({{ config.volumeUnits }})</th>
              <th width="50">Action</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in consolidateItems" :key="index">
                <td>{{ item.categoryString }}</td>
                <td>{{ item.itemName }}</td>
                <td class="uk-text-right">{{ item.itemPrice | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
                <td class="uk-text-center">{{ item.weight }}</td>
                <td class="uk-text-center">
                  <template v-if="item.length > 0 && item.weight > 0 && item.height > 0">
                    {{ `${item.length} x ${item.width} x ${item.height}` }}
                  </template>
                </td>
                <td class="uk-text-center">
                  <a class="uk-text-danger" href="#" @click.prevent="removeItem(index)">
                    <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="uk-card-footer">
        <div v-if="error && input.consolidate === 'Y'" class="uk-alert-danger" uk-alert>
          {{ errorMessage }}
        </div>
        <div class="uk-text-right">
          <button class="uk-button uk-button-default" @click="multiCheck">Hitung</button>
          <button class="uk-button uk-button-primary uk-margin-small-left">Lanjut Pengiriman</button>
        </div>
      </div>
    </div>

    <div id="card-result" class="uk-card uk-card-default uk-card-small uk-margin">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Estimasi Biaya</h3>
      </div>
      <div class="uk-card-body">
        <calculator-result :result="calculatorResult"></calculator-result>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
      options: {
        category: [],
        warehouse: [],
        address: []
      },
      input: {
        categoryString: '',
        country: '',
        category: '',
        itemName: '',
        itemPrice: '',
        itemQuantity: 1,
        weight: '',
        length: '',
        width: '',
        height: '',
        address: '',
        courier: 'jne',
        insurance: 'N',
        consolidate: 'N',
        npwp: false
      },
      consolidateItems: [],
      calculatorResult: {
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
    onCategoryChange () {
      let category = this.options.category.find(item => {
        return item.value === this.input.category
      })

      this.input.categoryString = category.label
    },
    fetchCategories () {
      this.$authHttp.get('/v1/categories')
        .then(response => {
          this.options.category = response.data.map(item => {
            let $item = {
              value: item.id,
              label: item.name
            }
            return $item
          })
        })
        .catch(() => {})
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

          if (this.options.warehouse.length > 0) {
            this.input.country = this.options.warehouse[0].value
          }
        })
        .catch(() => {})
    },
    fetchAddresses () {
      this.__fetchUserAddresses().then(res => {
        this.options.address = res.data.data.map(item => {
          let $item = {
            value: item.kabupatenId,
            label: `${item.alias} - ${item.alamat1}`
          }

          return $item
        })

        let addresses = res.data.data.filter(item => item.primary)

        if (addresses.length > 0) {
          this.input.address = addresses[0].kabupatenId
        }
      })
    },
    addItem () {
      this.consolidateItems.push(Object.assign({}, this.input))

      this.input.categoryString = ''
      this.input.category = ''
      this.input.itemName = ''
      this.input.itemPrice = ''
      this.input.weight = ''
      this.input.length = ''
      this.input.width = ''
      this.input.height = ''
    },
    removeItem (index) {
      this.consolidateItems.splice(index, 1)
    },
    prepareCheckRequest (input) {
      return this.$authHttp.post('/v1/calculator/cost', {
        origin: this.config.originCity,
        wunits: this.config.weightUnits,
        vunits: this.config.volumeUnits,
        country: input.country,
        dest: input.address,
        courier: input.courier,
        weight: input.weight,
        length: input.length,
        width: input.width,
        height: input.height,
        harga: input.itemPrice,
        qty: input.itemQuantity,
        asuransi: input.insurance,
        npwp: input.npwp
      })
    },
    singleCheck () {
      this.error = false
      this.errorMessage = ''

      this.prepareCheckRequest(this.input).then(res => {
        if (res.data.status === '05') {
          if (res.data) {
            this.error = true
            this.errorMessage = res.data.message
          }

          return
        }

        if (res.data.data) {
          this.calculatorResult = res.data.data
        }

        document.getElementById('card-result').scrollIntoView(true)
      }).catch(err => {
        if (err.response) {
          let message = err.response.data.message ? err.response.data.message : err.response.statusText

          this.error = true
          this.errorMessage = message
        }
      })
    },
    multiCheck () {
      this.error = false
      this.errorMessage = ''

      let allRequest = this.consolidateItems.map(input => {
        input.country = this.input.country
        input.address = this.input.address
        input.insurance = this.input.insurance
        input.npwp = this.input.npwp

        return this.prepareCheckRequest(input)
      })

      axios.all(allRequest).then(axios.spread((...response) => {
        response.forEach(res => {
          if (res.data.status === '05') {
            if (res.data) {
              this.error = true
              this.errorMessage = res.data.message
            }

            this.calculatorResult = this.$options.data().calculatorResult

            setTimeout(() => {
              document.getElementById('card-consolidate').scrollIntoView(true)
            }, 1000)

            return
          }

          this.calculatorResult.items[0].harga += parseInt(res.data.data.items[0].harga)
          this.calculatorResult.items[0].biayaInt += parseInt(res.data.data.items[0].biayaInt)
          this.calculatorResult.items[0].biayaDom += parseInt(res.data.data.items[0].biayaDom)
          this.calculatorResult.items[0].beamasuk += parseInt(res.data.data.items[0].beamasuk)
          this.calculatorResult.items[0].ppn += parseInt(res.data.data.items[0].ppn)
          this.calculatorResult.items[0].pph += parseInt(res.data.data.items[0].pph)
          this.calculatorResult.items[0].total += parseInt(res.data.data.items[0].total)
          this.calculatorResult.items[0].npwp += parseInt(res.data.data.items[0].npwp)
          this.calculatorResult.items[0].totalBayar += parseInt(res.data.data.items[0].totalBayar)
        })

        document.getElementById('card-result').scrollIntoView(true)
      })).catch(err => {
        if (err.response) {
          let message = err.response.data.message ? err.response.data.message : err.response.statusText

          this.error = true
          this.errorMessage = message
        }
      })
    }
  },
  created () {
    this.fetchCategories()
    this.fetchWarehouses()
    this.fetchAddresses()
  }
}
</script>
