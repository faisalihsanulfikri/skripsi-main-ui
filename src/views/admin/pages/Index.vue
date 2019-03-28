<template>
  <div class="uk-card uk-card-default">
    <!-- Header -->
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
              <span>Pages</span>
            </h3>
          </div>
        </div>
        <div class="uk-width-auto"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="uk-card-body uk-card-small">
      <el-form :model="page">
        <!-- Page Title -->
        <el-form-item label="Title">
          <el-input v-model="page.title" placeholder="Page title..."></el-input>
        </el-form-item>

        <!-- Page body -->
        <tinymce id="page_body" v-model="page.body" class="tinymce"></tinymce>

        <!-- Buttons -->
        <el-form-item>
          <el-button type="primary" @click="onSave">Save</el-button>
          <el-button @click="onReset">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: {
        title: "",
        body: ""
      }
    };
  },
  methods: {
    onSave() {
      console.log(this.page);
    },
    onReset() {
      let page = this.page;
      (page.title = ""), (page.body = "");
    }
  }
};
</script>

<style lang="scss" scoped>
.tinymce {
  margin-bottom: 2rem;
}
</style>
