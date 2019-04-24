<template>
  <div>
    <table style="width:100%">
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
</template>

<script>
export default {
  name: "OrderPacket",
  props: ["order"]
};
</script>

<style>
</style>
