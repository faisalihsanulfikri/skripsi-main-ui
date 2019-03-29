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
              <span>Edit Page</span>
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
          <el-button type="primary" @click="onUpdate">Update</el-button>
          <el-button @click="$router.push('/admin/pages')">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import slugify from "slugify";
export default {
  mounted() {
    this.getSinglePage();
  },
  data() {
    return {
      page: {}
    };
  },
  methods: {
    getSinglePage() {
      this.__startLoading();
      const endpoint = "/configs/pages/single";
      const slug = this.$route.params.slug;
      const payload = { slug };

      return this.$authHttp
        .post(endpoint, payload)
        .then(res => {
          this.page = res.data;
          this.__stopLoading();
        })
        .catch(err => {
          console.log(err);
          this.__stopLoading();
        });
    },
    createSlug(string) {
      return slugify(string, {
        replacement: "-",
        remove: null, // regex to remove characters
        lower: true
      });
    },
    onUpdate() {
      const payload = {
        title: this.page.title,
        body: this.page.body,
        slug: this.createSlug(this.page.title)
      };
      const id = this.page.id;
      const endpoint = `/configs/pages/${id}/update`;

      this.$authHttp
        .put(endpoint, payload)
        .then(res => {
          const resData = res.data;
          console.log(resData);
          const isSuccess = resData.success;
          const message = resData.message;

          if (isSuccess) {
            this.$notify({
              title: "SUCCESS",
              message: message,
              type: "success"
            });
            this.__fetchPages();
          }
        })
        .catch(err => {
          console.log(err);
          this.__stopLoading();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.tinymce {
  margin-bottom: 2rem;
}
</style>
