<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="tags"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>Promo Codes</h3>
          </div>
        </div>
        <div class="uk-width-auto">
          <div class="app--card-header__link">
            <router-link :to="{ name: 'admin-promo-codes-create' }">
              <font-awesome-icon icon="plus"></font-awesome-icon>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body">
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small">
          <thead>
            <tr>
              <th>Code</th>
              <th>Status</th>
              <th>Category</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Unlimited</th>
              <th>Capacity</th>
              <th>In-used</th>
              <th>Promo Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="promo in promoCode" :key="promo.id">
              <td>{{ promo.code }}</td>
              <td>{{ promo.status }}</td>
              <td>
                <el-tag
                  size="small"
                  :effect="category(promo.categories).id == '6' ? 'plain' : ''"
                  :type="category(promo.categories).color"
                >{{ category(promo.categories).label || '-' }}</el-tag>
              </td>
              <td>{{ formatDate(promo.start_date) }}</td>
              <td>{{ formatDate(promo.end_date) }}</td>
              <td v-if="promo.unlimited == 1">Yes</td>
              <td v-else>No</td>
              <td>{{ promo.capacity }}</td>
              <td>{{ promo.in_used }}</td>
              <td>{{ promo.promo_type }}</td>
              <td>
                <router-link :to="{ name: 'admin-promo-codes-edit', params: { id: promo.id } }">
                  <font-awesome-icon icon="edit"></font-awesome-icon>
                </router-link>
                <a
                  class="uk-margin-small-left uk-text-danger"
                  href="#"
                  @click.prevent="deleteConfirmation(promo.id)"
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
import moment from "moment";

export default {
  data() {
    return {
      promoCode: [],
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
    this.fetchPromoCode(this.pagination.page);
  },
  methods: {
    /**
     * Mengubah format tanggal
     * @return {Date}
     */
    formatDate(date) {
      return moment(date).format("ll");
    },

    /**
     * Menentukan  promo code category
     * @return {String}
     */
    category(categories) {
      return categories.filter(el => el.value == "1")[0];
    },

    /**
     * Buat custom categories
     */
    customCategories(el) {
      return {
        ...el,
        categories: [
          { id: "1", label: "New User", color: "success", value: el.new_user },
          { id: "2", label: "One Time", color: "info", value: el.one_time },
          { id: "3", label: "Promo Code", color: "warning", value: el.promo_referral },
          { id: "4", label: "Unique", color: "danger", value: el.unique == '1' && el.buy_x_get_x == '0' },
          { id: "5", label: "Buy X Get X", color: "mint", value: el.buy_x_get_x == '1' && el.unique == '0'},
          { id: "6", label: "Buy X Get X Unique", color:"info" , value: el.unique == '1' && el.buy_x_get_x == '1'},
          {
            id: "7",
            label: "Regular",
            color: "info",
            value: el.new_user == '0' && el.one_time == '0' && el.promo_referral == '0' && el.unique == '0' && el.buy_x_get_x == '0'
          }
        ]
      };
    },

    onChangePagination(i) {
      this.fetchExchangeRates(i + 1);
    },

    async fetchPromoCode(page) {
      this.__startLoading();

      this.pagination.page = page;

      try {
        let res = await this.$service.promoCode.get(
          {
            search: this.filter.search
          },
          page
        );

        this.pagination.last_page = res.data.last_page;
        this.totalPages = res.data.pages;
        this.current_page = page;

        this.promoCode = res.data.data.map(this.customCategories).reverse();
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
        .delete(`/promo-code/${id}`)
        .then(res => {
          this.$notify({
            title: "SUCCESS",
            message: res.data.message,
            type: "success"
          });

          this.fetchPromoCode(this.pagination.page);
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
