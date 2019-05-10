<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <router-link :to="{ name: 'membership' }">
              <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </router-link>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body">
      <div class="uk-margin">
        <label class="uk-form-label">Nama Paket</label>
        <el-input v-model="input.nama_paket" name="nama_paket"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Harga Paket</label>
        <el-input v-model="input.harga_paket" name="harga_paket"></el-input>
      </div>
    </div>
    <div class="uk-card-footer uk-text-right">
      <el-button type="primary" @click="save">SAVE</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      edit: false,
      title: "New Memberships",
      input: {
        nama_paket: "",
        harga_paket: ""
      },
      error: false,
      errorMessage: ""
    };
  },
  created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.title = "Edit Memberships";

      this.fetchMemberships();
    }
  },

  methods: {
    onActiveChanged() {
      if (this.input.length > 0) {
        this.input.active = "";
      }
    },
    
    async fetchMemberships() {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.memberships.getMembershipsData(this.$route.params.id);

        this.input = res.data;
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },
    save() {
      if (this.edit) {
        this.update();
      } else {
        this.store();
      }
    },
    async update() {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.memberships.update(
          this.$route.params.id,
          this.input
        );

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.$router.push('/admin/membership');
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    }
  }
};
</script>