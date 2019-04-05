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
      <el-row>
        <el-button type="primary" plain @click="$router.push('/admin/pages/add')">Add New</el-button>
      </el-row>

      <!-- List Page -->
      <el-table :data="pages" stripe style="width: 100%">
        <el-table-column label="Date" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.updated_at }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="Title" width="auto"></el-table-column>
        <el-table-column prop="slug" label="Slug" width="auto"></el-table-column>
        <el-table-column label="Operations">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              v-if="scope.row.slug != 'privacy-policy' && scope.row.slug != 'terms-conditions' && scope.row.slug != 'delivery-policy'"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button>
            <el-button v-else size="mini" type="danger" disabled>Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getPages();
  },
  data() {
    return {
      pages: []
    };
  },
  methods: {
    getPages() {
      this.__startLoading();

      const endpoint = "/configs/pages";
      return this.$authHttp
        .get(endpoint)
        .then(res => {
          this.pages = res.data.data;
          this.__stopLoading();
        })
        .catch(err => {
          console.log(err);
          this.__stopLoading();
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
      const slug = row.slug;
      this.$router.push(`/admin/pages/${slug}`);
    },
    async handleDelete(index, row) {
      const id = row.id;
      const title = row.title;
      const endpoint = `/configs/pages/${id}/delete`;
      try {
        const res = await this.$authHttp.delete(endpoint);

        if (res.status === 201) {
          this.$notify({
            type: "success",
            title: "success",
            message: `${title} berhasil dihapus dari database.`
          });
          this.getPages();
        }
      } catch (err) {
        console.log({ err });
        this.$notify({
          type: "error",
          title: "error",
          message:
            "Terjadi kesalahan pada saat menghapus halaman, harap hubungi admin@kirimin.co.id"
        });
      }
    }
  }
};
</script>
