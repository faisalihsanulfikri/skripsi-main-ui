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
    resetInput(page) {
      page.title = "";
      page.body = "";
      page.slug = "";
    },
    createSlug(string) {
      return slugify(string, {
        replacement: "-",
        remove: null, // regex to remove characters
        lower: true
      });
    },
    async onSave() {
      const payload = {
        title: this.page.title,
        body: this.page.body,
        slug: this.createSlug(this.page.title)
      };

      try {
        this.__startLoading();

        const page = this.page;
        const endpoint = "/configs/pages/create";
        const createPage = await this.$authHttp.post(endpoint, payload);
        const isSuccess = createPage.data.success;
        const message = createPage.data.message;

        if (isSuccess) {
          this.$notify({
            title: "SUCCESS",
            message: message,
            type: "success"
          });

          this.resetInput(page);
        }
      } catch (error) {
        const errStatus = error.response.status;
        const errMsg = error.response.data.message;

        if (errStatus === 422) {
          this.$notify({
            title: "Warning",
            message: errMsg,
            type: "warning"
          });
        } else {
          this.$notify({
            title: "Error",
            message:
              "Terjadi kesalahan pada server, harap hubungi admin@kirimin.co.id",
            type: "error"
          });
        }
      }

      this.__stopLoading();
    },
    onReset() {
      let page = this.page;
      this.resetInput(page);
    }
  }
};
</script>

<style lang="scss" scoped>
.tinymce {
  margin-bottom: 2rem;
}
</style>
