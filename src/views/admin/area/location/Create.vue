<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <router-link :to="{ name: 'admin-area-code' }">
              <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </router-link>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>{{title}}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body">
      <!-- Province -->
      <div class="uk-margin">
        <label class="uk-form-label">Province</label>
        <select
          v-model="input.provinceId"
          v-validate="rules.province"
          name="province"
          class="uk-select"
          @change="onProvinceChanged"
        >
          <option
            v-for="(item, index) in options.province"
            :key="index"
            :value="item.value"
          >{{ item.label }}</option>
        </select>
        <p
          v-if="errors.first('province')"
          class="uk-margin-small uk-text-danger"
        >{{ errors.first('province') }}</p>
      </div>

      <!-- city -->
      <div class="uk-margin">
        <label class="uk-form-label">City</label>
        <select
          v-model="input.cityId"
          v-validate="rules.city"
          name="city"
          class="uk-select"
          @change="onCityChanged"
        >
          <option
            v-for="(item, index) in options.city"
            :key="index"
            :value="item.value"
          >{{ item.label }}</option>
        </select>
        <p
          v-if="errors.first('city')"
          class="uk-margin-small uk-text-danger"
        >{{ errors.first('city') }}</p>
      </div>

      <!-- Sub District -->
      <div class="uk-margin">
        <label class="uk-form-label">Subdistrict</label>
        <el-input v-model="input.subdistrict_name"></el-input>
      </div>

      <div class="uk-margin">
        <label class="uk-form-label">City Code</label>
        <el-input v-model="input.city_code"></el-input>
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
      title: "New Location Code",
      input: {
        province_name: "",
        district_name: "",
        subdistrict_name: "",
        city_code: "",
        provinceId: "",
        cityId: ""
      },
      rules: {
        province_name: "required",
        district_name: "required",
        subdistrict_name: "required",
        city_code: "required"
      },
      provinces: [],
      cities: [],
      options: {
        province: [],
        city: []
      },
      error: false,
      errorMessage: ""
    };
  },

  created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.title = "Edit Location Code";

      // this.fetchProvinces();
    }
    this.fetchProvinces();
  },

  methods: {
    async fetchProvinces() {
      this.__startLoading();

      await this.__fetchProvinces().then(res => {
        this.provinces = res.data;

        this.options.province = res.data.map(item => {
          let $item = {
            value: parseInt(item.province_id),
            label: item.province
          };

          return $item;
        });
      });

      // console.log(this.options.province);

      this.__stopLoading();
    },
    async fetchCities() {
      this.__startLoading();

      await this.__fetchCitiesByProvince(this.input.provinceId).then(res => {
        this.cities = res.data;

        this.options.city = res.data.map(item => {
          let $item = {
            value: parseInt(item.city_id),
            label:
              item.type === "Kabupaten"
                ? `Kab. ${item.city_name}`
                : item.city_name
          };

          return $item;
        });
      });

      this.__stopLoading();
    },
    onProvinceChanged() {
      let provinces = this.provinces.filter(
        province => province.province_id === this.input.provinceId
      );

      if (provinces.length > 0) {
        this.input.province_name = provinces[0].province;
      }

      this.fetchCities();
    },
    onCityChanged() {
      let cities = this.cities.filter(
        city => city.city_id === this.input.cityId
      );

      if (cities.length > 0) {
        this.input.district_name = cities[0].city_name;
      }
    },

    // old
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
        let res = await this.$service.area.locationsCreate(this.input);

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.$router.push({ name: "admin-area-code" });
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    }
    // async update() {
    //   this.__startLoading();

    //   this.error = false;
    //   this.errorMessage = "";

    //   try {
    //     let res = await this.$service.category.update(
    //       this.$route.params.id,
    //       this.input
    //     );

    //     this.$notify({
    //       title: "SUCCESS",
    //       message: res.data.message,
    //       type: "success"
    //     });

    //     this.$router.push({ name: "admin-category" });
    //   } catch (err) {
    //     this.__handleError(this, err, true);
    //   }

    //   this.__stopLoading();
    // }
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

