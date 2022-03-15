<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col :cols="2">#</v-col>
      <v-col :cols="5">Date</v-col>
      <v-col :cols="3">Category</v-col>
      <v-col :cols="2">Value</v-col>
    </v-row>
    <v-row v-for="item in items" :key="item.id">
      <v-col :cols="2">{{ item.id }}</v-col>
      <v-col :cols="5">{{ item.date }}</v-col>
      <v-col :cols="3">{{ item.category }}</v-col>
      <v-col :cols="2">{{ item.value }}</v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "PaymentsDisplay",
    props: {
      items: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      editItem(item) {
        console.log(item);
      },
      onShowContextMenu(event, item) {
        const items = [
          {
            text: "Edit",
            action: () => {
              this.editItem(item);
            },
          },
          {
            text: "Delete",
            action: () => {
              console.log(item.id);
            },
          },
        ];
        this.$context.show({ event, items });
      },
    },
  };
</script>

<style lang="scss" scoped></style>
