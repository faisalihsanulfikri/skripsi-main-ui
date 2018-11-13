<template>
  <div>
    <router-view></router-view>
    <loading-full-screen v-if="$store.state.app.loading"></loading-full-screen>
  </div>
</template>

<script>
import LoadingFullScreen from './components/LoadingFullScreen'

export default {
  components: {
    LoadingFullScreen
  },

  created () {
    this.$store.dispatch('kirimin/getFormula')
  }
}
</script>
