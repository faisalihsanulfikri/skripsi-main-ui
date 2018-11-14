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
            <h3>Users <small>[{{ $route.params.level }}]</small></h3>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-card-body">
      <div class="uk-margin">
        <div class="uk-grid-small" uk-grid>
          <div class="uk-wdith-1-3">
            <el-select v-model="filter.verified" multiple>
              <el-option
                v-for="(item, index) in options.verified"
                :key="index"
                :value="item.value"
                :label="item.label">
              </el-option>
            </el-select>
          </div>
          <div class="uk-width-1-3">
            <el-input v-model="filter.keyword" placeholder="Search..."></el-input>
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
                  :active-field="filter.sort.field"
                  @change="onSortChange">
                </column-sort>
              </th>
              <th>
                <column-sort
                  title="Email"
                  field="email"
                  :active-field="filter.sort.field"
                  @change="onSortChange">
                </column-sort>
              </th>
              <th>
                <column-sort
                  title="Mobile"
                  field="phone"
                  :active-field="filter.sort.field"
                  @change="onSortChange">
                </column-sort>
              </th>
              <th>
                <column-sort
                  title="Verified"
                  field="active"
                  :active-field="filter.sort.field"
                  @change="onSortChange">
                </column-sort>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>
                <el-tag v-if="user.active" type="success" size="small">Yes</el-tag>
                <el-tag v-else type="danger" size="small">No</el-tag>
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
        :total="pagination.total"
        @current-change="onChangePage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

import * as Level from '../../../config/level'

import ColumnSort from '../../../components/ColumnSort'

export default {
  components: {
    ColumnSort
  },
  data () {
    return {
      users: [],
      pagination: {
        current_page: 1,
        per_page: 25,
        total: 0
      },
      filter: {
        keyword: '',
        verified: [true, false],
        sort: {
          field: 'name',
          order: 'asc'
        }
      },
      options: {
        verified: [
          {
            value: true,
            label: 'Yes'
          },
          {
            value: false,
            label: 'No'
          }
        ]
      },
      sortField: 'name'
    }
  },
  computed: {
    filteredUsers () {
      let users = this.users.filter(user => {
        let likeFullName = user.name.toLowerCase().includes(this.filter.keyword.toLowerCase())
        let likeEmail = user.email.toLowerCase().includes(this.filter.keyword.toLowerCase())
        let likeMobile = user.phone.toLowerCase().includes(this.filter.keyword.toLowerCase())

        return likeFullName || likeEmail || likeMobile
      })

      // users = users.filter(user => {
      //   return user[this.filter.level.field]
      // })

      users = _.sortBy(users, user => {
        return user[this.filter.sort.field]
      })

      if (this.filter.sort.order === 'desc') {
        users = users.reverse()
      }

      this.$set(this.pagination, 'total', users.length)
      this.$set(this.pagination, 'total_pages', Math.ceil(this.pagination.total / this.pagination.per_page))

      let start = this.pagination.current_page > 1 ? (this.pagination.current_page * this.pagination.per_page) - this.pagination.per_page : 0

      return users.slice(start, this.pagination.current_page * this.pagination.per_page)
    },
    level () {
      return Level[this.$route.params.level.toUpperCase()]
    }
  },
  watch: {
    $route: {
      handler: 'fetchUsers'
    }
  },
  methods: {
    onChangePage (page) {
      this.pagination.current_page = page

      this.fetchUsers()
    },
    onSortChange (payload) {
      this.filter.sort.field = payload.field
      this.filter.sort.order = payload.order
    },
    fetchUsers () {
      //this.$authHttp.get(`/users/${this.level}`).then(res => {
      this.$authHttp.get(`/users`).then(res => {
        this.users = res.data.data 
        this.users = this.users.level.includes(Level[this.$route.params.level.toUpperCase()])
      })
    }
  },
  created () {
    this.fetchUsers()
  }
}
</script>
