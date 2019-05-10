<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="file-alt"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>
              <span>Order Report</span>
            </h3>
          </div>
        </div>
        <div class="uk-width-auto"></div>
      </div>
    </div>
    <div class="uk-card-body uk-card-small">
      <div class="uk-margin">
        <div class="uk-grid-small" uk-grid>
          <div class="uk-width-auto">
            <el-date-picker
              v-model="filter.time"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
            ></el-date-picker>
          </div>
          <div class="uk-width-auto">
            <el-button type="default" @click="fetchOrderReport">Filter</el-button>
          </div>
          <div class="uk-width-1-3 uk-margin-auto-left">
            <el-input
              v-model="filter.search"
              placeholder="Search..."
              @keypress.enter.native="fetchOrderReport"
            >
              <el-button slot="append" icon="el-icon-search" @click="fetchOrderReport"></el-button>
            </el-input>
          </div>
          <div class="uk-width-1-1" style="padding-top:10px">
            <el-button type="default" @click="exportReportXLSX">
              <font-awesome-icon icon="file-excel"></font-awesome-icon>Download XLSX
            </el-button>
            <el-button type="default" @click="exportReportCSV">
              <font-awesome-icon icon="file-excel"></font-awesome-icon>Download CSV
            </el-button>
          </div>
        </div>
      </div>
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small uk-text-small">
          <thead>
            <tr>
              <th>Date</th>
              <th>Code</th>
              <th>Reference</th>
              <th>AWB</th>
              <th>Customer</th>
              <th>Consolidate</th>
              <th>Total Packages</th>
              <th>Total Item`s</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, i) in orders" :key="i">
              <td>{{ moment(order.created_at).format('MMM DD YYYY, HH:mm:ss') }}</td>
              <td>{{ order.code }}</td>

              <!-- reference -->

              <td>
                <template v-for="(data, i) in order.items">
                  <ul :key="i" class="ul-ref" v-if="i == 0">
                    <li class="li-ref">{{ order.items[i].reference }}</li>
                  </ul>
                  <ul
                    :key="i"
                    class="ul-ref"
                    v-else-if="order.items[i].category_id != order.items[i-1].category_id"
                  >
                    <li class="li-ref">{{ order.items[i].reference }}</li>
                  </ul>
                </template>
              </td>

              <!-- awb -->

              <td>
                <template v-for="(data, i) in order.items">
                  <ul :key="i" class="ul-ref" v-if="i == 0">
                    <li class="li-ref">{{ order.items[i].awb }}</li>
                  </ul>
                  <ul
                    :key="i"
                    class="ul-ref"
                    v-else-if="order.items[i].category_id != order.items[i-1].category_id"
                  >
                    <li class="li-ref">{{ order.items[i].awb }}</li>
                  </ul>
                </template>
              </td>
              <td>{{ order.user_name }}</td>
              <td>{{ order.string_consolidate }}</td>
              <td>{{ order.packet_count }}</td>
              <td>{{ order.item_count }}</td>
              <td>{{ order.status }}</td>
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
import saveAs from "file-saver";

export default {
  data() {
    return {
      orders: [],
      totalPages: ["1"],
      pagination: {
        total: 0,
        current_page: 1,
        last_page: 0,
        page: 1
      },
      filter: {
        time: [],
        search: ""
      }
    };
  },

  created() {
    // this.filter.time = [
    //   moment()
    //     .startOf("month")
    //     .format("YYYY-MM-DD"),
    //   moment()
    //     .endOf("month")
    //     .format("YYYY-MM-DD")
    // ];

    this.fetchOrderReport(this.pagination.page);
  },

  methods: {
    onChangePagination(i) {
      this.fetchOrderReport(i + 1);
    },

    async exportReportCSV() {
      this.__startLoading();

      try {
        let res = await this.$service.report.orderExportCSV(this.filter);

        let content = res.request.getResponseHeader("Content-Disposition");
        let regexResult = content.match("filename=(.*)");
        let filename = regexResult[1].replace(new RegExp('"', "g"), "");
        let blob = new Blob([res.data]);

        saveAs(blob, filename);
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },
    async exportReportXLSX() {
      this.__startLoading();

      try {
        let res = await this.$service.report.orderExportXLSX(this.filter);

        let content = res.request.getResponseHeader("Content-Disposition");
        let regexResult = content.match("filename=(.*)");
        let filename = regexResult[1].replace(new RegExp('"', "g"), "");
        let blob = new Blob([res.data]);

        saveAs(blob, filename);
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },
    async fetchOrderReport(page) {
      this.__startLoading();

      try {
        let res = await this.$service.report.order(this.filter, page);

        this.pagination.last_page = res.data.last_page;

        this.totalPages = res.data.pages;
        this.current_page = page;

        this.orders = res.data.data;
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    }
  }
};
</script>


<style lang="scss" scoped>
.ul-ref {
  padding-left: 0px;

  .li-ref {
    list-style: none;
  }
}
</style>