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
              <span>Simplified Inbound</span>
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
          <el-input
            v-model="filter.search"
            placeholder="Search..."
            @keypress.enter.native="fetchOrders"
          >
            <el-button slot="append" icon="el-icon-search" @click="fetchOrders"></el-button>
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
                  <a href="#!" class="custom-link-black">{{ order.code }}</a>
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
                <td class="uk-text-center">{{ order.status }}</td>
              </tr>
              <tr v-show="!order.collapse" :key="`${orderIndex}_info`">
                <td></td>
                <td colspan="5">
                  <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-1-2">
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
                      </div>
                    </div>
                  </div>

                  <hr>

                  <div class="uk-margin-small">
                    <h5 class="uk-margin-remove">
                      <font-awesome-icon icon="cubes"></font-awesome-icon>
                      <span class="uk-margin-small-left">{{ order.item_groups.length }}</span>
                      <span class="uk-margin-small-left">Package`s</span>
                      <el-tag
                        v-if="order.consolidate === 1"
                        class="uk-margin-small-left"
                        type="success"
                        size="mini"
                      >Consolidate</el-tag>
                    </h5>
                    <div class="uk-overflow-auto">
                      <table
                        class="uk-table uk-table-small uk-table-divider uk-table-middle uk-text-small"
                      >
                        <tbody>
                          <template v-for="(items, groupIndex) in order.item_groups">
                            <tr :key="groupIndex">
                              <td>
                                <a href="#">{{ items[0].category.name }}</a>
                              </td>
                              <td class="uk-text-center" width="300">
                                {{ `${items[0].stringWeight}
                                ${order.detail.formula.weight_unit} - ${items[0].stringLength} x
                                ${items[0].stringWidth} x ${items[0].stringLength} ${order.detail.formula.volume_unit}`
                                }}
                              </td>
                              <td class="uk-text-right" width="200">IDR {{ items[0].stringPrice }}</td>
                            </tr>
                            <tr :key="`${groupIndex}_goods`">
                              <td colspan="3">
                                <table class="uk-table uk-table-small">
                                  <tr>
                                    <td colspan="5">
                                      <div class="app--list-label">Reference</div>
                                      <div class="app--list-text">{{ items[0].reference }}</div>
                                    </td>
                                  </tr>
                                  <tr v-for="(item, itemIndex) in items" :key="itemIndex">
                                    <td class="uk-text-center" width="20">
                                      <el-checkbox
                                        v-model="item.selected"
                                        :disabled="item.checkDisabled"
                                      ></el-checkbox>
                                    </td>
                                    <td>{{ item.name }}</td>
                                    <td width="100">{{ item.stringQuantity }} {{ item.unit }}</td>
                                    <td class="uk-text-center" width="100">{{ item.status }}</td>
                                    <td class="uk-text-center" width="100">
                                      <el-button
                                        v-if="item.showReceivedButton"
                                        type="success"
                                        size="mini"
                                        @click=" receivedItem(order.code, item.id,orderIndex)"
                                      >
                                        <font-awesome-icon icon="check"></font-awesome-icon>
                                      </el-button>
                                      <el-button
                                        v-if="item.showRejectButton"
                                        type="danger"
                                        size="mini"
                                        @click="rejectItem(order.code, item.id)"
                                      >
                                        <font-awesome-icon icon="times"></font-awesome-icon>
                                      </el-button>
                                    </td>
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

                  <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-auto">
                      <el-button
                        :disabled="!canCreateAwb(orderIndex)"
                        @click="openCreateAwbDialog(orderIndex)"
                      >CREATE AWB | {{ countSelectedItems(orderIndex) }} item's</el-button>
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
                            <th width="50"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(awb, index) in order.air_waybills" :key="index">
                            <td>
                              <router-link
                                :to="{ name: 'agent-awb-show', params: { code: awb.awb } }"
                              >{{ awb.awb }}</router-link>
                            </td>
                            <td>{{ awb.created_at }}</td>
                            <td class="uk-text-center">
                              <el-button type="primary" size="mini" @click="printAwb(awb.awb)">
                                <font-awesome-icon icon="print"></font-awesome-icon>
                              </el-button>
                            </td>
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

    <dialog-create-awb
      :visible="dialogCreateAwb.visible"
      :order="dialogCreateAwb.data"
      @close="closeCreateAwbDialog"
      @done="onAwbCreated"
    ></dialog-create-awb>
  </div>
</template>

<script>
const code = localStorage.getItem('code');
// import moment from "moment";
import CalculatorResult from "../../../components/CalculatorResult";
import DialogCreateAwb from "../../../components/DialogCreateAwb";

export default {
  components: {
    CalculatorResult,
    DialogCreateAwb
  },

  data() {
    return {
      dialogCreateAwb: {
        visible: false,
        data: {}
      },
      orders: [],
      awb: [],
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

    this.fetchOrders(this.pagination.page);
  },

  methods: {
    onChangePagination(i) {
      this.fetchOrders(i + 1);
    },

    onLoadDataPagination() {},
    openCreateAwbDialog(index) {
      this.dialogCreateAwb.data = this.orders[index];
      this.dialogCreateAwb.visible = true;
    },
    closeCreateAwbDialog() {
      this.dialogCreateAwb.data = {};
      this.dialogCreateAwb.visible = false;
    },
    async onAwbCreated(res) {
      this.closeCreateAwbDialog();
      this.orders = this.orders.map(order => {
        if (order.id === res.data.data.id) {
          let $order = res.data.data;

          $order["collapse"] = false;
          $order.item_groups = $order.item_groups.map(items => {
            return this.mappingItems($order, items);
          });
          $order.items = this.mappingItems($order, $order.items);

          return $order;
        }

        return order;
      });
      var lenght = res.data.data.air_waybills.length;
      this.printAwb(res.data.data.air_waybills[lenght - 1].awb);
    },
    collapseToggle(index) {
      this.orders[index].collapse = !this.orders[index].collapse;
    },
    countSelectedItems(index) {
      let order = this.orders[index];
      let items = order.item_groups.flat();

      return items.filter(item => item.selected).length;
    },
    canCreateAwb(index) {
      let order = this.orders[index];
      let items = order.item_groups.flat();
      let selectedItems = items.filter(item => item.selected);
      let invalidItems = selectedItems.filter(item => {
        let { item_status: itemStatus } = this.$store.state.kirimin.status;

        let isWaiting = item.status === itemStatus.WAITING;
        let isRejected = item.status === itemStatus.REJECTED;
        let isShipping = item.status === itemStatus.SHIPPING;

        return isWaiting || isRejected || isShipping;
      });

      if (selectedItems.length > 0 && invalidItems.length === 0) return true;

      return false;
    },
    receivedItem(orderCode, itemId) {
      this.$confirm("Are you sure to confirm this item?", "Confirm", {
        type: "warning"
      })
        .then(() => {
          this.updateItemStatus(
            orderCode,
            itemId,
            this.$store.state.kirimin.status.item_status.RECEIVED
          );
        })
        .catch(() => {});
    },
    rejectItem(orderCode, itemId) {
      this.$confirm("Are you sure to reject this payment?", "Confirm", {
        type: "warning"
      })
        .then(() => {
          this.updateItemStatus(
            orderCode,
            itemId,
            this.$store.state.kirimin.status.item_status.REJECTED
          );
        })
        .catch(() => {});
    },
    printAwb(code) {
      window.open(
        `/print-awb/${code}`,
        "Kirimin - Print AWB",
        "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=0,width=800"
      );
    },
    mappingItems(order, items) {
      let $items = this.$util.orderItem.stringCurrency(items).map(item => {
        let {
          order_status: orderStatus,
          item_status: itemStatus
        } = this.$store.state.kirimin.status;

        let isCancelOrder = order.status === orderStatus.CANCEL;

        let isWaiting = item.status === itemStatus.WAITING;
        let isRejected = item.status === itemStatus.REJECTED;
        let isReceived = item.status === itemStatus.RECEIVED;

        item["selected"] = false;
        item["showReceivedButton"] =
          !isCancelOrder && (isWaiting || isRejected);
        item["showRejectButton"] = !isCancelOrder && (isWaiting || isReceived);

        return item;
      });

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

        this.pagination = res.data;

        delete this.pagination.data;
      } catch (err) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    },
    async updateItemStatus(orderCode, itemId, status) {
      this.__startLoading();

      try {
        let res = await this.$service.order.updateItemStatus(
          orderCode,
          itemId,
          {
            status: status
          }
        );

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.orders = this.orders.map(order => {
          if (order.id === res.data.data.id) {
            let $order = res.data.data;

            $order["collapse"] = false;
            $order.item_groups = $order.item_groups.map(items => {
              return this.mappingItems($order, items);
            });
            $order.items = this.mappingItems($order, $order.items);

            return $order;
          }

          return order;
        });
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

