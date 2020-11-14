<template>
  <v-navigation-drawer
    app
    :temporary="this.getDrawerForSize()"
    v-model="drawer"
  >
    <v-list>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>
            <SearchSource />
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="showAllSourcesContent">
        <v-list-item-icon>
          <v-icon>mdi-inbox-arrow-down</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>All</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="showStarredContent">
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Starred</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    <v-list>
      <SourceItem
        :source="source"
        :key="source.id"
        v-for="source in sources"
      ></SourceItem>
    </v-list>
    <template v-slot:append>
      <v-divider></v-divider>
      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import SearchSource from "@/components/SearchSource";
import SourceItem from "@/components/SourceItem";
export default {
  name: "Navigation",
  components: { SourceItem, SearchSource },
  data: () => ({
    sources: [],
    drawer: false
  }),
  methods: {
    showStarredContent: function() {
      this.$vueEventBus.$emit("showStarredContent");
    },
    showAllSourcesContent: function() {
      this.$vueEventBus.$emit("showAllSourcesContent");
    },
    toggleDrawer: function() {
      this.drawer = !this.drawer;
    },
    getDrawerForSize: function() {
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
          return false;
        case "xl":
          return false;
        default:
          return true;
      }
    },
    loadSources: function() {
      this.$http
        .get("http://127.0.0.1:8088/api/v1/sources/")
        .then(response => (this.sources = response.data));
    }
  },
  created() {
    this.$vueEventBus.$on("toggleNavigation", this.toggleDrawer);
    this.$vueEventBus.$on("resetSources", this.loadSources);
  },
  mounted() {
    this.drawer = !this.getDrawerForSize();
    this.loadSources();
  }
};
</script>

<style scoped></style>
