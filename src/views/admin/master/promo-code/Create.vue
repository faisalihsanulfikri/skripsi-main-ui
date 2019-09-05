<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <router-link :to="{ name: 'admin-promo-codes' }">
              <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </router-link>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>{{ title }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body">
      <div class="uk-margin">
        <label class="uk-form-label">Code</label>
        <el-input v-model="input.code" v-validate="rules.code" name="code"></el-input>
        <small
          v-if="errors.first('code')"
          class="uk-margin-small uk-text-danger"
        >{{ errors.first('code') }}</small>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Status</label>
        <div>
          <select v-model="input.status" name="status" class="uk-select" @change="onStatusChanged">
            <option
              v-for="(status, i) in options.status"
              :key="i"
              :value="status.value"
            >{{ status.label }}</option>
          </select>
        </div>
      </div>

      <div class="filter-order uk-margin">
        <label class="uk-form-label">Start Date</label>
        <br />
        <el-date-picker
          class="filter-order"
          style="display:block"
          v-model="input.start_date"
          v-validate="rules.start_date"
          name="start_date"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="Start Date"
        ></el-date-picker>
        <small
          v-if="errors.first('start_date')"
          class="uk-margin-small uk-text-danger"
        >{{ errors.first('start_date') }}</small>
      </div>
      <div class="filter-order uk-margin">
        <label class="uk-form-label">End Date</label>
        <br />
        <el-date-picker
          class="filter-order"
          style="display:block"
          v-model="input.end_date"
          v-validate="rules.end_date"
          name="end_date"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="End Date"
        ></el-date-picker>
        <small
          v-if="errors.first('end_date')"
          class="uk-margin-small uk-text-danger"
        >{{ errors.first('end_date') }}</small>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Description</label>
        <el-input v-model="input.description" type="textarea" rows="4"></el-input>
      </div>

      <!--  -->
      <div class="uk-margin">
        <label class="uk-form-label">Unlimited</label>

        <div class="req-doc">
          <label class="btn-r">
            <input
              v-model="input.unlimited"
              class="uk-radio"
              type="radio"
              value="1"
              @click="onUnlimitedChanged"
            />
            <span class="uk-margin-small-left">True</span>
          </label>

          <label class="btn-r">
            <input
              v-model="input.unlimited"
              class="uk-radio"
              type="radio"
              value="0"
              @click="onUnlimitedChanged"
            />
            <span class="uk-margin-small-left">False</span>
          </label>
        </div>
      </div>
      <!--  -->
      <div class="uk-margin">
        <label class="uk-form-label">Capacity</label>
        <el-input
          v-model="input.capacity"
          v-validate="rules.capacity"
          name="capacity"
          type="number"
        ></el-input>
        <small
          v-if="errors.first('capacity')"
          class="uk-margin-small uk-text-danger"
        >{{ errors.first('capacity') }}</small>
      </div>

      <div class="uk-margin">
        <div style="display:flex">
          <!-- Masukan Promo Referral Code -->
          <div style="margin-right:2rem;">
            <label
              class="uk-form-label"
              style="display:block;margin-bottom:.3rem"
            >Is Referral Code Promo?</label>
            <el-radio-group v-model="insertPromoCode" size="small">
              <el-radio-button label="Yes"></el-radio-button>
              <el-radio-button label="No"></el-radio-button>
            </el-radio-group>
          </div>

          <!-- Is One Time Promo -->
          <div style="margin-right:2rem;">
            <label
              class="uk-form-label"
              style="display:block;margin-bottom:.3rem"
            >Is One Time Promo?</label>
            <el-radio-group v-model="isOneTimePromo" size="small">
              <el-radio-button label="Yes"></el-radio-button>
              <el-radio-button label="No"></el-radio-button>
            </el-radio-group>
            <div>
            <label class="uk-form-label" v-if="isOneTimePromo == 'Yes'">One Time Capacity:</label>
            </div>
            <el-input
              v-if="isOneTimePromo == 'Yes'"
              v-model="input.one_time_capacity"
              name="code"
              type="number"
              style="margin-top:.5rem; width:100px; display:block;"
            ></el-input>
          </div>

          <!-- Is One Time Promo -->
          <div style="margin-right:2rem;">
            <label class="uk-form-label" style="display:block;margin-bottom:.3rem">Is New User Promo?</label>
            <el-radio-group v-model="isNewUser" size="small">
              <el-radio-button label="Yes"></el-radio-button>
              <el-radio-button label="No"></el-radio-button>
            </el-radio-group>
          </div>

          <!-- Is Unique Promo Code -->
          <div style="margin-right:2rem;">
            <label
              class="uk-form-label"
              style="display:block;margin-bottom:.3rem"
            >Is Unique Promo Code?</label>
            <el-radio-group v-model="isUniquePromo" size="small">
              <el-radio-button label="Yes"></el-radio-button>
              <el-radio-button label="No"></el-radio-button>
            </el-radio-group>
            <div>
            <label class="uk-form-label" v-if="isUniquePromo == 'Yes'">Unique Capacity:</label>
            </div>
            <el-input
              v-if="isUniquePromo == 'Yes'"
              v-model="input.unique_capacity"
              name="code"
              type="number"
              style="margin-top:.5rem; width:100px; display:block;"
            ></el-input>
          </div>

          <!-- Is Buy X Get X Promo -->
          <div style="margin-right:2rem;">
            <label
            class="uk-form-label"
            style="display:block;margin-bottom:.3rem"
            >Is Buy X Get X Promo Code?</label>
            <el-radio-group v-model="isBuyxGetxPromo" size="small">
              <el-radio-button label="Yes"></el-radio-button>
              <el-radio-button label="No"></el-radio-button>
            </el-radio-group>
            <div>
              <label class="uk-form-label" v-if="isBuyxGetxPromo == 'Yes'">Minimal Bill:</label>
            </div>
            <el-input
              v-if="isBuyxGetxPromo == 'Yes'"
              v-model="input.minimal_bill"
              name="code"
              type="number"
              style="margin-top:.5rem; width:100px; display:block;"
            ></el-input>
            <div>
              <label class="uk-form-label" v-if="isBuyxGetxPromo == 'Yes'">Minimal Item Price:</label>
            </div>
            <el-input
              v-if="isBuyxGetxPromo == 'Yes'"
              v-model="input.minimal_item_price"
              name="code"
              type="number"
              style="margin-top:.5rem; width:100px; display:block;"
            ></el-input>
            <div>
              <label class="uk-form-label" v-if="isBuyxGetxPromo == 'Yes'">Minimal Shipping Cost:</label>
            </div>
            <el-input
              v-if="isBuyxGetxPromo == 'Yes'"
              v-model="input.minimal_shipping_cost"
              name="code"
              type="number"
              style="margin-top:.5rem; width:100px; display:block;"
            ></el-input>
          </div>

          <!-- Is Buy X Get X Unique-->
          <div style="margin-right:2rem;">
            <label
            class="uk-form-label"
            style="display:block;margin-bottom:.3rem"
            >Is Buy X Get X Unique Promo Code?</label>
            <el-radio-group v-model="isBuyxGetxUniquePromo" size="small">
              <el-radio-button label="Yes"></el-radio-button>
              <el-radio-button label="No"></el-radio-button>
            </el-radio-group>
            <div>
              <label class="uk-form-label" v-if="isBuyxGetxUniquePromo == 'Yes'">Minimal Bill:</label>
            </div>
            <el-input
              v-if="isBuyxGetxUniquePromo == 'Yes'"
              v-model="input.minimal_bill"
              name="code"
              type="number"
              style="margin-top:.5rem; width:100px; display:block;"
            ></el-input>
            <div>
              <label class="uk-form-label" v-if="isBuyxGetxUniquePromo == 'Yes'">Minimal Item Price:</label>
            </div>
            <el-input
              v-if="isBuyxGetxUniquePromo == 'Yes'"
              v-model="input.minimal_item_price"
              name="code"
              type="number"
              style="margin-top:.5rem; width:100px; display:block;"
            ></el-input>
            <div>
              <label class="uk-form-label" v-if="isBuyxGetxUniquePromo == 'Yes'">Minimal Shipping Cost:</label>
            </div>
            <el-input
              v-if="isBuyxGetxUniquePromo == 'Yes'"
              v-model="input.minimal_shipping_cost"
              name="code"
              type="number"
              style="margin-top:.5rem; width:100px; display:block;"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="uk-margin" v-if="showPromoCodeInput">
        <label class="uk-form-label">Referral Codes</label>

        <!-- Add Multiple Promo Referral Codes  -->
        <el-select
          v-model="input.referral_codes"
          multiple
          filterable
          default-first-option
          placeholder="Choose one or more referral codes..."
          style="width:100%;"
        >
          <el-option
            v-for="item in promoReferralCodesOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <div class="uk-margin">
        <label class="uk-form-label">Promo Type</label>
        <div>
          <select
            v-model="input.promo_type"
            name="status"
            class="uk-select"
            @change="onPromoTypeChanged"
          >
            <option
              v-for="(status, i) in options.promo_type"
              :key="i"
              :value="status.value"
            >{{ status.label }}</option>
          </select>
        </div>
      </div>

      <div class="uk-margin" v-if="input.promo_type == 'fixed'">
        <label class="uk-form-label">Value {{input.promo_type}}</label>
        <el-input
          v-model="input.value_fixed"
          type="number"
          v-validate="rules.value_fixed"
          name="value_fixed"
        ></el-input>
        <small
          v-if="errors.first('value_fixed')"
          class="uk-margin-small uk-text-danger"
        >{{ errors.first('value_fixed') }}</small>
      </div>

      <div class="uk-margin" v-else-if="input.promo_type == 'percentage'">
        <label class="uk-form-label">Value {{input.promo_type}}</label>
        <el-input
          v-model="input.value_percentage"
          type="number"
          v-validate="rules.value_percentage"
          name="value_percentage"
        ></el-input>
        <small
          v-if="errors.first('value_percentage')"
          class="uk-margin-small uk-text-danger"
        >{{ errors.first('value_percentage') }}</small>
      </div>

      <div class="uk-margin" v-else-if="input.promo_type == 'point'">
        <label class="uk-form-label">Value {{input.promo_type}}</label>
        <el-input
          v-model="input.value_point"
          type="number"
          v-validate="rules.value_point"
          name="value_point"
        ></el-input>
        <small
          v-if="errors.first('value_point')"
          class="uk-margin-small uk-text-danger"
        >{{ errors.first('value_point') }}</small>
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
      title: "New Promo Code",
      input: {
        code: "",
        status: "",
        start_date: "",
        end_date: "",
        description: "",
        unlimited: "0",
        capacity: "",
        in_used: 0,
        promo_type: "",
        value_fixed: 0,
        value_percentage: 0,
        value_point: 0,
        promo_referral: "0",
        referral_codes: [],
        one_time: "0",
        new_user: "0",
        unique: "0",
        one_time_capacity: "0",
        unique_capacity: "0",
        buy_x_get_x: "0",
        minimal_bill: "0",
        minimal_item_price: "0",
        minimal_shipping_cost: "0"
      },
      master: {
        statuses: [],
        promo_types: [],
        unlimiteds: []
      },
      options: {
        status: [],
        promo_type: [],
        unlimited: []
      },
      rules: {
        code: "required",
        capacity: "required",
        value_fixed: "required",
        value_percentage: "required",
        value_point: "required",
        start_date: "required",
        end_date: "required"
      },
      error: false,
      errorMessage: "",
      insertPromoCode: "No",
      showPromoCodeInput: false,
      promoReferralCodesOption: [],
      isOneTimePromo: "No",
      isNewUser: "No",
      isUniquePromo: "No",
      isBuyxGetxPromo: "No",
      isBuyxGetxUniquePromo: "No" 
    };
  },

  watch: {
    value_fixed() {
      return this.promo_type == "fixed" ? "required" : "";
    },

    /**
     * Menentukan nilai input.promo_referral. Jika nilai promoCode adalah "Yes" maka
     * ubah nilai promo_referral menjadi "1", vice versa.
     */
    insertPromoCode(value) {
      switch (value) {
        case "Yes":
          this.input.promo_referral = "1";
          this.showPromoCodeInput = true;
          this.isOneTimePromo = "No";
          this.isNewUser = "No";
          this.isUniquePromo = "No";
          break;

        case "No":
          this.input.promo_referral = "0";
          this.showPromoCodeInput = false;
          this.input.referral_codes = [];
          break;
      }
    },

    /**
     * Menentukan nilai input.one_time yang nilainya tergantung pada
     * nilai isOneTimePromo. Jika nilai isOneTimePromo == "Yes" berarti
     * nilai untuk input.one_time = 1
     */
    isOneTimePromo(value) {
      switch (value) {
        case "Yes":
          this.input.one_time = "1";
          this.isUniquePromo = "No";
          this.isNewUser = "No";
          this.insertPromoCode = "No";
          break;

        case "No":
          this.input.one_time = "0";
          this.input.one_time_capacity = "0";
          break;
      }
    },

    /**
     * Menentukan nilai input.new_user yang nilainya tergantung pada
     * nilai isNewUser. Jika nilai isNewUser == "Yes" berarti
     * nilai untuk input.new_user = 1
     */
    isNewUser(value) {
      switch (value) {
        case "Yes":
          this.input.new_user = "1";
          this.isUniquePromo = "No";
          this.isOneTimePromo = "No";
          this.insertPromoCode = "No";
          break;

        case "No":
          this.input.new_user = "0";
          break;
      }
    },

    /**
     * Menentukan nilai input.unique yang nilainya tergantung pada
     * nilai isUniquePromo. Jika nilai isUniquePromo == "Yes" berarti
     * nilai untuk input.unique = 1
     */
    isUniquePromo(value) {
      switch (value) {
        case "Yes":
          this.input.unique = "1";
          this.isNewUser = "No";
          this.isOneTimePromo = "No";
          this.insertPromoCode = "No";
          break;

        case "No":
          this.input.unique = "0";
          this.input.unique_capacity = "0";
          break;
      }
    },

    isBuyxGetxPromo(value){
      switch (value){
        case "Yes":
          this.input.buy_x_get_x = "1";
          this.isNewUser = "No";
          this.isUniquePromo = "No";
          this.isOneTimePromo = "No";
          this.insertPromoCode = "No";
          this.isBuyxGetxUniquePromo =  "No";
          break;

        case "No":
          this.input.buy_x_get_x = "0";
          this.input.minimal_bill = "0";
          this.input.minimal_item_price = "0";
          this.input.minimal_shipping_cost = "0";
      }
    },

    isBuyxGetxUniquePromo(value){
      switch (value){
        case "Yes":
          this.input.buy_x_get_x = "1";
          this.input.unique = "1";
          this.isNewUser = "No";
          this.isOneTimePromo = "No";
          this.insertPromoCode = "No";
          this.isUniquePromo ="No";
          this.isBuyxGetxPromo = "No";
          break;

        case "No":
          this.input.buy_x_get_x = "0";
          this.input.minimal_bill = "0";
          this.input.minimal_item_price = "0";
          this.input.minimal_shipping_cost = "0";
      }
    },
  },

  methods: {
    /**
     * Menentukan nilai pada promoReferralCodesOption,
     * sebelum halaman di render.
     * @return {Array}
     */
    async setPromoReferralCodesOption() {
      let res = await this.$authHttp.get("/promo-referral-code");
      let referralCodes = res.data.data.map(el => ({
        value: el.id,
        label: el.referral_code
      }));
      this.promoReferralCodesOption = referralCodes;
    },

    /**
     * Validate promo referral codes input,
     * Jika nilai insertPromoCode sama dengan "Yes",
     * tapi user tidak menginputakan nilai pada input.referral_codes
     * maka proses update/save jangan diteruskan
     */
    validatePromoReferralCodeInput() {
      let referralCodes = this.input.referral_codes;
      let insertPromoCode = this.insertPromoCode;

      return new Promise((resolve, reject) => {
        if (insertPromoCode == "Yes" && referralCodes.length == 0) {
          reject();
        } else {
          resolve();
        }
      });
    },

    setOptions() {
      // masters
      this.master.statuses = [
        { value: "active", label: "Active" },
        { value: "suspend", label: "Suspend" },
        { value: "inactive", label: "Inactive" }
      ];

      this.master.promo_types = [
        { value: "fixed", label: "Fixed" },
        { value: "percentage", label: "Percentage" },
        { value: "point", label: "Point" }
      ];

      this.master.unlimiteds = [
        { value: true, label: "True" },
        { value: false, label: "False" }
      ];

      // options
      this.options.status = this.master.statuses.map(item => {
        let $item = {
          value: item.value,
          label: item.label
        };
        return $item;
      });

      this.options.promo_type = this.master.promo_types.map(item => {
        let $item = {
          value: item.value,
          label: item.label
        };
        return $item;
      });

      this.input.status = this.options.status[0].value;
      this.input.promo_type = this.options.promo_type[0].value;
    },
    onStatusChanged() {
      let status = this.master.statuses.find(status => {
        return statuses.value === this.input.status;
      });
      this.input.status = statuses.value;
    },

    onPromoTypeChanged() {
      let promo_type = this.master.promo_types.find(status => {
        return promo_types.value === this.input.promo_type;
      });
      this.input.promo_type = promo_types.value;
    },

    onUnlimitedChanged() {
      if (this.input.length > 0) {
        this.input.unlimited = "";
      }
    },
    async getPromoCode(id) {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.promoCode.find(id);

        this.input = res.data;

        /**
         * Jika res.data.referral_codes tidak kosong,
         * maka ubah nilai showPromoCodeInput jadi true,
         * begitu juga nilai insertPromoCode menjadi "Yes"
         */
        let rc = this.input.referral_codes;
        let referralCodeIsNull = rc.length == 0 || rc == undefined;

        if (!referralCodeIsNull) {
          this.showPromoCodeInput = true;
          this.insertPromoCode = "Yes";
        } else {
          this.showPromoCodeInput = false;
          this.insertPromoCode = "No";
        }

        if (this.input.one_time == "1") this.isOneTimePromo = "Yes";
        if (this.input.new_user == "1") this.isNewUser = "Yes";
        if (this.input.unique == "1" && this.input.buy_x_get_x != "1") this.isUniquePromo = "Yes";
        if (this.input.buy_x_get_x == "1" && this.input.unique != "1") this.isBuyxGetxPromo = "Yes";
        if (this.input.buy_x_get_x == "1" && this.input.unique == "1") this.isBuyxGetxUniquePromo = "Yes";
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },

    /**
     * Membuat atau Updating Promo Code.
     * @return {Void}
     */
    async save() {
      if (!(await this.$validator.validate())) {
        return this.$notify({
          title: "Warning",
          type: "warning",
          message: "Please input value " + this.input.promo_type
        });
      }

      this.$validator.errors.clear();

      // check inputan promo referral code sebelum di store/edit
      this.validatePromoReferralCodeInput()
        .then(res => {
          if (this.edit) return this.update();
          return this.store();
        })
        .catch(err => {
          this.$notify({
            title: "Warning",
            type: "warning",
            message: "Please input promo referral code"
          });
          return;
        });
    },
    async store() {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.promoCode.create(this.input);

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.$router.push({ name: "admin-promo-codes" });
      } catch (err) {
        this.__handleError(this, err, false);
      }

      this.__stopLoading();
    },
    async update() {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      try {
        if (this.input.promo_type == "fixed") {
          this.input.value_percentage = 0;
          this.input.value_point = 0;
        } else if (this.input.promo_type == "percentage") {
          this.input.value_fixed = 0;
          this.input.value_point = 0;
        } else {
          this.input.value_percentage = 0;
          this.input.value_fixed = 0;
        }

        let res = await this.$service.promoCode.update(
          this.$route.params.id,
          this.input
        );

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.$router.push({ name: "admin-promo-codes" });
      } catch (err) {
        this.__handleError(this, err, false);
      }

      this.__stopLoading();
    }
  },

  created() {
    this.setOptions();

    if (this.$route.params.id) {
      this.edit = true;
      this.title = "Edit Promo Code";
      this.getPromoCode(this.$route.params.id);
    }

    this.setPromoReferralCodesOption();
  }
};
</script>

<style lang="scss" scoped>
.req-doc {
  padding-top: 10px;
  .btn-r {
    padding-right: 5px;
    padding-left: 5px;
  }
}
</style>

