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
import { mapState } from "vuex";
export default {
  name: "Navigation",
  components: { SourceItem, SearchSource },
  computed: {
    ...mapState({
      sources: state => state.sources.sources
    })
  },
  data: () => ({
    drawer: false
  }),
  methods: {
    showStarredContent() {
      this.$store.dispatch("records/changeQuery", "starred");
    },
    showAllSourcesContent() {
      this.$store.dispatch("records/changeQuery", "all");
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    getDrawerForSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
          return false;
        case "xl":
          return false;
        default:
          return true;
      }
    },
    loadSources() {
      this.$store.dispatch("sources/loadSources");
    }
  },
  created() {
    this.$vueEventBus.$on("toggleNavigation", this.toggleDrawer);
  },
  mounted() {
    this.drawer = !this.getDrawerForSize();
    this.loadSources();
  }
};
</script>

<style scoped></style>
