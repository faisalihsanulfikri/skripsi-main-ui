<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="cogs"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>
              <span>Settings</span>
            </h3>
          </div>
        </div>
        <div class="uk-width-auto">
        </div>
      </div>
    </div>
    <div class="uk-card-body uk-card-small">
      <div v-for="(setting, index) in settings" :key="index">
        <h5 class="uk-heading-line"><span>{{ setting.name }}</span></h5>
        <div v-if="setting.type === 'array'" class="uk-margin-small">
          <div v-for="(val, valIndex) in setting.value" :key="`val_${valIndex}`">
            <div v-for="(itemKey, itemIndex) in Object.keys(val)" :key="`item_${itemIndex}`">
              <div class="uk-margin-small">
                <el-input v-model="settings[index].value[valIndex][itemKey]" size="small">
                  <div slot="prepend" class="uk-width-medium">{{ itemKey }}</div>
                </el-input>
              </div>
            </div>
          </div>
        </div>
        <div v-if="setting.type === 'object'" class="uk-margin-small">
          <div v-for="(itemKey, itemIndex) in Object.keys(setting.value)" :key="`item_${itemIndex}`">
            <div class="uk-margin-small">
              <el-input v-model="settings[index].value[itemKey]" size="small">
                <div slot="prepend" class="uk-width-medium">{{ itemKey }}</div>
              </el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-footer">
      <div class="uk-text-right">
        <el-button type="primary" @click="update">Update</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      settings: []
    }
  },

  async created () {
    this.__startLoading()

    await this.fetchConfigs()

    this.__stopLoading()
  },

  methods: {
    async fetchConfigs () {
      try {
        let res = await this.$service.config.all()

        this.settings = res.data
      } catch (err) {
        this.__handleError(this, err, true)
      }
    },
    async update () {
      this.__startLoading()

      try {
        let res = await this.$service.config.update(this.settings)

        this.$notify({
          title: 'SUCCESS',
          message: res.data.message,
          type: 'success'
        })
      } catch (err) {
        this.__handleError(this, err, true)
      }

      this.__stopLoading()
    }
  }
}
</script>
