<template>
  <el-dialog :title="title" :visible="visible" @open="onDialogOpen" @close="onDialogClose">
    <form>
      <div class="uk-margin">
        <label class="uk-form-label">Alias</label>
        <input v-model="input.alias" v-validate="rules.alias" name="alias" class="uk-input">
        <p
          v-if="errors.first('alias')"
          class="uk-margin-small uk-text-danger"
        >{{ errors.first('alias') }}</p>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Penerima</label>
        <input v-model="input.name" v-validate="rules.name" name="name" class="uk-input">
        <p
          v-if="errors.first('name')"
          class="uk-margin-small uk-text-danger"
        >{{ errors.first('name') }}</p>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Telepon</label>
        <input v-model="input.phone" v-validate="rules.phone" name="phone" class="uk-input">
        <p
          v-if="errors.first('phone')"
          class="uk-margin-small uk-text-danger"
        >{{ errors.first('phone') }}</p>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Provinsi</label>
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
      <div class="uk-margin">
        <label class="uk-form-label">Kota</label>
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
      <div class="uk-margin">
        <label class="uk-form-label">Kecamatan</label>
        <select
          v-model="input.code"
          v-validate="rules.subDistrict"
          name="subDistrict"
          class="uk-select"
          @change="onDistrictChange"
        >
          <option
            v-for="(item, index) in options.subDistrict"
            :key="index"
            :value="item.value"
          >{{ item.label }}</option>
        </select>
        <p
          v-if="errors.first('subDistrict')"
          class="uk-margin-small uk-text-danger"
        >{{ errors.first('subDistrict') }}</p>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Alamat</label>
        <input v-model="input.address" v-validate="rules.address" name="address" class="uk-input">
        <p
          v-if="errors.first('address')"
          class="uk-margin-small uk-text-danger"
        >{{ errors.first('address') }}</p>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Kode Pos</label>
        <input
          v-model="input.postalCode"
          v-validate="rules.postalCode"
          name="postalCode"
          class="uk-input"
        >
        <p
          v-if="errors.first('postalCode')"
          class="uk-margin-small uk-text-danger"
        >{{ errors.first('postalCode') }}</p>
      </div>
      <el-alert v-if="error" :title="errorMessage" type="error" show-icon></el-alert>
    </form>
    <div slot="footer">
      <button class="uk-button uk-button-primary" type="button" @click="save">Simpan</button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      default: "New Address"
    },
    visible: {
      default: false
    },
    edit: {
      default: false
    },
    user_code: {
      default: ""
    },
    address: {
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      input: {
        user: "",
        alias: "",
        code: "",
        name: "",
        phone: "",
        province: "",
        city: "",
        subDistrict: "",
        address: "",
        postalCode: "",
        provinceId: "",
        cityId: ""
      },
      rules: {
        alias: "required",
        code: "required",
        name: "required",
        phone: "required|min:10",
        province: "required",
        city: "required",
        subDistrict: "required",
        address: "required",
        postalCode: "required"
      },
      provinces: [],
      cities: [],
      subDistricts: [],
      options: {
        province: [],
        city: [],
        subDistrict: []
      },
      error: false,
      errorMessage: "",
      validationErrors: {}
    };
  },
  methods: {
    async onDialogOpen() {
      if (this.edit) {
        this.input = Object.assign({}, this.address);
        this.input.postalCode = this.input.postal_code;
        this.input.subDistrict = this.input.sub_district;

        await this.fetchCities();
        await this.fetchDistricts();
      }

      this.error = false;
      this.errorMessage = "";
      this.validationErrors = {};

      this.$validator.errors.clear();

      await this.fetchProvinces();
    },
    onDialogClose() {
      this.input = this.$options.data().input;
      this.$emit("close");
    },
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
    async fetchDistricts() {
      this.__startLoading();

      await this.__fetchDistrictsByCity(this.input.cityId).then(res => {
        this.subDistricts = res.data;

        this.options.subDistrict = res.data.map(item => {
          let $item = {
            value: item.subdistrict_id,
            label: item.subdistrict_name
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
        this.input.province = provinces[0].province;
      }

      this.fetchCities();
    },
    onCityChanged() {
      let cities = this.cities.filter(
        city => city.city_id === this.input.cityId
      );

      if (cities.length > 0) {
        this.input.city = cities[0].city_name;
      }

      this.fetchDistricts();
    },
    onDistrictChange() {
      let subDistricts = this.subDistricts.filter(
        district => district.subdistrict_id === this.input.code
      );

      if (subDistricts.length > 0) {
        this.input.subDistrict = subDistricts[0].subdistrict_name;
      }
    },
    async save() {
      this.__startLoading();

      if (!this.edit) {
        await this.store();
        this.$emit("close");
      } else {
        await this.update();
        this.$emit("close");
      }

      this.__stopLoading();
    },
    async store() {
      this.error = false;
      this.errorMessage = "";
      this.validationErrors = {};

      this.input.user = this.user_code;

      await this.$authHttp
        .post(`/admin/user/addresses`, this.input)
        .then(res => {
          this.$notify({
            title: "SUCCESS",
            message: res.data.message,
            type: "success"
          });

          this.input = this.$options.data().input;
        })
        .catch(err => {
          if (err.response) {
            this.error = true;
            this.errorMessage = err.response.data.message
              ? err.response.data.message
              : err.response.statusText;

            this.$validator.errors.clear();

            if (err.response.data.errorValidation) {
              this.validationErrors = err.response.data.errors;

              Object.keys(this.validationErrors).forEach(key => {
                this.$validator.errors.add({
                  field: key,
                  msg: this.validationErrors[key][0]
                });
              });
            }
          }
        });
    },
    async update() {
      this.error = false;
      this.errorMessage = "";

      await this.$authHttp
        .put(`/admin/user/addresses/${this.input.id}`, this.input)
        .then(res => {
          this.$notify({
            title: "SUCCESS",
            message: res.data.message,
            type: "success"
          });

          this.onDialogClose();
        })
        .catch(err => {
          if (err.response) {
            this.error = true;
            this.errorMessage = err.response.data.message
              ? err.response.data.message
              : err.response.statusText;

            this.$validator.errors.clear();

            if (err.response.data.errorValidation) {
              this.validationErrors = err.response.data.errors;

              Object.keys(this.validationErrors).forEach(key => {
                this.$validator.errors.add({
                  field: key,
                  msg: this.validationErrors[key][0]
                });
              });
            }
          }
        });
    }
  }
};
</script>
