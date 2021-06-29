<template>
  <v-app-bar app flat>
    <v-app-bar-nav-icon
      color="black"
      @click.stop="toggleDrawer"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
      </template>
      <v-list>
        <v-list-item @click="logout">
          Logout
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>

<script>
export default {
  name: "TopBar",
  methods: {
    toggleDrawer: function() {
      this.$vueEventBus.$emit("toggleNavigation");
    },
    logout: function () {
      this.$store.dispatch("auth/logout")
    }
  }
};
</script>

<style scoped></style>
