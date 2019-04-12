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
            <h3>Exchange Rates</h3>
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
        <table class="uk-table uk-table-divider uk-table-small">
          <thead>
            <tr>
              <th class="uk-text-right" width="50">Code</th>
              <th>Name</th>
              <th class="uk-text-right">Rates (IDR)</th>
              <th class="uk-text-center" width="100">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rate in rates" :key="rate.id">
              <td class="uk-text-right">{{ rate.code }}</td>
              <td>{{ rate.name }}</td>
              <td
                class="uk-text-right"
              >{{ rate.rates | currency('', 0, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
              <td class="uk-text-center">
                <router-link :to="{ name: 'admin-exchange-rate-edit', params: { id: rate.id } }">
                  <font-awesome-icon icon="edit"></font-awesome-icon>
                </router-link>
                <a
                  class="uk-margin-small-left uk-text-danger"
                  href="#"
                  @click.prevent="deleteConfirmation(rate.id)"
                >
                  <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                </a>
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
      rates: [],
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
    // this.fetchProvinces()

    this.fetchExchangeRates(this.pagination.page);
  },
  mounted() {
    this.onSearchEnter();
  },
  methods: {
    onChangePagination(i) {
      this.fetchExchangeRates(i + 1);
    },

    onSearchEnter() {
      window.addEventListener("keyup", event => {
        if (event.keyCode === 13) {
          if (this.filter.search === "") {
          } else {
            this.fetchExchangeRates(this.pagination.page);
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
        this.fetchExchangeRates(this.pagination.page);
      }
    },

    async fetchExchangeRates(page) {
      this.__startLoading();

      this.pagination.page = page;

      try {
        let res = await this.$service.exchangerates.get(
          {
            search: this.filter.search
          },
          page
        );

        this.pagination.last_page = res.data.last_page;
        this.totalPages = res.data.pages;
        this.current_page = page;

        this.rates = res.data.data;
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

    delete(id) {
      this.error = false;
      this.errorMessage = "";

      this.$authHttp
        .delete(`/exchangerate/${id}`)
        .then(res => {
          this.$notify({
            title: "SUCCESS",
            message: res.data.message,
            type: "success"
          });

          this.fetchExchangeRates(this.pagination.page);
        })
        .catch(err => {
          if (err.response) {
            this.error = true;
            this.errorMessage = err.response.data.message
              ? err.response.data.message
              : err.response.statusText;

            this.$notify({
              title: "ERROR",
              message: this.errorMessage,
              type: "error"
            });
          }
        });
    }
  }
};
</script>
