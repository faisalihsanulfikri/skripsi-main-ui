<template>
  <div class="uk-card uk-card-default">
    <!-- Header -->
    <PageTitle title="Consolidate" :paginationTotal="pagination.total"/>

    <!-- Content -->
    <el-card>
      <!-- Filter & Search -->
      <el-row class="row-filter-and-search" type="flex" justify="space-between">
        <el-col :span="6">
          <div class="filter-order">
            <el-date-picker
              class="filter-order"
              v-model="filter.time"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
            ></el-date-picker>
            <el-button slot="append" icon="el-icon-search" @click="fetchInbound(pagination.page)"></el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="search-order">
            <el-input
              v-model="filter.search"
              placeholder="Search..."
              @keypress.enter.native="fetchInbound(pagination.page)"
            >
              <el-button slot="append" icon="el-icon-search" @click="fetchInbound(pagination.page)"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>

      <!-- Order Table v2 -->
      <el-table style="width:100%; margin-top:2rem;" :data="orders">
        <el-table-column fixed type="expand">
          <template slot-scope="props">
            <el-tabs v-model="activeName">
              <!-- Detail -->
              <el-tab-pane label="Detail" name="first">
                <OrderDetail :order="props.row"/>
              </el-tab-pane>

              <!-- Destination -->
              <el-tab-pane label="Location" name="second">
                <OrderDestination
                  :receiver="props.row.receiver"
                  :warehouse="props.row.detail.warehouse"
                />
                <el-button
                  v-if="user.level == 0"
                  type="primary"
                  size="mini"
                  @click="onUpdateAddressDialog(props.row.code, props.$index)"
                >Edit</el-button>

                <!-- Dialog: Update Address -->
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
                      @click="updateAddress(props.row.id)"
                    >Update</el-button>
                  </div>
                </el-dialog>
              </el-tab-pane>
              <!-- Cost -->
              <el-tab-pane label="Cost" name="third">
                <OrderCost
                  :final="true"
                  :cost="props.row.detail.cost"
                  :discount="props.row.discount"
                />
              </el-tab-pane>
              <!-- Packet -->
              <el-tab-pane label="Packet" name="fourth">
                <OrderPacket :order="props.row"/>
              </el-tab-pane>
              <!-- Air Waybills -->
              <el-tab-pane label="Air Waybills" name="fifth">
                <OrderAirwaybills :airwaybills="props.row.air_waybills"/>
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="Date" width="150"></el-table-column>
        <el-table-column prop="code" label="Code" width="200"></el-table-column>
        <el-table-column prop="items[0].reference" label="Reference"></el-table-column>
        <el-table-column prop="created_by" label="customer"></el-table-column>
        <el-table-column prop="amount" label="Amount (IDR)"></el-table-column>
        <el-table-column prop="status" label="Status" width="80"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import OrderDestination from "@/components/inbound/OrderDestination";
import OrderDetail from "@/components/inbound/OrderDetail";
import OrderCost from "@/components/inbound/OrderCost";
import OrderAirwaybills from "@/components/inbound/OrderAirwaybills";
import OrderPacket from "@/components/inbound/OrderPacket";

export default {
  components: {
    PageTitle,
    OrderDestination,
    OrderDetail,
    OrderCost,
    OrderAirwaybills,
    OrderPacket
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
      },
      activeName: "first"
    };
  },

  async created() {
    this.fetchInbound(this.pagination.page);
    this.user = await this.$auth.getUser();
  },

  methods: {
    onChangePagination(i) {
      this.fetchInbound(i + 1);
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
    async fetchInbound(page = 1) {
      this.__startLoading();

      this.pagination.page = page;

      try {
        let res = await this.$service.inbound.getConsolidate(
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
    onUpdateAddressDialog(id, i) {
      this.addressEditDialog = true;
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
      this.update(id);
    },
    update(id) {
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
      this.fetchInbound(this.pagination.page);
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

// Style Content V2

@media screen and (min-width: 320px) {
  .row-filter-and-search {
    flex-direction: column;
    .filter-order,
    .search-order {
      width: 240px;
    }
    .filter-order {
      display: none;
    }
    .search-order {
      margin-top: 1rem;
    }
  }
}

@media (min-width: 360px) {
  .row-filter-and-search {
    .filter-order,
    .search-order {
      width: 280px !important;
    }
  }
}

@media (min-width: 375px) {
  .row-filter-and-search {
    .filter-order,
    .search-order {
      width: 294px !important;
    }
  }
}

@media (min-width: 411px) {
  .row-filter-and-search {
    .filter-order,
    .search-order {
      width: 326px !important;
    }
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .row-filter-and-search {
    .filter-order,
    .search-order {
      width: 486px !important;
    }
  }
}

@media (min-width: 1024px) {
  .row-filter-and-search {
    flex-direction: row;
    .el-col-6 {
      width: 100%;
    }
    .search-order {
      margin-top: 0;
      margin-left: auto;
    }
    .filter-order {
      display: flex;
    }
  }
}
</style>

