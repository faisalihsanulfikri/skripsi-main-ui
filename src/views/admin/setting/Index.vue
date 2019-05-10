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
        <div class="uk-width-auto"></div>
      </div>
    </div>
    <div class="uk-card-body uk-card-small">
      <div v-for="(setting, index) in settings" :key="index">
        <h5 class="uk-heading-line">
          <span>{{ setting.name }}</span>
        </h5>
        <div v-if="setting.type === 'array'" class="uk-margin-small">
          <div v-for="(val, valIndex) in setting.value" :key="`val_${valIndex}`">
            <div v-for="(itemKey, itemIndex) in Object.keys(val)" :key="`item_${itemIndex}`">
              <div class="uk-margin-small">
                <div v-if="itemKey == 'active_status'">
                  <el-radio v-model="settings[index].value[valIndex][itemKey]" label="1">Active</el-radio>
                  <el-radio v-model="settings[index].value[valIndex][itemKey]" label="0">Inactive</el-radio>
                </div>
                <div v-else>
                  <el-input v-model="settings[index].value[valIndex][itemKey]" size="small">
                    <div slot="prepend" class="uk-width-medium">{{ itemKey }}</div>
                  </el-input>
                </div>
              </div>
            </div>
            <a v-on:click="delRow(index,valIndex)">
              <font-awesome-icon icon="trash-alt" style="color:grey"></font-awesome-icon>
            </a>
            <br>
          </div>
        </div>
        <div v-if="setting.type === 'object'" class="uk-margin-small">
          <div
            v-for="(itemKey, itemIndex) in Object.keys(setting.value)"
            :key="`item_${itemIndex}`"
          >
            <div class="uk-margin-small">
              <div v-if="itemKey == 'active'">
                <el-radio
                  v-model="settings[index].value[itemKey]"
                  :label="actv_true"
                  @change="onActiveChanged(true)"
                >Active</el-radio>
                <el-radio
                  v-model="settings[index].value[itemKey]"
                  :label="actv_false"
                  @change="onActiveChanged(false)"
                >Inactive</el-radio>
              </div>
              <div v-else>
                <el-input
                  :disabled="(dimension.active == 'false') && ((itemKey == 'regular') || (itemKey == 'premium') || (itemKey == 'default'))"
                  v-model="settings[index].value[itemKey]"
                  size="small"
                >
                  <div slot="prepend" class="uk-width-medium">{{ itemKey }}</div>
                </el-input>
              </div>

              <!-- <el-input v-model="settings[index].value[itemKey]" size="small">
                <div slot="prepend" class="uk-width-medium">{{ itemKey }}</div>
              </el-input>-->
            </div>
          </div>
        </div>
        <div class="uk-text-right">
          <el-button type="primary" @click="addRow(index)">Add Row</el-button>
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
  data() {
    return {
      settings: [],
      dimension: {
        active: ""
      },
      actv_true: true,
      actv_false: false
    };
  },

  async created() {
    this.__startLoading();

    await this.fetchConfigs();

    this.__stopLoading();
  },

  methods: {
    async fetchConfigs() {
      try {
        let res = await this.$service.config.all();

        this.settings = res.data;
        console.log(this.settings);
      } catch (err) {
        this.__handleError(this, err, true);
      }
    },
    onActiveChanged(active) {
      if (!active) {
        this.dimension.active = "false";
      } else {
        this.dimension.active = "true";
      }
      console.log(active);

      // return active;
    },
    async update() {
      this.__startLoading();

      try {
        let res = await this.$service.config.update(this.settings);

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },
    addRow(test) {
      switch (this.settings[test].name) {
        case "bank_accounts":
          this.settings[test].value.push({
            bank: "",
            account_number: "",
            name: "",
            active_status: "0"
          });
          break;
        case "transfer_bank":
          this.settings[test].value.push({
            bank: "",
            account_number: "",
            name: "",
            active_status: "0"
          });
          break;
        case "paypal":
          break;
        case "credit_card":
          break;
      }
    },
    delRow(x, y) {
      this.settings[x].value.splice(y, 1);
    }
  }
};
</script>
