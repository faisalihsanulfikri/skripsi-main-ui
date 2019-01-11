<template>
  <div>
    <div class="uk-grid-small uk-grid-match uk-margin" uk-grid>
      <div class="uk-width-1-2">
        <div class="uk-card uk-card-default uk-card-small">
          <div class="uk-card-header">
            <h3 class="uk-card-title">Shipping Info</h3>
          </div>
          <div class="uk-card-body">
            <h5 class="uk-heading-line"><span>Shipper</span></h5>
            <div class="uk-margin-small">
              <label class="uk-form-label">Warehouse</label>
              <div>
                <el-select v-model="input.warehouse" class="uk-width-1-1" @change="onWarehouseChanged">
                  <el-option v-for="item in options.warehouse" :key="item.value" :value="item.value" :label="item.label">
                  </el-option>
                </el-select>
              </div>
            </div>
            <h5 class="uk-heading-line"><span>Receiver</span></h5>
            <div class="uk-margin-small">
              <label class="uk-form-label">Customer</label>
              <div>
                <el-autocomplete v-model="input.customerString" :fetch-suggestions="fetchUsers" :trigger-on-focus="false"
                  class="uk-width-1-1" @select="onUserSelected" clearable>
                </el-autocomplete>
              </div>
            </div>
            <div class="uk-margin-small">
              <label class="uk-form-label">Receiver Address</label>
              <div>
                <select v-model="input.address" v-validate="rules.address" name="address" class="uk-select" :class="{ 'uk-form-danger': errors.has('address') }"
                  @change="onUserAddressChanged">
                  <option v-for="(item, key) in options.address" :key="key" :value="item.value">
                    {{ item.label }}
                  </option>
                </select>
              </div>
            </div>
            <h5 class="uk-heading-line"><span>Extra</span></h5>
            <!-- <div class="uk-margin-small">
              <label class="uk-form-label">
                Asuransi
                <el-tooltip class="item" effect="dark" content="Perlindungan pengiriman" placement="top">
                  <font-awesome-icon icon="info-circle"></font-awesome-icon>
                </el-tooltip>
              </label>
              <div class="uk-child-width-auto" uk-grid>
                <label>
                  <input v-model="input.insurance" class="uk-radio" type="radio" value="1" @click="onInsuranceChanged">
                  <span class="uk-margin-small-left">Ya</span>
                </label>
                <label>
                  <input v-model="input.insurance" class="uk-radio" type="radio" value="0" @click="onInsuranceChanged">
                  <span class="uk-margin-small-left">Tidak</span>
                </label>
              </div>
            </div>
            <div class="uk-margin-small">
              <label class="uk-form-label">
                Consolidate
                <el-tooltip class="item" effect="dark" content="Pengiriman lebih dari 1 paket" placement="top">
                  <font-awesome-icon icon="info-circle"></font-awesome-icon>
                </el-tooltip>
              </label>
              <div class="uk-child-width-auto" uk-grid>
                <label>
                  <input v-model="input.consolidate" class="uk-radio" type="radio" value="1" @click="onConsolidateChanged">
                  <span class="uk-margin-small-left">Ya</span>
                </label>
                <label>
                  <input v-model="input.consolidate" class="uk-radio" type="radio" value="0" @click="onConsolidateChanged">
                  <span class="uk-margin-small-left">Tidak</span>
                </label>
              </div>
            </div> -->
            <div class="uk-margin-small">
              <label class="uk-form-label">Notes</label>
              <textarea v-model="input.note" class="uk-textarea" rows="5"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="uk-width-1-2">
        <div class="uk-card uk-card-default uk-card-small">
          <div class="uk-card-header">
            <h3 class="uk-card-title">Package</h3>
          </div>
          <div class="uk-card-body">
            <!-- <div class="uk-margin-small">
              <label class="uk-form-label">Types of goods</label>
              <select v-model="input.item.category" v-validate="rules.item.category" name="category" class="uk-select"
                :class="{ 'uk-form-danger': errors.has('category') }" @change="onCategoryChanged">
                <option v-for="(item, key) in options.category" :key="key" :value="item.value">
                  {{ item.label }}
                </option>
              </select>
            </div> 

            <hr> -->

            <div class="uk-margin-small">
              <div class="uk-grid-small" uk-grid>
                <div class="uk-width-expand">
                  <label class="uk-form-label">
                    Name of goods
                    <el-tooltip class="item" effect="dark" content="Barang" placement="top">
                      <font-awesome-icon icon="info-circle"></font-awesome-icon>
                    </el-tooltip>
                  </label>
                  <input v-model="input.item.goods.name" name="item.goods.name" class="uk-input" :class="{ 'uk-form-danger': errors.has('item.goods.name') }"
                    placeholder="Name of goods" />
                </div>
                <div class="uk-width-expand">
                  <label class="uk-form-label">
                    Total
                    <el-tooltip class="item" effect="dark" content="Jumlah barang" placement="top">
                      <font-awesome-icon icon="info-circle"></font-awesome-icon>
                    </el-tooltip>
                  </label>
                  <input v-model="input.item.goods.quantity" name="item.goods.quantity" class="uk-input" :class="{ 'uk-form-danger': errors.has('item.goods.quantity') }"
                    placeholder="Total" />
                </div>
                <div class="uk-width-expand">
                  <label class="uk-form-label">
                    Unit
                    <el-tooltip class="item" effect="dark" content="Unit / satuan barang" placement="top">
                      <font-awesome-icon icon="info-circle"></font-awesome-icon>
                    </el-tooltip>
                  </label>
                  <input v-model="input.item.goods.unit" name="item.goods.unit" class="uk-input" :class="{ 'uk-form-danger': errors.has('item.goods.unit') }"
                    placeholder="Unit" />
                </div>
                <div class="uk-width-auto">
                  <label class="uk-form-label">&nbsp;</label>
                  <div>
                    <button class="uk-button uk-button-default" @click="addGoods">
                      <font-awesome-icon icon="plus"></font-awesome-icon>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">
                Package Contents
                <el-tooltip class="item" effect="dark" content="Isi Paket" placement="top">
                  <font-awesome-icon icon="info-circle"></font-awesome-icon>
                </el-tooltip>
              </label>
              <ul v-if="input.item.goodsList.length > 0" class="uk-list">
                <li v-for="(goods, index) in input.item.goodsList" :key="index">
                  <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-expand">
                      {{ goods.name }} {{ goods.quantity }} {{ goods.unit }}
                    </div>
                    <div class="uk-width-auto">
                      <a href="#" class="uk-text-danger" @click.prevent="removeGoods(index)">
                        <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-else class="uk-text-center">There are no items.</div>
            </div>
            <hr>
            <div class="uk-margin-small">
              <label class="uk-form-label">
                Reference (ex. Invoice#, SO#)
                <el-tooltip class="item" effect="dark" content="Referensi" placement="top">
                  <font-awesome-icon icon="info-circle"></font-awesome-icon>
                </el-tooltip>
              </label>
              <textarea v-model="input.item.reference" class="uk-textarea" rows="2"></textarea>
            </div>
            <div class="uk-margin-small">
              <label class="uk-form-label">
                <span class="uk-margin-small-right">Total Price of Goods in the Package</span>
                <el-tooltip class="item" effect="dark" content="Total harga barang dalam paket." placement="top">
                  <font-awesome-icon icon="info-circle"></font-awesome-icon>
                </el-tooltip>
              </label>
              <el-input-select-mask v-model="input.item.currencyPrice" :options="markOptions.numeral" :error="errors.has('price')"
                @input="onTypingCurrency" @blur="onTypingCurrency">
                <el-select v-model="input.item.currency" slot="append" style="width: 100px" @change="onCurrencyChanged">
                  <el-option value="idr_rate" label="IDR"></el-option>
                  <el-option value="dollar_rate" label="USD"></el-option>
                  <el-option value="cny_rate" label="CNY"></el-option>
                  <el-option value="krw_rate" label="WON"></el-option>
                  <el-option value="sgd_rate" label="SGD"></el-option>
                </el-select>
                <input slot="input" v-model="input.item.price" v-validate="rules.item.price" name="price" type="hidden">
              </el-input-select-mask>
            </div>
            <div class="uk-margin-small">
              <el-input-append-mask :value="input.item.price" :options="markOptions.numeral" :error="errors.has('price')"
                :readonly="true">
                <span slot="append">IDR</span>
                <input slot="input" v-model="input.item.price" v-validate="rules.item.price" name="price" type="hidden">
              </el-input-append-mask>
            </div>
            <div class="uk-margin-small uk-hidden">
              <label class="uk-form-label">The amount of goods</label>
              <input v-model="input.item.quantity" v-validate="rules.item.quantity" name="quantity" class="uk-input"
                :class="{ 'uk-form-danger': errors.has('quantity') }" />
            </div>
            <div class="uk-margin-small">
              <label class="uk-form-label">
                <span class="uk-margin-small-right">Weight ({{ config.weightUnits }})</span>
                <el-tooltip class="item" effect="dark" content="Berat paket." placement="top">
                  <font-awesome-icon icon="info-circle"></font-awesome-icon>
                </el-tooltip>
              </label>
              <el-input-mask v-model="input.item.weight" :options="markOptions.numeral" :error="errors.has('weight')"
                @input="val => input.item.weight = val" @blur="val => input.item.weight = val">
                <input slot="input" v-model="input.item.weight" v-validate="rules.item.weight" name="weight" type="hidden">
              </el-input-mask>
            </div>
            <div class="uk-margin-small">
              <label class="uk-form-label">
                <span class="uk-margin-small-right">Dimension (L x W x H {{ config.volumeUnits }})</span>
                <el-tooltip class="item" effect="dark" content="Volume paket." placement="top">
                  <font-awesome-icon icon="info-circle"></font-awesome-icon>
                </el-tooltip>
              </label>
              <div class="uk-grid-small" uk-grid>
                <div class="uk-width-1-3">
                  <el-input-mask v-model="input.item.length" :options="markOptions.numeral" :error="errors.has('length')"
                    @input="val => input.item.length = val" @blur="val => input.item.length = val">
                    <input slot="input" v-model="input.item.length" v-validate="rules.item.length" name="length" type="hidden">
                  </el-input-mask>
                </div>
                <div class="uk-width-1-3">
                  <el-input-mask v-model="input.item.width" :options="markOptions.numeral" :error="errors.has('width')"
                    @input="val => input.item.width = val" @blur="val => input.item.width = val">
                    <input slot="input" v-model="input.item.width" v-validate="rules.item.width" name="width" type="hidden">
                  </el-input-mask>
                </div>
                <div class="uk-width-1-3">
                  <el-input-mask v-model="input.item.height" :options="markOptions.numeral" :error="errors.has('height')"
                    @input="val => input.item.height = val" @blur="val => input.item.height = val">
                    <input slot="input" v-model="input.item.height" v-validate="rules.item.height" name="height" type="hidden">
                  </el-input-mask>
                </div>
              </div>
            </div>
          </div>
          <div class="uk-card-footer">
            <div class="uk-text-right">
              <button v-if="parseInt(input.consolidate) === 1" class="uk-button uk-button-default" @click="multiCheck">Add</button>
              <template v-else>
                <button class="uk-button uk-button-default" @click="singleCheck">Calculate</button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="input.items.length > 0" id="card-item" class="uk-card uk-card-default uk-card-small uk-margin">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Package List</h3>
      </div>
      <div class="uk-card-body">
        <div class="uk-overflow-auto">
          <table class="uk-table uk-table-divider uk-table-small uk-text-small">
            <thead>
              <th>Types of goods</th>
              <th>Name of goods</th>
              <th>Reference</th>
              <th class="uk-text-right">The amount of goods</th>
              <th class="uk-text-right">Price of goods (IDR)</th>
              <th class="uk-text-center">Weight ({{ config.weightUnits }})</th>
              <th class="uk-text-center">Dimension ({{ config.volumeUnits }})</th>
              <th width="50">Action</th>
            </thead>
            <tbody>

              <tr v-for="(item, index) in input.items" :key="index">
                <td>{{ item.categoryName }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.reference }}</td>
                <td class="uk-text-right">{{ item.quantity }}</td>
                <td class="uk-text-right">{{ item.price | currency('', 2, { thousandsSeparator: '.', decimalSeparator:
                  ',' }) }}</td>
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
      <div class="uk-card-footer uk-text-right">
        <!-- <button
          class="uk-button uk-button-primary"
          :disabled="input.items.length < 1"
          @click="openConfirmationDialog">
            Next
        </button> -->

        <button class="uk-button uk-button-primary" :disabled="input.items.length < 1" @click="order">
          Order Now
        </button>
      </div>
    </div>

    <dialog-order-confirmation :visible="dialogOrderConfimation.visible" :amount="cost.estimatedShippingCostFinal"
      @close="closeConfirmationDialog" @confirm="order">
    </dialog-order-confirmation>
  </div>
</template>

<script>
  import _ from 'lodash'

  import DialogOrderConfirmation from '../../../components/DialogOrderConfirmation'

  import ElInputMask from '../../../components/ElInputMask'
  import ElInputAppendMask from '../../../components/ElInputAppendMask'
  import ElInputSelectMask from '../../../components/ElInputSelectMask'

  import {
    REGULAR,
    PREMIUM
  } from '../../../config/level'

  export default {
    components: {
      DialogOrderConfirmation,
      ElInputMask,
      ElInputAppendMask,
      ElInputSelectMask
    },

    data() {
      return {
        dialogOrderConfimation: {
          visible: false,
          data: {}
        },
        config: {
          originCity: 151,
          weightUnits: 'kg',
          volumeUnits: 'cm'
        },
        input: {
          customer: '',
          customerString: '',
          customerAddress: '',
          warehouse: '',
          destination: '',
          npwp: 0,
          insurance: 0,
          consolidate: 0,
          note: '',
          paymentMethod: 'Transfer Bank',
          items: [],
          address: '',
          item: {
            category: '',
            categoryName: '',
            name: 'item.name',
            reference: '',
            price: '',
            currency: 'idr_rate',
            currencyPrice: '',
            quantity: 1,
            weight: '',
            length: '',
            width: '',
            height: '',
            goods: {
              name: '',
              quantity: '',
              unit: ''
            },
            goodsList: []
          }
        },
        rules: {
          address: 'required',
          item: {
            // category: 'required',
            name: 'required',
            price: 'required|decimal:2',
            quantity: 'required|numeric',
            weight: 'required|decimal:2',
            length: 'required|decimal:2',
            width: 'required|decimal:2',
            height: 'required|decimal:2',
            goods: {
              name: 'required',
              quantity: 'required|numeric',
              unit: 'required'
            }
          }
        },
        markOptions: {
          numeral: {
            numeral: true,
            numertalThousandGroupStyle: 'thousand',
            numeralDecimalMark: ',',
            delimiter: '.'
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
          courier: [{
            value: 'jne',
            label: 'JNE'
          }]
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

    async created() {
      this.__startLoading()

      await this.fetchWarehouses()
      await this.fetchCategories()

      this.__stopLoading()
    },

    methods: {
      onConsolidateChanged() {
        this.$confirm('The package and items you input will be lost, are you sure?', 'warning', {
          type: 'warning'
        }).then(() => {
          this.input.items = []
          this.cost = this.$options.data().cost
        }).catch(() => {
          this.input.consolidate = parseInt(this.input.consolidate) === 0 ? 1 : 0
        })
      },
      onCurrencyChanged() {
        this.input.item.price = this.input.item.currencyPrice * this.$store.state.kirimin.formula[this.input.item.currency]

        if (this.input.items.length > 0 && !this.input.consolidate) {
          this.check()
        }
      },
      onInsuranceChanged() {
        if (this.input.items.length > 0) {
          this.check()
        }
      },
      onTypingCurrency: _.debounce(function (val) {
        this.input.item.currencyPrice = val
        this.onCurrencyChanged()
      }, 500),
      onUserAddressChanged() {
        let address = this.master.addresses.find(address => {
          return address.id === this.input.address
        })

        this.input.destination = address.code
      },
      async onUserSelected(user) {
        this.input.customer = user.id

        try {
          let res = await this.$service.user.getAddressesById(user.id)

          this.master.addresses = res.data
          this.options.address = res.data.map(item => {
            let $item = {
              value: item.id,
              label: `${item.alias} - ${item.name} - ${item.phone} - ${item.province} - ${item.city} -
${item.sub_district} - ${item.address} - ${item.postal_code}`
            }

            return $item
          })

          if (res.data.length > 0) {
            this.input.address = res.data[0].id
            this.input.destination = res.data[0].code
          }
        } catch (err) {
          this.__handleError(this, err, true)
        }
      },
      onWarehouseChanged() {
        if (this.input.items.length > 0) {
          this.check()
        }
      },
      openConfirmationDialog() {
        this.dialogOrderConfimation.visible = true
      },
      closeConfirmationDialog() {
        this.dialogOrderConfimation.visible = false
      },
      async fetchUsers(queryString, cb) {
        try {
          let res = await this.$service.user.get({
            active: [1],
            level: [REGULAR, PREMIUM],
            search: queryString
          })

          let items = res.data.data.map(item => {
            return {
              value: `${item.code} - ${item.name}`,
              id: item.id
            }
          })

          cb(items)
        } catch (err) {
          this.__handleError(this, err, true)
        }
      },
      async fetchWarehouses() {
        try {
          let res = await this.$service.agent.getWarehouses()

          this.master.warehouses = res.data
          this.input.warehouse = res.data[0].code

          this.options.warehouse = res.data.map(item => {
            let $item = {
              value: item.code,
              label: item.name
            }

            return $item
          })
        } catch (err) {
          this.__handleError(this, err, true)
        }
      },
      async fetchCategories() {
        try {
          let res = await this.$service.category.all()

          this.master.categories = res.data
          this.options.category = res.data.map(item => {
            let $item = {
              value: item.id,
              label: item.name
            }

            return $item
          })
          this.input.item.category = res.data[3].id
          this.input.item.categoryName = res.data[3].name
        } catch (err) {
          this.__handleError(this, err, true)
        }
      },
      onNpwpChanged(val) {
        this.input.npwp = val === true ? 1 : 0

        this.check()
      },
      onCategoryChanged() {
        let category = this.master.categories.find(category => {
          return category.id === this.input.item.category
        })

        this.input.item.categoryName = category.name
      },
      async addGoods() {
        this.input.item.goodsList.push(Object.assign({}, this.input.item.goods))

        this.input.item.goods = this.$options.data().input.item.goods
      },
      removeGoods(index) {
        this.input.item.goodsList.splice(index, 1)
      },
      removeItem(index) {
        this.input.items.splice(index, 1)

        if (this.input.items.length === 0) {
          this.cost = this.$options.data().cost

          return
        }

        this.check()
      },
      async singleCheck() {
        if (!(await this.$validator.validate())) return

        if (this.input.item.goodsList.length < 1) {
          this.$notify({
            title: 'ERROR',
            message: 'There are no items.',
            type: 'error'
          })

          return
        }

        this.input.item.weight = this.__roundHalf(this.input.item.weight)
        this.input.item.length = this.__roundHalf(this.input.item.length)
        this.input.item.width = this.__roundHalf(this.input.item.width)
        this.input.item.height = this.__roundHalf(this.input.item.height)
        this.input.items = []
        this.input.items.push(this.input.item)

        this.check()
      },
      async multiCheck() {
        if (!(await this.$validator.validate())) return

        if (this.input.item.goodsList.length < 1) {
          this.$notify({
            title: 'ERROR',
            message: 'There are no items.',
            type: 'error'
          })

          return
        }

        this.input.items.push(Object.assign({}, this.input.item))
        this.input.item = this.$options.data().input.item
        this.input.item.category = this.master.categories[0].id
        this.input.item.quantity = 1

        this.check()
      },
      async check() {
        if (this.application.loading) return

        this.__startLoading()

        try {
          let res = await this.$service.calculator.check(this.input)

          this.cost = res.data.result.cost

          this.__focusElement('card-item')
        } catch (err) {
          this.__handleError(this, err, true)
        }

        this.__stopLoading()
      },
      async order() {
        if (this.application.loading) return

        this.__startLoading()

        // this.input.paymentMethod = paymentMethod

        try {
          let res = await this.$service.order.createKiriminFromAgent(this.input)

          this.$notify({
            title: 'SUCCESS',
            message: res.data.message,
            type: 'success'
          })

          this.$router.push({
            name: 'agent-inbound',
            params: {
              code: res.data.data.code
            }
          })
        } catch (err) {
          this.__handleError(this, err, true)
        }

        this.__stopLoading()
      }
    }
  }
</script>