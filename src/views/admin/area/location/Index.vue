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
          <el-input v-model="filter.search" placeholder="Search..." @keyup.enter="onSearchEnter">
            <el-button slot="append" icon="el-icon-search" @click="onSearchclick"></el-button>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="loc in locations" :key="loc.id">
              <td>{{loc.subdistrict_name}}</td>
              <td>{{loc.district_name}}</td>
              <td>{{loc.province_name}}</td>
              <td>{{loc.city_code}}</td>
              <td>
                <router-link :to="{ name: 'admin-area-code-create', params: { id: loc.id } }">
                  <font-awesome-icon icon="edit"></font-awesome-icon>
                </router-link>
                <a
                  class="uk-margin-small-left uk-text-danger"
                  href="#"
                  @click.prevent="deleteConfirmation(loc.id)"
                >
                  <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- end -->
      </div>

      <!-- pagination -->
      <!-- <div v-if="this.totalPages.length < 2"></div>

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
      </div>-->
      <!-- end pagination -->
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

  mounted() {
    this.onSearchEnter();
  },

  methods: {
    onChangePagination(i) {
      this.fetchLocation(i + 1);
    },
    onSearchEnter() {
      window.addEventListener("keyup", event => {
        if (event.keyCode === 13) {
          if (this.filter.search === "") {
          } else {
            this.fetchLocation(this.pagination.page);
          }
        }
      });
    },

    onSearchclick() {
      if (this.filter.search === "") {
        this.$notify({
          title: "Notification",
          message: "Search form cannot be empty",
          type: "warning"
        });
      } else {
        this.fetchLocation(this.pagination.page);
      }
    },
    async fetchLocation(page) {
      this.__startLoading();

      this.pagination.page = page;

      try {
        let res = await this.$service.area.locations(
          {
            search: this.filter.search
          },
          page
        );

        this.pagination.last_page = res.data.last_page;
        this.totalPages = res.data.pages;
        this.current_page = page;

        this.locations = res.data.data;
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },

    deleteConfirmation(id) {
      this.$confirm("Are you sure to delete this?", "Waning", {
        type: "warning",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      })
        .then(() => {
          this.delete(id);
        })
        .catch(() => {});
    },
    async delete(id) {
      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.area.locationDelete(id);

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.filter.search = "";
        this.fetchLocation(this.pagination.page);
      } catch (err) {
        this.__handleError(this, err, true);
      }
    }
  }
};
</script>
