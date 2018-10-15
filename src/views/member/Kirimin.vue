<template>
  <div>
    <div class="uk-card uk-card-default uk-card-small">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Kirimin</h3>
      </div>
      <div class="uk-card-body">
        <div uk-grid>
          <div class="uk-width-auto">
            <div class="uk-margin">
              <label class="uk-form-label">Consolidate</label>
              <ul class="uk-subnav uk-subnav-pill" uk-switcher="connect: .my-class">
                <li @click="onChange(false)"><a href="#">Tidak</a></li>
                <li @click="onChange(true)"><a href="#">Ya</a></li>
              </ul>
            </div>
          </div>
          <div class="uk-width-1-5">
            <div class="uk-margin">
              <label class="uk-form-label">NPWP</label>
              <select class="uk-select" v-model="input.npwp" @change="onChange()">
                <option :key="true" :value="true">Ya</option>
                <option :key="false" :value="false">Tidak</option>
              </select>
            </div>
          </div>
          <div class="uk-width-1-5">
            <div class="uk-margin">
              <label class="uk-form-label">Asuransi</label>
              <select class="uk-select" v-model="input.asuransi" @change="onChange()">
                <option :key="true" :value="true">Ya</option>
                <option :key="false" :value="false">Tidak</option>
              </select>
            </div>
          </div>
          <div class="uk-width-1-5">
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
          </div>
          <div class="uk-width-1-5">
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
          </div>
        </div>
        <div uk-grid>
          <div class="uk-width-1-6">
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
          </div>
          <div class="uk-width-1-6">
            <div class="uk-margin">
              <label class="uk-form-label">Nama Barang</label>
              <input v-model="input.itemName" class="uk-input">
            </div>
          </div>
          <div class="uk-width-1-6">
            <div class="uk-margin">
              <label class="uk-form-label">Harga Barang (IDR)</label>
              <input v-model="input.itemPrice" class="uk-input" type="text" @input="numericCheck('itemPrice')">
            </div>
          </div>
          <div class="uk-width-1-6 uk-width-expand">
            <div class="uk-grid-small" uk-grid>
              <div class="uk-width-1-4">
                <div class="uk-margin">
                <label class="uk-form-label">Berat ({{ config.weightUnits }})</label>
                <input v-model="input.weight" type="text" class="uk-input" @input="numericCheck('weight')">
                </div>
              </div>
              <div class="uk-width-1-4">
                <label class="uk-form-label">Dimensi ({{ config.volumeUnits }})</label>
                <input v-model="input.length" type="text" class="uk-input" min="1" placeholder="Panjang" @input="numericCheck('length')">
              </div>
              <div class="uk-width-1-4">
              <label class="uk-form-label">&nbsp;</label>
                <input v-model="input.width" type="text" class="uk-input" min="1" placeholder="Lebar" @input="numericCheck('width')">
              </div>
              <div class="uk-width-1-4">
              <label class="uk-form-label">&nbsp;</label>
                <input v-model="input.height" type="text" class="uk-input" min="1" placeholder="Tinggi" @input="numericCheck('height')">
              </div>
            </div>
          </div>
        </div>
        <div uk-grid>
          <div class="uk-width-1-1">
            <div class="uk-column-1-2 uk-align-right">
              <div class="uk-margin">
                <ul class="uk-switcher my-class">
                    <li><button class="uk-button uk-button-primary uk-width-expand" disabled>Tambah</button></li>
                    <li><button class="uk-button uk-button-primary uk-width-expand" @click="addItem">Tambah</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div uk-grid>
          <div class="uk-width-1-1">
            <ul class="uk-switcher my-class uk-margin">
                <li>&nbsp;</li>
                <li>
                  <kirimin-list :items="kiriminitems" />
                </li>
            </ul>
          </div>
        </div>
        <div uk-grid>
          <div class="uk-width-1-1">
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
                <button class="uk-button uk-button-primary uk-width-1-1" @click.prevent="showOrderConfirmation">Lanjut Pengiriman</button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <dialog-order-confirmation
      :visible.sync="dialogOrderConfirmation.visible"
      @close="onOrderConfirmationClose"
      @confirm="onOrderConfirmationProceed"/>
  </div>
</template>

<script>
import CalculatorResult from '../../components/CalculatorResult'
import KiriminList from '../../components/KiriminList'
import DialogOrderConfirmation from '../../components/DialogOrderConfirmation'

export default {
  components: {
    CalculatorResult,
    KiriminList,
    DialogOrderConfirmation
  },
  data () {
    return {
      config: {
        originCity: 151,
        weightUnits: 'kg',
        volumeUnits: 'cm'
      },
      input: {
        country: '',
        category: '',
        itemName: '',
        itemPrice: '',
        itemQuantity: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        address: '',
        courier: 'jne',
        npwp: false,
        consolidate: false,
        asuransi: false
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
      errorMessage: '',
      kiriminitems: [],
      dialogOrderConfirmation: {
        visible: false
      }
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
              value: item.name,
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
      this.__fetchUserAddresses().then(res => {
        this.options.address = res.data.data.map(item => {
          let $item = {
            value: item.kabupatenId,
            label: `${item.alias} - ${item.alamat1}`
          }

          return $item
        })

        let addresses = res.data.data.filter(item => item.primary)

        this.input.address = addresses[0].kabupatenId
      })
    },
    check () {
      this.error = false
      this.errorMessage = ''
      let itemsLength = 0
      let itemsWidth = 0
      let itemsHeight = 0
      let itemsWeight = 0
      let itemsPrice = 0
      let itemsNPWP = false
      let itemsAsuransi = false
      if (this.kiriminitems.length === 0) {
        itemsLength = this.input.length
        itemsWidth = this.input.width
        itemsHeight = this.input.height
        itemsWeight = this.input.weight
        itemsPrice = this.input.itemPrice
      } else {
        this.kiriminitems.filter(function (item) {
          itemsWeight += parseInt(item.beratBarang)
          itemsPrice += parseInt(item.hargaBarang)
        })
        itemsLength = this.input.length
        itemsWidth = this.input.width
        itemsHeight = this.input.height
      }
      itemsNPWP = this.input.npwp
      itemsAsuransi = this.input.asuransi
      this.$authHttp.post('/v1/calculator/cost', {
        origin: this.config.originCity,
        wunits: this.config.weightUnits,
        vunits: this.config.volumeUnits,
        country: this.input.country,
        dest: this.input.address,
        courier: this.input.courier,
        weight: itemsWeight,
        length: itemsLength,
        width: itemsWidth,
        height: itemsHeight,
        harga: itemsPrice,
        qty: this.input.itemQuantity,
        npwp: itemsNPWP,
        asuransi: itemsAsuransi
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
        'qty': 1,
        'goodsName': this.input.itemName,
        'type': 1,
        'agentId': 12,
        'status': 1,
        'asuransi': this.input.asuransi,
        'npwp': this.input.npwp
      }).then(response => {
        this.clearInput()
        this.$router.push({ name: 'member-order' })
      }).catch(error => {
        if (error.response) {
          console.log('Store Error')
          this.error = true
          this.errorMessage = error.response.data.message
        }
      })
    },
    clearInput () {
      this.input.category = ''
      this.input.itemName = ''
      this.input.itemPrice = ''
      this.input.itemQuantity = ''
      this.input.weight = ''
      this.input.length = ''
      this.input.width = ''
      this.input.height = ''
      this.input.address = ''
      this.input.asuransi = true
    },
    addItem () {
      let item = {
        jenisBarang: this.input.category,
        namaBarang: this.input.itemName,
        hargaBarang: this.input.itemPrice,
        beratBarang: this.input.weight,
        dimensiBarang: this.input.length + 'x' + this.input.width + 'x' + this.input.height
      }
      this.kiriminitems.push(item)
    },
    showOrderConfirmation () {
      this.dialogOrderConfirmation.visible = true
    },
    onOrderConfirmationClose () {
      this.dialogOrderConfirmation.visible = false
    },
    onOrderConfirmationProceed () {
      this.dialogOrderConfirmation.visible = false
      this.storeOrder()
    },
    onChange (value) {
      this.input.consolidate = value
      console.log('log' + this.input)
    },
    onAsuransiChange (value) {
      this.input.asuransi = value
      console.log('log' + this.input)
    }
  },
  created () {
    this.fetchCategories()
    this.fetchWarehouses()
    this.fetchAddresses()
  }
}
</script>
