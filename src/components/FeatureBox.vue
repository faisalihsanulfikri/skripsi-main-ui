<template>
  <div class="uk-grid-small" uk-grid>
    <div v-for="(item, index) in items" :key="index" class="uk-width-1-3">
      <div class="app--feature-box">
        <div class="app--feature-box-icon">
          <font-awesome-icon :icon="item.icon"/>
        </div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      required: true
    }
  }
}
</script>
