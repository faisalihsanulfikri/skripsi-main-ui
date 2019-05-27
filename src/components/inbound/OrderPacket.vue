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
            <td colspan="6">
              <table class="uk-table uk-table-small">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th class="uk-text-center">Price</th>
                    <th class="uk-text-center">Qty</th>
                    <th class="uk-text-center">Unit</th>
                    <th class="uk-text-center">Total Price</th>
                    <th class="uk-text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, itemIndex) in items" :key="itemIndex">
                    <td>{{ item.name }}</td>
                    <td class="uk-text-right">
                      Rp.
                      {{ item.price_user | currency('', 2, { thousandsSeparator: '.',
                      decimalSeparator:
                      ',' }) }}
                    </td>
                    <td class="uk-text-center">{{ item.quantity }}</td>
                    <td class="uk-text-center" width="100">{{ item.stringQuantity }} {{ item.unit }}</td>
                    <td class="uk-text-right">
                      Rp.
                      {{ item.price | currency('', 2, { thousandsSeparator: '.',
                      decimalSeparator:
                      ',' }) }}
                    </td>
                    <td class="uk-text-center" width="100">{{ item.status }}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td colspan="6">
                      <div class="app--list-label">Reference</div>
                      <div class="app--list-text">{{ items[0].reference }}</div>
                    </td>
                  </tr>
                </tbody>
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
