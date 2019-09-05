<template>
  <section>
    <!-- Capacity Input -->
    <div class="form-group">
      <label for="capacity">CAPACITIES</label>
      <el-input v-model="input.capacity" placeholder="Please input" type="number"></el-input>
    </div>

    <!-- Start Date Input -->
    <div class="form-group">
      <label>START DATE</label>
      <el-date-picker
        style="width:100%;"
        v-model="input.start_date"
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="Start Date"
        align="left"
      ></el-date-picker>
    </div>

    <!-- End Date Input -->
    <div class="form-group">
      <label>END DATE</label>
      <el-date-picker
        style="width:100%;"
        v-model="input.end_date"
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="End Date"
        align="left"
      ></el-date-picker>
    </div>
  </section>
</template>

<script>
export default {
  name: "PromoCodeForm",
  props: {
    input: { type: Object }
  }
};
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>