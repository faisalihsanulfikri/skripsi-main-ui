<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="warehouse"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>Warehouses</h3>
          </div>
        </div>
        <div class="uk-width-auto">
          <div class="app--card-header__link">
            <router-link :to="{ name: 'admin-warehouse-create' }">
              <font-awesome-icon icon="plus"></font-awesome-icon>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body uk-card-small">
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small">
          <thead>
            <tr>
              <th></th>
              <th width="100">Code</th>
              <th>Name</th>
              <th class="uk-text-right" width="100">Price VIP</th>
              <th class="uk-text-right" width="100">Price Regular</th>
              <th class="uk-text-center" width="100">Actions</th>
              <th class="uk-text-center" width="100">Status</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(warehouse, index) in warehouses">
              <tr :key="index">
                <td
                  class="app--table-column__collapse-toggle"
                  @click.prevent="collapseToggle(index)"
                >
                  <a href="#">
                    <font-awesome-icon v-if="warehouse.collapse" icon="angle-right"></font-awesome-icon>
                    <font-awesome-icon v-else icon="angle-down"></font-awesome-icon>
                  </a>
                </td>
                <td>{{ warehouse.code }}</td>
                <td>{{ warehouse.name }}</td>
                <td class="uk-text-right">${{ warehouse.price_config.vip }}</td>
                <td class="uk-text-right">${{ warehouse.price_config.regular }}</td>
                <td class="uk-text-center">
                  <router-link
                    :to="{ name: 'admin-warehouse-edit', params: { id: warehouse.code } }"
                  >
                    <font-awesome-icon icon="edit"></font-awesome-icon>
                  </router-link>
                  <a
                    class="uk-margin-small-left uk-text-danger"
                    href="#"
                    @click.prevent="deleteConfirmation(warehouse.id)"
                  >
                    <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                  </a>
                </td>
                <td class="uk-text-center">
                  <el-switch
                    v-model="warehouse.isEnable"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="updateWarehouseStatus(index)"
                  ></el-switch>
                </td>
              </tr>
              <tr v-show="!warehouse.collapse" :key="`d${index}`">
                <td></td>
                <td colspan="4">
                  <div>
                    <div class="uk-margin-small">Address : {{ warehouse.address }}</div>
                    <div class="uk-margin-small">Zip Code : {{ warehouse.zip_code }}</div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      warehouses: []
    };
  },
  created() {
    this.fetchWareHouses();
  },
  methods: {
    fetchWareHouses() {
      this.$authHttp
        .get(`/warehouses`)
        .then(res => {
          this.warehouses = res.data.data.map(warehouse => {
            let priceConfig = warehouse.price_config;

            warehouse["collapse"] = true;
            warehouse["isEnable"] = warehouse.status == "enable" ? true : false;
            warehouse["price_config"] = JSON.parse(priceConfig);

            return warehouse;
          });
        })
        .catch(err => {
          this.__handleError(this, err, true);
        });
    },
    async delete(id) {
      this.error = false;
      this.errorMessage = "";

      try {
        let res = await this.$service.warehouse.delete(id);

        this.$notify({
          title: "SUCCESS",
          message: res.data.message,
          type: "success"
        });

        this.fetchWareHouses();
      } catch (err) {
        this.__handleError(this, err, true);
      }
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
    collapseToggle(index) {
      this.warehouses[index].collapse = !this.warehouses[index].collapse;
    },

    /**
     * Update warehouse status: Disable or Enable
     * @param {Number} index
     */
    async updateWarehouseStatus(index) {
      const wsData = this.warehouses[index];
      const wsCode = wsData.code;
      const wsStatus = wsData.isEnable ? "enable" : "disable";

      console.log(wsCode, wsStatus);

      return this.$service
        .put(wsCode, { status: wsStatus })
        .then(res => {
          this.$notify({
            type: "success",
            title: "Success",
            message: res.data.message
          });
        })
        .catch(err => {
          this.$notify({
            type: "error",
            title: "Error",
            message: err.message
          });
        });
    }
  }
};
</script>
