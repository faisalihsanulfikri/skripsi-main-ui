<template>
  <div class="create-referral-code-page">
    <div class="uk-card uk-card-default uk-card-small">
      <!-- Header -->
      <div class="uk-card-header app--card-header">
        <div uk-grid>
          <div class="uk-width-auto">
            <div class="app--card-header__icon">
              <font-awesome-icon icon="tags"></font-awesome-icon>
            </div>
          </div>
          <div class="uk-width-expand">
            <div class="app--card-header_title">
              <h3>Edit Referral Code</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="main-content" v-loading="loadingContent">
        <!-- User Input -->
        <div class="form-group">
          <label for="user_id" style="display:block">USER</label>
          <el-input v-model="input.user_name" :disabled="true"></el-input>
        </div>

        <!-- Referral Code Input -->
        <div class="form-group">
          <label for="referral_code">REFERRAL CODE</label>
          <el-input
            v-model="input.referral_code"
            placeholder="Please input"
            @change="setToUppercase"
          ></el-input>
        </div>

        <!-- Active Input -->
        <div class="form-group">
          <label for="referral_code" style="display:block">ACTIVE STATUS</label>
          <el-switch v-model="activeStatus" active-text="YES" inactive-text="NO"></el-switch>
        </div>

        <!-- Set As Promo Code Radio -->
        <div class="form-group">
          <label>SET AS PROMO REFERRAL?</label>
          <el-radio-group style="display:block" v-model="setAsPromoCode" size="small">
            <el-radio-button label="Yes"></el-radio-button>
            <el-radio-button label="No"></el-radio-button>
          </el-radio-group>
        </div>

        <!-- Addition Input: Promo Code Form -->
        <PromoCodeForm v-if="showAdditionalInput" :input="input" style="margin-bottom:1rem"></PromoCodeForm>

        <!-- Create Button -->
        <el-button type="success" @click="editReferralCode" :loading="loadingBtn">Edit</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import PromoCodeForm from "@/components/referral-codes/PromoCodeForm";
export default {
  name: "CreateReferralCodePage",
  components: { PromoCodeForm },
  data: () => ({
    setAsPromoCode: "No",
    showAdditionalInput: false,
    input: {
      referral_code: "",
      active: "no",
      id_user: "",
      capacity: "0",
      start_date: "",
      end_date: "",
      promo_referral: "0",
      in_used: "0",
      user_name: ""
    },
    listOfUserReferral: [],
    loadingBtn: false,
    activeStatus: false,
    loadingContent: true
  }),
  watch: {
    /**
     * Berfungsi menampilkan input tambahan jika user memilih `Yes`
     * pada input radio `setAsPromoCode`.
     */
    setAsPromoCode(value) {
      if (value == "Yes") this.showAdditionalInput = true;
      else this.showAdditionalInput = false;
    },

    /**
     * Berfungsi untuk menantukan nilai `input.active' dan `input.promo_referral`
     * yang nilainya tergantung dari nilai `activeStatus`.
     */
    activeStatus(value) {
      if (value) {
        this.input.active = "yes";
        this.input.promo_referral = "1";
      } else {
        this.input.active = "no";
        this.input.promo_referral = "0";
        this.input.capacity = "0";
        this.input.start_date = "";
        this.input.end_date = "";
      }
    }
  },
  methods: {
    /**
     * Berfungsi mengunbah nilai inputan `referral_code`
     * menjadi huruf besar semua, sebelum dikirimkan ke server.
     */
    setToUppercase(value) {
      this.input.referral_code = value.toUpperCase();
    },

    /**
     * Berfungsi memperbaharui referral code.
     */
    editReferralCode() {
      if (!this.input.referral_code) {
        return this.$notify({
          title: "Warning",
          type: "warning",
          message: "Please enter the referral code name"
        });
      }

      const payload = {
        ...this.input,
        active: this.input.active ? "yes" : "no",
        id_user: this.input.user_id
      };

      this.$authHttp
        .put(`/referral-code/${this.$route.params.refId}`, payload)
        .then(res => {
          this.$router.push({ name: "admin-referral-codes" });

          this.$notify({
            title: "Success",
            message: res.data.message,
            type: "success"
          });
        })
        .catch(err => this.__handleError(this, err, false));

      this.loadingBtn = true;
    },

    /**
     * Berfungsi mengisikan nilai untuk `listOfUserReferral`
     * yang digunakan untuk option el-select `input.id_user`.
     */
    fetchListOfUserReferral() {
      const endpoint = `/referral-code/users`;

      return this.$authHttp
        .get(endpoint)
        .then(res => {
          this.listOfUserReferral = res.data.data.map(el => ({
            value: el.user_id,
            label: el.user_name
          }));
        })
        .catch(err => this.__handleError(this, err, false));
    },

    /**
     * Berfungsi mengambil data referral code berdasarkan id-nya.
     */
    fetchReferralCodeUsers() {
      const refId = this.$route.params.refId;

      this.$authHttp
        .get("/referral-codes")
        .then(res => {
          this.input = res.data.data.find(el => el.referral_id == refId);
          this.activeStatus = this.input.is_active == "yes";
          this.loadingContent = false;
        })
        .catch(err => this.__handleError(this, err, false));
    }
  },
  created() {
    this.fetchReferralCodeUsers();
    this.fetchListOfUserReferral();
  }
};
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
}
.main-content {
  padding: 1rem;
}
</style>