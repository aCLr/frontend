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
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-group v-for="(sources, kind) in sources" :key="kind">
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon>{{ getKindIcon(kind) }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="kind"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="source in sources"
          :key="source.id"
          link
          @click="showSourceContent(source)"
        >
          <v-list-item-icon v-if="source.image">
            <img :src="source.image" />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ source.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import SearchSource from "@/components/SearchSource";
export default {
  name: "Navigation",
  components: { SearchSource },
  data: () => ({
    sources: {},
    drawer: false
  }),
  methods: {
    showSourceContent: function(source) {
      this.$vueEventBus.$emit("showSourceContent", source.id);
    },
    showAllSourcesContent: function() {
      this.$vueEventBus.$emit("showAllSourcesContent");
    },
    toggleDrawer: function() {
      this.drawer = !this.drawer;
    },
    getKindIcon: function(kind) {
      switch (kind) {
        case "WEB":
          return "mdi-web";
        default:
          return "";
      }
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
    groupSourcesByKind: function(sources) {
      return sources.reduce(
        (result, item) => ({
          ...result,
          [item.kind]: [...(result[item.kind] || []), item]
        }),
        {}
      );
    },
    loadSources: function() {
      this.$http
        .get("http://127.0.0.1:8088/api/v1/sources/")
        .then(
          response => (this.sources = this.groupSourcesByKind(response.data))
        );
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
