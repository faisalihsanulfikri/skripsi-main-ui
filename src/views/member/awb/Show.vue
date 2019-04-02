<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <a href="#" @click.prevent="$router.go(-1)">
              <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </a>
          </div>
        </div>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="cube"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>
              <span>Air Waybill - {{ awb.awb }}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body uk-card-small">
      <div class="uk-grid-small" uk-grid>
        <div class="uk-width-1-2">
          <div v-if="awb.detail" class="uk-margin-small">
            <div class="app--list-label">Goods Price</div>
            <div class="app--list-text">{{ `IDR ${awb.detail.packet_info.stringPrice}` }}</div>
          </div>
          <div v-if="awb.detail" class="uk-margin-small">
            <div class="app--list-label">Weight</div>
            <div class="app--list-text">{{ `${awb.detail.packet_info.stringWeight} ${awb.detail.packet_info.weight_unit}` }}</div>
          </div>
          <div v-if="awb.detail" class="uk-margin-small">
            <div class="app--list-label">Dimension</div>
            <div class="app--list-text">{{ `${awb.detail.packet_info.stringLength} x ${awb.detail.packet_info.stringWidth} x ${awb.detail.packet_info.stringHeight} ${awb.detail.packet_info.volume_unit}` }}</div>
          </div>
        </div>
        <div class="uk-width-1-2">
          <div class="uk-margin-small">
            <div class="app--list-label">Created At</div>
            <div class="app--list-text">{{ awb.created_at }}</div>
          </div>
        </div>
      </div>
      <div class="uk-table-responsive">
        <table class="uk-table uk-table-divider uk-table-small uk-text-small">
          <thead>
            <tr>
              <th>Name</th>
              <th class="uk-text-right">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in awb.items" :key="index">
              <td>{{ item.name }}</td>
              <td class="uk-text-right">{{ item.stringQuantity }}</td>
            </tr>
          </tbody>
        </table>
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

  created () {
    this.getAwb()
  },

  methods: {
    printAwb (code) {
      window.open(
        `/print-awb/${code}`,
        'Kirimin - Print AWB',
        'directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=0,width=800'
      )
    },
    async getAwb () {
      this.__startLoading()

      try {
        let res = await this.$service.awb.find(this.$route.params.code)

        this.awb = res.data
        this.awb.detail.packet_info['stringPrice'] = this.__internationalCurrency(this.awb.detail.packet_info.price)
        this.awb.detail.packet_info['stringWeight'] = this.__internationalCurrency(this.awb.detail.packet_info.weight)
        this.awb.detail.packet_info['stringLength'] = this.__internationalCurrency(this.awb.detail.packet_info.length)
        this.awb.detail.packet_info['stringWidth'] = this.__internationalCurrency(this.awb.detail.packet_info.width)
        this.awb.detail.packet_info['stringHeight'] = this.__internationalCurrency(this.awb.detail.packet_info.height)
        this.awb.items.map(item => {
          item['stringQuantity'] = this.__internationalCurrency(item.quantity)

          return item
        })
      } catch (err) {
        this.__handleError(this, err, true)
      }

      this.__stopLoading()
    }
  }
}
</script>
