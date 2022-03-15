<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn dark v-on="on" @click="dialog = !dialog">
        ADD NEW COST <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card class="pa-8">
      <v-text-field label="Date" placeholder="Date" v-model="date" />
      <v-text-field label="Value" placeholder="Value" v-model.number="value" />
      <v-select :items="options" v-model="category" label="Standard"></v-select>
      <v-row justify="space-between">
        <v-btn @click="dialog = false" dark>Close</v-btn>
        <v-btn @click="onSaveClick" dark>Add</v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
  // import { set } from "vue/types/umd";
  export default {
    name: "AddPaymentForm",
    data() {
      return {
        value: 0,
        category: "",
        date: "",
        dialog: false,
      };
    },
    computed: {
      getCurrentDate() {
        const today = new Date();
        let d = String(today.getDate());
        d = d.length === 1 ? "0" + d : d;
        let m = String(today.getMonth() + 1);
        m = m.length === 1 ? "0" + m : m;
        const y = today.getFullYear();
        return `${d}.${m}.${y}`;
      },
      options() {
        return this.$store.getters.getCategoryList;
      },
    },
    methods: {
      onSaveClick() {
        const data = {
          // id: Date.now(),
          value: this.value,
          category: this.category,
          date: this.date || this.getCurrentDate,
        };
        this.$store.commit("addDataToPaymentsList", data);
        this.$emit("onAdd");
        this.dialog = false;
      },
    },
    // async created() {
    //   console.log('created');

    //   // this.category = this.options[0];
    // },
    mounted() {
      console.log("AddPAymentsFormMounted");
      this.$store.dispatch("loadCategories");

      console.log("AddPAymentsFormMountedAfter");
      if (this.$route.params.category) {
        this.category = this.$route.params.category;
      }
      if (this.$route.query.value) {
        this.value = this.$route.query.value;
      }
      if (this.value && this.category) {
        this.date = Date.now();
        this.onSaveClick();
      }
    },
  };
</script>

<style lang="scss" scoped></style>
