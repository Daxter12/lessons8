<template>
  <v-app>
    <v-app-bar app flat dark>
      <v-btn to="/dashboard" plane :ripple="false"> Dashboard </v-btn>

      <v-btn to="/about" plane :ripple="false"> About </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: "App",
    data: () => ({}),
    created() {
      this.$store.dispatch("presetData");
    },
  };
</script>
