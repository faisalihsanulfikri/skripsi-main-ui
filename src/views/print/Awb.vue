<template>
  <div class="print-wrapper">
    <div class="print-content">
      <div class="uk-grid uk-grid-small">
        <div class="uk-width-expand">
          <img src="../../assets/logo-kirimin.jpg" width="100" />
        </div>
      </div>

      <div v-if="awb.order" class="uk-margin">
        <h6 class="uk-heading-line uk-text-left">
          <span>{{ awb.order.user.code }}</span>
        </h6>
      </div>

      <div class="uk-grid-small uk-grid-divider" uk-grid>
        <div class="uk-width-expand">
          <div class="uk-margin">
            <h5 class="uk-margin-remove uk-text-bold">SHIPPER</h5>
            <div v-if="awb.detail" class="uk-padding-small">
              <div>{{ `${awb.detail.shipper_name} - ${awb.detail.shipper_phone}` }}</div>
              <div>{{ `${awb.detail.shipper_address}, ${awb.detail.shipper_city} ${awb.detail.shipper_zip_code}` }}</div>
              <div>{{ awb.detail.shipper_region }}</div>
            </div>
          </div>
          <div class="uk-margin">
            <h5 class="uk-margin-remove uk-text-bold">RECEIVER</h5>
            <div v-if="awb.detail" class="uk-padding-small">
              <div>{{ `${awb.detail.receiver_name} - ${awb.detail.receiver_phone}` }}</div>
              <div>{{ `${awb.detail.receiver_address}, ${awb.detail.receiver_city} ${awb.detail.receiver_zip_code}` }}</div>
              <div>{{ awb.detail.receiver_region }}</div>
            </div>
          </div>
        </div>
        <div class="uk-width-1-2">
          <div class="uk-margin">
            <div v-if="awb.order" class="uk-text-center">
              <img class="barcode-image" :src="`${$web.defaults.baseURL}/barcode/${awb.order.code}?w=1&h=75`" width="150" />
              <h5 class="uk-margin-small-top">{{ awb.order.code }}</h5>
            </div>
            <div v-if="awb.awb" class="uk-text-center">
              <img class="barcode-image" :src="`${$web.defaults.baseURL}/barcode/${awb.awb}?w=1&h=75`" width="150" />
              <h5 class="uk-margin-small-top">{{ awb.awb }}</h5>
            </div>
          </div>
        </div>
      </div>

      <hr>

      <div v-if="awb.items" class="uk-margin">
        <div class="uk-grid-small" uk-grid>
          <div class="uk-width-expand">
            <h5 class="uk-margin-remove uk-text-bold">GOODS</h5>
          </div>
          <div class="uk-width-auto uk-text-right">
            <template v-if="awb.detail && awb.detail.packet_info">
              <span class="uk-margin-small-right">{{ `IDR ${awb.detail.packet_info.stringPrice}` }}</span>
              <span class="uk-margin-small-right">{{ `${awb.detail.packet_info.stringWeight} ${awb.detail.packet_info.weight_unit}` }}</span>
              <span>
                {{ `${awb.detail.packet_info.stringLength} x ${awb.detail.packet_info.stringWidth} x ${awb.detail.packet_info.stringHeight} ${awb.detail.packet_info.volume_unit}` }}
              </span>
            </template>
          </div>
        </div>
        <div class="uk-padding-small">
          <ul class="uk-list uk-list uk-margin-remove">
            <li v-for="(item, index) in awb.items" :key="index">
              {{ `${item.name} ${item.quantity} ${item.unit}` }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      awb: {}
    }
  },

  async created () {
    await this.getAirWaybill()

    let images = document.querySelectorAll('.barcode-image')
    let totalImages = images.length
    let loadedImages = 0

    images.forEach(image => {
      image.onload = () => {
        loadedImages += 1

        if (totalImages === loadedImages) this.print()
      }
    })
  },

  methods: {
    print () {
      window.print()
      window.close()
    },
    async getAirWaybill () {
      try {
        let res = await this.$service.orderAirWaybill.find(this.$route.params.number)

        this.awb = res.data

        this.$util.orderItem.stringCurrency(this.awb.items)
        this.awb.detail.packet_info['stringPrice'] = this.$options.filters.currency(this.awb.detail.packet_info.price, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
        this.awb.detail.packet_info['stringWeight'] = this.$options.filters.currency(this.awb.detail.packet_info.weight, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
        this.awb.detail.packet_info['stringLength'] = this.$options.filters.currency(this.awb.detail.packet_info.length, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
        this.awb.detail.packet_info['stringWidth'] = this.$options.filters.currency(this.awb.detail.packet_info.width, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
        this.awb.detail.packet_info['stringHeight'] = this.$options.filters.currency(this.awb.detail.packet_info.height, '', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
      } catch (err) {
        this.__handleError(this, err, true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.print-wrapper {
  background-color: #FFF;
  height: 100vh;
  padding: 20px;

  .print-content {
    width: 105mm;
    height: 148mm;
    padding: 2mm;
    border: solid 1px #E5E5E5;
    font-size: 0.5rem;

    h5 {
      font-size: 0.6rem;
    }

    h6 {
      font-size: 0.5rem;
    }
  }
}
</style>
