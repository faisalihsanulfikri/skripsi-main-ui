<template>
  <div>
    <div class="uk-card uk-card-default uk-card-small">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Beliin</h3>
      </div>
      <div class="uk-card-body">
        <div uk-grid>
          <div class="uk-width-auto">
            <div class="uk-margin">
              <label class="uk-form-label">Consolidate</label>
              <ul class="uk-subnav uk-subnav-pill" uk-switcher="connect: .my-class">
                <li><a href="#">Tidak</a></li>
                <li><a href="#">Ya</a></li>
              </ul>
            </div>
          </div>
          <div class="uk-width-1-4">
            <div class="uk-margin">
              <label class="uk-form-label">NPWP</label>
              <select class="uk-select">
                <option>Ya</option>
                <option>Tidak</option>
              </select>
            </div>
          </div>
          <div class="uk-width-1-4">
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
          <div class="uk-width-1-4">
            <div class="uk-margin">
              <label class="uk-form-label">Alamat Penerima</label>
              <select v-model="input.address" class="uk-select">
                <option
                  v-for="item in options.address"
                  :key="item.value"
                  :value="item.value">
                    {{ item.label }}
                  </option>
              </select>
            </div>
          </div>
        </div>
        <div uk-grid>
          <div class="uk-width-1-2">
            <div class="uk-margin">
              <label class="uk-form-label">Website</label>
              <input v-model="input.website" class="uk-input">
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">URL</label>
              <input v-model="input.url" class="uk-input">
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
          <div class="uk-width-expand">
            <div class="uk-margin">
              <label class="uk-form-label">Nama Barang</label>
              <input v-model="input.itemName" class="uk-input">
            </div>
          </div>
          <div class="uk-width-1-6">
            <div class="uk-margin">
              <label class="uk-form-label">Harga Barang (IDR)</label>
              <input v-model="input.itemPrice" class="uk-input" type="number">
            </div>
          </div>
          <div class="uk-width-1-6">
            <div class="uk-margin">
              <label class="uk-form-label">Jumlah Barang</label>
              <input v-model="input.itemQuantity" class="uk-input" type="number">
            </div>
          </div>
          <div class="uk-width-1-6">
            <div class="uk-margin">
              <label class="uk-form-label">Berat ({{ config.weightUnits }})</label>
              <input v-model="input.weight" type="number" class="uk-input">
            </div>
          </div>
        </div>
        <div uk-grid>
          <div class="uk-width-1-2">
            <div class="uk-margin">
              <div v-if="error" class="uk-alert-danger" uk-alert>
                {{ errorMessage }}
              </div>
            </div>
          </div>
          <div class="uk-width-1-2">
            <div class="uk-margin">
              <ul class="uk-switcher my-class uk-margin">
                  <li><button class="uk-button uk-button-primary uk-width-1-4" disabled>Tambah</button></li>
                  <li><button class="uk-button uk-button-primary uk-width-1-4">Tambah</button></li>
              </ul>
            </div>
          </div>
        </div>
        <div uk-grid>
          <div class="uk-width-1-1">
              <table class="uk-table uk-table-divider uk-width-expand">
                <caption>List</caption>
                <thead>
                  <th>Jenis Barang</th>
                  <th>Nama Barang</th>
                  <th>Harga</th>
                  <th>Berat</th>
                  <th>Dimensi</th>
                </thead>
                <tbody>
                  <tr>
                    <td class="uk-width-1-5">111</td>
                    <td class="uk-width-1-5">111</td>
                    <td class="uk-width-1-5">111</td>
                    <td class="uk-width-1-5">111</td>
                    <td class="uk-width-1-5">111</td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
        <div uk-grid>
          <div class="uk-width-1-4">
            <div class="uk-margin">
              <label class="uk-form-label">Biaya pengirimin domestik (seller to gudang Kirimin)</label>
              <input v-model="input.itemDomesticCost" class="uk-input" type="number">
            </div>
          </div>
        </div>
        <div uk-grid>
          <div class="uk-width-1-4">
            <div class="uk-margin">
              <label class="uk-form-label">Pajak Domestik</label>
              <input v-model="input.itemDomesticTax" class="uk-input" type="number">
            </div>
          </div>
        </div>
        <div uk-grid>
          <div class="uk-width-1-1">
            <div class="uk-margin">
              <button class="uk-button uk-button-primary uk-width-1-4">Hitung</button>
            </div>
            <template v-if="result.items">
              <hr>
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
                      <td>NPWP</td>
                      <td class="uk-text-right">
                        {{ item.npwp | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                      </td>
                    </tr>
                    <tr>
                      <td>Total Bayar</td>
                      <td class="uk-text-right">
                        {{ item.totalBayar | currency('Rp. ', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
export default {
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
        address: ''
      },
      options: {
        category: [],
        warehouse: [],
        address: []
      },
      result: {
        items: [
          {

          }
        ]
      },
      error: false,
      errorMessage: ''
    }
  },
  methods: {
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
