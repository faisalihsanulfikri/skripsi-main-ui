<template>
  <div class="uk-card-header app--card-header">
    <div uk-grid>
      <div class="uk-width-auto">
        <div class="app--card-header__icon">
          <!-- TODO: Tampilkan icon ini secara dinamis, tergantung dari nama page nya -->
          <ios-analytics-icon w="24px" h="24px" class="ionicon"/>
        </div>
      </div>
      <div class="uk-width-expand">
        <div class="app--card-header_title">
          <h3>{{ title }}</h3>
        </div>
      </div>
      <div class="uk-width-auto"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    title: {
      type: String,
      default: "Page Title"
    }
  }
};
</script>

