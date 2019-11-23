<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  async created() {
    // let chart = await this.chart();
  }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 300px) and (max-width: 720px) {
  .base-chart-row {
    flex-direction: column;

    .el-col {
      margin-bottom: 1rem;
    }
  }
}
</style>
