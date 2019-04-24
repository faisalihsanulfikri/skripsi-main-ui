<template>
  <div class="order-airwaybills">
    <table class="uk-table uk-table-small uk-table-divider uk-text-small">
      <thead>
        <tr>
          <th>AWB Number</th>
          <th width="150">Created At</th>
          <th width="150">Created By</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(awb, index) in airwaybills" :key="index">
          <td>
            <router-link :to="{ name: 'admin-awb-show', params: { code: awb.awb } }">{{ awb.awb }}</router-link>
          </td>
          <td>{{ awb.created_at }}</td>
          <td>{{ awb.created_by }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "OrderAirwaybills",
  props: ["airwaybills"]
};
</script>

<style>
</style>
