<template>
  <v-app id="inspire">
    <template v-if="isAuthenticated">
      <v-overlay :value="loading > 0">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
      </v-overlay>
      <template v-if="loading === 0">
        <TopBar></TopBar>
        <Navigation />
        <v-main>
          <router-view></router-view>
        </v-main>
      </template>
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
  data() {
    return {
      loading: 2
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
    })
  },
  methods: {
    loadSources() {
      return this.$store.dispatch("sources/loadSources");
    },
    loadFolders() {
      return this.$store.dispatch("folders/loadFolders")
    }
  },
  mounted() {
    this.loadFolders().then(() => {this.loading -= 1})
    this.loadSources().then(() => {this.loading -= 1})
  }
};
</script>
