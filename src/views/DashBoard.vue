<template>
  <v-container>
    <div class="text-h5 text-sm-h4 mb-16 mt-0">My personal costs</div>
    <v-row>
      <v-col outlined>
        <add-payment-form />
        <PaymentsDisplay :items="currentElements" />
        <pagination
          :length="paymentsList.length"
          :cur="curPage"
          :n="n"
          @paginate="onChangePage"
        />
      </v-col>
      <v-col>
        <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // import AddPaymentForm from "../components/AddPaymentForm.vue";
  // import PaymentsDisplay from "../components/PaymentsDisplay.vue";
  // import MyPages from "../components/MyPages.vue";
  // import AddPaymentForm from "../components/AddPaymentForm.vue";
  // import Pagination from "../components/Pagination.vue";

  // import { mapMutations, mapActions, mapGetters } from "vuex";
  import { mapActions, mapGetters } from "vuex";
  export default {
    name: "App",
    components: {
      PaymentsDisplay: () => import("../components/PaymentsDisplay.vue"),
      Pagination: () => import("../components/Pagination.vue"),
      AddPaymentForm: () => import("../components/AddPaymentForm.vue"),
      PieChart: () => import("../components/PieChart.vue"),
    },
    data() {
      return {
        curPage: 1,
        n: 10,
        show: false,
        chartOptions: {
          hoverBorderWidth: 20,
        },
        // chartData: {
        //   hoverBackgroundColor: "red",
        //   hoverBorderWidth: 10,
        //   labels: ["Green", "Red", "Blue"],
        //   datasets: [
        //     {
        //       label: "Data One",
        //       backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
        //       data: [10, 1, 5],
        //     },
        //   ],
        // },
      };
    },
    // watch: {
    //   paymentsList: function (newValue, oldValue) {},
    // },
    computed: {
      ...mapGetters(["getFullPaymentValue"]),

      paymentsList() {
        return this.$store.getters.getPaymentList;
      },

      currentElements() {
        return this.paymentsList.slice(
          this.n * (this.curPage - 1),
          this.n * (this.curPage - 1) + this.n
        );
        // return this.paymentsList.slice(3 * (this.curPage - 1), 3 * (this.curPage - 1) + 3)
      },

      chartData() {
        console.log(2);
        return {
          hoverBackgroundColor: "red",
          hoverBorderWidth: 10,
          labels: this.$route.params.category,
          datasets: [
            {
              label: "Data One",
              backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
              data: [10, 1, 5],
            },
          ],
        };
      },

      // paymentsListPage() {
      //   let start = (this.pageNum - 1) * this.strMax;
      //   let end = start + this.strMax;
      //   return this.$store.getters.getPaymentsList.slice(start, end);
      // },
    },
    methods: {
      // ...mapMutations({
      //   myMutation: "setPaymentsListData",
      // }),
      ...mapActions(["presetData"]),
      add(data) {
        this.$store.commit("addDataToPaymentsList", data);
        // this.paymentsList = [...this.paymentsList, data];
      },

      onShowModal() {
        this.$modal.show("AddPaymentForm", {
          header: "Add payment form",
          content: "AddPaymentForm",
        });
      },

      onChangePage(page) {
        this.curPage = page;
      },
    },
    created() {
      const { page } = this.$route.params;
      if (page) {
        this.curPage = Number(page);
      }
    },
    async mounted() {
      console.log("DashboardMounted");
      // this.renderChart(this.chartData, this.chartOptions);
    },
  };
</script>

//
<style lang="scss">
  //   #app {
  //     font-family: Avenir, Helvetica, Arial, sans-serif;
  //     -webkit-font-smoothing: antialiased;
  //     -moz-osx-font-smoothing: grayscale;
  //     text-align: center;
  //     color: #2c3e50;
  //     margin-top: 60px;
  //   }
  //
</style>
