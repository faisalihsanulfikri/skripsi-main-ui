<template>
  <div class="app--slider__home swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="../assets/images/banner/banner-1.jpg">
      </div>
      <div class="swiper-slide">
        <img src="../assets/images/banner/banner-2.jpg">
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'

import 'swiper/dist/css/swiper.min.css'

export default {
  name: 'HomeSlider',
  data () {
    return {
      swiper: null
    }
  },
  mounted () {
    this.swiper = new Swiper('.app--slider__home', {
      loop: true,
      autoplay: true,
      fadeEffect: {
        crossFade: true
      }
    })
  }
}
</script>

<style scoped>
.app--slider__home {
  text-align: center;
}
</style>
