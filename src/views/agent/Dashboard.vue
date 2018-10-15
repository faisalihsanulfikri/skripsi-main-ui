<template>
  <div>
    <h1>Dashboard Agent</h1>
    <div class="uk-flex">
      <base-chart />
      <base-chart />
    </div>
  </div>
</template>

<script>
import BaseChart from '../../components/BaseChart'

export default {
  components: {
    BaseChart
  }
}
</script>
