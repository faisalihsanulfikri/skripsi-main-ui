<template>
  <router-view></router-view>
</template>

<script>
export default {
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
