<template>
  <div>
    <div class="uk-grid-small uk-grid-match uk-margin" uk-grid>
      <div class="uk-width-1-2">
        <div class="uk-card uk-card-default uk-card-small">
          <div class="uk-card-header">
            <h3 class="uk-card-title">Pengiriman</h3>
          </div>
          <div class="uk-card-body">
            <div class="uk-margin-small">
              <label class="uk-form-label">Gudang Kirimin</label>
              <select v-model="input.warehouse" class="uk-select" @change="onWarehouseChanged">
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
              <select v-model="input.address" class="uk-select" @change="onAddressChanged">
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
                  <input v-model="input.insurance" type="radio" value="1" @change="onInsuranceChanged">
                  <span class="uk-margin-small-left">Ya</span>
                </label>
                <label>
                  <input v-model="input.insurance" type="radio" value="0" @change="onInsuranceChanged">
                  <span class="uk-margin-small-left">Tidak</span>
                </label>
              </div>
            </div>
            <div class="uk-margin-small">
              <label class="uk-form-label">Consolidate</label>
              <div class="uk-child-width-auto" uk-grid>
                <label>
                  <input v-model="input.consolidate" type="radio" value="1">
                  <span class="uk-margin-small-left">Ya</span>
                </label>
                <label>
                  <input v-model="input.consolidate" type="radio" value="0">
                  <span class="uk-margin-small-left">Tidak</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="uk-width-1-2">
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
                @change="onCategoryChanged">
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
              <label class="uk-form-label">Referensi (ex. Invoice#, SO#)</label>
              <input
                v-model="input.item.reference"
                name="itemName"
                class="uk-input">
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
              <button v-if="parseInt(input.consolidate) === 1" class="uk-button uk-button-default" @click="multiCheck">Tambah</button>
              <template v-else>
                <button class="uk-button uk-button-default" @click="singleCheck">Hitung</button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="input.items.length > 0" id="card-consolidate" class="uk-card uk-card-default uk-card-small uk-margin">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Daftar Barang</h3>
      </div>
      <div class="uk-card-body">
        <div class="uk-overflow-auto">
          <table class="uk-table uk-table-divider uk-table-small uk-text-small">
            <thead>
              <th>Jenis Barang</th>
              <th>Nama Barang</th>
              <th>Referensi</th>
              <th class="uk-text-right">Jumlah Barang</th>
              <th class="uk-text-right">Harga Barang (IDR)</th>
              <th class="uk-text-center">Berat ({{ config.weightUnits }})</th>
              <th class="uk-text-center">Dimensi ({{ config.volumeUnits }})</th>
              <th width="50">Action</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in input.items" :key="index">
                <td>{{ item.categoryName }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.reference }}</td>
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
    </div>

    <div id="card-cost" class="uk-card uk-card-default uk-card-small uk-margin">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Estimasi Biaya</h3>
      </div>
      <div class="uk-card-body">
        <calculator-result :cost="cost" @npwp-change="onNpwpChanged"></calculator-result>
      </div>
      <div class="uk-card-footer uk-text-right">
        <button
          class="uk-button uk-button-primary uk-margin-small-left"
          :disabled="input.items.length < 1"
          @click="order">
          Lanjut Pengiriman
        </button>
      </div>
    </div>

    <!-- <dialog-order-confirmation
      :visible="dialogOrderConfirmation"
      @close="onCloseConfrimOrder"
      @confirm="storeOrder">
    </dialog-order-confirmation> -->
  </div>
</template>

<script>
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
        items: [],
        address: '',
        item: {
          category: '',
          categoryName: '',
          name: '',
          reference: '',
          price: '',
          quantity: '',
          weight: '',
          length: '',
          width: '',
          height: ''
        }
      },
      master: {
        warehouses: [],
        addresses: [],
        categories: []
      },
      options: {
        warehouse: [],
        address: [],
        category: [],
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

  watch: {
    'input.consolidate': 'onConsolidateChanged'
  },

  async created () {
    await this.fetchWarehouses()
    await this.fetchAddresses()

    this.fetchCategories()
  },

  methods: {
    async fetchWarehouses () {
      await this.__fetchWarehouses().then(res => {
        this.master.warehouses = res.data
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
    async fetchAddresses () {
      await this.__fetchUserAddresses().then(res => {
        this.master.addresses = res.data
        this.options.address = res.data.map(item => {
          let $item = {
            value: item.id,
            label: `${item.alias} - ${item.name} - ${item.phone}`
          }

          return $item
        })

        if (res.data.length > 0) {
          this.input.address = res.data[0].id
          this.input.destination = res.data[0].code
        }
      })
    },
    fetchCategories () {
      this.$authHttp.get('/categories/list').then(res => {
        this.master.categories = res.data
        this.options.category = res.data.map(item => {
          let $item = {
            value: item.id,
            label: item.name
          }

          return $item
        })
        this.input.item.category = res.data[0].id
        this.input.item.categoryName = res.data[0].name
      })
    },
    onWarehouseChanged () {
      if (this.input.items.length > 0) {
        this.check()
      }
    },
    onAddressChanged () {
      let address = this.master.addresses.find(address => {
        return address.id === this.input.address
      })

      this.input.destination = address.code

      if (this.input.items.length > 0) {
        this.check()
      }
    },
    onInsuranceChanged () {
      if (this.input.items.length > 0) {
        this.check()
      }
    },
    onConsolidateChanged (newVal, oldVal) {
      this.input.items = []
    },
    onNpwpChanged (val) {
      this.input.npwp = val === true ? 1 : 0

      this.check()
    },
    onCategoryChanged () {
      let category = this.master.categories.find(category => {
        return category.id === this.input.item.category
      })

      this.input.item.categoryName = category.name
    },
    removeItem (index) {
      this.input.items.splice(index, 1)

      if (this.input.items.length === 0) {
        this.cost = this.$options.data().cost

        return
      }

      this.check()
    },
    singleCheck () {
      this.input.items = []
      this.input.items.push(this.input.item)

      this.check()
    },
    multiCheck () {
      this.input.items.push(Object.assign({}, this.input.item))
      this.input.item = this.$options.data().input.item
      this.input.item.category = this.master.categories[0].id

      this.check()
    },
    check () {
      this.$authHttp.post('/calculator', this.input).then(res => {
        this.cost = res.data.result.cost

        this.__focusElement('card-cost')
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
    },
    order () {
      this.$authHttp.post('/orders/kirimin', this.input).then(res => {
        if (res.data.success) {
          this.$notify({
            title: 'SUCCESS',
            message: res.data.message,
            type: 'success'
          })
        }

        this.$router.push({ name: 'member-order' })
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
