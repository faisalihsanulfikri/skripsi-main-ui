<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header">
      <h3 class="uk-card-title">Pengiriman</h3>
    </div>
    <div class="uk-card-body">
      <div uk-grid>
        <div class="uk-width-1-2">
          <div class="uk-margin-small">
            <label class="uk-form-label">Gudang Kirimin</label>
            <select v-model="input.warehouse" class="uk-select">
              <option
                v-for="({ option }, key) in master.warehouses"
                :key="key"
                :value="option.value">
                  {{ option.label }}
                </option>
            </select>
          </div>
          <div class="uk-margin-small">
            <label class="uk-form-label">Alamat Penerima</label>
            <select v-model="input.address" class="uk-select">
              <option
                v-for="({ option }, key) in master.addresses"
                :key="key"
                :value="option.value">
                  {{ option.label }}
                </option>
            </select>
          </div>
          <div class="uk-margin-small">
            <label class="uk-form-label">Asuransi
              <a class="uk-margin-small-left uk-text-danger" href="#">
                <font-awesome-icon icon="info-circle"></font-awesome-icon>
              </a>
            </label>
            <div class="uk-child-width-auto" uk-grid>
              <label>
                <input v-model="input.insurance" type="radio" value="1">
                <span class="uk-margin-small-left">Ya</span>
              </label>
              <label>
                <input v-model="input.insurance" type="radio" value="0">
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
        <div class="uk-width-1-2">
          <div class="uk-alert-success uk-padding-small">
            <p>Mau potongan pembayaran dengan NPWP?</p>
            <div>
              <label>
                <input v-model="input.npwp" type="checkbox" value="1">
                <span class="uk-margin-small-left uk-text-small" style="color: #333;">Ya, saya mau.</span>
              </label>
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
      input: {
        warehouse: '',
        destination: '',
        npwp: 0,
        insurance: 0,
        consolidate: 0,
        address: ''
      },
      master: {
        warehouses: [],
        addresses: []
      }
    }
  },

  created () {
    await this.fetchWarehouses()
    await this.fetchAddresses()
  },

  methods: {
    async fetchWarehouses () {
      await this.__fetchWarehouses().then(res => {
        this.master.warehouses = res.data.map(item => {
          item.option = {
            value: item.code,
            label: item.name
          }

          return item
        })

        if (res.data.length > 0) {
          this.master.warehouses = res.data
          this.input.warehouse = res.data[1].code
        }
      })
    },
    async fetchAddresses () {
      await this.__fetchUserAddresses().then(res => {
        this.master.addresses = res.data.map(item => {
          item.option = {
            value: item.code,
            label: item.label
          }
          
          return item
        })

        if (res.data.length > 0) {
          this.input.address = res.data[0].id
          this.input.destination = res.data[0].code
        }
      })
    },
  }
}
</script>
