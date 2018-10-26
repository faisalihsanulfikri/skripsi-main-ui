<template>
  <div>
    <div class="uk-grid-small uk-grid-match uk-margin" uk-grid>
      <div class="uk-width-2-3">
        <div class="uk-card uk-card-default uk-card-small">
          <div class="uk-card-header">
            <h3 class="uk-card-title">Pengiriman</h3>
          </div>
          <div class="uk-card-body">
            <div uk-grid>
              <div class="uk-width-1-2">
                <div class="uk-margin-small">
                  <label class="uk-form-label">Gudang Kirimin</label>
                  <select v-model="input.country" class="uk-select" @change="multiCheck">
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
                  <select v-model="input.address" class="uk-select" @change="multiCheck">
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
                      <input v-model="input.insurance" type="radio" value="Y" @change="multiCheck">
                      <span class="uk-margin-small-left">Ya</span>
                    </label>
                    <label>
                      <input v-model="input.insurance" type="radio" value="N" @change="multiCheck">
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
              <div class="uk-width-1-2">
                <div class="uk-alert-success uk-padding-small">
                  <p>Mau potongan pembayaran dengan NPWP?</p>
                  <div>
                    <label>
                      <input v-model="input.npwp" type="checkbox" @change="multiCheck">
                      <span class="uk-margin-small-left uk-text-small" style="color: #333;">Ya, saya mau.</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="uk-width-1-3">
        <div class="uk-card uk-card-default uk-card-small">
          <div class="uk-card-header">
            <h3 class="uk-card-title">Barang</h3>
          </div>
          <div class="uk-card-body">
            <div class="uk-margin-small">
              <label class="uk-form-label">Jenis Barang</label>
              <select
                v-model="input.item.category"
                v-validate="'required'"
                name="category"
                class="uk-select"
                :class="{ 'uk-form-danger': errors.has('category') }"
                @change="onCategoryChange">
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
              <input
                v-model="input.item.name"
                v-validate="'required'"
                name="itemName"
                class="uk-input"
                :class="{ 'uk-form-danger': errors.has('itemName') }">
            </div>
            <div class="uk-margin-small">
              <label class="uk-form-label">Harga Barang (IDR)</label>
              <input
                v-model="input.item.price"
                v-validate="'required|decimal'"
                name="itemPrice"
                class="uk-input"
                :class="{ 'uk-form-danger': errors.has('itemPrice') }"
                @input="numericCheck('itemPrice')">
            </div>
            <div class="uk-margin-small">
              <label class="uk-form-label">Jumlah Barang</label>
              <input
                v-model="input.item.quantity"
                v-validate="'required|decimal'"
                name="quantity"
                class="uk-input"
                :class="{ 'uk-form-danger': errors.has('quantity') }"
                @input="numericCheck('itemQuantity')">
            </div>
            <div class="uk-margin-small">
              <label class="uk-form-label">Berat ({{ config.weightUnits }})</label>
              <input
                v-model="input.item.weight"
                v-validate="'required|decimal'"
                name="weight"
                class="uk-input"
                :class="{ 'uk-form-danger': errors.has('weight') }"
                @input="numericCheck('weight')">
            </div>
            <div class="uk-margin-small">
              <label class="uk-form-label">Dimensi ({{ config.volumeUnits }})</label>
              <div class="uk-grid-small" uk-grid>
                <div class="uk-width-1-3">
                  <input
                    v-model="input.item.length"
                    v-validate="'required|decimal'" name="length"
                    class="uk-input"
                    :class="{ 'uk-form-danger': errors.has('length') }"
                    min="1"
                    placeholder="Panjang"
                    @input="numericCheck('length')">
                </div>
                <div class="uk-width-1-3">
                  <input
                    v-model="input.item.width"
                    v-validate="'required|decimal'"
                    name="width"
                    class="uk-input"
                    :class="{ 'uk-form-danger': errors.has('width') }"
                    min="1"
                    placeholder="Lebar"
                    @input="numericCheck('width')">
                </div>
                <div class="uk-width-1-3">
                  <input
                    v-model="input.item.height"
                    v-validate="'required|decimal'"
                    name="height"
                    class="uk-input"
                    :class="{ 'uk-form-danger': errors.has('height') }"
                    min="1"
                    placeholder="Tinggi"
                    @input="numericCheck('height')">
                </div>
              </div>
            </div>
            <div class="uk-margin-large-top">
              <div v-if="error && input.consolidate === 'N'" class="uk-alert-danger" uk-alert>
                {{ errorMessage }}
              </div>
            </div>
          </div>
          <div class="uk-card-footer">
            <div class="uk-text-right">
              <button v-if="input.consolidate === 'Y'" class="uk-button uk-button-default" @click="addItem">Tambah</button>
              <template v-else>
                <button class="uk-button uk-button-default" @click="singleCheck">Hitung</button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="this.items.length > 0" id="card-consolidate" class="uk-card uk-card-default uk-card-small uk-margin">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Items</h3>
      </div>
      <div class="uk-card-body">
        <div class="uk-overflow-auto">
          <table class="uk-table uk-table-divider uk-table-small uk-text-small">
            <thead>
              <th>Jenis Barang</th>
              <th>Nama Barang</th>
              <th class="uk-text-right">Jumlah Barang</th>
              <th class="uk-text-right">Harga Barang (IDR)</th>
              <th class="uk-text-center">Berat ({{ config.weightUnits }})</th>
              <th class="uk-text-center">Dimensi ({{ config.volumeUnits }})</th>
              <th width="50">Action</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td>{{ item.categoryName }}</td>
                <td>{{ item.name }}</td>
                <td class="uk-text-right">{{ item.quantity }}</td>
                <td class="uk-text-right">{{ item.price | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
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
      <div v-if="input.consolidate === 'Y'" class="uk-card-footer">
        <div v-if="error" class="uk-alert-danger" uk-alert>
          {{ errorMessage }}
        </div>
        <div class="uk-text-right">
          <button class="uk-button uk-button-default" @click="multiCheck">Hitung</button>
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
      <div class="uk-card-footer uk-text-right">
        <button class="uk-button uk-button-primary uk-margin-small-left" @click="dialogOrderConfirmation = true">Lanjut Pengiriman</button>
      </div>
    </div>

    <dialog-order-confirmation :visible="dialogOrderConfirmation" @close="onCloseConfrimOrder" @confirm="onConfirmOrder"></dialog-order-confirmation>
  </div>
</template>

<script>
import axios from 'axios'

import CalculatorResult from '../../components/CalculatorResult'
import DialogOrderConfirmation from '../../components/DialogOrderConfirmation'

export default {
  components: {
    CalculatorResult,
    DialogOrderConfirmation
  },
  data () {
    return {
      config: {
        origin: 151,
        weightUnits: 'kg',
        volumeUnits: 'cm',
        courier: 'jne'
      },
      dialogOrderConfirmation: false,
      master: {
        addresses: []
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
        npwp: false,
        item: {
          categoryName: '',
          category: '',
          name: '',
          price: '',
          quantity: 1,
          weight: '',
          length: '',
          width: '',
          height: ''
        }
      },
      items: [],
      calculatorModel: {
        origin: '',
        dest: '',
        isNpwp: '',
        courier: '',
        country: '',
        vunits: '',
        wunits: '',
        harga: '',
        qty: '',
        weight: '',
        length: '',
        width: '',
        height: ''
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
        return item.value === this.input.item.category
      })

      this.input.item.categoryName = category.label
    },
    onCloseConfrimOrder () {
      this.dialogOrderConfirmation = false
    },
    onConfirmOrder () {
      if (this.input.consolidate === 'Y') {
        this.multiOrder()
      } else {
        this.singleOrder()
      }
    },
    async isValidInput () {
      let valid = await this.$validator.validate()

      return new Promise(resolve => {
        resolve(valid)
      })
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
        this.master.addresses = res.data.data

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
    async addItem () {
      this.error = false
      this.errorMessage = ''

      if (!(await this.isValidInput())) {
        this.error = true
        this.errorMessage = 'Data tidak valid.'

        this.$notify({
          title: 'ERROR',
          message: this.errorMessage,
          type: 'error'
        })

        return
      }

      this.pushItem(this.input.item)

      this.input.item = this.$options.data().input.item
    },
    pushItem (item) {
      this.items.push(item)

      return this.items
    },
    removeItem (index) {
      this.items.splice(index, 1)
    },
    prepareCalculatorData (items) {
      let data = Object.assign({}, JSON.parse(JSON.stringify(this.calculatorModel)))
      let mappedData = {}

      data.origin = this.config.origin
      data.dest = this.input.address
      data.isNpwp = this.input.npwp
      data.courier = this.config.courier
      data.country = this.input.country
      data.vunits = this.config.volumeUnits
      data.wunits = this.config.weightUnits
      data.harga = 0
      data.qty = 0
      data.weight = 0
      data.length = 0
      data.width = 0
      data.height = 0

      items.forEach(item => {
        data.harga += parseInt(item.price)
        data.qty += parseInt(item.quantity)
        data.weight += parseInt(item.weight)
        data.length += parseInt(item.length)
        data.width += parseInt(item.width)
        data.height += parseInt(item.height)
      })

      Object.keys(data).forEach(key => {
        mappedData[key] = String(data[key])
      })

      return data
    },
    checkCosts (data) {
      this.$http.post('/v1/calculator/cost', data).then(res => {
        if (res.data.status !== '00') {
          this.error = true
          this.errorMessage = res.data.message ? res.data.message : res.statusText

          this.$notify({
            title: 'ERROR',
            message: this.errorMessage,
            type: 'error'
          })

          return
        }

        this.input.item = this.$options.data().input.item

        this.calculatorResult = res.data.data
      }).catch(err => {
        if (err.response) {
          this.error = true
          this.errorMessage = err.response.data.message ? err.response.data.message : err.response.statusText

          this.$notify({
            title: 'ERROR',
            message: this.errorMessage,
            type: 'error'
          })
        }
      })
    },
    async singleCheck () {
      this.error = false
      this.errorMessage = ''

      if (!(await this.isValidInput())) {
        this.error = true
        this.errorMessage = 'Data tidak valid.'

        this.$notify({
          title: 'ERROR',
          message: this.errorMessage,
          type: 'error'
        })

        return
      }

      this.items = []
      this.calculatorResult = this.$options.data().calculatorResult

      let items = this.pushItem(this.input.item)
      let data = this.prepareCalculatorData(items)

      this.checkCosts(data)

      document.getElementById('card-result').scrollIntoView(true)
    },
    multiCheck () {
      this.error = false
      this.errorMessage = ''

      if (this.items.length < 1) {
        return
      }

      this.calculatorResult = this.$options.data().calculatorResult

      let data = this.prepareCalculatorData(this.items)

      this.checkCosts(data)

      document.getElementById('card-result').scrollIntoView(true)
    },
    // addItem () {
    //   this.error = false
    //   this.errorMessage = ''

    //   if (!this.isValidInput()) {
    //     this.error = true
    //     this.errorMessage = 'Data tidak valid.'

    //     this.$notify({
    //       title: 'ERROR',
    //       message: this.errorMessage,
    //       type: 'error'
    //     })

    //     return false
    //   }

    //   this.consolidateItems.push(Object.assign({}, this.input))

    //   this.input.categoryString = ''
    //   this.input.category = ''
    //   this.input.itemName = ''
    //   this.input.itemPrice = ''
    //   this.input.weight = ''
    //   this.input.length = ''
    //   this.input.width = ''
    //   this.input.height = ''

    //   this.$validator.reset()
    // },
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
    // singleCheck () {
    //   this.error = false
    //   this.errorMessage = ''

    //   if (!this.isValidInput()) {
    //     this.error = true
    //     this.errorMessage = 'Data tidak valid.'

    //     this.$notify({
    //       title: 'ERROR',
    //       message: this.errorMessage,
    //       type: 'error'
    //     })

    //     return false
    //   }

    //   return new Promise((resolve, reject) => {
    //     this.prepareCheckRequest(this.input).then(res => {
    //       if (res.data.status === '05') {
    //         if (res.data) {
    //           this.error = true
    //           this.errorMessage = res.data.message
    //         }

    //         reject(new Error('Opps! Something went wrong.'))
    //       }

    //       if (res.data.data) {
    //         this.calculatorResult = res.data.data
    //       }

    //       document.getElementById('card-result').scrollIntoView(true)

    //       resolve()
    //     }).catch(err => {
    //       if (err.response) {
    //         let message = err.response.data.message ? err.response.data.message : err.response.statusText

    //         this.error = true
    //         this.errorMessage = message
    //       }

    //       reject(new Error('Opps! Something went wrong.'))
    //     })
    //   })
    // },
    // multiCheck () {
    //   this.error = false
    //   this.errorMessage = ''

    //   if (this.consolidateItems.length < 1) {
    //     this.error = true
    //     this.errorMessage = 'Tidak ada barang.'

    //     this.$notify({
    //       title: 'ERROR',
    //       message: this.errorMessage,
    //       type: 'error'
    //     })

    //     return false
    //   }

    //   this.calculatorResult.items[0].harga = 0
    //   this.calculatorResult.items[0].biayaInt = 0
    //   this.calculatorResult.items[0].biayaDom = 0
    //   this.calculatorResult.items[0].beamasuk = 0
    //   this.calculatorResult.items[0].ppn = 0
    //   this.calculatorResult.items[0].pph = 0
    //   this.calculatorResult.items[0].total = 0
    //   this.calculatorResult.items[0].npwp = 0
    //   this.calculatorResult.items[0].totalBayar = 0

    //   let allRequest = this.consolidateItems.map(input => {
    //     input.country = this.input.country
    //     input.address = this.input.address
    //     input.insurance = this.input.insurance
    //     input.npwp = this.input.npwp

    //     return this.prepareCheckRequest(input)
    //   })

    //   return new Promise((resolve, reject) => {
    //     axios.all(allRequest).then(axios.spread((...response) => {
    //       response.forEach(res => {
    //         if (res.data.status === '05') {
    //           if (res.data) {
    //             this.error = true
    //             this.errorMessage = res.data.message
    //           }

    //           this.calculatorResult = this.$options.data().calculatorResult

    //           setTimeout(() => {
    //             document.getElementById('card-consolidate').scrollIntoView(true)
    //           }, 1000)

    //           reject(new Error('Opps! Something went wrong.'))
    //         }

    //         this.calculatorResult.items[0].harga += parseInt(res.data.data.items[0].harga)
    //         this.calculatorResult.items[0].biayaInt += parseInt(res.data.data.items[0].biayaInt)
    //         this.calculatorResult.items[0].biayaDom += parseInt(res.data.data.items[0].biayaDom)
    //         this.calculatorResult.items[0].beamasuk += parseInt(res.data.data.items[0].beamasuk)
    //         this.calculatorResult.items[0].ppn += parseInt(res.data.data.items[0].ppn)
    //         this.calculatorResult.items[0].pph += parseInt(res.data.data.items[0].pph)
    //         this.calculatorResult.items[0].total += parseInt(res.data.data.items[0].total)
    //         this.calculatorResult.items[0].npwp += parseInt(res.data.data.items[0].npwp)
    //         this.calculatorResult.items[0].totalBayar += parseInt(res.data.data.items[0].totalBayar)
    //       })

    //       document.getElementById('card-result').scrollIntoView(true)

    //       resolve()
    //     })).catch(err => {
    //       if (err.response) {
    //         let message = err.response.data.message ? err.response.data.message : err.response.statusText

    //         this.error = true
    //         this.errorMessage = message
    //       }

    //       reject(new Error('Opps! Something went wrong.'))
    //     })
    //   })
    // },
    prepareOrderRequest (input) {
      return this.$authHttp.post('/v1/orders', {
        origin: this.config.originCity,
        wunits: this.config.weightUnits,
        vunits: this.config.volumeUnits,
        goodsName: input.itemName,
        harga: input.itemPrice,
        qty: input.itemQuantity,
        asuransi: input.insurance,
        country: input.country,
        dest: input.address,
        courier: input.courier,
        weight: input.weight,
        length: input.length,
        width: input.width,
        height: input.height,
        npwp: input.npwp,
        type: 1,
        status: 1
      })
    },
    singleOrder () {
      this.error = false
      this.errorMessage = ''

      if (!this.isValidInput()) {
        this.error = true
        this.errorMessage = 'Data tidak valid.'

        this.$notify({
          title: 'ERROR',
          message: this.errorMessage,
          type: 'error'
        })

        this.dialogOrderConfirmation = false

        return false
      }

      this.singleCheck().then(() => {
        this.prepareOrderRequest(this.input).then(res => {
          this.$validator.reset()

          this.createInvoice([
            res.data.id
          ])

          this.input.categoryString = ''
          this.input.category = ''
          this.input.itemName = ''
          this.input.itemPrice = ''
          this.input.weight = ''
          this.input.length = ''
          this.input.width = ''
          this.input.height = ''
        }).catch(err => {
          if (err.response) {
            let message = err.response.data.message ? err.response.data.message : err.response.statusText

            this.error = true
            this.errorMessage = message

            this.$notify({
              title: 'ERROR',
              message: this.errorMessage,
              type: 'error'
            })
          }
        })
      })
    },
    multiOrder () {
      this.error = false
      this.errorMessage = ''

      if (this.consolidateItems.length < 1) {
        this.error = true
        this.errorMessage = 'Tidak ada barang.'

        this.$notify({
          title: 'ERROR',
          message: this.errorMessage,
          type: 'error'
        })

        this.dialogOrderConfirmation = false

        return false
      }

      this.multiCheck().then(() => {
        let allRequest = this.consolidateItems.map(input => {
          input.country = this.input.country
          input.address = this.input.address
          input.insurance = this.input.insurance
          input.npwp = this.input.npwp

          return this.prepareOrderRequest(input)
        })

        axios.all(allRequest).then(axios.spread((...response) => {
          let items = []

          for (let i = 0; i < response.length; i++) {
            items.push(response[i].data.id)

            if (i === (response.length - 1)) {
              this.createInvoice(items)
            }
          }

          this.consolidateItems = []
        })).catch(err => {
          if (err.response) {
            let message = err.response.data.message ? err.response.data.message : err.response.statusText

            this.error = true
            this.errorMessage = message

            this.$notify({
              title: 'ERROR',
              message: this.errorMessage,
              type: 'error'
            })
          }
        })
      })
    },
    createInvoice (items) {
      let __invoice = {
        shipperName: this.$auth.getUser().fullName,
        shipperAddress: 'Jakarta',
        shipperCity: 'Jakarta',
        shipperRegion: 'Jakarta',
        shipperZipCode: '19920',
        shipperPhone: this.$auth.getUser().mobile,
        shipperOriginCode: 'TNCCGK10000',

        receiverName: null,
        receiverAddress: null,
        receiverCity: null,
        receiverRegion: null,
        receiverZipCode: null,
        receiverPhone: null,
        receiverDestCode: null,

        serviceCode: 'REG',
        qty: `${items.length}`,
        weight: this.input.weight,
        desc: '',
        amount: this.calculatorResult.items[0].totalBayar,
        harga: 0,
        biayaInt: 0,
        biayaDom: 0,
        beamasuk: 0,
        ppn: 0,
        pph: 0,
        npwp: 0,
        totalExc: 0,
        totalBayarExc: 0,
        total: 0,
        totalBayar: 0,
        isInsured: this.input.insurance,
        categoryId: this.options.category[0].value,
        isCod: 'N',
        codAmount: '0',
        note: '',
        shipStatus: 'UN',
        items: items
      }

      let address = this.master.addresses.find(address => {
        return address.kabupatenId === this.input.address
      })

      let receiver = {
        receiverName: this.$auth.getUser().fullName,
        receiverAddress: `${address.alamat1}, ${address.alamat2}`,
        receiverCity: address.kabupaten,
        receiverRegion: address.province,
        receiverZipCode: '404',
        receiverPhone: this.$auth.getUser().mobile,
        receiverDestCode: address.code
      }

      let data = {
        ...__invoice,
        ...this.calculatorResult.items[0],
        ...receiver
      }

      this.$authHttp.post('/v1/orders/delivery', data).then(res => {
        this.dialogOrderConfirmation = false

        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })

        this.$router.push({ name: 'member-order' })
      }).catch(err => {
        if (err.response) {
          let message = err.response.data.message ? err.response.data.message : err.response.statusText

          this.error = true
          this.errorMessage = message

          this.$notify({
            title: 'ERROR',
            message: this.errorMessage,
            type: 'error'
          })
        }

        this.dialogOrderConfirmation = false
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
