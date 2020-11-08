<template>
  <v-app-bar app flat>
    <v-app-bar-nav-icon
      color="black"
      @click.stop="toggleDrawer"
    ></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>
export default {
  name: "TopBar",
  methods: {
    toggleDrawer: function() {
      this.$vueEventBus.$emit("toggleNavigation");
    }
  }
};
</script>

<style scoped></style>
