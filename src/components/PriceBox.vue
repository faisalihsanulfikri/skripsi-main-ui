<template>
  <div class="app--price-box">
    <div class="app--price-box-header">
      <h3 class="app--price-box-title">{{ title }}</h3>
    </div>
    <div class="app--price-box-content">
      <div class="app--price-box-price">
        <div>
          <div>{{ price }}</div>
          <div>{{ metaPrice }}</div>
        </div>
      </div>
      <div v-for="(item, key) in items" :key="key" class="app--price-box-item uk-text-center">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: '',
    price: '',
    metaPrice: '',
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
