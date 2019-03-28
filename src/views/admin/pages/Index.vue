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

    <!-- Body -->
    <div class="uk-card-body uk-card-small">
      <el-form :model="page">
        <el-form-item label="Title">
          <el-input v-model="page.title" placeholder="Page title..."></el-input>
        </el-form-item>
        <el-form-item label="Body">
          <el-input type="textarea" v-model="page.body">Page Content...</el-input>
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
  }
};
</script>

<style>
</style>
