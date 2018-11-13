<template>
  <router-view></router-view>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('kirimin/getFormula')
  },

  methods: {
    logout () {
      this.$auth.destroyToken()
      this.$router.go({
        name: 'home',
        force: true
      })
    }
  }
}
</script>
