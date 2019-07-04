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
        <el-input v-model="input.nama_paket"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Harga Paket</label>
        <el-input v-model="input.harga_paket"></el-input>
      </div>
    </div>
    <div class="uk-card-footer uk-text-right">
      <el-button type="primary" @click="save">SAVE</el-button>
    </div>
    <div class="uk-margin">
        <label class="uk-form-label">Membership Days</label>
        <el-input v-model="input.membership_days" name="membership_days" type="number"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Membership Discount %</label>
        <el-input v-model="input.membership_discount" name="membership_discount" type="number"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Membership Discount </label>
        <el-input v-model="input.membership_commision" name="membership_commission" type="number"></el-input>
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
        harga_paket: "",
        membership_days: "",
        membership_discount: ""
      },
      error: false,
      errorMessage: ""
    };
  },

   created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.title = "Edit Memberships";

      this.getmembership();
    }

    console.log(this.$route.params.id);
  },

  methods: {
    onMembershipChanged() {
      if (this.input.length > 0) {
        this.input.nama_paket = "";
        this.input.harga_paket = "";
      }
    },
    async getMembership() {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.membership.find(this.$route.params.id);

        this.input.nama_paket = res.data.nama_paket;
        this.input.harga_paket = res.data.harga_paket;
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },
    async save() {
      let nama_paket = this.input.nama_paket
      let harga_paket = this.input.harga_paket
      let endpoint = '/memberships'
      let payload = {nama_paket,harga_paket}
      try {
        let res = await this.$authHttp.post(endpoint,payload)
        this.$router.push('/admin/membership');
      } catch (error) {
        this.__handleError(this,error,true)
      }
      // if (this.edit) {
      //   this.update();
      // } else {
      //   this.store();
      // }
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

        this.$router.push({ name: "membership" });
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    }
  }
};
</script>
