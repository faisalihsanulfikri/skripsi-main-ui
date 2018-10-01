<template>
  <div class="uk-margin-top uk-margin-bottom">
    <div class="uk-card uk-card-default uk-card-body">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="uk-margin-small">
            <iframe src="https://www.youtube.com/embed/NrmMk1Myrxc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
          <div class="uk-margin-small">
            <iframe src="https://www.youtube.com/embed/eXYHNWLKg-g" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
        </div>
        <div class="uk-width-expand">
          <home-slider/>
        </div>
      </div>
      <div class="uk-margin-large-top">
        <div class="uk-text-center">
          <h2 class="uk-margin-large">Kami hadir untuk Anda</h2>
          <feature-box :items="features" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeSlider from '../components/HomeSlider'
import FeatureBox from '../components/FeatureBox'

export default {
  name: 'Home',
  components: {
    HomeSlider,
    FeatureBox
  },
  data () {
    return {
      features: [
        {
          icon: 'bullhorn',
          title: 'Pengiriman Pasti Tiba',
          text: 'Paket Anda sampai dalam waktu tercepat'
        },
        {
          icon: 'sign-in-alt',
          title: 'Layanan Dukungan',
          text: 'Tim profesional yang siap membantu melancarkan pengiriman paket'
        },
        {
          icon: 'dollar-sign',
          title: 'Garansi Uang Kembali',
          text: 'Uang kembali jika terjadi kesalahan pengiriman'
        },
        {
          icon: 'wallet',
          title: 'Tanpa Biaya Tambahan',
          text: 'Tanpa biaya tambahan.'
        },
        {
          icon: 'warehouse',
          title: 'Gudang Internasional',
          text: 'Gudang kami terletak di beberapa negara'
        },
        {
          icon: 'truck',
          title: 'Hemat Ongkir Hingga 70%',
          text: 'Gudang 7 negara'
        }
      ]
    }
  }
}
</script>
