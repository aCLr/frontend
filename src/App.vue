<template>
  <v-app id="inspire">
    <TopBar></TopBar>
    <Navigation />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation";
import TopBar from "@/components/TopBar";

export default {
  name: "App",
  components: { Navigation, TopBar }
};
</script>
