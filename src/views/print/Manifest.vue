<template>
  <div class="print-wrapper">
    <div class="print-content">
      <div class="uk-grid uk-grid-small">
        <div class="uk-width-expand">
          <img src="../../assets/logo-kirimin.jpg" width="100" />
        </div>
      </div>

        <h6 class="uk-heading-line uk-text-left">
          <span>{{ manifests.manifest_no }}</span>
        </h6>
        <h5 class="uk-margin-remove uk-text-bold">AWB - RECEIVER - ADDRESS</h5>
        <div class="uk-padding-small">
          <div v-for="(manifest, index) in manifests.order_awb">
            <font size='1'>{{manifest.awb}} - {{manifest.detail.receiver_name}} - {{manifest.detail.receiver_address}}</font>
          </div>
        </div>



      <!-- <div v-if="awb.items" class="uk-margin">
        <div class="uk-padding-small">
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      manifests: {}
    }
  },
  created () {
    this.getManifest()
  },
  methods: {
    print () {
      window.print()
      window.close()
    },
    async getManifest () {
      try {
        let res = await this.$service.manifest.find(this.$route.params.number)
        this.manifests = res.data.data
      } catch (e) {
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
