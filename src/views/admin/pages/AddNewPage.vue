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
              <span>Add New Page</span>
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
import slugify from "slugify";
export default {
  data() {
    return {
      page: {
        title: "",
        body: "",
        slug: ""
      }
    };
  },
  methods: {
    createSlug(string) {
      return slugify(string, {
        replacement: "-",
        remove: null, // regex to remove characters
        lower: true
      });
    },
    onSave() {
      let payload = {
        title: this.page.title,
        body: this.page.body,
        slug: this.createSlug(this.page.title)
      };

      console.log(payload); // Send this payload to server
    },
    onReset() {
      let page = this.page;
      page.title = "";
      page.body = "";
      page.slug = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.tinymce {
  margin-bottom: 2rem;
}
</style>
