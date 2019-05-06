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
        <el-input v-model="input.code"></el-input>
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
      <!-- <div class="uk-margin">
        <label class="uk-form-label">Start Date</label>
        <el-input v-model="input.start_date"></el-input>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">End Date</label>
        <el-input v-model="input.end_date"></el-input>
      </div>-->
      <div class="filter-order uk-margin">
        <label class="uk-form-label">Start Date</label>
        <br>
        <el-date-picker
          class="filter-order"
          v-model="input.start_date"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="Start Date"
        ></el-date-picker>
      </div>
      <div class="filter-order uk-margin">
        <label class="uk-form-label">End Date</label>
        <br>
        <el-date-picker
          class="filter-order"
          v-model="input.end_date"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="End Date"
        ></el-date-picker>
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
            >
            <span class="uk-margin-small-left">True</span>
          </label>

          <label class="btn-r">
            <input
              v-model="input.unlimited"
              class="uk-radio"
              type="radio"
              value="0"
              @click="onUnlimitedChanged"
            >
            <span class="uk-margin-small-left">False</span>
          </label>
        </div>
      </div>
      <!--  -->
      <div class="uk-margin">
        <label class="uk-form-label">Capacity</label>
        <el-input v-model="input.capacity"></el-input>
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
        <el-input v-model="input.value_fixed"></el-input>
      </div>

      <div class="uk-margin" v-else-if="input.promo_type == 'percentage'">
        <label class="uk-form-label">Value {{input.promo_type}}</label>
        <el-input v-model="input.value_percentage"></el-input>
      </div>

      <div class="uk-margin" v-else-if="input.promo_type == 'point'">
        <label class="uk-form-label">Value {{input.promo_type}}</label>
        <el-input v-model="input.value_point"></el-input>
      </div>

      <el-alert v-if="error" title="ERROR" type="error" :description="errorMessage" show-icon></el-alert>
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
        unlimited: "",
        capacity: "",
        in_used: 0,
        promo_type: "",
        value_fixed: "",
        value_percentage: "",
        value_point: ""
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
      error: false,
      errorMessage: ""
    };
  },

  created() {
    this.setOptions();

    if (this.$route.params.id) {
      this.edit = true;
      this.title = "Edit Promo Code";

      this.getPromoCode();
    }

    console.log(this.$route.params.id);
  },

  methods: {
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
    async getPromoCode() {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.promoCode.find(this.$route.params.id);

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
    async store() {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      // console.log(this.input);
      // return this.__stopLoading();

      try {
        let res = await this.$service.promoCode.create(this.input);

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.$router.push({ name: "admin-promo-codes" });
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },
    async update() {
      this.__startLoading();

      this.error = false;
      this.errorMessage = "";

      // console.log(this.input);
      // return this.__stopLoading();

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
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    }
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

