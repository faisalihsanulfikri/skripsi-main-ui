<template>
  <div class="uk-margin-small uk-overflow-auto">
    <h5 class="uk-margin-remove">
      <font-awesome-icon icon="cubes"></font-awesome-icon>
      <span class="uk-margin-small-left">Items</span>
    </h5>
    <div>
      <table class="uk-table uk-table-small uk-table-divider uk-table-middle uk-text-small">
        <tbody>
          <template v-for="item in order.items">
            <tr :key="`${item.id}_item`">
              <td class="uk-text-center" width="20">
                <el-checkbox v-model="item.selected"></el-checkbox>
              </td>
              <td>
                <div>
                  <span class="uk-text-primary">{{ item.name }} # {{ item.category.name }}</span>
                </div>
                <div>{{ item.url }}</div>
                <div>{{ item.reference }}</div>
                <div>{{ `${item.stringWeight} ${order.detail.formula.weight_unit} - ${item.stringLength} x ${item.stringWidth} x ${item.stringLength} ${order.detail.formula.volume_unit}` }}</div>
                <div>
                  {{ item.stringQuantity }} item's x IDR {{ item.stringPrice }}
                </div>
              </td>
              <td class="uk-text-center" width="100">{{ item.status }}</td>
              <td class="uk-text-center" width="200">
                <el-button
                  v-if="item.showReceivedButton"
                  type="success"
                  size="mini"
                  @click="receivedItem(order.code, item.id)">
                  Received
                </el-button>
                <el-button
                  v-if="item.showRejectButton"
                  type="danger"
                  size="mini"
                  @click="rejectItem(order.code, item.id)">
                  Reject
                </el-button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
