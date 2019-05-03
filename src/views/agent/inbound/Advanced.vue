<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.1/moment.min.js"></script> -->
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
              <span>Advanced Inbound</span>
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
          <el-input v-model="filter.search" placeholder="Search" @keyup.enter="onSearchEnter">
            <el-button slot="append" icon="el-icon-search" @click="onSearchclick"></el-button>
          </el-input>
        </div>
        <div class="uk-width-auto uk-margin-auto-left">
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
      </div>

      <br>
      <br>

      <div>
        <template v-for="(order, orderIndex) in orders">
          <template v-for="(items, groupIndex) in order.item_groups">
            <!-- General Info -->
            <table class="uk-table uk-table-divider uk-table-small">
              <thead>
                <tr>
                  <th>CODE</th>
                  <th>DATE</th>
                  <th>CUSTOMER</th>
                  <th>PACKAGES DIMENSION</th>
                  <th>PRICE</th>
                  <th>ADDRESS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td :key="
                orderIndex">{{ order.code }}</td>
                  <td
                    :key="orderIndex"
                  >{{ moment(order.created_at).format('MMM DD YYYY, HH:mm:ss') }}</td>
                  <td :key="orderIndex">{{ order.user.code }}</td>
                  <td width="200px" :key="groupIndex">
                    {{ `${items[0].stringWeight}
                    ${order.detail.formula.weight_unit} - ${items[0].stringLength} x
                    ${items[0].stringWidth} x ${items[0].stringLength} ${order.detail.formula.volume_unit}`
                    }}
                  </td>
                  <td width="150px" :key="groupIndex">IDR {{ items[0].stringPrice }}</td>
                  <td width="300px" :key="orderIndex">
                    <div class="app--list-text">{{ order.receiver.name }}</div>
                    <div class="app--list-text">
                      {{ order.receiver.address }}, {{ order.receiver.sub_district }}, {{
                      order.receiver.city }} {{order.receiver.postal_code }} {{ order.receiver.province }}, {{
                      order.receiver.phone }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr>

            <!-- Items Info -->
            <h4>
              <font-awesome-icon class="fas fa-shopping-bag"></font-awesome-icon>
              <!-- <i class="fas fa-shopping-bag"></i> -->
              <span class="uk-margin-small-left">Item Info</span>
            </h4>
            <table class="uk-table uk-table-divider uk-table-small">
              <tr>
                <th colspan="2">ITEM</th>
                <th>TOTAL</th>
                <th>UNIT</th>
                <th>STATUS</th>
                <th class="uk-text-center">ACTION</th>
              </tr>
              <tr v-for=" (item, itemIndex) in items" :key="itemIndex">
                <td class="uk-text-center" width="5%">
                  <el-checkbox v-model="item.selected" :disabled="item.checkDisabled"></el-checkbox>
                </td>
                <td>{{ item.name }}</td>
                <td>{{ item.stringQuantity }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.status }}</td>
                <td class="uk-text-center">
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
            <hr>
            <br>
            <div class="uk-grid-small" uk-grid>
              <div class="uk-width-auto">
                <el-button
                  :disabled="!canCreateAwb(orderIndex)"
                  @click="openCreateAwbDialog(orderIndex)"
                >CREATE AWB | {{ countSelectedItems(orderIndex) }} item's</el-button>
              </div>
            </div>
            <br>

            <!-- AWB -->
            <h4>
              <font-awesome-icon icon="shipping-fast"></font-awesome-icon>
              <span class="uk-margin-small-left">Air Waybills</span>
            </h4>
            <table class="uk-table uk-table-divider uk-table-small">
              <tr>
                <th>AWB Number</th>
                <th>created at</th>
                <th>action</th>
              </tr>
              <tr v-for="(awb, index) in order.air_waybills" :key="index">
                <td width="5%">
                  <router-link
                    :to="{ name: 'agent-awb-show', params: { code: awb.awb } }"
                  >{{ awb.awb }}</router-link>
                </td>
                <td width="15%">{{ awb.created_at }}</td>
                <td width="60%">
                  <!-- awb/find -->
                  <el-button type="primary" size="mini" @click="printAwb(awb.awb)">
                    <font-awesome-icon icon="print"></font-awesome-icon>
                  </el-button>
                </td>
              </tr>
            </table>
            <hr>

            <br>
            <br>
            <br>
            <hr>
          </template>
        </template>
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

    <dialog-create-awb
      :visible="dialogCreateAwb.visible"
      :order="dialogCreateAwb.data"
      @close="closeCreateAwbDialog"
      @done="onAwbCreated"
    ></dialog-create-awb>
  </div>
</template>

<script>
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
      },
      master: {
        addresses: []
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
          message: "Search by customer ID cannot be empty",
          type: "warning"
        });
      } else {
        this.fetchOrders(this.pagination.page);
      }
    },

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

        console.log(this.current_page);

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
    },
    async getAwb(orderCode) {
      this.__startLoading();

      try {
        let res = await this.$service.awb.find_number(orderCode);
        this.orders = res.data.data.map(awb => {
          awb["collapse"] = true;
          awb.item_groups = awb.item_groups.map(items => {
            return this.mappingItems(awb, items);
          });
          return awb;
        });
      } catch (err) {
        this.__handleError(this, err, true);
      }
      return awb;
      this.__stopLoading();
    },
    async createData(data, inputData) {
      this.__startLoading();
      try {
        console.log(data);
        let res = await this.$service.awb.create(data);
        inputData = this.$options.data().input;

        this.$emit("onAwbCreated", res);
      } catch (err) {
        this.__handleError(this, err, true);
      }
      this.__stopLoading();
    }
  }
};
</script>
