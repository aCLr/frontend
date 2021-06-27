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

      <v-list-item :to="{ name: 'content', params: { query: 'all' } }">
        <v-list-item-icon>
          <v-icon>mdi-inbox-arrow-down</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>All</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item :to="{ name: 'content', params: { query: 'starred' } }">
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

      <v-menu
        v-model="showNavContextMenu"
        :position-x="contextMenuX"
        :position-y="contextMenuY"
        absolute
        offset-y
      >
        <v-list>
          <v-list-item @click="deleteSource()">
            <v-list-item-title>
              Delete
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list>
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
      sources: state => state.sources.sources,
      navContextMenu: state => state.navContextMenu.show,
      contextMenuX: state => state.navContextMenu.x,
      contextMenuY: state => state.navContextMenu.y,
      contextMenuSourceId: state => state.navContextMenu.sourceId
    })
  },
  data: () => ({
    drawer: false,
    showNavContextMenu: false
  }),
  watch: {
    showNavContextMenu(newValue) {
      if (!newValue) {
        this.$store.dispatch("navContextMenu/hideNavContextMenu");
      }
    },
    navContextMenu(newValue) {
      if (newValue) {
        this.showNavContextMenu = true;
      }
    }
  },
  methods: {
    async deleteSource() {
      await this.$store.dispatch(
        "sources/deleteSource",
        this.contextMenuSourceId
      );
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
