<template>
  <div class="order-detail">
    <table>
      <tr>
        <td style="width:100px">Date</td>
        <td>{{ order.created_at }}</td>
      </tr>
      <tr>
        <td style="width:100px">Referensi</td>
        <td>{{ order.items[0].reference }}</td>
      </tr>
      <tr>
        <td style="width:100px">Customer</td>
        <td>{{ order.created_by }}</td>
      </tr>
      <tr>
        <td style="width:100px">Amount</td>
        <td>{{ order.amount }}</td>
      </tr>
      <tr>
        <td style="width:100px">Status</td>
        <td>{{ order.status }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "OrderDetail",
  props: ["order"]
};
</script>

<style>
</style>
