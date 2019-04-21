<template>
  <div class="uk-card uk-card-default">
    <!-- Header -->
    <PageTitle title="Dashboard"/>

    <!-- Content -->
    <el-card>
      <el-row :gutter="20" type="flex" justify="left" class="base-chart-row">
        <el-col :xs="24" :sm="24" :md="10">
          <el-card>
            <ChartBar :styles="chartBarStyle" label="ORDERS" :labels="dates" :data="total"/>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10">
          <el-card>
            <ChartBar :styles="chartBarStyle" label="PAYMENT" :labels="dates" :data="amount"/>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import ChartBar from "@/components/charts/ChartBar";
import ChartDoughnut from "@/components/charts/ChartDoughnut";
import moment from "moment";

export default {
  components: {
    PageTitle,
    ChartBar,
    ChartDoughnut
  },
  data() {
    return {
      amount: [],
      dates: [],
      total: []
    };
  },
  computed: {
    chartBarStyle() {
      return {
        height: "400px",
        width: "400px",
        position: "relative"
      };
    }
  },
  methods: {
    async chart() {
      this.__startLoading();

      try {
        const res = await this.$service.chart.get();
        const resData = res.data.data;

        this.dates = resData.map(el => moment(el.date).format("DD-MMM"));
        this.amount = resData.map(el => el.amount);
        this.total = resData.map(el => el.total);
      } catch (e) {
        this.__handleError(this, err, true);
      }

      this.__stopLoading();
    }
  },
  async created() {
    let chart = await this.chart();
  }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 300px) and (max-width: 720px) {
  .base-chart-row {
    flex-direction: column;

    .el-col {
      margin-bottom: 1rem;
    }
  }
}
</style>
