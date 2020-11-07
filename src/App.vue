<template>
  <v-app id="inspire">
    <TopBar></TopBar>
    <Navigation app />
    <v-main>
      <Content />
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation";
import Content from "@/components/Content";
import TopBar from "@/components/TopBar";

export default {
  name: "App",
  components: { Navigation, Content, TopBar }
};
</script>
