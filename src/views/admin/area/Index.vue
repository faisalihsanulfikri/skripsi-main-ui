<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="map"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>Provinces</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body">
      <div class="uk-margin uk-grid-small" uk-grid>
        <div class="uk-width-1-3 uk-margin-auto-left">
          <el-input v-model="filter.search" placeholder="Search...">
            <el-button slot="append" icon="el-icon-search" @click="fetchProvinces"></el-button>
          </el-input>
        </div>
      </div>
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small">
          <thead>
            <tr>
              <th class="uk-text-right" width="50">Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="province in provinces" :key="province.province_id">
              <td class="uk-text-right">{{ province.id }}</td>
              <td>
                <router-link
                  :to="{ name: 'admin-area-province-city', params: { provinceId: province.province_id } }"
                >{{ province.province }}</router-link>
              </td>
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
      provinces: [],
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
    this.fetchProvinces(this.pagination.page);
  },
  methods: {
    onChangePagination(i) {
      this.fetchProvinces(i + 1);
    },
    async fetchProvinces(page) {
      this.__startLoading();
      this.pagination.page = page;

      // console.log(this.filter.search);

      // return this.__stopLoading();

      try {
        let res = await this.$service.area.provinces(
          {
            search: this.filter.search
          },
          page
        );

        this.pagination.last_page = res.data.last_page;
        this.totalPages = res.data.pages;
        this.current_page = page;

        this.provinces = res.data.data;

        console.log(this.filter.search);
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    }
  }
};
</script>
