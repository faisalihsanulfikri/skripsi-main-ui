<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <!-- <router-link
              :to="{ name: 'admin-area-province-city', params: { provinceId: $route.params.provinceId } }"
            >-->
            <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            <!-- </router-link> -->
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>Location Codes</h3>
          </div>
        </div>
        <div class="uk-width-auto">
          <div class="app--card-header__link">
            <router-link :to="{ name: 'admin-area-code-create' }">
              <font-awesome-icon icon="plus"></font-awesome-icon>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body">
      <div class="uk-margin uk-grid-small" uk-grid>
        <div class="uk-width-1-3 uk-margin-auto-left">
          <el-input v-model="filter.search" placeholder="Search...">
            <el-button slot="append" icon="el-icon-search" @click="fetch"></el-button>
          </el-input>
        </div>
      </div>
      <div class="uk-overflow-auto">
        <!-- start -->
        <table class="uk-table uk-table-divider uk-table-small">
          <thead>
            <tr>
              <th>Sub District</th>
              <th>City</th>
              <th>Province</th>
              <th>City Code</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="loc in locations" :key="loc.id">
              <td>{{loc.subdistrict_name}}</td>
              <td>{{loc.district_name}}</td>
              <td>{{loc.province_name}}</td>
              <td>{{loc.city_code}}</td>
            </tr>
          </tbody>
        </table>
        <!-- end -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locations: {},
      totalPages: ["1"],
      pagination: {
        total: 0,
        current_page: 1,
        last_page: 0,
        page: 1
      },
      filter: {
        search: ""
      }
    };
  },
  created() {
    this.fetchLocation(this.pagination.page);
  },
  methods: {
    async fetchLocation(page) {
      this.__startLoading();

      try {
        let res = await this.$service.location.get(
          {
            search: this.filter.search
          },
          page
        );

        this.locations = res.data.data;

        console.log(this.data);
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    }
  }
};
</script>
