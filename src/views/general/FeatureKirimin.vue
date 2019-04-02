<template>
  <div class="uk-margin-top uk-margin-bottom">
    <div class="uk-card uk-card-default">
      <div class="uk-card-header uk-text-center">
        <h3 class="uk-card-title">Pengiriman paket/barang dari luar negeri</h3>
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
          title: 'Alamat gudang di beberapa negara',
          text: ''
        },
        {
          icon: 'sign-in-alt',
          title: 'Hitungan berat per 500 gram',
          text: ''
        },
        {
          icon: 'dollar-sign',
          title: 'Hemat biaya kirim sampai dengan 80%',
          text: ''
        },
        {
          icon: 'wallet',
          title: 'Perhitungan transparan',
          text: ''
        },
        {
          icon: 'warehouse',
          title: 'Tanpa biaya tambahan di belakang',
          text: ''
        },
        {
          icon: 'wallet',
          title: 'Tracking status pengiriman',
          text: ''
        },
        {
          icon: 'warehouse',
          title: 'Pengabungan beberapa items menjadi 1 paket',
          text: ''
        }
      ]
    }
  }
}
</script>
