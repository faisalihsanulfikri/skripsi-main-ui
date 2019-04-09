<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="shipping-fast"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>
              <span>Manifest Report</span>
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
            <el-button type="default" @click="getManifest">Filter</el-button>
          </div>
          <div class="uk-width-1-3 uk-margin-auto-left">
            <el-input v-model="filter.search" placeholder="Search...">
              <el-button slot="append" icon="el-icon-search" @click="getManifest"></el-button>
            </el-input>
          </div>

        </div>
      </div>
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small uk-text-small">
          <thead>
            <tr>
              <th></th>
              <th>Manifest Number</th>
              <th>Date</th>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <template v-for="(manifest, index) in manifests">
              <tr :key="index">
                <td
                  class="app--table-column__collapse-toggle"
                  @click.prevent="collapseToggle(index)"
                >
                  <a href="#">
                    <font-awesome-icon v-if="manifest.collapse" icon="angle-right"></font-awesome-icon>
                    <font-awesome-icon v-else icon="angle-down"></font-awesome-icon>
                  </a>
                </td>
                <td @click.prevent="collapseToggle(index)">
                  <a href="#!" class="custom-link-black">{{ manifest.manifest_no }}</a>
                </td>
                <td>{{ moment(manifest.created_at).format('MMM DD YYYY, HH:mm:ss') }}</td>
                <td>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="printManifest(manifest.manifest_no)"
                  >
                    <font-awesome-icon icon="print"></font-awesome-icon>
                  </el-button>
                  <el-button
                    type="default"
                    size="mini"
                    @click="manifestToExcel(manifest.manifest_no)"
                  >
                    <font-awesome-icon icon="cloud-download-alt"></font-awesome-icon>
                  </el-button>
                </td>
              </tr>
              <tr v-show="!manifest.collapse" :key="`${index}_info`">
                <td colspan="4">
                  <table style="width : 100%;">
                    <th style="width: 5%;">Date</th>
                    <th>Order Code</th>
                    <th>Manifest No</th>
                    <th>AWB No</th>
                    <th>Consignee</th>
                    <th>Country Receiver</th>
                    <th>Region Receiver</th>
                    <template v-for="(awb , index) in manifest.order_awb">
                      <tr>
                        <td>
                          <h5 class="uk-margin-small">{{awb.created_at}}</h5>
                        </td>
                        <td>
                          <h5 class="uk-margin-small">{{awb.order_code}}</h5>
                        </td>
                        <td>
                          <h5 class="uk-margin-small">{{awb.manifest_no}}</h5>
                        </td>
                        <td>
                          <h5 class="uk-margin-small">{{awb.awb}}</h5>
                        </td>
                        <td>
                          <h5 class="uk-margin-small">{{awb.detail.receiver_name}}</h5>
                        </td>
                        <td>
                          <h5 class="uk-margin-small">ID</h5>
                        </td>
                        <td>
                          <h5 class="uk-margin-small">{{awb.detail.receiver_region}}</h5>
                        </td>
                      </tr>
                    </template>
                  </table>
                </td>
              </tr>
            </template>
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
// import moment from "moment";
import saveAs from "file-saver";

export default {
  data() {
    return {
      totalPages: ["1"],
      pagination: {
        total: 0,
        current_page: 1,
        last_page: 0,
        page: 1
      },
      filter: {
        time: []
      },
      manifests: []
    };
  },

  created() {
    this.getManifest(this.pagination.page);
  },

  methods: {
    onChangePagination(i) {
      this.getManifest(i + 1);
    },
    async getManifest(page) {
      this.__startLoading();

      this.pagination.page = page;


      try {
        let res = await this.$service.manifest.get(this.filter, page);

        this.pagination.last_page = res.data.data.last_page;
        this.totalPages = res.data.data.pages;
        this.current_page = page;

        console.log(this.current_page);

        this.manifests = res.data.data.data.map(function(item, index) {
          return {
            ...item,
            collapse: true
          };
        });
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },
    async manifestToExcel(code) {
      this.__startLoading();

      try {
        let res = await this.$service.manifest.toExcel(code);

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
    collapseToggle(index) {
      this.manifests[index].collapse = !this.manifests[index].collapse;
    },
    printManifest(code) {
      window.open(
        `/print-manifest/${code}`,
        "Kirimin - Print Manifest",
        "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=0,width=800"
      );
    }
  }
};
</script>
