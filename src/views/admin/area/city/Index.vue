<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__back">
            <font-awesome-icon icon="chevron-left"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>Cities</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body">
      <div class="uk-margin uk-grid-small" uk-grid>
        <div class="uk-width-1-3 uk-margin-auto-left">
          <el-input
            v-model="filter.search"
            placeholder="Search..."
            @keypress.enter.native="fetchCities"
          >
            <el-button slot="append" icon="el-icon-search" @click="fetchCities"></el-button>
          </el-input>
        </div>
      </div>
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small">
          <thead>
            <tr>
              <th>City</th>
              <th>Type</th>
              <th>Postal Code</th>
              <th>Province</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="city in cities" :key="city.city_id">
              <td>{{city.city_name}}</td>
              <td>{{city.type}}</td>
              <td>{{city.postal_code}}</td>
              <td>{{city.province}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- pagination -->
      <div v-if="this.totalPages.length < 2"></div>

      <div v-else class="uk-card-footer uk-text-center">
        <ul class="uk-pagination" uk-margin>
          <li>
            <a href="#">
              <span uk-pagination-previous></span>
            </a>
          </li>
          <li v-for="(page, i) in totalPages" :key="i">
            <div v-if="current_page-1 == i">
              <a href="#" style="color:red" @click.prevent="onChangePagination(i)">{{i+1}}</a>
            </div>

            <div v-else>
              <a href="#" @click.prevent="onChangePagination(i)">{{i+1}}</a>
            </div>
          </li>
          <li>
            <a href="#">
              <span uk-pagination-next></span>
            </a>
          </li>
        </ul>
      </div>
      <!-- end pagination -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: {},
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
    this.fetchCities(this.pagination.page);
  },
  methods: {
    onChangePagination(i) {
      this.fetchCities(i + 1);
    },

    async fetchCities(page) {
      this.__startLoading();

      this.pagination.page = page;

      try {
        let res = await this.$service.area.cities(
          {
            search: this.filter.search
          },
          page
        );

        this.pagination.last_page = res.data.last_page;
        this.totalPages = res.data.pages;
        this.current_page = page;

        this.cities = res.data.data;

        console.log(this.cities);
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    }
  }
};
</script>
