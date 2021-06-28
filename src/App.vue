<template>
  <v-app id="inspire">
    <template v-if="isAuthenticated">
      <TopBar></TopBar>
      <Navigation />
      <v-main>
        <router-view></router-view>
      </v-main>
    </template>
    <template v-else>
      <v-container>
        <v-row>
          <v-col md="2" lg="2">
            <Login></Login>
          </v-col>
          <v-col md="2" lg="2" offset-md="2" offset-lg="2">
            <Register></Register>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation";
import TopBar from "@/components/TopBar";
import Login from "@/components/Login";
import {mapGetters} from "vuex";
import Register from "@/components/Register";

export default {
  name: "App",
  components: {Register, Navigation, TopBar, Login },
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
    })
  }
};
</script>
