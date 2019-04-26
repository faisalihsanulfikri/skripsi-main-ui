<template>
  <div class="order-location">
    <h5>Hongkong</h5>
    <h6>Destination Address:</h6>
    <address>
      <span>{{ receiver.name }}</span>
      <br>
      <span>{{ receiver.address }}</span>
      <br>
      <span>{{ receiver.sub_district }}, {{ receiver.city }} {{ receiver.postal_code }}</span>
      <br>
      <span>{{ receiver.province }}</span>
      <br>
      <span>{{ receiver.phone }}</span>
    </address>
  </div>
</template>

<script>
export default {
  name: "OrderLocation",
  props: {
    receiver: {
      type: Object
    }
  }
};
</script>

