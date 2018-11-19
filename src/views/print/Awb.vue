<template>
  <div class="print-wrapper" uk-height-viewport>
    <div class="uk-grid uk-grid-small">
      <div class="uk-width-auto">
        <img src="../../assets/logo-kirimin.jpg" width="200" />
      </div>
      <div class="uk-width-expand uk-flex uk-flex-center uk-flex-middle">
        <div class="uk-text-center">
          <img v-if="order.awb" :src="`${$web.defaults.baseURL}/barcode/${order.awb}`" />
          <h5 class="uk-margin-small-top">{{ order.awb }}</h5>
        </div>
      </div>
    </div>
    <div class="uk-grid uk-grid-small" uk-grid>
      <div class="uk-width-1-2">
        <div v-if="order.shipper">
          <h5 class="uk-margin-remove">
            <span class="uk-text-bold">Shipper</span>
            <span> : {{ order.shipper.name }}</span>
          </h5>
          <div class="uk-margin-small">
            {{ `${order.shipper.address} ${order.shipper.city} ${order.shipper.zip_code}` }}
          </div>
          <div class="uk-margin-small">
            {{ order.shipper.region }}
          </div>
          <div class="uk-margin-small">{{ order.shipper.phone }}</div>
        </div>
      </div>
      <div class="uk-width-1-2">
        <div v-if="order.receiver">
          <h5 class="uk-margin-remove">
            <span class="uk-text-bold">Receiver</span>
            <span> : {{ order.receiver.name }}</span>
          </h5>
          <div class="uk-margin-small">
            {{ `${order.receiver.address} ${order.receiver.sub_district} ${order.receiver.city} ${order.receiver.postal_code}` }}
          </div>
          <div class="uk-margin-small">
            {{ order.receiver.province }}
          </div>
          <div class="uk-margin-small">{{ order.receiver.phone }}</div>
        </div>
      </div>
    </div>
    <hr />
    <div>
      <div v-for="item in order.items" :key="`${item.id}_item`" class="uk-margin-small">
        <div class="uk-grid-small" uk-grid>
          <div class="uk-width-2-3">
            <div>{{ item.category.name }} # {{ item.name }} # {{ item.reference }}</div>
            <div>{{ item.stringPrice }} IDR</div>
          </div>
          <div class="uk-width-1-3">
            <div>{{ item.stringWeight }} {{ order.detail.formula.weight_unit }}</div>
            <div>
              {{ item.stringLength }} x {{ item.stringWidth }} x {{ item.stringLength }} {{ order.detail.formula.volume_unit }}
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
      order: {}
    }
  },

  async created () {
    await this.getOrder()
  },

  methods: {
    async getOrder () {
      try {
        let res = await this.$authHttp.get(`/orders/${this.$route.params.code}`)

        this.order = res.data

        this.order.items.map(item => {
          item['selected'] = true
          item['stringPrice'] = this.$options.filters.currency(item.price, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
          item['stringQuantity'] = this.$options.filters.currency(item.quantity, '', 0, { thousandsSeparator: '.', decimalSeparator: ',' })
          item['stringWeight'] = this.$options.filters.currency(item.weight, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
          item['stringLength'] = this.$options.filters.currency(item.length, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
          item['stringWidth'] = this.$options.filters.currency(item.width, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
          item['stringHeight'] = this.$options.filters.currency(item.height, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
        })

        setTimeout(() => {
          window.print()
          window.close()
        }, 500)
      } catch (err) {
        if (err.response) {
          let msg = err.response.data.message ? err.response.data.message : err.response.statusText

          this.$notify({
            title: 'ERROR',
            message: msg,
            type: 'error'
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.print-wrapper {
  background-color: #FFF;
  padding: 20px;
}
</style>
