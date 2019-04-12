<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-header app--card-header">
      <div uk-grid>
        <div class="uk-width-auto">
          <div class="app--card-header__icon">
            <font-awesome-icon icon="user"></font-awesome-icon>
          </div>
        </div>
        <div class="uk-width-expand">
          <div class="app--card-header_title">
            <h3>
              <span>Users</span>
              <el-tag
                class="uk-margin-small-left"
                size="small"
              >{{ $route.params.level.toUpperCase() }}</el-tag>
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body">
      <div class="uk-margin">
        <div class="uk-grid-small" uk-grid>
          <div class="uk-width-1-3">
            <el-select v-model="filter.verified" class="uk-width-1-1" multiple>
              <el-option
                v-for="(item, index) in options.verified"
                :key="index"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </div>
          <div class="uk-width-1-3">
            <el-input v-model="filter.keyword" placeholder="Search..." @keyup.enter="fetchUsers"></el-input>
          </div>
          <div class="uk-width-auto">
            <el-button type="primary" @click="fetchUsers">Filter</el-button>
          </div>
          <div class="uk-width-auto">
            <router-link :to="{ name: 'admin-user-create', params: { level: this.level } }">
              <el-button type="primary">Add</el-button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small">
          <thead>
            <tr>
              <th>
                <column-sort
                  title="Name"
                  field="name"
                  :active-field="filter.sortField"
                  @change="onSortChange"
                ></column-sort>
              </th>
              <th>
                <column-sort
                  title="Email"
                  field="email"
                  :active-field="filter.sortField"
                  @change="onSortChange"
                ></column-sort>
              </th>
              <th>
                <column-sort
                  title="Mobile"
                  field="phone"
                  :active-field="filter.sortField"
                  @change="onSortChange"
                ></column-sort>
              </th>
              <th class="uk-text-center">
                <column-sort
                  title="Verified"
                  field="active"
                  :active-field="filter.sortField"
                  @change="onSortChange"
                ></column-sort>
              </th>
              <th class="uk-text-center" style="vertical-align: middle;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td class="uk-text-center">
                <el-tag v-if="user.active" type="success" size="small">Yes</el-tag>
                <el-tag v-else type="danger" size="small">No</el-tag>
              </td>
              <td class="uk-text-center" style="vertical-align: middle;">
                <div class="uk-grid-small" uk-grid>
                  <div class="uk-width-1-2">
                    <router-link :to="{ name: 'admin-user-detail', params: { id: user.id } }">
                      <font-awesome-icon icon="info"></font-awesome-icon>
                    </router-link>
                  </div>
                  <div class="uk-width-1-2">
                    <router-link :to="{ name: 'admin-user-edit', params: { id: user.id } }">
                      <font-awesome-icon icon="edit"></font-awesome-icon>
                    </router-link>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="uk-card-footer uk-text-center">
      <el-pagination
        layout="prev, pager, next"
        :page-size="pagination.per_page"
        :page-count="pagination.last_page"
        :total="pagination.total"
        @current-change="onChangePage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import ColumnSort from "../../../components/ColumnSort";

export default {
  components: {
    ColumnSort
  },

  data() {
    return {
      level: "",
      users: [],
      pagination: {
        current_page: 1,
        per_page: 25,
        total: 0
      },
      filter: {
        keyword: "",
        verified: [1, 0],
        sortField: "active",
        sortOrder: "desc"
      },
      options: {
        verified: [
          {
            value: 1,
            label: "Verified"
          },
          {
            value: 0,
            label: "Unverified"
          }
        ]
      }
    };
  },

  watch: {
    $route: {
      handler: "fetchUsers"
    }
  },

  async created() {
    this.__startLoading();

    await this.fetchUsers();

    this.__stopLoading();
  },

  methods: {
    async onChangePage(page) {
      this.pagination.current_page = page;

      this.__startLoading();

      await this.fetchUsers();

      this.__stopLoading();
    },
    async onSortChange(payload) {
      this.filter.sortField = payload.field;
      this.filter.sortOrder = payload.order;

      this.__startLoading();

      await this.fetchUsers();

      this.__stopLoading();
    },
    async fetchUsers() {
      try {
        let res = await this.$service.user.getByLevel(
          this.$route.params.level,
          {
            page: this.pagination.current_page,
            sort: [this.filter.sortField, this.filter.sortOrder],
            active: this.filter.verified,
            search: this.filter.keyword
          }
        );

        this.users = res.data.data;
        this.pagination = res.data;

        switch (this.$route.params.level) {
          case "regular":
            this.level = "2";
            break;
          case "premium":
            this.level = "3";
            break;
          case "agent":
            this.level = "4";
            break;
          case "admin":
            this.level = "1";
            break;
        }

        console.log(this.users);

        delete this.pagination.data;
        delete this.pagination.filter;
      } catch (err) {
        this.__handleError(this, err, true);
      }
    }
  }
};
</script>