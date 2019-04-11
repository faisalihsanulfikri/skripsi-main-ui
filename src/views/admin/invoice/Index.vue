<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="file-invoice"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>Invoices</h3>
          </div>
        </div>
        <div class="uk-width-auto"></div>
      </div>
    </div>

    <div class="uk-card-body uk-card-small">
      <div class="uk-margin uk-grid-small" uk-grid>
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
          <el-button slot="append" icon="el-icon-search" @click="fetchInvoices"></el-button>
        </div>
        <div class="uk-width-1-3 uk-margin-auto-left">
          <el-input v-model="filter.search" placeholder="Search..." @keyup.enter="onSearchEnter">
            <el-button slot="append" icon="el-icon-search" @click="onSearchclick"></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <div class="uk-card-body uk-card-small">
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small">
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th width="150">Code</th>
              <th>Customer</th>
              <th class="uk-text-right" width="200">Amount (IDR)</th>
              <th class="uk-text-center" width="100">Status</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(invoice, index) in invoices">
              <tr :key="index">
                <td
                  class="app--table-column__collapse-toggle"
                  @click.prevent="collapseToggle(index)"
                >
                  <a href="#">
                    <font-awesome-icon v-if="invoice.collapse" icon="angle-right"></font-awesome-icon>
                    <font-awesome-icon v-else icon="angle-down"></font-awesome-icon>
                  </a>
                </td>
                <td>{{ moment(invoice.created_at).format('MMM DD YYYY, HH:mm:ss') }}</td>
                <td>{{ invoice.code }}</td>
                <td>{{ invoice.user.code }} - {{ invoice.user.name }}</td>
                <td
                  class="uk-text-right"
                >{{ invoice.amount | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
                <td class="uk-text-center">
                  <el-tag v-if="invoice.paid === 1" type="success" size="mini">Paid</el-tag>
                  <el-tag v-else type="danger" size="mini">Unpaid</el-tag>
                </td>
              </tr>
              <tr v-show="!invoice.collapse" :key="`${index}_info`">
                <td></td>
                <td colspan="5">
                  <div class="uk-margin-small">
                    <h5 class="uk-margin-remove">Konfirmasi Pembayaran</h5>
                    <div v-if="invoice.payments.length < 1" class="app--no-content-container">
                      <div>
                        <font-awesome-icon icon="file-invoice-dollar" size="3x"></font-awesome-icon>
                        <p>No payment confirmed.</p>
                      </div>
                    </div>
                    <!-- 25 -->
                    <table v-else class="uk-table uk-table-small uk-text-small uk-margin-small">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Bank</th>
                          <th class="uk-text-right" width="200">Amount (IDR)</th>
                          <th class="uk-text-center" width="150">Status</th>
                          <th>Payment Receipt</th>
                          <th class="uk-text-center" width="200">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(payment, index) in invoice.payments" :key="index">
                          <td>{{ payment.date }}</td>
                          <td>{{ payment.channel }}</td>
                          <td
                            class="uk-text-right"
                          >{{ payment.amount | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
                          <td class="uk-text-center">{{ payment.status }}</td>
                          <td>
                            <el-button
                              type="primary"
                              size="mini"
                              @click="openPreview(payment)"
                            >Preview</el-button>

                            <el-dialog
                              title="Preview Payment"
                              :visible.sync="centerDialogVisible"
                              class="payment-preview"
                              center
                            >
                              <div style="text-align:center">
                                <img :src="previewLink">
                              </div>
                            </el-dialog>
                          </td>
                          <td class="uk-text-center">
                            <el-button
                              v-if="payment.status === 'new' || payment.status === 'reject'"
                              type="primary"
                              size="mini"
                              @click="confirmPayment(payment.id)"
                            >Confirm</el-button>
                            <el-button
                              v-if="payment.status === 'new' || payment.status === 'confirmed'"
                              type="danger"
                              size="mini"
                              @click="centerDialogReject = true"
                            >Reject</el-button>

                            <el-dialog
                              title="Rejected Message"
                              :visible.sync="centerDialogReject"
                              class="reject-message"
                              center
                            >
                              <div style="text-align:center;">
                                <el-input
                                  v-model="reject_message"
                                  type="textarea"
                                  class="text-message"
                                ></el-input>
                                <br>
                                <el-button
                                  v-if="payment.status === 'new' || payment.status === 'confirmed'"
                                  type="danger"
                                  size="mini"
                                  @click="updatePaymentStatus(payment, 'rejected',reject_message)"
                                >Reject</el-button>
                              </div>
                            </el-dialog>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div id="testPrint" class="uk-hidden">
        <h1>Test Print AWB</h1>
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
      reject_message: "",
      totalPages: ["1"],
      pagination: {
        total: 0,
        current_page: 1,
        last_page: 0,
        page: 1
      },
      invoices: [],
      linkdownload: "",
      filter: {
        time: [],
        search: ""
      },
      centerDialogVisible: false,
      centerDialogReject: false,
      previewLink: ""
    };
  },

  created() {
    this.fetchInvoices(this.pagination.page);
    this.linkdownload = process.env.VUE_APP_ROOT_API;
  },

  mounted() {
    this.onSearchEnter();
  },

  methods: {
    onChangePagination(i) {
      this.fetchInvoices(i + 1);
    },
    onSearchEnter() {
      window.addEventListener("keyup", event => {
        if (event.keyCode === 13) {
          if (this.filter.search === "") {
          } else {
            this.fetchInvoices(this.pagination.page);
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
        this.fetchInvoices(this.pagination.page);
      }
    },
    collapseToggle(index) {
      this.invoices[index].collapse = !this.invoices[index].collapse;
    },
    confirmPayment(paymentId) {
      this.$confirm("Are you sure to confirm this payment?", "Confirm", {
        type: "warning"
      })
        .then(() => {
          this.updatePaymentStatus(paymentId, "confirmed");
        })
        .catch(() => {});
    },
    rejectPayment(paymentId) {
      this.$confirm("Are you sure to reject this payment?", "Confirm", {
        type: "warning"
      })
        .then(() => {
          this.updatePaymentStatus(paymentId, "rejected");
        })
        .catch(() => {});
    },
    async fetchInvoices(page) {
      this.__startLoading();

      this.pagination.page = page;

      try {
        let res = await this.$service.invoice.get(
          {
            search: this.filter.search,
            time: this.filter.time
          },
          page
        );

        this.pagination.last_page = res.data.last_page;

        this.totalPages = res.data.pages;
        this.current_page = page;

        this.invoices = res.data.data.map(invoice => {
          invoice["collapse"] = true;

          return invoice;
        });
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },
    async updatePaymentStatus(payment, status, message) {
      this.__startLoading();

      // console.log("1", payment.id, status, message);
      // console.log("2", payment);

      // return this.__stopLoading();

      try {
        let res = await this.$service.payment.updateStatus(payment.id, {
          payment: payment,
          status: status,
          message: message
        });

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.invoices = this.invoices.map(invoice => {
          if (invoice.id === res.data.data.id) {
            return res.data.data;
          }

          return invoice;
        });
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },
    openPreview(payment) {
      this.centerDialogVisible = true;
      this.previewLink = `${this.linkdownload}/receipt/${payment.id}/${
        payment.filename
      }/download`;
    }
  }
};
</script>
<style lang="scss" scoped>
.link {
  white-space: nowrap;
  width: 136px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.payment-preview {
  z-index: 3000 !important;
}
.reject-message {
  z-index: 3000 !important;

  .text-message {
    margin-bottom: 10px;
  }
}
</style>
