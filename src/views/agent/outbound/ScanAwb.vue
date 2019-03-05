<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="file-alt"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>
              <span>Scan AWB</span>
            </h3>
          </div>
        </div>
        <div class="uk-width-auto">
        </div>
      </div>
    </div>
    <div class="uk-card-body uk-card-small">
      <div class="uk-margin uk-grid-small" uk-grid>
          scan awb
          <input type="text" ref="search" @keyup.enter="">
          <button type="button" @click="">scan</button>
      </div>
      <div>
        <input type="checkbox" id="jack" value="Jack" v-model="checkedManifest">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedManifest">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedManifest">
        <label for="mike">Mike</label>
        <br>
        <span>Checked names: {{ checkedManifest }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkedManifest: []
    }
  },
  mounted() {
    this.setFocus()
  },
  methods: {
    setFocus: function()
    {
      this.$refs.search.focus()
    }
  }
}

</script>
