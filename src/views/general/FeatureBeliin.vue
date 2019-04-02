<template>
  <div class="uk-margin-top uk-margin-bottom">
    <div class="uk-card uk-card-default">
      <div class="uk-card-header uk-text-center">
        <h3 class="uk-card-title">Jasa pembelian barang dari luar negeri dan pengirimannya</h3>
      </div>
      <div class="uk-card-body">
        <div uk-grid>
          <div class="uk-text-center">
            <feature-box :items="features" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeatureBox from '../../components/FeatureBox'

export default {
  name: 'Home',
  components: {
    FeatureBox
  },
  data () {
    return {
      features: [
        {
          icon: 'bullhorn',
          title: 'Tanpa pembelian minimun, bisa satuan ataupun grosir',
          text: ''
        },
        {
          icon: 'sign-in-alt',
          title: 'Layanan pengurusan custom clearance',
          text: ''
        },
        {
          icon: 'dollar-sign',
          title: 'Komisi pembelian yang bersaing',
          text: ''
        },
        {
          icon: 'wallet',
          title: 'Jaminan paket tiba di gudang luar negeri',
          text: ''
        },
        {
          icon: 'warehouse',
          title: 'Tim membantu pengecekan scammer/fraud website',
          text: ''
        }
      ]
    }
  }
}
</script>
