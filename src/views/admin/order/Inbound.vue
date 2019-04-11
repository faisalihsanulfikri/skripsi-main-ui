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
              <span>Inbound</span>
              <el-badge :value="pagination.total"></el-badge>
            </h3>
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
          <el-button slot="append" icon="el-icon-search" @click="fetchOrders"></el-button>
        </div>
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
              <th></th>
              <th width="150">Date</th>
              <th width="150">Code</th>
              <th>Reference</th>
              <th>Customer</th>
              <th class="uk-text-right" width="200">Amount (IDR)</th>
              <th class="uk-text-center" width="150">Status</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(order, orderIndex) in orders">
              <tr :key="orderIndex">
                <td
                  class="app--table-column__collapse-toggle"
                  @click.prevent="collapseToggle(orderIndex)"
                >
                  <a href="#">
                    <font-awesome-icon v-if="order.collapse" icon="angle-right"></font-awesome-icon>
                    <font-awesome-icon v-else icon="angle-down"></font-awesome-icon>
                  </a>
                </td>
                <td>{{ moment(order.created_at).format('MMM DD YYYY, HH:mm:ss') }}</td>
                <td
                  class="app--table-column__collapse-toggle"
                  @click.prevent="collapseToggle(orderIndex)"
                >
                  <a href="#">{{ order.code }}</a>
                </td>
                <td>
                  <!-- start -->
                  <template v-for="(items, groupIndex) in order.item_groups">
                    <ul :key="groupIndex" class="ul-ref">
                      <li class="li-ref">{{ items[0].reference }}</li>
                    </ul>
                  </template>
                  <!-- end -->
                </td>
                <td>{{ order.user.code }} - {{ order.user.name }}</td>
                <td
                  class="uk-text-right"
                >{{ order.amount | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ',' }) }}</td>
                <td class="uk-text-center">{{ order.status }}</td>
              </tr>
              <tr v-show="!order.collapse" :key="`${orderIndex}_info`">
                <td></td>
                <td colspan="5">
                  <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-2-5">
                      <h5 class="uk-margin-small">
                        <font-awesome-icon icon="globe-asia"></font-awesome-icon>
                        <span class="uk-margin-small-left">{{ order.detail.warehouse.name }}</span>
                      </h5>
                      <h5 class="uk-margin-remove">
                        <font-awesome-icon icon="truck"></font-awesome-icon>
                        <span class="uk-margin-small-left">Destination Address</span>
                      </h5>
                      <div class="uk-padding-small">
                        <div class="app--list-text">{{ order.receiver.name }}</div>
                        <div class="app--list-text">{{ order.receiver.address }}</div>
                        <div
                          class="app--list-text"
                        >{{ order.receiver.sub_district }}, {{ order.receiver.city }} {{ order.receiver.postal_code }}</div>
                        <div class="app--list-text">{{ order.receiver.province }}</div>
                        <div class="app--list-text">{{ order.receiver.phone }}</div>
                        <div>
                          <el-button
                            v-if="user.level == 0"
                            type="primary"
                            size="mini"
                            @click="onUpdateAddressDialog(order.id,orderIndex)"
                          >Edit</el-button>
                        </div>
                        <div>
                          <el-dialog
                            title="Edit Address"
                            :visible.sync="addressEditDialog"
                            class="edit-address"
                            center
                          >
                            <div class="uk-card-body">
                              <div class="uk-margin">
                                <label class="uk-form-label">Province</label>
                                <el-input v-model="input.province"></el-input>
                                <!-- <input type="text"> -->
                              </div>
                              <div class="uk-margin">
                                <label class="uk-form-label">City</label>
                                <el-input v-model="input.city"></el-input>
                              </div>
                              <div class="uk-margin">
                                <label class="uk-form-label">Sub District</label>
                                <el-input v-model="input.subdistrict_name"></el-input>
                              </div>
                              <div class="uk-margin">
                                <label class="uk-form-label">Address</label>
                                <el-input v-model="input.address"></el-input>
                              </div>
                              <div class="uk-margin">
                                <label class="uk-form-label">Postal Code</label>
                                <el-input v-model="input.postal_code"></el-input>
                              </div>
                              <el-button
                                type="primary"
                                size="mini"
                                @click="updateAddress(order.id)"
                              >Update</el-button>
                            </div>
                          </el-dialog>
                        </div>
                      </div>
                    </div>
                    <div class="uk-width-3-5">
                      <h5 class="uk-margin-remove">
                        <font-awesome-icon icon="dollar-sign"></font-awesome-icon>
                        <span class="uk-margin-small-left">Cost</span>
                      </h5>
                      <calculator-result :final="true" :cost="order.detail.cost"></calculator-result>
                    </div>
                  </div>

                  <hr>

                  <div class="uk-margin-small uk-overflow-auto">
                    <h5 class="uk-margin-remove">
                      <font-awesome-icon icon="cubes"></font-awesome-icon>
                      <span class="uk-margin-small-left">Packets</span>
                      <el-badge :value="order.item_groups.length"></el-badge>
                    </h5>
                    <div>
                      <table
                        class="uk-table uk-table-small uk-table-divider uk-table-middle uk-text-small"
                      >
                        <tbody>
                          <template v-for="(items, groupIndex) in order.item_groups">
                            <tr :key="groupIndex">
                              <td>
                                <a href="#">{{ items[0].category.name }}</a>
                              </td>
                              <td
                                class="uk-text-center"
                                width="300"
                              >{{ `${items[0].stringWeight} ${order.detail.formula.weight_unit} - ${items[0].stringLength} x ${items[0].stringWidth} x ${items[0].stringLength} ${order.detail.formula.volume_unit}` }}</td>
                              <td class="uk-text-right" width="200">Rp. {{ items[0].stringPrice }}</td>
                            </tr>
                            <tr :key="`${groupIndex}_goods`">
                              <td colspan="3">
                                <table class="uk-table uk-table-small">
                                  <tr>
                                    <td colspan="3">
                                      <div class="app--list-label">Reference</div>
                                      <div class="app--list-text">{{ items[0].reference }}</div>
                                    </td>
                                  </tr>
                                  <tr v-for="(item, itemIndex) in items" :key="itemIndex">
                                    <td>{{ item.name }}</td>
                                    <td width="100">{{ item.stringQuantity }} {{ item.unit }}</td>
                                    <td class="uk-text-center" width="100">{{ item.status }}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <hr>

                  <div class="uk-margin">
                    <h5 class="uk-margin-remove">
                      <font-awesome-icon icon="shipping-fast"></font-awesome-icon>
                      <span class="uk-margin-small-left">Air Waybills</span>
                    </h5>
                    <div>
                      <table class="uk-table uk-table-small uk-table-divider uk-text-small">
                        <thead>
                          <tr>
                            <th>AWB Number</th>
                            <th width="150">Created At</th>
                            <th width="150">Created By</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(awb, index) in order.air_waybills" :key="index">
                            <td>
                              <router-link
                                :to="{ name: 'admin-awb-show', params: { code: awb.awb } }"
                              >{{ awb.awb }}</router-link>
                            </td>
                            <td>{{ awb.created_at }}</td>
                            <td>{{ awb.created_by }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
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
// import moment from "moment";
import CalculatorResult from "../../../components/CalculatorResult";

export default {
  components: {
    CalculatorResult
  },

  data() {
    return {
      detail: {},
      receiver: {},
      user: "",
      input: {
        province: "",
        city: "",
        subdistrict_name: "",
        address: "a",
        postal_code: "p"
      },
      addressEditDialog: false,
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

  async created() {
    // this.filter.time = [
    //   moment()
    //     .startOf("month")
    //     .format("YYYY-MM-DD"),
    //   moment()
    //     .endOf("month")
    //     .format("YYYY-MM-DD")
    // ];

    this.fetchOrders(this.pagination.page);
    this.user = await this.$auth.getUser();
  },

  mounted() {
    this.onSearchEnter();
  },

  methods: {
    onChangePagination(i) {
      this.fetchOrders(i + 1);
    },
    onSearchEnter() {
      window.addEventListener("keyup", event => {
        if (event.keyCode === 13) {
          if (this.filter.search === "") {
          } else {
            this.fetchOrders(this.pagination.page);
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
        this.fetchOrders(this.pagination.page);
      }
    },
    collapseToggle(index) {
      this.orders[index].collapse = !this.orders[index].collapse;
    },
    printAwb(code) {
      window.open(
        `/print-awb/${code}`,
        "Kirimin - Print AWB",
        "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800"
      );
    },
    mappingItems(order, items) {
      let $items = this.$util.orderItem.stringCurrency(items);

      return $items;
    },
    async fetchOrders(page) {
      this.__startLoading();

      this.pagination.page = page;

      try {
        let res = await this.$service.order.get(
          {
            search: this.filter.search,
            time: this.filter.time
          },
          page
        );

        this.pagination.last_page = res.data.last_page;

        this.totalPages = res.data.pages;
        this.current_page = page;

        this.orders = res.data.data.map(order => {
          order["collapse"] = true;
          order.item_groups = order.item_groups.map(items => {
            return this.mappingItems(order, items);
          });
          order.items = this.mappingItems(order, order.items);

          return order;
        });

        console.log(this.orders);

        // this.input.province =

        this.pagination = res.data;

        delete this.pagination.data;
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },

    onUpdateAddressDialog(id, i) {
      this.addressEditDialog = true;
      // console.log(this.orders[i].detail.destination);
      // console.log(id, i);
      this.input.address = this.orders[i].receiver.address;
      this.input.postal_code = this.orders[i].receiver.postal_code;
      this.input.province = this.orders[i].detail.destination.province;
      this.input.city = this.orders[i].detail.destination.city;
      this.input.subdistrict_name = this.orders[
        i
      ].detail.destination.subdistrict_name;

      this.detail = this.orders[i].detail;
      this.receiver = this.orders[i].receiver;
    },

    updateAddress(id) {
      // console.log(this.orders[i].detail.destination);
      console.log(id);

      // destination
      this.detail.destination.province = this.input.province;
      this.detail.destination.city = this.input.city;
      this.detail.destination.subdistrict_name = this.input.subdistrict_name;

      //receiver
      this.receiver.address = this.input.address;
      this.receiver.province = this.input.province;
      this.receiver.city = this.input.city;
      this.receiver.sub_district = this.input.subdistrict_name;
      this.receiver.postal_code = this.input.postal_code;

      // console.log("detail", this.detail);
      // console.log("receiver", this.receiver);
      this.update(id);
    },
    update(id) {
      console.log("receiver", this.receiver);

      this.$authHttp
        .put(`/order/addresses/${id}`, {
          detail: this.detail,
          receiver: this.receiver
        })
        .then(res => {
          this.$notify({
            title: "SUCCESS",
            message: res.data.message,
            type: "success"
          });
        })
        .catch(err => {
          if (err.response) {
            this.error = true;
            this.errorMessage = err.response.data.message
              ? err.response.data.message
              : err.response.statusText;
          }
        });

      this.addressEditDialog = false;
      this.fetchOrders(this.pagination.page);
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-address {
  z-index: 3000 !important;
}

.ul-ref {
  padding-left: 0px;

  .li-ref {
    list-style: none;
  }
}
</style>

