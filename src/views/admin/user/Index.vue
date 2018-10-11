<template>
  <div class="uk-card uk-card-default uk-card-small">
    <div class="uk-card-body">
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider uk-table-small">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.fullName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.mobile }}</td>
              <td>
                <el-tag v-if="user.isVerified" type="success" size="small">Yes</el-tag>
                <el-tag v-else type="danger" size="small">No</el-tag>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import * as Level from '../../../config/level'

export default {
  data () {
    return {
      users: []
    }
  },
  computed: {
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
    fetchUsers () {
      this.$authHttp.get(`/v1/users/${this.level}/level`).then(res => {
        this.users = res.data.data
      })
    }
  },
  created () {
    this.fetchUsers()
  }
}
</script>
